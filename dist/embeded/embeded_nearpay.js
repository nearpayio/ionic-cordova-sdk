"use strict";
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
var EmbededNearpay = (function () {
    function EmbededNearpay(options) {
        this.proxy = new NearpayProxy(this);
        this.savedOptions = options;
        this.initialize(options);
    }
    EmbededNearpay.prototype.initialize = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
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
                        };
                        return [4, this.callMethod('initialize', data)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    EmbededNearpay.prototype.purchase = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            amount: options.amount,
                            customer_reference_number: options.customerReferenceNumber || '',
                            finishTimeout: options.finishTimeout || 60,
                            enableReversal: options.enableReversalUi || true,
                            enableReceiptUi: options.enableReceiptUi || true,
                            enableUiDismiss: options.enableUiDismiss || true,
                            job_id: options.transactionID,
                        };
                        return [4, this.callMethod('purchase', data)];
                    case 1:
                        res = _a.sent();
                        response = JSON.parse(res);
                        return [2, response.result];
                }
            });
        });
    };
    EmbededNearpay.prototype.refund = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = __assign({ amount: options.amount, original_transaction_uuid: options.originalTransactionUUID, job_id: options.transactionID, customer_reference_number: options.customerReferenceNumber, finishTimeout: options.finishTimeout, enableReversal: options.enableReversalUi, enableReceiptUi: options.enableReceiptUi, enableUiDismiss: options.enableUiDismiss, enableEditableRefundAmountUi: options.editableRefundAmountUI }, (options.adminPin !== undefined ? { adminPin: options.adminPin } : null));
                        return [4, this.callMethod('refund', data)];
                    case 1:
                        res = _a.sent();
                        response = JSON.parse(res);
                        return [2, response.result];
                }
            });
        });
    };
    EmbededNearpay.prototype.reverse = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            original_transaction_uuid: options.originalTransactionUUID,
                            finishTimeout: options.finishTimeout,
                            enableUiDismiss: options.enableUiDismiss,
                            enableReceiptUi: options.enableReceiptUi,
                        };
                        return [4, this.callMethod('reverse', data)];
                    case 1:
                        res = _a.sent();
                        response = JSON.parse(res);
                        return [2, response.result];
                }
            });
        });
    };
    EmbededNearpay.prototype.reconcile = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = __assign({ finishTimeout: options.finishTimeout, enableReceiptUi: options.enableReceiptUi, enableUiDismiss: options.enableUiDismiss }, (options.adminPin !== undefined ? { adminPin: options.adminPin } : null));
                        return [4, this.callMethod('reconcile', data)];
                    case 1:
                        res = _a.sent();
                        response = JSON.parse(res);
                        return [2, response.result];
                }
            });
        });
    };
    EmbededNearpay.prototype.session = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            sessionID: options.sessionID,
                            finishTimeout: options.finishTimeout,
                            enableUiDismiss: options.enableUiDismiss,
                            enableReversal: options.enableReversalUi,
                            enableReceiptUi: options.enableReceiptUi,
                        };
                        return [4, this.callMethod('session', data)];
                    case 1:
                        res = _a.sent();
                        if (res.status === 200 && options.onSessionOpen) {
                            options.onSessionOpen(res.receipts);
                        }
                        else if (res.status === 500 && options.onSessionClose) {
                            options.onSessionClose(res.session);
                        }
                        else if (options.onSessionFailed) {
                            options.onSessionFailed((0, error_status_map_1.SessionErrorMap)(res));
                        }
                        return [2];
                }
            });
        });
    };
    EmbededNearpay.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.callMethod('logout', {})];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    EmbededNearpay.prototype.getTransactionsList = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res, response;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data = {
                            limit: options.limit,
                            page: options.page,
                            start_date: (_a = options.startDate) === null || _a === void 0 ? void 0 : _a.toISOString(),
                            end_date: (_b = options.endDate) === null || _b === void 0 ? void 0 : _b.toISOString(),
                        };
                        return [4, this.callMethod('getTransactionsList', data)];
                    case 1:
                        res = _c.sent();
                        response = JSON.parse(res);
                        return [2, response.result];
                }
            });
        });
    };
    EmbededNearpay.prototype.getTransaction = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            transaction_uuid: options.transactionUUID,
                        };
                        return [4, this.callMethod('getTransaction', data)];
                    case 1:
                        res = _a.sent();
                        response = JSON.parse(res);
                        return [2, response.result];
                }
            });
        });
    };
    EmbededNearpay.prototype.getReconciliationsList = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res, response;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data = {
                            limit: options.limit,
                            page: options.page,
                            start_date: (_a = options.startDate) === null || _a === void 0 ? void 0 : _a.toISOString(),
                            end_date: (_b = options.endDate) === null || _b === void 0 ? void 0 : _b.toISOString(),
                        };
                        return [4, this.callMethod('getReconciliationsList', data)];
                    case 1:
                        res = _c.sent();
                        response = JSON.parse(res);
                        return [2, response.result];
                }
            });
        });
    };
    EmbededNearpay.prototype.getReconciliation = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            reconciliation_uuid: options.reconciliationUUID,
                        };
                        return [4, this.callMethod('getReconciliation', data)];
                    case 1:
                        res = _a.sent();
                        response = JSON.parse(res);
                        return [2, response.result];
                }
            });
        });
    };
    EmbededNearpay.prototype.callMethod = function (name, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        cordova.exec(resolve, reject, 'NearpayCordovaSDK', name, [options]);
                    })];
            });
        });
    };
    return EmbededNearpay;
}());
exports.EmbededNearpay = EmbededNearpay;
var NearpayProxy = (function () {
    function NearpayProxy(embededNearpay) {
        this.embededNearpay = embededNearpay;
    }
    NearpayProxy.prototype.showConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.callMethod('proxyShowConnection', {})];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    NearpayProxy.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.callMethod('proxyDisconnect', {})];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    NearpayProxy.prototype.callMethod = function (name, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        cordova.exec(resolve, reject, 'NearpayCordovaSDK', name, [options]);
                    })];
            });
        });
    };
    return NearpayProxy;
}());
