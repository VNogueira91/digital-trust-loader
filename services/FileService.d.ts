import { Callback } from "../types";
export declare class FileService {
    constructUrlBase(prefix?: string): string;
    createRequest(url: string, method: string, callback: Callback): XMLHttpRequest;
    getFile(url: string, callback: Callback): void;
    getFolderContentAsJSON(url: string, callback: Callback): void;
}
//# sourceMappingURL=FileService.d.ts.map