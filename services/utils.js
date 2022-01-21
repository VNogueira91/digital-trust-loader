import { LoaderMode } from "../types";
import { LoaderConstants } from "./constants";
export function encrypt(key, dataObj) {
    try {
        const crypto = require('opendsu').loadApi('crypto');
        const encryptionKey = crypto.deriveEncryptionKey(key);
        const encryptedCredentials = crypto.encrypt(JSON.stringify(dataObj), encryptionKey);
        return JSON.stringify(encryptedCredentials);
    }
    catch (e) {
        throw e;
    }
}
export function decrypt(key, dataObj) {
    try {
        const crypto = require('opendsu').loadApi('crypto');
        const encryptionKey = crypto.deriveEncryptionKey(key);
        const decryptData = crypto.decrypt($$.Buffer.from(JSON.parse(dataObj)), encryptionKey);
        return JSON.parse(decryptData.toString());
    }
    catch (e) {
        throw e;
    }
}
export function generateRandom(charactersSet, length) {
    let result = '';
    const charactersLength = charactersSet.length;
    for (let i = 0; i < length; i++)
        result += charactersSet.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function getSecretLocalToken(storage, development, mobile, storageKey) {
    if (mobile)
        return "SuperUserSecurePassword1!";
    if (typeof storageKey === "undefined")
        storageKey = "secretToken";
    if (development)
        return generateRandom(characters, 32);
    let secret = storage.getItem(storageKey);
    if (!secret) {
        secret = generateRandom(characters, 32);
        storage.setItem(storageKey, secret);
    }
    return secret;
}
export function runInAutoLogin(credentials, config, storage, credentialsManager, walletService, development, mobile, callback) {
    credentials = [getSecretLocalToken(storage, development, mobile)];
    walletService.create(credentials, (err, wallet) => {
        if (err)
            return callback(err);
        if (!development)
            credentialsManager.saveCredentials(config.defaultPin, credentials);
        wallet.writeFile(LoaderConstants.USER_DETAILS_FILE, JSON.stringify(credentials), (err) => {
            if (err)
                return callback(err);
            console.log("A new wallet got initialised...", wallet.getCreationSSI(true));
            callback();
        });
    });
}
export function getLoginByMode(environment, config, credentialsManager, storage) {
    switch (environment.mode) {
        case LoaderMode.EXTERNAL_AUTO:
            return (credentials, walletService, spinner, callback) => {
                try {
                    if (!config.defaultPin)
                        return callback(new Error(`Missing a default pin`));
                    credentials = Object.values(credentialsManager.loadCredentials(config.defaultPin));
                }
                catch (e) {
                    return callback(e);
                }
                walletService.create(credentials, (err, wallet) => {
                    if (err)
                        return callback(err);
                    console.log("A new wallet got initialised...", wallet.getCreationSSI(true));
                    callback(undefined, wallet);
                });
            };
        case LoaderMode.DEV_AUTO:
            return (credentials, walletService, spinner, callback) => {
                runInAutoLogin(credentials, config, storage, credentialsManager, walletService, true, false, callback);
            };
        case LoaderMode.MOBILE_AUTO:
            return (credentials, walletService, spinner, callback) => {
                runInAutoLogin(credentials, config, storage, credentialsManager, walletService, false, true, callback);
            };
        case LoaderMode.AUTO:
            return (credentials, walletService, spinner, callback) => {
                runInAutoLogin(credentials, config, storage, credentialsManager, walletService, false, false, callback);
            };
        case LoaderMode.DEV_SECURE:
        case LoaderMode.SECURE:
        default:
            return undefined;
    }
}
//# sourceMappingURL=utils.js.map