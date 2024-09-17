import { EmbededPurchaseOptions, EmbededInitializeOptions, EmbededRefundOptions, EmbededReverseOptions, EmbededReconcileOptions, EmbededSessionOptions, EmbededGetTransactionsListOptions, EmbededGetTransactionOptions, EmbededGetReconciliationsListOptions, EmbededGetReconciliationOptions } from '../definitions';
import { ReconciliationBannerList, ReconciliationReceipt, TransactionBannerList, TransactionData } from '@nearpaydev/nearpay-ts-sdk';
export declare class EmbededNearpay {
    private savedOptions;
    proxy: NearpayProxy;
    constructor(options: EmbededInitializeOptions);
    initialize(options: EmbededInitializeOptions): Promise<void>;
    purchase(options: EmbededPurchaseOptions): Promise<TransactionData>;
    refund(options: EmbededRefundOptions): Promise<TransactionData>;
    reverse(options: EmbededReverseOptions): Promise<TransactionData>;
    reconcile(options: EmbededReconcileOptions): Promise<[ReconciliationReceipt]>;
    session(options: EmbededSessionOptions): Promise<void>;
    logout(): Promise<void>;
    getTransactionsList(options: EmbededGetTransactionsListOptions): Promise<TransactionBannerList>;
    getTransaction(options: EmbededGetTransactionOptions): Promise<TransactionData>;
    getReconciliationsList(options: EmbededGetReconciliationsListOptions): Promise<ReconciliationBannerList>;
    getReconciliation(options: EmbededGetReconciliationOptions): Promise<ReconciliationReceipt>;
    private callMethod;
}
declare class NearpayProxy {
    private embededNearpay;
    constructor(embededNearpay: EmbededNearpay);
    showConnection(): Promise<any>;
    disconnect(): Promise<any>;
    protected callMethod(name: string, options: any): Promise<any>;
}
export {};
//# sourceMappingURL=embeded_nearpay.d.ts.map