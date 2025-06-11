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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.Database = void 0;
var fs = require("fs");
var Database = /** @class */ (function () {
    function Database(file_path, indent_spaces) {
        this.indent_spaces = 4;
        this.data_base_cache = null;
        this.watching_file = false;
        this.DB_FILE_PATH = file_path;
        if (!this.fileCheck()) {
            throw new Error('[Error] File not found, file path: ' + file_path);
        }
        this.watchFile();
        if (!indent_spaces) {
            return;
        }
        this.indent_spaces = indent_spaces;
    }
    Database.prototype.addObject = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var db_1, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.loadCache()];
                    case 1:
                        db_1 = _a.sent();
                        if (!db_1) {
                            console.log("[Error] Actual Data is null / undefined...");
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, this.saveCacheWithUpdate(function () {
                                db_1.push(data);
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        console.log('[Error] Exception while writing...');
                        console.log('[Info] Details: ' + ex_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.updateObjectFromQuery = function (object, query) {
        if (!object || !query) {
            console.log("[Error] Object / Query is undefined...");
            return;
        }
        Object.assign(object, query);
    };
    Database.prototype.updateFromQuery = function (query, new_query) {
        return __awaiter(this, void 0, void 0, function () {
            var db, queried_object;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!query || !new_query) {
                            console.log("[Error] Query / New Query is undefined...");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.loadCache()];
                    case 1:
                        db = _a.sent();
                        if (!db) {
                            console.log("[Error] Actual Data is null / undefined...");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.getObjectFromQueryFromData(query, db)];
                    case 2:
                        queried_object = _a.sent();
                        if (!queried_object) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.saveCacheWithUpdate(function () {
                                _this.updateObjectFromQuery(queried_object, new_query);
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Database.prototype.removeFromQuery = function (query, remove_all) {
        return __awaiter(this, void 0, void 0, function () {
            var db, length_1, _loop_1, this_1, _i, db_2, obj, state_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadCache()];
                    case 1:
                        db = _a.sent();
                        if (!db) {
                            return [2 /*return*/, false];
                        }
                        if (!remove_all) return [3 /*break*/, 3];
                        length_1 = db.length;
                        return [4 /*yield*/, this.saveCacheWithUpdate(function () {
                                _this.data_base_cache = db.filter(function (obj) { return !_this.matchesQuery(obj, query); });
                            })];
                    case 2:
                        _a.sent();
                        if (!this.data_base_cache) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, this.data_base_cache.length > length_1];
                    case 3:
                        _loop_1 = function (obj) {
                            var index_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!this_1.matchesQuery(obj, query)) return [3 /*break*/, 2];
                                        index_1 = db.indexOf(obj);
                                        return [4 /*yield*/, this_1.saveCacheWithUpdate(function () {
                                                db.splice(index_1, 1);
                                            })];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/, { value: true }];
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, db_2 = db;
                        _a.label = 4;
                    case 4:
                        if (!(_i < db_2.length)) return [3 /*break*/, 7];
                        obj = db_2[_i];
                        return [5 /*yield**/, _loop_1(obj)];
                    case 5:
                        state_1 = _a.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        console.log('[Error] Failed to remove object (object not found)...');
                        return [2 /*return*/, false];
                }
            });
        });
    };
    Database.prototype.containsQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var actual_data, ex_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.fileCheck()) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.loadCache()];
                    case 1:
                        actual_data = _a.sent();
                        if (!actual_data) {
                            console.log("[Error] Actual Data is null / undefined...");
                            return [2 /*return*/, false];
                        }
                        try {
                            return [2 /*return*/, actual_data.some(function (data) { return _this.matchesQuery(data, query); })];
                        }
                        catch (ex) {
                            console.log('[Error] Exception while running matchesQuery()...');
                            console.log('[Info] Details: ' + ex);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        console.log('[Error] Exception while examining file...');
                        console.log('[Info] Details: ' + ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.readDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.fileCheck()) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, fs.promises.readFile(this.DB_FILE_PATH, 'utf-8')];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, JSON.parse(result)];
                    case 2:
                        ex_3 = _a.sent();
                        console.log('[Error] Exception while reading file...');
                        console.log('[Info] Details: ' + ex_3);
                        return [2 /*return*/, undefined];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.rewriteDatabase = function (array) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.fileCheck()) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fs.promises.writeFile(this.DB_FILE_PATH, JSON.stringify(array, null, this.indent_spaces), 'utf-8')];
                    case 1:
                        _a.sent();
                        console.log('[Success] File rewritten sucessfully...');
                        return [3 /*break*/, 3];
                    case 2:
                        ex_4 = _a.sent();
                        console.log('[Error] Exception while rewriting file...');
                        console.log('[Info] Details: ' + ex_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getObjectFromQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var actual_data, _i, actual_data_1, data, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.loadCache()];
                    case 1:
                        actual_data = _a.sent();
                        if (!actual_data) {
                            console.log("[Error] Actual Data is null / undefined...");
                            return [2 /*return*/, undefined];
                        }
                        try {
                            for (_i = 0, actual_data_1 = actual_data; _i < actual_data_1.length; _i++) {
                                data = actual_data_1[_i];
                                if (this.matchesQuery(data, query)) {
                                    return [2 /*return*/, data];
                                }
                            }
                            return [2 /*return*/, undefined];
                        }
                        catch (ex) {
                            console.log('[Error] Exception while running matchesQuery()...');
                            console.log('[Info] Details: ' + ex);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_5 = _a.sent();
                        console.log('[Error] Exception while examining file...');
                        console.log('[Info] Details: ' + ex_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getObjectFromQueryFromData = function (query, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, data_1, obj;
            return __generator(this, function (_a) {
                try {
                    for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                        obj = data_1[_i];
                        if (this.matchesQuery(obj, query)) {
                            return [2 /*return*/, obj];
                        }
                    }
                    return [2 /*return*/, undefined];
                }
                catch (ex) {
                    console.log('[Error] Exception while running matchesQuery()...');
                    console.log('[Info] Details: ' + ex);
                }
                return [2 /*return*/];
            });
        });
    };
    Database.prototype.matchesQuery = function (json, query) {
        if (!json || !query) {
            return false;
        }
        return Object.entries(query).every(function (_a) {
            var key = _a[0], value = _a[1];
            return json[key] === value;
        });
    };
    Database.prototype.loadCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.fileCheck()) {
                            return [2 /*return*/, []];
                        }
                        if (!!this.data_base_cache) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs.promises.readFile(this.DB_FILE_PATH, 'utf-8')];
                    case 2:
                        data = _a.sent();
                        this.data_base_cache = JSON.parse(data);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('[Error] Failed to read file...');
                        console.log('[Info] Error details: ' + err_1);
                        this.data_base_cache = [];
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, this.data_base_cache];
                }
            });
        });
    };
    Database.prototype.saveCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.fileCheck() || !this.data_base_cache) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, fs.promises.writeFile(this.DB_FILE_PATH, JSON.stringify(this.data_base_cache, null, this.indent_spaces), 'utf-8')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log('[Error] Failed to write file...');
                        console.log('[Info] Error details: ' + err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.clearCache = function () {
        this.data_base_cache = null;
    };
    Database.prototype.saveCacheWithUpdate = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.unwatchFile();
                        return [4 /*yield*/, task()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.saveCache()];
                    case 2:
                        _a.sent();
                        this.watchFile();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        console.log('[Error] Failed to save cache with update...');
                        console.log('[Info] Error details: ' + err_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.watchFile = function () {
        var _this = this;
        if (this.watching_file) {
            return;
        }
        fs.watchFile(this.DB_FILE_PATH, function (curr, prev) {
            if (curr.mtimeMs !== prev.mtimeMs) {
                console.log('[Info] File changed on disk, clearing cache...');
                _this.clearCache();
            }
        });
        this.watching_file = true;
    };
    Database.prototype.unwatchFile = function () {
        if (!this.watching_file) {
            return;
        }
        fs.unwatchFile(this.DB_FILE_PATH);
        this.watching_file = false;
    };
    Database.prototype.fileCheck = function () {
        if (!fs.existsSync(this.DB_FILE_PATH)) {
            console.log('[Error] File doesn\'t exist');
            return false;
        }
        return true;
    };
    return Database;
}());
exports.Database = Database;
