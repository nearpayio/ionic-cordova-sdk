"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIPosition = exports.NetworkConfig = exports.Locale = exports.AuthenticationType = exports.Environments = void 0;
var Environments;
(function (Environments) {
    Environments["sandbox"] = "sandbox";
    Environments["testing"] = "testing";
    Environments["production"] = "production";
})(Environments || (exports.Environments = Environments = {}));
var AuthenticationType;
(function (AuthenticationType) {
    AuthenticationType["login"] = "userenter";
    AuthenticationType["email"] = "email";
    AuthenticationType["mobile"] = "mobile";
    AuthenticationType["jwt"] = "jwt";
})(AuthenticationType || (exports.AuthenticationType = AuthenticationType = {}));
var Locale;
(function (Locale) {
    Locale["default"] = "default";
})(Locale || (exports.Locale = Locale = {}));
var NetworkConfig;
(function (NetworkConfig) {
    NetworkConfig["SIM_ONLY"] = "SIM_ONLY";
    NetworkConfig["SIM_PREFERRED"] = "SIM_PREFERRED";
    NetworkConfig["DEFAULT"] = "DEFAULT";
})(NetworkConfig || (exports.NetworkConfig = NetworkConfig = {}));
var UIPosition;
(function (UIPosition) {
    UIPosition["TOP_START"] = "TOP_START";
    UIPosition["TOP_END"] = "TOP_END";
    UIPosition["TOP_RIGHT"] = "TOP_RIGHT";
    UIPosition["TOP_LEFT"] = "TOP_LEFT";
    UIPosition["BOTTOM_START"] = "BOTTOM_START";
    UIPosition["BOTTOM_END"] = "BOTTOM_END";
    UIPosition["BOTTOM_RIGHT"] = "BOTTOM_RIGHT";
    UIPosition["BOTTOM_LEFT"] = "BOTTOM_LEFT";
    UIPosition["CENTER_START"] = "CENTER_START";
    UIPosition["CENTER_END"] = "CENTER_END";
    UIPosition["CENTER_RIGHT"] = "CENTER_RIGHT";
    UIPosition["CENTER_LEFT"] = "CENTER_LEFT";
    UIPosition["CENTER_TOP"] = "CENTER_TOP";
    UIPosition["CENTER_BOTTOM"] = "CENTER_BOTTOM";
    UIPosition["CENTER"] = "CENTER";
    UIPosition["DEFAULT"] = "DEFAULT";
})(UIPosition || (exports.UIPosition = UIPosition = {}));
