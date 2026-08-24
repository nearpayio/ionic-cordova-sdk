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
  EmbededRequestCancelOptions,
  GetUserSessionOptions,
  DeviceCompatibilityResult,
  EmbededUpdateAuthenticationOptions,
  EmbededReceiptToImageOptions,
  EmbededReconciliationReceiptToImageOptions,
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
      support_second_display: options.supportSecondDisplay,
      second_display_ui_position: options.secondDisplayConfiguration?.uiPosition,
      second_display_pin_position: options.secondDisplayConfiguration?.pinPosition,
    };
    this.parseSuccess(await this.callMethod('initialize', data));
  }

  async purchase(options: EmbededPurchaseOptions): Promise<TransactionData> {
    const data = {
      amount: options.amount,
      customer_reference_number: options.customerReferenceNumber,
      finishTimeout: options.finishTimeout ?? 60,
      enableReversal: options.enableReversalUi ?? true,
      enableReceiptUi: options.enableReceiptUi ?? true,
      enableUiDismiss: options.enableUiDismiss ?? true,
      job_id: options.transactionID,
    };

    return this.parseSuccess(await this.callMethod('purchase', data), PurchaseErrorMap);
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

    return this.parseSuccess(await this.callMethod('refund', data), RefundErrorMap);
  }

  async reverse(options: EmbededReverseOptions): Promise<TransactionData> {
    const data = {
      original_transaction_uuid: options.originalTransactionUUID,
      finishTimeout: options.finishTimeout,
      enableUiDismiss: options.enableUiDismiss,
      enableReceiptUi: options.enableReceiptUi,
    };

    return this.parseSuccess(await this.callMethod('reverse', data), ReverseErrorMap);
  }

  async reconcile(options: EmbededReconcileOptions): Promise<[ReconciliationReceipt]> {
    const data = {
      finishTimeout: options.finishTimeout,
      enableReceiptUi: options.enableReceiptUi,
      enableUiDismiss: options.enableUiDismiss,
      ...(options.adminPin !== undefined ? { adminPin: options.adminPin } : null),
    };

    return this.parseSuccess(await this.callMethod('reconcile', data), ReconcileErrorMap);
  }

  async session(options: EmbededSessionOptions): Promise<void> {
    const data = {
      sessionID: options.sessionID,
      finishTimeout: options.finishTimeout,
      enableUiDismiss: options.enableUiDismiss,
      enableReversal: options.enableReversalUi,
      enableReceiptUi: options.enableReceiptUi,
    };

    const response = this.parseResponse(await this.callMethod('session', data));
    if (response.status === 200 && options.onSessionOpen) {
      options.onSessionOpen(response.result as TransactionData);
    } else if (response.status === 210 && options.onSessionClose) {
      options.onSessionClose(response.result);
    } else if (options.onSessionFailed) {
      options.onSessionFailed(SessionErrorMap(response));
    }
  }

  async logout() {
    this.parseSuccess(await this.callMethod('logout', {}));
  }

  async setup() {
    this.parseSuccess(await this.callMethod('setup', {}));
  }

  async updateAuthentication(options: EmbededUpdateAuthenticationOptions) {
    const data = {
      authtype: options.authtype,
      authvalue: options.authvalue,
      tid: options.tid,
    };
    this.parseSuccess(await this.callMethod('updateAuthentication', data));
  }

  async receiptToImage(options: EmbededReceiptToImageOptions): Promise<Uint8Array> {
    const data = {
      receipt: JSON.stringify(options.receipt),
      receipt_width: options.receiptWidth ?? 850,
      receipt_font_size: options.receiptFontSize ?? 1,
    };
    const bytes = this.parseSuccess(await this.callMethod('receiptToImage', data));
    return Uint8Array.from(bytes);
  }

  async reconciliationReceiptToImage(
    options: EmbededReconciliationReceiptToImageOptions,
  ): Promise<Uint8Array> {
    const data = {
      receipt: JSON.stringify(options.receipt),
      receipt_width: options.receiptWidth ?? 850,
      receipt_font_size: options.receiptFontSize ?? 1,
    };
    const bytes = this.parseSuccess(await this.callMethod('reconciliationReceiptToImage', data));
    return Uint8Array.from(bytes);
  }

  async requestCancel(options: EmbededRequestCancelOptions): Promise<boolean> {
    const data = {
      requestId: options.requestId,
      cancelWithReverse: options.cancelWithReverse ?? false,
    };
    return Boolean(this.parseSuccess(await this.callMethod('requestCancel', data)));
  }

  async dismiss(): Promise<boolean> {
    return Boolean(this.parseSuccess(await this.callMethod('dismiss', {})));
  }

  async close(): Promise<void> {
    this.parseSuccess(await this.callMethod('close', {}));
  }

  async deviceCompatibility(): Promise<DeviceCompatibilityResult> {
    const response = this.parseResponse(await this.callMethod('deviceCompatibility', {}));
    if (response.status === 200) {
      return { compatible: true, message: response.message };
    }
    if (response.status === 413) {
      return { compatible: false, message: response.message };
    }
    throw this.toError(response);
  }

  async getUserSession(options: GetUserSessionOptions): Promise<void> {
    const response = this.parseResponse(await this.callMethod('getUserSession', {}));
    if (response.status === 200) {
      options.onSessionInfo(response.result);
    } else if (response.status === 201) {
      options.onSessionFree();
    } else if (response.status === 202) {
      options.onSessionBusy(response.message);
    } else {
      options.onSessionFailed(response);
    }
  }

  async getTransactionsList(options: EmbededGetTransactionsListOptions): Promise<TransactionBannerList> {
    const data = {
      limit: options.limit,
      page: options.page,
      start_date: options.startDate?.getTime(),
      end_date: options.endDate?.getTime(),
      customer_reference_number: options.customerReferenceNumber,
      isReconciled: options.isReconciled,
      isApproved: options.isApproved,
    };

    return this.parseSuccess(await this.callMethod('getTransactionsList', data), QueryErrorMap);
  }

  async getTransaction(options: EmbededGetTransactionOptions): Promise<TransactionData> {
    const data = {
      transaction_uuid: options.transactionUUID,
      enableReceiptUi: options.enableReceiptUi,
      finishTimeout: options.finishTimeOut,
    };

    return this.parseSuccess(await this.callMethod('getTransaction', data), QueryErrorMap);
  }

  async getReconciliationsList(options: EmbededGetReconciliationsListOptions): Promise<ReconciliationBannerList> {
    const data = {
      limit: options.limit,
      page: options.page,
      start_date: options.startDate?.getTime(),
      end_date: options.endDate?.getTime(),
    };

    return this.parseSuccess(await this.callMethod('getReconciliationsList', data), QueryErrorMap);
  }

  async getReconciliation(options: EmbededGetReconciliationOptions): Promise<ReconciliationReceipt> {
    const data = {
      reconciliation_uuid: options.reconciliationUUID,
      enableReceiptUi: options.enableReceiptUi,
      finishTimeout: options.finishTimeOut,
    };

    return this.parseSuccess(await this.callMethod('getReconciliation', data), QueryErrorMap);
  }

  private parseResponse(res: any): any {
    return typeof res === 'string' ? JSON.parse(res) : res;
  }

  private parseSuccess(res: any, mapError?: (response: ApiResponse) => unknown): any {
    const response = this.parseResponse(res);
    if (response.status !== 200) {
      throw this.toError(response, mapError);
    }
    return response.result;
  }

  private toError(response: ApiResponse, mapError?: (response: ApiResponse) => unknown): Error {
    let nearpayError: unknown;
    try {
      nearpayError = mapError?.(response);
    } catch {
      nearpayError = undefined;
    }
    const message = response.message || `Nearpay operation failed with status ${response.status}`;
    return Object.assign(new Error(message), {
      status: response.status,
      result: response.result,
      nearpayError,
    });
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
