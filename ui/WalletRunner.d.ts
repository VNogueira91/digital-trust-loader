import { Spinner } from "./Spinner";
import { LoaderStorage, NavigatorUtils } from "../services";
import { PopUp } from "./Popup";
export declare class WalletRunner {
    private crypto;
    private seed;
    private hash;
    private spinner;
    private popUp;
    private storage;
    constructor(seed: string, storage: LoaderStorage, spinner: Spinner, popUp: PopUp);
    private getIframeBase;
    private createTimerElement;
    private createContainerIFrame;
    private removeElementsFromUI;
    private setupLoadEventsListener;
    private sendCompletedEvent;
    private setupSeedRequestListener;
    private setupProgressListener;
    run(navigatorUtils: NavigatorUtils): Promise<boolean | undefined>;
}
//# sourceMappingURL=WalletRunner.d.ts.map