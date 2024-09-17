"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseErrorMap = PurchaseErrorMap;
exports.RefundErrorMap = RefundErrorMap;
exports.ReverseErrorMap = ReverseErrorMap;
exports.ReconcileErrorMap = ReconcileErrorMap;
exports.SessionErrorMap = SessionErrorMap;
exports.QueryErrorMap = QueryErrorMap;
var errors_1 = require("./errors");
function PurchaseErrorMap(response) {
    switch (response.status) {
        case 405:
            return {
                type: errors_1.PURCHASE_ERROR_ENUM.DECLIEND,
                reciepts: response.result,
            };
        case 406:
            return {
                type: errors_1.PURCHASE_ERROR_ENUM.REJECTED,
                message: response.message,
            };
        case 401:
            return {
                type: errors_1.PURCHASE_ERROR_ENUM.AUTH_FAILED,
                message: response.message,
            };
        case 404:
            return {
                type: errors_1.PURCHASE_ERROR_ENUM.INVALID_STATUS,
            };
        case 402:
            return {
                type: errors_1.PURCHASE_ERROR_ENUM.GENERAL_ERROR,
            };
        default:
            throw "invalid status";
    }
}
function RefundErrorMap(response) {
    switch (response.status) {
        case 405:
            return {
                type: errors_1.REFUND_ERROR_ENUM.DECLIEND,
                reciepts: response.result,
            };
        case 406:
            return {
                type: errors_1.REFUND_ERROR_ENUM.REJECTED,
                message: response.message,
            };
        case 401:
            return {
                type: errors_1.REFUND_ERROR_ENUM.AUTH_FAILED,
                message: response.message,
            };
        case 404:
            return {
                type: errors_1.REFUND_ERROR_ENUM.INVALID_STATUS,
            };
        case 402:
            return {
                type: errors_1.REFUND_ERROR_ENUM.GENERAL_ERROR,
            };
        default:
            throw "invalid status";
    }
}
function ReverseErrorMap(response) {
    switch (response.status) {
        case 401:
            return {
                type: errors_1.REVERSE_ERROR_ENUM.AUTH_FAILED,
                message: response.message,
            };
        case 403:
            return {
                type: errors_1.REVERSE_ERROR_ENUM.FAILURE_MESSAGE,
                message: response.message,
            };
        case 404:
            return {
                type: errors_1.REVERSE_ERROR_ENUM.INVALID_STATUS,
            };
        case 402:
            return {
                type: errors_1.REVERSE_ERROR_ENUM.GENERAL_ERROR,
            };
        default:
            throw "invalid status";
    }
}
function ReconcileErrorMap(response) {
    switch (response.status) {
        case 401:
            return {
                type: errors_1.RECONCILE_ERROR_ENUM.AUTH_FAILED,
                message: response.message,
            };
        case 403:
            return {
                type: errors_1.RECONCILE_ERROR_ENUM.FAILURE_MESSAGE,
                message: response.message,
            };
        case 404:
            return {
                type: errors_1.RECONCILE_ERROR_ENUM.INVALID_STATUS,
            };
        case 402:
            return {
                type: errors_1.RECONCILE_ERROR_ENUM.GENERAL_ERROR,
            };
        default:
            throw "invalid status";
    }
}
function SessionErrorMap(response) {
    switch (response.status) {
        case 401:
            return {
                type: errors_1.SESSION_ERROR_ENUM.AUTH_FAILED,
                message: response.message,
            };
        case 403:
            return {
                type: errors_1.SESSION_ERROR_ENUM.FAILURE_MESSAGE,
                message: response.message,
            };
        case 404:
            return {
                type: errors_1.SESSION_ERROR_ENUM.INVALID_STATUS,
            };
        case 402:
            return {
                type: errors_1.SESSION_ERROR_ENUM.GENERAL_ERROR,
            };
        default:
            throw "invalid status";
    }
}
function QueryErrorMap(response) {
    switch (response.status) {
        case 401:
            return {
                type: errors_1.QUERY_ERROR_ENUM.AUTH_FAILED,
                message: response.message,
            };
        case 403:
            return {
                type: errors_1.QUERY_ERROR_ENUM.FAILURE_MESSAGE,
                message: response.message,
            };
        case 404:
            return {
                type: errors_1.QUERY_ERROR_ENUM.INVALID_STATUS,
            };
        case 402:
            return {
                type: errors_1.QUERY_ERROR_ENUM.GENERAL_ERROR,
            };
        default:
            throw "invalid status";
    }
}
