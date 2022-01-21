export interface LoaderStorage {
    setItem(key: string, item: any): void;
    getItem(key: string): any;
    removeItem(key: string): void;
}
export declare class LoaderLocalStorage implements LoaderStorage {
    setItem(key: string, item: any): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
}
//# sourceMappingURL=storage.d.ts.map