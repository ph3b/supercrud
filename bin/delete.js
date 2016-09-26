"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var del = function del(deleteFunction) {
    return function (model) {
        var methods = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var validate = methods.validate;
        var after = methods.after;
        var onValidationError = methods.onValidationError;

        return function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(request) {
                var result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!validate) {
                                    _context.next = 16;
                                    break;
                                }

                                _context.prev = 1;
                                _context.next = 4;
                                return validate(model, request);

                            case 4:
                                _context.next = 16;
                                break;

                            case 6:
                                _context.prev = 6;
                                _context.t0 = _context["catch"](1);

                                if (!onValidationError) {
                                    _context.next = 14;
                                    break;
                                }

                                _context.next = 11;
                                return onValidationError(_context.t0, request);

                            case 11:
                                _context.t1 = _context.sent;
                                _context.next = 15;
                                break;

                            case 14:
                                _context.t1 = _context.t0.message;

                            case 15:
                                return _context.abrupt("return", _context.t1);

                            case 16:
                                _context.next = 18;
                                return deleteFunction(model, request);

                            case 18:
                                result = _context.sent;

                                if (!after) {
                                    _context.next = 25;
                                    break;
                                }

                                _context.next = 22;
                                return after(model, result, request);

                            case 22:
                                _context.t2 = _context.sent;
                                _context.next = 26;
                                break;

                            case 25:
                                _context.t2 = result;

                            case 26:
                                return _context.abrupt("return", _context.t2);

                            case 27:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, undefined, [[1, 6]]);
            }));

            return function (_x2) {
                return _ref.apply(this, arguments);
            };
        }();
    };
};
exports.default = del;