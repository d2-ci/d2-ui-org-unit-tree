'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = OrgUnitTreeMultipleRoots;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _OrgUnitTree = require('./OrgUnitTree.component');

var _OrgUnitTree2 = _interopRequireDefault(_OrgUnitTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OrgUnitTreeMultipleRoots(props) {
    if (props.roots) {
        return _react2.default.createElement(
            'div',
            null,
            props.roots.map(function (root, index) {
                return _react2.default.createElement(_OrgUnitTree2.default, (0, _extends3.default)({
                    key: index
                }, props, {
                    root: root,
                    onSelectClick: props.onSelectClick
                }));
            })
        );
    }

    var root = props.root;
    return _react2.default.createElement(_OrgUnitTree2.default, (0, _extends3.default)({ root: root }, props));
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

OrgUnitTreeMultipleRoots.propTypes = (0, _assign2.default)({}, _OrgUnitTree2.default.propTypes, {
    root: OrgUnitModelValidator,
    roots: _propTypes2.default.arrayOf(OrgUnitModelArrayElementValidator)
});