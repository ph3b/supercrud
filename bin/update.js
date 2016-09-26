'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require('./create.js');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var update = function update(updateFunction) {
  return (0, _create2.default)(updateFunction);
};
exports.default = update;