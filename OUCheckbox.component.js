'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _CheckBox = require('@material-ui/icons/CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _CheckBoxOutlineBlank = require('@material-ui/icons/CheckBoxOutlineBlank');

var _CheckBoxOutlineBlank2 = _interopRequireDefault(_CheckBoxOutlineBlank);

var _OUCheckboxComponent = require('./styles/OUCheckbox.component.styles');

var _OUCheckboxComponent2 = _interopRequireDefault(_OUCheckboxComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OUCheckboxComponent = function OUCheckboxComponent(_ref) {
    var checked = _ref.checked,
        disabled = _ref.disabled,
        onClick = _ref.onClick,
        color = _ref.color;

    return _react2.default.createElement(_Checkbox2.default, {
        style: _OUCheckboxComponent2.default.checkbox,
        checked: checked,
        disabled: disabled,
        onClick: onClick,
        color: color,
        icon: _react2.default.createElement(_CheckBoxOutlineBlank2.default, { style: _OUCheckboxComponent2.default.uncheckedCheckbox }),
        checkedIcon: _react2.default.createElement(_CheckBox2.default, { style: { fontSize: 15 } })
    });
};

exports.default = OUCheckboxComponent;