export var LoaderConstants;
(function (LoaderConstants) {
    LoaderConstants["CONFIG_FILE"] = "./loader-config.json";
    LoaderConstants["MANIFEST_FILE"] = "./manifest.webmanifest";
    LoaderConstants["USER_DETAILS_FILE"] = "user-details.json";
})(LoaderConstants || (LoaderConstants = {}));
export const ServiceWorkerConstants = {
    QUERIES: {
        SEED: "seed"
    },
    EVENTS: {
        UPDATE: "updatefound",
        STATE_CHANGE: "statechange",
        LOAD: "load",
        MESSAGE: "message",
        PROGRESS: "ssapp:loading:progress"
    },
    STATE: {
        INSTALLED: "installed",
        COMPLETED: "completed",
        SIGN_OUT: "sign-out",
        ERROR: "error",
        COMPLETE: "complete"
    }
};
export var StorageKeys;
(function (StorageKeys) {
    StorageKeys["CREDENTIALS"] = "-credentials";
    StorageKeys["PINCODE"] = "-pincode";
    StorageKeys["SEED_CAGE"] = "seedCage";
})(StorageKeys || (StorageKeys = {}));
//# sourceMappingURL=constants.js.map