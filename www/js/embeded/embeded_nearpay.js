"use strict";
/// <reference types="cordova" />
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbededNearpay = void 0;
var error_status_map_1 = require("../models/error_status_map");
// import { exec } from 'cordova/exec';
// declare var cordova: any;
var EmbededNearpay = /** @class */ (function () {
    function EmbededNearpay(options) {
        this.proxy = new NearpayProxy(this);
        this.savedOptions = options;
        this.initialize(options);
    }
    EmbededNearpay.prototype.initialize = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        data = {
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
                            second_display_ui_position: (_b = options.secondDisplayConfiguration) === null || _b === void 0 ? void 0 : _b.uiPosition,
                            second_display_pin_position: (_c = options.secondDisplayConfiguration) === null || _c === void 0 ? void 0 : _c.pinPosition,
                        };
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('initialize', data)];
                    case 1:
                        _a.apply(this, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    EmbededNearpay.prototype.purchase = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        data = {
                            amount: options.amount,
                            customer_reference_number: options.customerReferenceNumber,
                            finishTimeout: (_b = options.finishTimeout) !== null && _b !== void 0 ? _b : 60,
                            enableReversal: (_c = options.enableReversalUi) !== null && _c !== void 0 ? _c : true,
                            enableReceiptUi: (_d = options.enableReceiptUi) !== null && _d !== void 0 ? _d : true,
                            enableUiDismiss: (_e = options.enableUiDismiss) !== null && _e !== void 0 ? _e : true,
                            job_id: options.transactionID,
                        };
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('purchase', data)];
                    case 1: return [2 /*return*/, _a.apply(this, [_f.sent(), error_status_map_1.PurchaseErrorMap])];
                }
            });
        });
    };
    EmbededNearpay.prototype.refund = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = __assign({ amount: options.amount, original_transaction_uuid: options.originalTransactionUUID, job_id: options.transactionID, customer_reference_number: options.customerReferenceNumber, finishTimeout: options.finishTimeout, enableReversal: options.enableReversalUi, enableReceiptUi: options.enableReceiptUi, enableUiDismiss: options.enableUiDismiss, enableEditableRefundAmountUi: options.editableRefundAmountUI }, (options.adminPin !== undefined ? { adminPin: options.adminPin } : null));
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('refund', data)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent(), error_status_map_1.RefundErrorMap])];
                }
            });
        });
    };
    EmbededNearpay.prototype.reverse = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = {
                            original_transaction_uuid: options.originalTransactionUUID,
                            finishTimeout: options.finishTimeout,
                            enableUiDismiss: options.enableUiDismiss,
                            enableReceiptUi: options.enableReceiptUi,
                        };
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('reverse', data)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent(), error_status_map_1.ReverseErrorMap])];
                }
            });
        });
    };
    EmbededNearpay.prototype.reconcile = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = __assign({ finishTimeout: options.finishTimeout, enableReceiptUi: options.enableReceiptUi, enableUiDismiss: options.enableUiDismiss }, (options.adminPin !== undefined ? { adminPin: options.adminPin } : null));
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('reconcile', data)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent(), error_status_map_1.ReconcileErrorMap])];
                }
            });
        });
    };
    EmbededNearpay.prototype.session = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = {
                            sessionID: options.sessionID,
                            finishTimeout: options.finishTimeout,
                            enableUiDismiss: options.enableUiDismiss,
                            enableReversal: options.enableReversalUi,
                            enableReceiptUi: options.enableReceiptUi,
                        };
                        _a = this.parseResponse;
                        return [4 /*yield*/, this.callMethod('session', data)];
                    case 1:
                        response = _a.apply(this, [_b.sent()]);
                        if (response.status === 200 && options.onSessionOpen) {
                            options.onSessionOpen(response.result);
                        }
                        else if (response.status === 210 && options.onSessionClose) {
                            options.onSessionClose(response.result);
                        }
                        else if (options.onSessionFailed) {
                            options.onSessionFailed((0, error_status_map_1.SessionErrorMap)(response));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EmbededNearpay.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('logout', {})];
                    case 1:
                        _a.apply(this, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    EmbededNearpay.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('setup', {})];
                    case 1:
                        _a.apply(this, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    EmbededNearpay.prototype.updateAuthentication = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = {
                            authtype: options.authtype,
                            authvalue: options.authvalue,
                            tid: options.tid,
                        };
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('updateAuthentication', data)];
                    case 1:
                        _a.apply(this, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    EmbededNearpay.prototype.receiptToImage = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, bytes, _a;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        data = {
                            receipt: JSON.stringify(options.receipt),
                            receipt_width: (_b = options.receiptWidth) !== null && _b !== void 0 ? _b : 850,
                            receipt_font_size: (_c = options.receiptFontSize) !== null && _c !== void 0 ? _c : 1,
                        };
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('receiptToImage', data)];
                    case 1:
                        bytes = _a.apply(this, [_d.sent()]);
                        return [2 /*return*/, Uint8Array.from(bytes)];
                }
            });
        });
    };
    EmbededNearpay.prototype.reconciliationReceiptToImage = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, bytes, _a;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        data = {
                            receipt: JSON.stringify(options.receipt),
                            receipt_width: (_b = options.receiptWidth) !== null && _b !== void 0 ? _b : 850,
                            receipt_font_size: (_c = options.receiptFontSize) !== null && _c !== void 0 ? _c : 1,
                        };
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('reconciliationReceiptToImage', data)];
                    case 1:
                        bytes = _a.apply(this, [_d.sent()]);
                        return [2 /*return*/, Uint8Array.from(bytes)];
                }
            });
        });
    };
    EmbededNearpay.prototype.requestCancel = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        data = {
                            requestId: options.requestId,
                            cancelWithReverse: (_c = options.cancelWithReverse) !== null && _c !== void 0 ? _c : false,
                        };
                        _a = Boolean;
                        _b = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('requestCancel', data)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.apply(this, [_d.sent()])])];
                }
            });
        });
    };
    EmbededNearpay.prototype.dismiss = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = Boolean;
                        _b = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('dismiss', {})];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.apply(this, [_c.sent()])])];
                }
            });
        });
    };
    EmbededNearpay.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('close', {})];
                    case 1:
                        _a.apply(this, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    EmbededNearpay.prototype.deviceCompatibility = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.parseResponse;
                        return [4 /*yield*/, this.callMethod('deviceCompatibility', {})];
                    case 1:
                        response = _a.apply(this, [_b.sent()]);
                        if (response.status === 200) {
                            return [2 /*return*/, { compatible: true, message: response.message }];
                        }
                        if (response.status === 413) {
                            return [2 /*return*/, { compatible: false, message: response.message }];
                        }
                        throw this.toError(response);
                }
            });
        });
    };
    EmbededNearpay.prototype.getUserSession = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.parseResponse;
                        return [4 /*yield*/, this.callMethod('getUserSession', {})];
                    case 1:
                        response = _a.apply(this, [_b.sent()]);
                        if (response.status === 200) {
                            options.onSessionInfo(response.result);
                        }
                        else if (response.status === 201) {
                            options.onSessionFree();
                        }
                        else if (response.status === 202) {
                            options.onSessionBusy(response.message);
                        }
                        else {
                            options.onSessionFailed(response);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EmbededNearpay.prototype.getTransactionsList = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        data = {
                            limit: options.limit,
                            page: options.page,
                            start_date: (_b = options.startDate) === null || _b === void 0 ? void 0 : _b.getTime(),
                            end_date: (_c = options.endDate) === null || _c === void 0 ? void 0 : _c.getTime(),
                            customer_reference_number: options.customerReferenceNumber,
                            isReconciled: options.isReconciled,
                            isApproved: options.isApproved,
                        };
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('getTransactionsList', data)];
                    case 1: return [2 /*return*/, _a.apply(this, [_d.sent(), error_status_map_1.QueryErrorMap])];
                }
            });
        });
    };
    EmbededNearpay.prototype.getTransaction = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = {
                            transaction_uuid: options.transactionUUID,
                            enableReceiptUi: options.enableReceiptUi,
                            finishTimeout: options.finishTimeOut,
                        };
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('getTransaction', data)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent(), error_status_map_1.QueryErrorMap])];
                }
            });
        });
    };
    EmbededNearpay.prototype.getReconciliationsList = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        data = {
                            limit: options.limit,
                            page: options.page,
                            start_date: (_b = options.startDate) === null || _b === void 0 ? void 0 : _b.getTime(),
                            end_date: (_c = options.endDate) === null || _c === void 0 ? void 0 : _c.getTime(),
                        };
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('getReconciliationsList', data)];
                    case 1: return [2 /*return*/, _a.apply(this, [_d.sent(), error_status_map_1.QueryErrorMap])];
                }
            });
        });
    };
    EmbededNearpay.prototype.getReconciliation = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        data = {
                            reconciliation_uuid: options.reconciliationUUID,
                            enableReceiptUi: options.enableReceiptUi,
                            finishTimeout: options.finishTimeOut,
                        };
                        _a = this.parseSuccess;
                        return [4 /*yield*/, this.callMethod('getReconciliation', data)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent(), error_status_map_1.QueryErrorMap])];
                }
            });
        });
    };
    EmbededNearpay.prototype.parseResponse = function (res) {
        return typeof res === 'string' ? JSON.parse(res) : res;
    };
    EmbededNearpay.prototype.parseSuccess = function (res, mapError) {
        var response = this.parseResponse(res);
        if (response.status !== 200) {
            throw this.toError(response, mapError);
        }
        return response.result;
    };
    EmbededNearpay.prototype.toError = function (response, mapError) {
        var nearpayError;
        try {
            nearpayError = mapError === null || mapError === void 0 ? void 0 : mapError(response);
        }
        catch (_a) {
            nearpayError = undefined;
        }
        var message = response.message || "Nearpay operation failed with status ".concat(response.status);
        return Object.assign(new Error(message), {
            status: response.status,
            result: response.result,
            nearpayError: nearpayError,
        });
    };
    EmbededNearpay.prototype.callMethod = function (name, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        cordova.exec(resolve, reject, 'NearpayCordovaSDK', name, [options]);
                    })];
            });
        });
    };
    return EmbededNearpay;
}());
exports.EmbededNearpay = EmbededNearpay;
var NearpayProxy = /** @class */ (function () {
    function NearpayProxy(embededNearpay) {
        this.embededNearpay = embededNearpay;
    }
    NearpayProxy.prototype.showConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.callMethod('proxyShowConnection', {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NearpayProxy.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.callMethod('proxyDisconnect', {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NearpayProxy.prototype.callMethod = function (name, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        cordova.exec(resolve, reject, 'NearpayCordovaSDK', name, [options]);
                    })];
            });
        });
    };
    return NearpayProxy;
}());
