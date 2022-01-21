import { FileService } from "./FileService";
export class WalletService {
    constructor(config, environment, spinner, creationStrategy) {
        this.creationStrategy = undefined;
        this.creationStrategy = creationStrategy;
        this.config = config;
        this.environment = environment;
        this.spinner = spinner;
        this.fileService = new FileService();
    }
    getWalletTemplateContent(callback) {
        this.fileService.getFolderContentAsJSON(this.config.walletTemplateFolderName, (err, data) => {
            if (err)
                return callback(new Error("Failed to get content for " + this.config.walletTemplateFolderName));
            let content;
            try {
                content = JSON.parse(data);
            }
            catch (e) {
                return callback(new Error("Failed to parse content for " + this.config.walletTemplateFolderName));
            }
            callback(undefined, content);
        });
    }
    dirSummaryAsArray(walletTemplateContent) {
        let files = [];
        for (let directory in walletTemplateContent) {
            let directoryFiles = walletTemplateContent[directory];
            for (let fileName in directoryFiles)
                files.push({
                    path: directory + "/" + fileName,
                    content: directoryFiles[fileName]
                });
        }
        return files;
    }
    ;
    customizeDSU(dsu, files, prefix, callback) {
        const self = this;
        if (typeof prefix === "function") {
            callback = prefix;
            prefix = undefined;
        }
        if (files.length === 0) {
            return callback();
        }
        let file = files.pop();
        let targetPath = file.path;
        if (typeof prefix !== 'undefined') {
            targetPath = `${prefix}/${targetPath}`;
        }
        let fileContent;
        if (Array.isArray(file.content)) {
            let Buffer = require("buffer").Buffer;
            let arrayBuffer = new Uint8Array(file.content).buffer;
            let buffer = new Buffer(arrayBuffer.byteLength);
            let view = new Uint8Array(arrayBuffer);
            for (let i = 0; i < buffer.length; ++i) {
                buffer[i] = view[i];
            }
            fileContent = buffer;
        }
        else {
            fileContent = file.content;
        }
        dsu.writeFile(targetPath, fileContent, (err) => {
            if (err) {
                return callback(new Error(`Failed to write file in DSU at path ${targetPath}, ${err}`));
            }
            self.customizeDSU(dsu, files, prefix, callback);
        });
    }
    getListOfAppsForInstallation(callback) {
        const self = this;
        this.fileService.getFolderContentAsJSON(this.config.appsFolderName, function (err, data) {
            if (err)
                return callback(new Error(`Failed to get content for folder ${self.config.appsFolderName}, ${err}`));
            let apps;
            try {
                apps = JSON.parse(data);
            }
            catch (e) {
                return callback(new Error(`Failed to parse content for folder ${self.config.appsFolderName}, ${err}`));
            }
            callback(undefined, apps);
        });
    }
    getSSAppsFromInstallationURL(callback) {
        let url = new URL(window.location.href);
        let searchParams = url.searchParams;
        let apps = {};
        searchParams.forEach((paramValue, paramKey) => {
            if (paramKey === "appName") {
                let seedKey = paramValue + "Seed";
                let appSeed = searchParams.get(seedKey);
                if (appSeed)
                    apps[paramValue] = appSeed;
            }
        });
        if (Object.keys(apps))
            return callback(undefined, apps);
        callback();
    }
    buildApp(appName, seed, hasTemplate, callback) {
        if (typeof hasTemplate === "function") {
            callback = hasTemplate;
            hasTemplate = true;
        }
        const self = this;
        const instantiateNewDossier = (files) => {
            let resolver = require("opendsu").loadApi("resolver");
            let keyssi = require("opendsu").loadApi("keyssi");
            resolver.createDSU(keyssi.createTemplateSeedSSI(self.environment.vaultDomain, undefined, undefined, undefined, self.environment.vault), (err, appDSU) => {
                if (err)
                    return callback(new Error(`Failed to create DSU ${err}`));
                appDSU.mount('/' + self.config.codeFolderName, seed, (err) => {
                    if (err)
                        return callback(new Error(`Failed to mount in /code seedSSI ${seed}, ${err}`));
                    self.customizeDSU(appDSU, files, `/${self.config.appFolderName}`, (err) => {
                        if (err)
                            return callback(new Error(`Failed to customize DSU ${err}`));
                        return appDSU.writeFile("/environment.json", JSON.stringify(self.environment), (err) => {
                            if (err)
                                console.log("Could not write environment file into app", err);
                            appDSU.getKeySSIAsString(callback);
                        });
                    });
                });
            });
        };
        if (hasTemplate) {
            return self.fileService.getFolderContentAsJSON(`apps-patch/${appName}`, (err, data) => {
                let files;
                try {
                    files = JSON.parse(data);
                }
                catch (e) {
                    return callback(new Error("Failed to get content for folder" + `apps/${appName}` + err));
                }
                files = self.dirSummaryAsArray(files);
                instantiateNewDossier(files);
            });
        }
        instantiateNewDossier([]);
    }
    performInstallation(walletDSU, apps, appsList, callback) {
        if (!appsList.length) {
            return callback();
        }
        let appName = appsList.pop();
        const appInfo = apps[appName];
        if (appName[0] === '/')
            appName = appName.replace('/', '');
        const self = this;
        const mountApp = (newAppSeed) => {
            walletDSU.mount('/apps/' + appName, newAppSeed, (err) => {
                if (err)
                    return callback(new Error("Failed to mount in folder" + `/apps/${appName}: ${err}`));
                self.performInstallation(walletDSU, apps, appsList, callback);
            });
        };
        let hasTemplate = appInfo.hasTemplate;
        let newInstanceIsDemanded = appInfo.newInstance;
        if (newInstanceIsDemanded) {
            return self.buildApp(appName, appInfo.seed, hasTemplate, (err, newAppSeed) => {
                if (err)
                    return callback(new Error("Failed to build app " + `${appName}: ${err}`));
                mountApp(newAppSeed);
            });
        }
        mountApp(appInfo.seed);
    }
    installApplications(walletDSU, callback) {
        const self = this;
        self.getListOfAppsForInstallation((err, apps) => {
            let appsToBeInstalled = apps || {};
            self.getSSAppsFromInstallationURL((err, apps) => {
                let externalAppsList = Object.keys(apps);
                if (externalAppsList.length > 0) {
                    externalAppsList.forEach(appName => {
                        appsToBeInstalled[appName] = {
                            hasTemplate: false,
                            newInstance: false,
                            seed: apps[appName]
                        };
                    });
                    let landingApp = { name: externalAppsList[0] };
                    walletDSU.writeFile(`${self.config.appsFolderName}/.landingApp`, JSON.stringify(landingApp), () => {
                        console.log(`Written landingApp [${landingApp.name}]. `);
                    });
                }
            });
            const appsList = Object.keys(appsToBeInstalled);
            if (appsList.length === 0) {
                return callback();
            }
            console.log('Installing the following applications: ', appsToBeInstalled, appsList);
            self.performInstallation(walletDSU, appsToBeInstalled, appsList, callback);
        });
    }
    install(wallet, files, callback) {
        const self = this;
        files = this.dirSummaryAsArray(files);
        this.customizeDSU(wallet, files, `/${this.config.appFolderName}`, (err) => {
            if (err)
                return callback(new Error(`Failed to customize DSU: ${err}`));
            self.installApplications(wallet, callback);
        });
    }
    create(credentials, callback) {
        if (this.creationStrategy)
            return this.creationStrategy(this.environment.vaultDomain, credentials, this.spinner, (err, ...results) => {
                if (err)
                    console.error(`Wallet creation strategy failed:`, err);
                callback(err, ...results);
            });
        const resolver = require("opendsu").loadApi("resolver");
        const keySSISpace = require("opendsu").loadApi("keyssi");
        const { vaultDomain, vault } = this.environment;
        const self = this;
        const build = function () {
            const { walletTemplateFolderName, ssiFileName } = self.config;
            self.fileService.getFile(walletTemplateFolderName + "/" + ssiFileName, (err, dsuType) => {
                if (err)
                    return callback(err);
                resolver.createDSU(keySSISpace.createTemplateWalletSSI(vaultDomain, credentials, vault), { useSSIAsIdentifier: true, dsuTypeSSI: dsuType, walletKeySSI: self.config.walletKeySSI }, (err, walletDSU) => {
                    if (err)
                        return callback(err);
                    walletDSU = walletDSU.getWritableDSU();
                    self.getWalletTemplateContent((err, files) => {
                        if (err)
                            return callback(err);
                        files['/'][self.config.ssiFileName] = undefined;
                        delete files['/'][self.config.ssiFileName];
                        if (!self.config.walletKeySSI) {
                            self.install(walletDSU, files, (err) => {
                                if (err)
                                    return callback(new Error(`Failed to install: ${err}`));
                                return walletDSU.writeFile("/environment.json", JSON.stringify(self.environment), (err) => {
                                    if (err)
                                        return callback(new Error("Could not write Environment file into wallet."));
                                    callback(undefined, walletDSU);
                                });
                            });
                        }
                        else {
                            callback(undefined, walletDSU);
                        }
                    });
                });
            });
        };
        resolver.loadDSU(keySSISpace.createTemplateWalletSSI(vaultDomain, credentials, vault), (err, walletDSU) => {
            if (err) {
                build();
            }
            else {
                console.log("Possible security issue. It is ok during development if you use the same credentials. Just do a npm run clean to remove APIHub cache in this case...");
                walletDSU = walletDSU.getWritableDSU();
                callback(err, walletDSU);
            }
        });
    }
    load(credentials, callback) {
        const resolver = require("opendsu").loadApi("resolver");
        const keyssi = require("opendsu").loadApi("keyssi");
        const { vaultDomain, vault } = this.environment;
        const walletSSI = keyssi.createTemplateWalletSSI(vaultDomain, credentials, vault);
        resolver.loadDSU(walletSSI, (err, constDSU) => {
            if (err) {
                console.error(err);
                return callback(new Error("Failed to load wallet"));
            }
            callback(undefined, constDSU.getWritableDSU());
        });
    }
    retrieve() {
    }
    changePassword() {
    }
}
//# sourceMappingURL=wallet.js.map