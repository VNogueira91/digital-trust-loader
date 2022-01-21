export class EventMiddleWare {
    constructor(iframe, identity) {
        this.queriesHandlers = {};
        this.statusesHandlers = {};
        this.identity = identity;
        this.iframe = iframe;
        window.document.addEventListener(this.identity, this.handleEvent.bind(this));
    }
    handleEvent(event) {
        const data = event.detail || {};
        if (typeof data.query === "string") {
            if (!this.queriesHandlers[data.query]) {
                console.error(`Error: Query [${data.query} could not be resolved. Did you added registered a handler for it?]`);
                return;
            }
            let handlerResponse = this.queriesHandlers[data.query](data);
            if (!(handlerResponse instanceof Promise))
                handlerResponse = Promise.resolve(handlerResponse);
            return handlerResponse.then((responseData) => {
                const w = this.iframe.contentWindow;
                if (!w)
                    throw new Error(`Could not finds IFrame's content window to bind identity ${responseData}`);
                w.document.dispatchEvent(new CustomEvent(this.identity, {
                    detail: responseData
                }));
            });
        }
        if (typeof data.status === "string") {
            if (!this.statusesHandlers[data.status]) {
                console.error(`Error: Status [${data.status} could not be resolved. Did you added registered a handler for it?]`);
                return;
            }
            return this.statusesHandlers[data.status](data);
        }
    }
    registerQuery(query, handler) {
        if (typeof handler !== "function")
            throw new Error("[EventMiddleware.reqisterQuery] Handler is not a function");
        this.queriesHandlers[query] = handler;
    }
    ;
    unregisterQuery(query) {
        if (this.queriesHandlers[query])
            delete this.queriesHandlers[query];
    }
    ;
    onStatus(status, handler) {
        if (typeof handler !== "function")
            throw new Error("[EventMiddleware.onStatus] Handler is not a function");
        this.statusesHandlers[status] = handler;
    }
    ;
    offStatus(status) {
        if (this.statusesHandlers[status])
            delete this.statusesHandlers[status];
    }
    ;
}
//# sourceMappingURL=EventMiddleware.js.map