import { decrypt, encrypt } from "./utils";
import { LoaderLocalStorage } from "./storage";
import { StorageKeys } from "./constants";
export class CredentialsManager {
    constructor(appName, storage) {
        this.appName = appName;
        this.storage = storage || new LoaderLocalStorage();
    }
    getCredentialsKey() {
        return this.appName + StorageKeys.CREDENTIALS;
    }
    getPinCodeKey() {
        return this.appName + StorageKeys.PINCODE;
    }
    saveCredentials(pinCode, credentials) {
        const encryptedCredentials = encrypt(pinCode, credentials);
        this.storage.setItem(this.getCredentialsKey(), encryptedCredentials);
    }
    savePinCode(pinCode, credentials) {
        const encryptedCredentials = encrypt(pinCode, credentials);
        this.storage.setItem(pinCode, encryptedCredentials);
        this.addPin(pinCode);
    }
    addPin(pinCode) {
        let pinArr = this.storage.getItem(this.getPinCodeKey());
        if (!pinArr) {
            pinArr = [pinCode];
        }
        else {
            pinArr = JSON.parse(pinArr);
            pinArr.push(pinCode);
        }
        this.storage.setItem(this.getPinCodeKey(), JSON.stringify(pinArr));
    }
    removePin(pinCode) {
        let pinArr = this.storage.getItem(this.getPinCodeKey());
        if (pinArr) {
            pinArr = JSON.parse(pinArr);
            pinArr = pinArr.filter((elem) => elem !== pinCode);
            this.storage.setItem(this.getPinCodeKey(), JSON.stringify(pinArr));
        }
        else {
            throw new Error("No pin found");
        }
    }
    loadPinCodeCredentials(pinCode) {
        let pinCodeCredentials = this.storage.getItem(pinCode);
        if (!pinCodeCredentials) {
            pinCodeCredentials = {};
        }
        else {
            pinCodeCredentials = decrypt(pinCode, pinCodeCredentials);
        }
        return pinCodeCredentials;
    }
    changePinCode(newPin, oldPin) {
        const pinCredentials = this.storage.getItem(oldPin);
        if (!pinCredentials)
            throw new Error("Could not find a stored pin");
        this.storage.setItem(newPin, pinCredentials);
        this.storage.removeItem(oldPin);
    }
    hasPinCodes() {
        return !!this.storage.getItem(this.getPinCodeKey());
    }
    getLastPinCode() {
        let pinArr = this.storage.getItem(this.getPinCodeKey());
        if (!pinArr) {
            return;
        }
        else {
            const arr = JSON.parse(pinArr);
            return arr[arr.length - 1];
        }
    }
    pinCodeExists(pinCode) {
        let pinArr = this.storage.getItem(this.getPinCodeKey());
        if (!pinArr) {
            return false;
        }
        else {
            return pinArr.indexOf(pinCode) >= 0;
        }
    }
    loadCredentials(defaultPin) {
        let knownCredentials = this.storage.getItem(this.getCredentialsKey());
        if (!knownCredentials)
            return {};
        else
            return decrypt(defaultPin, knownCredentials);
    }
    clearCredentials() {
        this.storage.removeItem(this.getCredentialsKey());
    }
}
//# sourceMappingURL=credentials.js.map