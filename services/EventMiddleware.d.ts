export declare class EventMiddleWare {
    private readonly identity;
    private readonly iframe;
    private readonly queriesHandlers;
    private readonly statusesHandlers;
    constructor(iframe: HTMLIFrameElement, identity: string);
    handleEvent(event: any): any;
    registerQuery(query: string, handler: (event: any) => void): void;
    unregisterQuery(query: string): void;
    onStatus(status: string, handler: (event: any) => void): void;
    offStatus(status: string): void;
}
//# sourceMappingURL=EventMiddleware.d.ts.map