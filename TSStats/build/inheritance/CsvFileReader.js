"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvFileReader = void 0;
var fs_1 = __importDefault(require("fs"));
var CsvFileReader = /** @class */ (function () {
    function CsvFileReader(fileName) {
        this.fileName = fileName;
        this.data = [];
    }
    CsvFileReader.prototype.read = function () {
        this.data = fs_1.default.readFileSync(this.fileName, {
            encoding: 'utf-8'
        }).split('\n').map(function (row) {
            return row.split(',');
        }).map(this.mapRow);
    };
    return CsvFileReader;
}());
exports.CsvFileReader = CsvFileReader;
