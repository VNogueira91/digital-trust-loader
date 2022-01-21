import { LoaderStorage } from "./storage";
export declare class CredentialsManager {
    private readonly appName;
    private readonly storage;
    constructor(appName: string, storage?: LoaderStorage);
    private getCredentialsKey;
    private getPinCodeKey;
    saveCredentials(pinCode: string, credentials: string[]): void;
    savePinCode(pinCode: string, credentials: any): void;
    private addPin;
    private removePin;
    private loadPinCodeCredentials;
    private changePinCode;
    private hasPinCodes;
    private getLastPinCode;
    private pinCodeExists;
    loadCredentials(defaultPin: string): {};
    private clearCredentials;
}
//# sourceMappingURL=credentials.d.ts.map