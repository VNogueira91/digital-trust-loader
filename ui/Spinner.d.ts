export interface Spinner {
    isVisible(): boolean;
    show(message: string, options?: {}): Promise<void>;
    update(message: string): Promise<void>;
    remove(): Promise<void>;
}
export declare class LogSpinner implements Spinner {
    private visibility;
    isVisible(): boolean;
    remove(): Promise<void>;
    show(message: string, options?: {}): Promise<void>;
    update(message: string): Promise<void>;
}
//# sourceMappingURL=Spinner.d.ts.map