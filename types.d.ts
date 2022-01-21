import { Spinner } from "./ui";
import { WalletService } from "./services";
export declare type LoaderConfig = {
    defaultPin?: string;
    codeFolderName?: string;
    walletTemplateFolderName?: string;
    appFolderName: string;
    appsFolderName: string;
    ssiFileName: string;
    walletKeySSI?: string;
};
export declare type Err = Error | undefined;
export declare type ErrCallback = (err: Err) => void;
export declare type Callback = (err?: Err, ...args: any[]) => void;
export declare enum LoaderMode {
    DEV_AUTO = "dev-autologin",
    AUTO = "autologin",
    EXTERNAL_AUTO = "external-autologin",
    MOBILE_AUTO = "mobile-autologin",
    SECURE = "secure",
    DEV_SECURE = "dev-secure"
}
export declare enum LoaderSystem {
    iOS = "iOS",
    ANDROID = "Android",
    ANY = "any"
}
export declare enum LoaderBrowser {
    CHROME = "Chrome",
    FIREFOX = "Firefox",
    ANY = "any"
}
export declare enum LoaderStage {
    DEVELOPMENT = "development",
    RELEASE = "release"
}
export declare enum LoaderVault {
    SERVER = "server",
    BROWSER = "browser"
}
export declare enum LoaderAgent {
    MOBILE = "mobile",
    BROWSER = "browser"
}
export declare enum EnclaveTypes {
    WALLET = "WalletDBEnclave"
}
export declare type EnvironmentDefinition = {
    appName: string;
    vault: LoaderVault;
    agent: LoaderAgent;
    system: LoaderSystem;
    browser: LoaderBrowser;
    mode: LoaderMode;
    vaultDomain: string;
    didDomain: string;
    enclaveType: string;
    stage: LoaderStage;
    sw: boolean;
    pwa: boolean;
    allowPinLogin: boolean;
};
export declare type WalletCreationStrategy = (domain: string, credentials: string[], spinner: Spinner, callback: Callback) => void;
export declare type WalletLoginStrategy = (credentials: string[] | undefined, walletService: WalletService, spinner: Spinner, callback: Callback) => void;
export interface OpenDSULoader {
    create(credentials: string[], callback: Callback): void;
    load(credentials: string[], callback: Callback): void;
}
//# sourceMappingURL=types.d.ts.map