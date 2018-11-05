import _Object$assign from 'babel-runtime/core-js/object/assign';
import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import PropTypes from 'prop-types';
import OrgUnitTree from './OrgUnitTree.component';

export default function OrgUnitTreeMultipleRoots(props) {
    if (props.roots) {
        return React.createElement(
            'div',
            null,
            props.roots.map(function (root, index) {
                return React.createElement(OrgUnitTree, _extends({
                    key: index
                }, props, {
                    root: root,
                    onSelectClick: props.onSelectClick
                }));
            })
        );
    }

    var root = props.root;
    return React.createElement(OrgUnitTree, _extends({ root: root }, props));
}

function isOrgUnitModel(obj) {
    return obj && obj.modelDefinition && obj.modelDefinition.plural === 'organisationUnits';
}

function OrgUnitModelValidator(props, propName, componentName) {
    if (props[propName] && !isOrgUnitModel(props[propName])) {
        return new Error('Invalid org unit model supplied to `' + componentName + '.' + propName + '`');
    }
}

function OrgUnitModelArrayElementValidator(propValue, key, componentName, location, propFullName) {
    if (!isOrgUnitModel(propValue[key])) {
        return new Error('Invalid org unit model supplied to `' + componentName + '.' + propFullName + '`');
    }
}

OrgUnitTreeMultipleRoots.propTypes = _Object$assign({}, OrgUnitTree.propTypes, {
    root: OrgUnitModelValidator,
    roots: PropTypes.arrayOf(OrgUnitModelArrayElementValidator)
});