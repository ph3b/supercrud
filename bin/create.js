'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var create = function create(saveFunction) {
    return function (model, methods) {
        var update = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        var requiredAttributes = methods.requiredAttributes;
        var allowedAttributes = methods.allowedAttributes;
        var validate = methods.validate;
        var before = methods.before;
        var after = methods.after;
        var onError = methods.onError;
        var onValidationError = methods.onValidationError;

        return function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(newModel, request) {
                var _ret, transformedModel, insertedModel;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                if (!requiredAttributes) {
                                    _context.next = 5;
                                    break;
                                }

                                _ret = function () {
                                    var missingAttributes = requiredAttributes.filter(function (attr) {
                                        return newModel[attr] === undefined;
                                    });
                                    if (missingAttributes.length > 0) {
                                        var defaultErrorString = missingAttributes.reduce(function (string, attribute, i) {
                                            return string + (' ' + attribute + (i === missingAttributes.length - 1 ? '.' : ','));
                                        }, 'Missing attributes:');
                                        return {
                                            v: defaultErrorString
                                        };
                                    }
                                }();

                                if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt('return', _ret.v);

                            case 5:
                                if (!validate) {
                                    _context.next = 21;
                                    break;
                                }

                                _context.prev = 6;
                                _context.next = 9;
                                return validate(newModel, request);

                            case 9:
                                _context.next = 21;
                                break;

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context['catch'](6);

                                if (!onValidationError) {
                                    _context.next = 19;
                                    break;
                                }

                                _context.next = 16;
                                return onValidationError(_context.t0, request);

                            case 16:
                                _context.t1 = _context.sent;
                                _context.next = 20;
                                break;

                            case 19:
                                _context.t1 = _context.t0;

                            case 20:
                                return _context.abrupt('return', _context.t1);

                            case 21:

                                if (allowedAttributes) {
                                    newModel = allowedAttributes.reduce(function (formattedModel, attribute) {
                                        if (newModel[attribute]) formattedModel[attribute] = newModel[attribute];
                                        return formattedModel;
                                    }, {});
                                }

                                if (!before) {
                                    _context.next = 28;
                                    break;
                                }

                                _context.next = 25;
                                return before(newModel, request);

                            case 25:
                                _context.t2 = _context.sent;
                                _context.next = 29;
                                break;

                            case 28:
                                _context.t2 = newModel;

                            case 29:
                                transformedModel = _context.t2;
                                _context.next = 32;
                                return saveFunction(model, transformedModel, request);

                            case 32:
                                insertedModel = _context.sent;

                                if (!after) {
                                    _context.next = 39;
                                    break;
                                }

                                _context.next = 36;
                                return after(insertedModel, request);

                            case 36:
                                _context.t3 = _context.sent;
                                _context.next = 40;
                                break;

                            case 39:
                                _context.t3 = insertedModel;

                            case 40:
                                return _context.abrupt('return', _context.t3);

                            case 43:
                                _context.prev = 43;
                                _context.t4 = _context['catch'](0);

                                if (!onError) {
                                    _context.next = 51;
                                    break;
                                }

                                _context.next = 48;
                                return onError(_context.t4, request);

                            case 48:
                                return _context.abrupt('return', _context.sent);

                            case 51:
                                throw new Error(_context.t4);

                            case 52:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined, [[0, 43], [6, 11]]);
            }));

            return function (_x2, _x3) {
                return _ref.apply(this, arguments);
            };
        }();
    };
};
exports.default = create;