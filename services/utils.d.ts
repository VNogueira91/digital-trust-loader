import { Callback, EnvironmentDefinition, LoaderConfig, WalletLoginStrategy } from "../types";
import { CredentialsManager } from "./credentials";
import { WalletService } from "./wallet";
import { LoaderStorage } from "./storage";
export declare function encrypt(key: string, dataObj: {}): string;
export declare function decrypt(key: string, dataObj: string): any;
export declare function generateRandom(charactersSet: string, length: number): string;
export declare function runInAutoLogin(credentials: string[] | undefined, config: LoaderConfig, storage: LoaderStorage, credentialsManager: CredentialsManager, walletService: WalletService, development: boolean, mobile: boolean, callback: Callback): void;
export declare function getLoginByMode(environment: EnvironmentDefinition, config: LoaderConfig, credentialsManager: CredentialsManager, storage: LoaderStorage): WalletLoginStrategy | undefined;
//# sourceMappingURL=utils.d.ts.map