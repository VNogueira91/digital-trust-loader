import { Callback, EnvironmentDefinition, LoaderConfig, OpenDSULoader, WalletCreationStrategy } from "./types";
import { LoaderStorage } from "./services";
import { PopUp, Spinner } from "./ui";
export declare const DefaultLoaderConfig: LoaderConfig;
export declare class Loader implements OpenDSULoader {
    private readonly environment;
    private readonly strategy?;
    private readonly spinner;
    private readonly credentialsManager;
    private readonly config;
    private readonly popUp;
    private walletService;
    private navigatorUtils;
    constructor(config: LoaderConfig, environment: EnvironmentDefinition, creationStrategy?: WalletCreationStrategy, storage?: LoaderStorage, spinner?: Spinner, popUp?: PopUp);
    create(credentials: string[], callback: Callback): void;
    load(credentials: string[], callback: Callback): void;
}
//# sourceMappingURL=loader.d.ts.map