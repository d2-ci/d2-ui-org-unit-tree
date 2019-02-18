import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import styles from './styles/OUCheckbox.component.styles';

var OUCheckboxComponent = function OUCheckboxComponent(_ref) {
    var checked = _ref.checked,
        disabled = _ref.disabled,
        onClick = _ref.onClick,
        color = _ref.color;

    return React.createElement(Checkbox, {
        style: styles.checkbox,
        checked: checked,
        disabled: disabled,
        onClick: onClick,
        color: color,
        icon: React.createElement(CheckBoxOutlineBlankIcon, { style: styles.uncheckedCheckbox }),
        checkedIcon: React.createElement(CheckBoxIcon, { style: { fontSize: 15 } })
    });
};

export default OUCheckboxComponent;