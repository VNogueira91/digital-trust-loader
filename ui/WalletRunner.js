var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { IFRAME_DEFS } from "./constants";
import { ServiceWorkerError } from "../services";
import { EventMiddleWare } from "../services/EventMiddleware";
import { ServiceWorkerConstants, StorageKeys } from "../services/constants";
export class WalletRunner {
    constructor(seed, storage, spinner, popUp) {
        this.seed = seed;
        this.crypto = require('opendsu').loadApi('crypto');
        this.hash = this.crypto.sha256(this.seed);
        this.spinner = spinner;
        this.popUp = popUp;
        this.storage = storage;
    }
    getIframeBase() {
        let iPath = window.location.pathname;
        return iPath.split("loader/")[0] + "loader/iframe/";
    }
    createTimerElement() {
        const script = document.createElement('script');
        script.src = './Timer.js';
        return script;
    }
    createContainerIFrame(useSeedForIFrameSource) {
        const iframe = document.createElement('iframe');
        Object.entries(IFRAME_DEFS.ATTRIBUTES).forEach(([key, value]) => iframe.setAttribute(key, value));
        Object.entries(IFRAME_DEFS.STYLE).forEach(([key, value]) => iframe.style[key] = value);
        iframe.src = window.location.origin + this.getIframeBase() + (useSeedForIFrameSource ? this.seed : this.hash);
        return iframe;
    }
    removeElementsFromUI(iframe, removeSpinner, removeIFrame, removeRest) {
        if (removeIFrame && removeSpinner && removeRest) {
            document.body.innerHTML = '';
            return;
        }
        if (removeIFrame)
            iframe.remove();
        if (removeSpinner)
            this.spinner.remove();
        if (removeRest)
            try {
                document.querySelectorAll("body > *:not(iframe):not(.loader-parent-container)")
                    .forEach((node) => node.remove());
            }
            catch (e) {
            }
    }
    setupLoadEventsListener(navigatorUtils, iframe) {
        const eventMiddleware = new EventMiddleWare(iframe, this.hash);
        const self = this;
        eventMiddleware.registerQuery(ServiceWorkerConstants.QUERIES.SEED, () => {
            return { seed: self.seed };
        });
        eventMiddleware.onStatus(ServiceWorkerConstants.STATE.COMPLETED, () => {
            if (iframe.hasAttribute("app-placeholder")) {
                self.removeElementsFromUI(iframe, true, false, false);
                iframe.removeAttribute("app-placeholder");
                document.body.prepend(iframe);
                return;
            }
            self.removeElementsFromUI(iframe, false, true, false);
            iframe.hidden = false;
        });
        eventMiddleware.onStatus(ServiceWorkerConstants.STATE.SIGN_OUT, (data) => {
            navigatorUtils.unregisterAllServiceWorkers((err) => {
                if (data.deleteSeed)
                    self.storage.removeItem(StorageKeys.SEED_CAGE);
                window.location.reload();
            });
        });
        eventMiddleware.onStatus(ServiceWorkerConstants.STATE.ERROR, () => {
            throw new ServiceWorkerError(`Unable to load application`);
        });
        iframe.hidden = true;
    }
    sendCompletedEvent(iframe) {
        const iframeDocument = iframe.contentDocument || (iframe.contentWindow ? iframe.contentWindow.document : undefined);
        if (!iframeDocument)
            throw new ServiceWorkerError(`Could not find Iframe document`);
        if (iframeDocument.readyState !== ServiceWorkerConstants.STATE.COMPLETE) {
            console.log('Event "completed" can be emitted only when iframe is loaded!');
            return;
        }
        const iframeIdentity = iframe.getAttribute('identity');
        if (!iframeIdentity) {
            console.log('Event "completed" can not be emitted if no identity was found!');
            return;
        }
        const completedEvent = new CustomEvent(iframeIdentity, { detail: { status: ServiceWorkerConstants.STATE.COMPLETED } });
        document.dispatchEvent(completedEvent);
    }
    setupSeedRequestListener(navigatorUtils) {
        navigatorUtils.addServiceWorkerEventListener(ServiceWorkerConstants.EVENTS.MESSAGE, (e) => {
            if (!e.data || e.data.query !== "seed") {
                return;
            }
            const swWorkerIdentity = e.data.identity;
            if (swWorkerIdentity === this.hash) {
                e.source.postMessage({
                    seed: this.seed,
                });
            }
        });
    }
    setupProgressListener() {
        document.addEventListener(ServiceWorkerConstants.EVENTS.PROGRESS, (e) => __awaiter(this, void 0, void 0, function* () {
            const { progress, status } = e.detail;
            if (progress === 100) {
                yield this.spinner.remove();
                return;
            }
            if (this.spinner.isVisible())
                yield this.spinner.update(status);
            else
                yield this.spinner.show(status);
        }));
    }
    run(navigatorUtils) {
        return __awaiter(this, void 0, void 0, function* () {
            if (navigatorUtils.areServiceWorkersEnabled() && !navigatorUtils.areServiceWorkersSupported())
                return this.popUp.ask(`Your current browser doe's support this application`);
            const iframe = this.createContainerIFrame(!navigatorUtils.areServiceWorkersEnabled());
            this.setupLoadEventsListener(navigatorUtils, iframe);
            const self = this;
            if (navigatorUtils.areServiceWorkersEnabled()) {
                let loadingInterval, loadingProgress = 10;
                yield this.spinner.show(`Loading Application`);
                iframe.addEventListener(ServiceWorkerConstants.EVENTS.LOAD, () => {
                    self.sendCompletedEvent(iframe);
                });
                document.appendChild(iframe);
                const timer = this.createTimerElement();
                document.appendChild(timer);
                navigatorUtils.registerPwaServiceWorker();
                return;
            }
            this.setupSeedRequestListener(navigatorUtils);
            this.setupProgressListener();
            navigatorUtils.unregisterAllServiceWorkers(() => {
                navigatorUtils.registerServiceWorker({
                    name: "swLoader.js",
                    path: "swLoader.js",
                    scope: self.getIframeBase()
                }, (err) => {
                    if (err)
                        throw err;
                    iframe.addEventListener(ServiceWorkerConstants.EVENTS.LOAD, () => {
                        navigatorUtils.registerPwaServiceWorker();
                        self.sendCompletedEvent(iframe);
                    });
                    document.body.appendChild(iframe);
                });
            });
        });
    }
}
//# sourceMappingURL=WalletRunner.js.map