'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _delete = require('./delete');

var _delete2 = _interopRequireDefault(_delete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HandlerMaker = function HandlerMaker(_ref) {
    var saveFunction = _ref.saveFunction;
    var getFunction = _ref.getFunction;
    var updateFunction = _ref.updateFunction;
    var deleteFunction = _ref.deleteFunction;

    var utility = {};
    if (getFunction) utility.get = (0, _get2.default)(getFunction);
    if (saveFunction) utility.create = (0, _create2.default)(saveFunction);
    if (updateFunction) utility.update = (0, _update2.default)(updateFunction);
    if (deleteFunction) utility.del = (0, _delete2.default)(deleteFunction);
    return utility;
};

exports.default = HandlerMaker;