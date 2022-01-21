export class LogSpinner {
    constructor() {
        this.visibility = false;
    }
    isVisible() {
        return this.visibility;
    }
    remove() {
        this.visibility = false;
        return Promise.resolve(undefined);
    }
    show(message, options) {
        this.visibility = true;
        console.log(`{SPINNER]: ${message}`);
        return Promise.resolve(undefined);
    }
    update(message) {
        console.log(`{SPINNER]: ${message}`);
        return Promise.resolve(undefined);
    }
}
//# sourceMappingURL=Spinner.js.map