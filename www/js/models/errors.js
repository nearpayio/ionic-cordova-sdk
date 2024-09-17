"use strict";
// ------------------------------------------
// --------------- Purchase -----------------
// ------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY_ERROR_ENUM = exports.SESSION_ERROR_ENUM = exports.RECONCILE_ERROR_ENUM = exports.REVERSE_ERROR_ENUM = exports.REFUND_ERROR_ENUM = exports.PURCHASE_ERROR_ENUM = void 0;
var PURCHASE_ERROR_ENUM;
(function (PURCHASE_ERROR_ENUM) {
    PURCHASE_ERROR_ENUM["DECLIEND"] = "purchase-decliend";
    PURCHASE_ERROR_ENUM["REJECTED"] = "purchase-rejected";
    PURCHASE_ERROR_ENUM["AUTH_FAILED"] = "purchase-auth-failed";
    PURCHASE_ERROR_ENUM["INVALID_STATUS"] = "purchase-invalid-status";
    PURCHASE_ERROR_ENUM["GENERAL_ERROR"] = "purchase-general-error";
})(PURCHASE_ERROR_ENUM || (exports.PURCHASE_ERROR_ENUM = PURCHASE_ERROR_ENUM = {}));
// ------------------------------------------
// ----------------- Refund -----------------
// ------------------------------------------
var REFUND_ERROR_ENUM;
(function (REFUND_ERROR_ENUM) {
    REFUND_ERROR_ENUM["DECLIEND"] = "refund-decliend";
    REFUND_ERROR_ENUM["REJECTED"] = "refund-rejected";
    REFUND_ERROR_ENUM["AUTH_FAILED"] = "refund-auth-failed";
    REFUND_ERROR_ENUM["INVALID_STATUS"] = "refund-invalid-status";
    REFUND_ERROR_ENUM["GENERAL_ERROR"] = "refund-general-error";
})(REFUND_ERROR_ENUM || (exports.REFUND_ERROR_ENUM = REFUND_ERROR_ENUM = {}));
// ------------------------------------------
// ----------------- Reverse -----------------
// ------------------------------------------
var REVERSE_ERROR_ENUM;
(function (REVERSE_ERROR_ENUM) {
    REVERSE_ERROR_ENUM["FAILURE_MESSAGE"] = "Reverse-failure-message";
    REVERSE_ERROR_ENUM["AUTH_FAILED"] = "Reverse-auth-failed";
    REVERSE_ERROR_ENUM["INVALID_STATUS"] = "Reverse-invalid-status";
    REVERSE_ERROR_ENUM["GENERAL_ERROR"] = "reverse-general-error";
})(REVERSE_ERROR_ENUM || (exports.REVERSE_ERROR_ENUM = REVERSE_ERROR_ENUM = {}));
// ------------------------------------------
// ----------------- Reconcile -----------------
// ------------------------------------------
var RECONCILE_ERROR_ENUM;
(function (RECONCILE_ERROR_ENUM) {
    RECONCILE_ERROR_ENUM["FAILURE_MESSAGE"] = "Reconcile-failure-message";
    RECONCILE_ERROR_ENUM["AUTH_FAILED"] = "Reconcile-auth-failed";
    RECONCILE_ERROR_ENUM["INVALID_STATUS"] = "Reconcile-invalid-status";
    RECONCILE_ERROR_ENUM["GENERAL_ERROR"] = "Reconcile-general-error";
})(RECONCILE_ERROR_ENUM || (exports.RECONCILE_ERROR_ENUM = RECONCILE_ERROR_ENUM = {}));
// ------------------------------------------
// ----------------- Session -----------------
// ------------------------------------------
var SESSION_ERROR_ENUM;
(function (SESSION_ERROR_ENUM) {
    SESSION_ERROR_ENUM["FAILURE_MESSAGE"] = "Session-failure-message";
    SESSION_ERROR_ENUM["AUTH_FAILED"] = "Session-auth-failed";
    SESSION_ERROR_ENUM["INVALID_STATUS"] = "Session-invalid-status";
    SESSION_ERROR_ENUM["GENERAL_ERROR"] = "Session-general-error";
})(SESSION_ERROR_ENUM || (exports.SESSION_ERROR_ENUM = SESSION_ERROR_ENUM = {}));
// ------------------------------------------
// ----------------- query ------------------
// ------------------------------------------
var QUERY_ERROR_ENUM;
(function (QUERY_ERROR_ENUM) {
    QUERY_ERROR_ENUM["FAILURE_MESSAGE"] = "query-failure-message";
    QUERY_ERROR_ENUM["AUTH_FAILED"] = "query-auth-failed";
    QUERY_ERROR_ENUM["INVALID_STATUS"] = "query-invalid-status";
    QUERY_ERROR_ENUM["GENERAL_ERROR"] = "query-general-error";
})(QUERY_ERROR_ENUM || (exports.QUERY_ERROR_ENUM = QUERY_ERROR_ENUM = {}));
