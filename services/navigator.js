var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Workbox } from "workbox-window";
import { LoaderConstants, ServiceWorkerConstants } from "./constants";
export class ServiceWorkerError extends Error {
    constructor(message) {
        super(typeof message === 'string' ? message : message.message);
        this.type = "ServiceWorkerError";
    }
}
let navigatorUtils;
export function getNavigatorUtils() {
    return navigatorUtils;
}
export class NavigatorUtils {
    constructor(environment, spinner, popUp) {
        this.controllersChangeHandlers = [];
        this.webManifest = undefined;
        this.environment = environment;
        this.spinner = spinner;
        this.popUp = popUp;
        navigatorUtils = this;
    }
    getRegistrations(callback) {
        if (this.areServiceWorkersSupported())
            return navigator.serviceWorker.getRegistrations().then(registrations => {
                callback(undefined, registrations);
            }).catch(e => {
                callback(new ServiceWorkerError("Service Workers are not supported or are restricted by browser settings"));
            });
        if (this.areServiceWorkersEnabled())
            return callback(new ServiceWorkerError("Service Workers are not supported for this browser"));
        callback(undefined, []);
    }
    areServiceWorkersSupported() {
        return "serviceWorker" in navigator;
    }
    areServiceWorkersEnabled() {
        return this.environment.sw;
    }
    canUseServiceWorkers() {
        return this.areServiceWorkersEnabled() && this.areServiceWorkersSupported();
    }
    onServiceWorkerReady(name, registration, callback) {
        const { installing } = registration;
        if (installing) {
            installing.onerror = function (err) {
                console.error(err);
            };
            installing.addEventListener("statechange", (res) => {
                if (installing.state === "activated") {
                    callback(undefined, registration);
                }
                console.log("Sw state", installing.state);
            });
        }
        else {
            this.controllersChangeHandlers.push({
                swName: name,
                registration: registration,
                callback: callback
            });
        }
    }
    registerServiceWorker(options, callback) {
        const { scope } = options;
        const self = this;
        if (this.areServiceWorkersSupported()) {
            console.log("SW Register:", options.path, JSON.stringify(scope));
            navigator.serviceWorker
                .register(options.path, scope)
                .then((registration) => {
                if (registration.active) {
                    return callback(undefined, registration);
                }
                registration.onerror = function (err) {
                    console.error(`Service Worker Registration Failed`, err);
                };
                self.onServiceWorkerReady(options.name, registration, callback);
            }, (err) => {
                console.error(err);
            })
                .catch((err) => {
                console.error(err);
                return callback(new Error("Service worker registration failed."));
            });
        }
    }
    unregisterServiceWorker(sw, callback) {
        sw.unregister({ immediate: true }).then((success) => {
            if (!success) {
                console.log("Could not unregister sw ", sw);
                return callback(new Error("Could not unregister sw"));
            }
            callback();
        }).catch(callback);
    }
    getWebManifest(callback) {
        if (this.webManifest)
            return callback(undefined, this.webManifest);
        const self = this;
        fetch(LoaderConstants.MANIFEST_FILE)
            .then((response) => response.json())
            .then((manifest) => {
            self.webManifest = manifest;
            callback(undefined, manifest);
        })
            .catch((err) => {
            console.error(`Cannot load manifest file at ${LoaderConstants.MANIFEST_FILE}`, err);
            callback();
        });
    }
    clearServiceWorkerInScope(scope, callback) {
        if (this.areServiceWorkersSupported())
            navigator.serviceWorker.getRegistration(scope)
                .then((sw) => {
                if (!sw)
                    return callback(new Error(`No Service worker found for scope ${scope}`));
                if (scope === sw.scope) {
                    console.log(`Refreshing ServiceWorker for scope ${scope}`);
                    return this.unregisterServiceWorker(sw, callback);
                }
                else {
                    callback();
                }
            }).catch(callback);
    }
    sendMessage(message) {
        return new Promise(function (resolve, reject) {
            const messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = function (event) {
                if (event.data.error) {
                    reject(event.data.error);
                }
                else {
                    resolve(event.data);
                }
            };
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
            }
            else {
                navigator.serviceWorker.oncontrollerchange = function () {
                    if (navigator.serviceWorker.controller)
                        navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
                };
            }
        });
    }
    sendSeedToSW(seed, callback) {
        this.sendMessage({ seed: seed })
            .then((data) => callback(undefined, data))
            .catch(callback);
    }
    loadDistributedApp(seed, swConfig, callback) {
        const self = this;
        this.clearServiceWorkerInScope(swConfig.scope, (err, res) => {
            if (err)
                return callback(err);
            self.registerServiceWorker(swConfig, (err, sw) => {
                if (err)
                    return callback(err);
                self.sendSeedToSW(seed, (err) => {
                    callback(err ? new Error(`Failed initialization... ${err}`) : undefined);
                });
            });
        });
    }
    addServiceWorkerEventListener(eventType, listener, options) {
        if (this.canUseServiceWorkers())
            navigator.serviceWorker.addEventListener(eventType, listener, options);
    }
    canRegisterPWA() {
        return this.environment.pwa;
    }
    showNewContentAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.popUp.ask(`New Content Is available. Click ok to install!`))
                window.location.reload();
        });
    }
    registerPwaServiceWorker() {
        if (!this.canRegisterPWA())
            return console.log(`This application does not support Progressive Web Applications`);
        const self = this;
        this.getWebManifest((err, manifest) => {
            if (err || !manifest)
                return console.log(err || new Error(`Missing Manifest file. Skipping PWA installation`));
            const { scope } = manifest;
            const wb = new Workbox('./swPa.js', { scope: scope });
            wb.register().then((registration) => {
                if (!registration)
                    throw new Error(`Could not register Service Worker`);
                registration.addEventListener(ServiceWorkerConstants.EVENTS.UPDATE, () => {
                    console.log(ServiceWorkerConstants.EVENTS.UPDATE, {
                        installing: registration.installing,
                        active: registration.active,
                    });
                    const activeWorker = registration.active;
                    if (activeWorker) {
                        activeWorker.addEventListener(ServiceWorkerConstants.EVENTS.STATE_CHANGE, () => {
                            console.log("active statechange", activeWorker.state);
                            if (activeWorker.state === ServiceWorkerConstants.STATE.INSTALLED && navigator.serviceWorker.controller) {
                                self.showNewContentAvailable();
                            }
                        });
                    }
                });
            }).catch(err => {
                console.error(`Problem registering service worker`, err);
            });
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield wb.update();
                }
                catch (e) {
                    console.warn(`Errors from service worker:`, e);
                }
            }), 60 * 1000);
        });
    }
    unregisterAllServiceWorkers(callback) {
        const self = this;
        this.getRegistrations((err, registrations) => {
            if (err)
                return callback(err);
            if (!registrations.length)
                return callback();
            const unRegistrations = registrations.map((reg) => {
                return new Promise((resolve) => {
                    return self.unregisterServiceWorker(reg, resolve);
                });
            });
            return Promise.all(unRegistrations)
                .then(result => callback(undefined, result))
                .catch(callback);
        });
    }
}
//# sourceMappingURL=navigator.js.map