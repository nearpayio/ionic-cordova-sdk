"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionsAreEqual = ConnectionsAreEqual;
exports.dbSaveUsers = dbSaveUsers;
exports.dbGetUsers = dbGetUsers;
exports.dbGetLastUser = dbGetLastUser;
exports.dbAddUser = dbAddUser;
exports.dbDeleteUser = dbDeleteUser;
exports.dbGetWsUsers = dbGetWsUsers;
var nearpay_ts_sdk_1 = require("@nearpaydev/nearpay-ts-sdk");
var keys_1 = require("./keys");
var storage_1 = require("@ionic/storage");
var storage = new storage_1.Storage();
function ConnectionsAreEqual(user1, user2) {
    var equal = JSON.stringify(user1) === JSON.stringify(user2);
    return equal;
}
function dbSaveUsers(users) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storage.create()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, storage.set((0, keys_1.usersKey)(), JSON.stringify(users))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function dbGetUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storage.create()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, storage.get((0, keys_1.usersKey)())];
                case 2:
                    users = _a.sent();
                    return [2 /*return*/, users
                            ? JSON.parse(users)
                            : []];
            }
        });
    });
}
function dbGetLastUser() {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbGetUsers()];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, users.length > 0 ? users[0] : undefined];
            }
        });
    });
}
function dbAddUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbGetUsers()];
                case 1:
                    users = (_a.sent()).filter(function (oldUser) { return !ConnectionsAreEqual(user, oldUser); });
                    dbSaveUsers(__spreadArray([user], users, true));
                    return [2 /*return*/];
            }
        });
    });
}
function dbDeleteUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbGetUsers()];
                case 1:
                    users = (_a.sent()).filter(function (oldUser) { return !ConnectionsAreEqual(user, oldUser); });
                    dbSaveUsers(users);
                    return [2 /*return*/];
            }
        });
    });
}
function dbGetWsUsers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbGetUsers()];
                case 1: return [2 /*return*/, (_a.sent()).filter(function (user) { return user.type === nearpay_ts_sdk_1.NEARPAY_CONNECTOR.WS; })];
            }
        });
    });
}
