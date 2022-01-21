import { Callback, EnvironmentDefinition, LoaderConfig, WalletCreationStrategy } from "../types";
import { Spinner } from "../ui";
export declare class WalletService {
    private readonly creationStrategy?;
    private readonly config;
    private readonly environment;
    private readonly spinner;
    private readonly fileService;
    constructor(config: LoaderConfig, environment: EnvironmentDefinition, spinner: Spinner, creationStrategy?: WalletCreationStrategy);
    private getWalletTemplateContent;
    private dirSummaryAsArray;
    private customizeDSU;
    private getListOfAppsForInstallation;
    private getSSAppsFromInstallationURL;
    private buildApp;
    private performInstallation;
    private installApplications;
    private install;
    create(credentials: string[], callback: Callback): void;
    load(credentials: string[], callback: Callback): void;
    retrieve(): void;
    changePassword(): void;
}
//# sourceMappingURL=wallet.d.ts.map