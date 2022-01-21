import { Callback, EnvironmentDefinition } from "../types";
import { PopUp, Spinner } from "../ui";
export declare type SWRegistrationOptions = {
    scope: any;
    path: string;
    name: string;
};
export declare type SWControllerData = {
    swName: string;
    registration: ServiceWorkerRegistration;
    callback: Callback;
};
export declare class ServiceWorkerError extends Error {
    type: string;
    constructor(message: string | Error);
}
export declare function getNavigatorUtils(): NavigatorUtils;
export declare class NavigatorUtils {
    private controllersChangeHandlers;
    private webManifest?;
    private readonly environment;
    private readonly spinner;
    private readonly popUp;
    constructor(environment: EnvironmentDefinition, spinner: Spinner, popUp: PopUp);
    getRegistrations(callback: Callback): void | Promise<void>;
    areServiceWorkersSupported(): boolean;
    areServiceWorkersEnabled(): boolean;
    canUseServiceWorkers(): boolean;
    onServiceWorkerReady(name: string, registration: ServiceWorkerRegistration, callback: Callback): void;
    registerServiceWorker(options: SWRegistrationOptions, callback: Callback): void;
    unregisterServiceWorker(sw: ServiceWorkerRegistration, callback: Callback): void;
    getWebManifest(callback: Callback): void;
    clearServiceWorkerInScope(scope: string, callback: Callback): void;
    sendMessage(message: any): Promise<unknown>;
    private sendSeedToSW;
    loadDistributedApp(seed: string, swConfig: SWRegistrationOptions, callback: Callback): void;
    addServiceWorkerEventListener(eventType: string, listener: EventListener, options?: AddEventListenerOptions): void;
    private canRegisterPWA;
    private showNewContentAvailable;
    registerPwaServiceWorker(): void;
    unregisterAllServiceWorkers(callback: Callback): void;
}
//# sourceMappingURL=navigator.d.ts.map