"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var get = function get(getFunction) {
    return function (model) {
        var methods = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var after = methods.after;

        return function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(request) {
                var rows;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return getFunction(model, request);

                            case 2:
                                rows = _context.sent;

                                if (!after) {
                                    _context.next = 9;
                                    break;
                                }

                                _context.next = 6;
                                return after(rows, request);

                            case 6:
                                _context.t0 = _context.sent;
                                _context.next = 10;
                                break;

                            case 9:
                                _context.t0 = rows;

                            case 10:
                                return _context.abrupt("return", _context.t0);

                            case 11:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function (_x2) {
                return _ref.apply(this, arguments);
            };
        }();
    };
};
exports.default = get;