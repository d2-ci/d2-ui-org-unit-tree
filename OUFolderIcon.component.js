'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Folder = require('@material-ui/icons/Folder');

var _Folder2 = _interopRequireDefault(_Folder);

var _FolderOpen = require('@material-ui/icons/FolderOpen');

var _FolderOpen2 = _interopRequireDefault(_FolderOpen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OUFolderIconComponent = function OUFolderIconComponent(_ref) {
    var isExpanded = _ref.isExpanded,
        styles = _ref.styles;

    return isExpanded ? _react2.default.createElement(_FolderOpen2.default, { style: styles }) : _react2.default.createElement(_Folder2.default, { style: styles });
};

exports.default = OUFolderIconComponent;