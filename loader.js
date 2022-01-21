import { LoaderLocalStorage, CredentialsManager, WalletService, NavigatorUtils } from "./services";
import { DefaultPopUp, LogSpinner } from "./ui";
export const DefaultLoaderConfig = {
    defaultPin: "0000",
    codeFolderName: "code",
    walletTemplateFolderName: "wallet-patch",
    appFolderName: "app",
    appsFolderName: "apps-patch",
    ssiFileName: "seed"
};
export class Loader {
    constructor(config, environment, creationStrategy, storage = new LoaderLocalStorage(), spinner = new LogSpinner(), popUp = new DefaultPopUp()) {
        this.config = Object.assign({}, DefaultLoaderConfig, config);
        this.environment = environment;
        this.strategy = creationStrategy;
        this.spinner = spinner;
        this.popUp = popUp;
        this.credentialsManager = new CredentialsManager(environment.appName, storage);
        try {
            let config = require("opendsu").loadApi("config");
            config.autoconfigFromEnvironment(environment);
        }
        catch (e) {
            throw new Error(`Could not load OpenDSU framework due to ${e}`);
        }
        this.navigatorUtils = new NavigatorUtils(environment, spinner, popUp);
        this.walletService = new WalletService(config, this.environment, this.spinner, creationStrategy);
    }
    create(credentials, callback) {
        this.walletService.create(credentials, callback);
    }
    load(credentials, callback) {
        const self = this;
        this.navigatorUtils.unregisterAllServiceWorkers((err) => {
            if (err)
                return callback(err);
            self.walletService.load(credentials, callback);
        });
    }
}
//# sourceMappingURL=loader.js.map