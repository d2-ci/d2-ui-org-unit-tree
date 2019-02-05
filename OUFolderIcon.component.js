import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

var OUFolderIconComponent = function OUFolderIconComponent(_ref) {
    var isExpanded = _ref.isExpanded,
        styles = _ref.styles;

    return isExpanded ? React.createElement(FolderOpenIcon, { style: styles }) : React.createElement(FolderIcon, { style: styles });
};

export default OUFolderIconComponent;