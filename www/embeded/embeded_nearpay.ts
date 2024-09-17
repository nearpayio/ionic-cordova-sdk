/// <reference types="cordova" />

import {
  NearpayPluginDefenetions,
  EmbededPurchaseOptions,
  EmbededInitializeOptions,
  EmbededRefundOptions,
  EmbededReverseOptions,
  EmbededReconcileOptions,
  EmbededSessionOptions,
  EmbededGetTransactionsListOptions,
  EmbededGetTransactionOptions,
  EmbededGetReconciliationsListOptions,
  EmbededGetReconciliationOptions,
} from '../definitions';
import { ApiResponse } from '../models/api_response';
import {
  PurchaseErrorMap,
  QueryErrorMap,
  ReconcileErrorMap,
  RefundErrorMap,
  ReverseErrorMap,
  SessionErrorMap,
} from '../models/error_status_map';
import {
  ReconciliationBannerList,
  ReconciliationReceipt,
  TransactionBannerList,
  TransactionData,
} from '@nearpaydev/nearpay-ts-sdk';
declare const cordova: Cordova;
// import { exec } from 'cordova/exec';
// declare var cordova: any;

export class EmbededNearpay {
  private savedOptions: EmbededInitializeOptions;
  public proxy = new NearpayProxy(this);

  constructor(options: EmbededInitializeOptions) {
    this.savedOptions = options;
    this.initialize(options);
  }

  async initialize(options: EmbededInitializeOptions) {

    const data = {
      authtype: options.authtype,
      authvalue: options.authvalue,
      environment: options.environment,
      locale: options.locale,
      network_configuration: options.networkConfig,
      ui_position: options.uiPosition,
      loading_ui: options.loadingUi,
      arabic_payment_text: options.arabicPaymentText,
      english_payment_text: options.englishPaymentText,
    };
    await this.callMethod('initialize', data);
  }

  async purchase(options: EmbededPurchaseOptions): Promise<TransactionData> {
    const data = {
      amount: options.amount,
      customer_reference_number: options.customerReferenceNumber || '',
      finishTimeout: options.finishTimeout || 60,
      enableReversal: options.enableReversalUi || true,
      enableReceiptUi: options.enableReceiptUi || true,
      enableUiDismiss: options.enableUiDismiss || true,
      job_id: options.transactionID,
    };

    const res = await this.callMethod('purchase', data);
    const response = JSON.parse(res);
    return response.result;
  }

  async refund(options: EmbededRefundOptions): Promise<TransactionData> {
    const data = {
      amount: options.amount,
      original_transaction_uuid: options.originalTransactionUUID,
      job_id: options.transactionID,
      customer_reference_number: options.customerReferenceNumber,
      finishTimeout: options.finishTimeout,
      enableReversal: options.enableReversalUi,
      enableReceiptUi: options.enableReceiptUi,
      enableUiDismiss: options.enableUiDismiss,
      enableEditableRefundAmountUi: options.editableRefundAmountUI,
      ...(options.adminPin !== undefined ? { adminPin: options.adminPin } : null),
    };

    const res = await this.callMethod('refund', data);
    const response = JSON.parse(res);
    return response.result;
  }

  async reverse(options: EmbededReverseOptions): Promise<TransactionData> {
    const data = {
      original_transaction_uuid: options.originalTransactionUUID,
      finishTimeout: options.finishTimeout,
      enableUiDismiss: options.enableUiDismiss,
      enableReceiptUi: options.enableReceiptUi,
    };

    const res = await this.callMethod('reverse', data);
    const response = JSON.parse(res);
    return response.result;
  }

  async reconcile(options: EmbededReconcileOptions): Promise<[ReconciliationReceipt]> {
    const data = {
      finishTimeout: options.finishTimeout,
      enableReceiptUi: options.enableReceiptUi,
      enableUiDismiss: options.enableUiDismiss,
      ...(options.adminPin !== undefined ? { adminPin: options.adminPin } : null),
    };

    const res = await this.callMethod('reconcile', data);
    const response = JSON.parse(res);
    return response.result;
  }

  async session(options: EmbededSessionOptions): Promise<void> {
    const data = {
      sessionID: options.sessionID,
      finishTimeout: options.finishTimeout,
      enableUiDismiss: options.enableUiDismiss,
      enableReversal: options.enableReversalUi,
      enableReceiptUi: options.enableReceiptUi,
    };

    const res = await this.callMethod('session', data);
    if (res.status === 200 && options.onSessionOpen) {
      options.onSessionOpen(res.receipts as TransactionData);
    } else if (res.status === 500 && options.onSessionClose) {
      options.onSessionClose(res.session!);
    } else if (options.onSessionFailed) {
      options.onSessionFailed(SessionErrorMap(res));
    }
  }

  async logout() {
    await this.callMethod('logout', {});
  }

  async getTransactionsList(options: EmbededGetTransactionsListOptions): Promise<TransactionBannerList> {
    const data = {
      limit: options.limit,
      page: options.page,
      start_date: options.startDate?.toISOString(),
      end_date: options.endDate?.toISOString(),
    };

    const res = await this.callMethod('getTransactionsList', data);
    const response = JSON.parse(res);
    return response.result;
  }

  async getTransaction(options: EmbededGetTransactionOptions): Promise<TransactionData> {
    const data = {
      transaction_uuid: options.transactionUUID,
    };

    const res = await this.callMethod('getTransaction', data);
    const response = JSON.parse(res);
    return response.result;
  }

  async getReconciliationsList(options: EmbededGetReconciliationsListOptions): Promise<ReconciliationBannerList> {
    const data = {
      limit: options.limit,
      page: options.page,
      start_date: options.startDate?.toISOString(),
      end_date: options.endDate?.toISOString(),
    };

    const res = await this.callMethod('getReconciliationsList', data);
    const response = JSON.parse(res);
    return response.result;
  }

  async getReconciliation(options: EmbededGetReconciliationOptions): Promise<ReconciliationReceipt> {
    const data = {
      reconciliation_uuid: options.reconciliationUUID,
    };

    const res = await this.callMethod('getReconciliation', data);
    const response = JSON.parse(res);
    return response.result;
  }

  private  async callMethod(name: keyof NearpayPluginDefenetions, options: any): Promise<any> {
    return new Promise((resolve, reject) => {
    cordova.exec(resolve, reject, 'NearpayCordovaSDK', name, [options]);
    });
  }
}

class NearpayProxy {
  constructor(private embededNearpay: EmbededNearpay) {}

  async showConnection() {
    return await this.callMethod('proxyShowConnection', {});
  }

  async disconnect() {
    return await this.callMethod('proxyDisconnect', {});
  }

  protected async callMethod(name: string, options: any): Promise<any> {
    return new Promise((resolve, reject) => {
        cordova.exec(resolve, reject, 'NearpayCordovaSDK', name, [options]);
    });
  }
}
