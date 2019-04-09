'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _LinearProgress = require('@material-ui/core/LinearProgress');

var _LinearProgress2 = _interopRequireDefault(_LinearProgress);

var _Stop = require('@material-ui/icons/Stop');

var _Stop2 = _interopRequireDefault(_Stop);

var _TreeView = require('@dhis2/d2-ui-core/tree-view/TreeView.component');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _OrgUnitTreeComponent = require('./styles/OrgUnitTree.component.styles');

var _OrgUnitTreeComponent2 = _interopRequireDefault(_OrgUnitTreeComponent);

var _OUFolderIcon = require('./OUFolderIcon.component');

var _OUFolderIcon2 = _interopRequireDefault(_OUFolderIcon);

var _OUCheckbox = require('./OUCheckbox.component');

var _OUCheckbox2 = _interopRequireDefault(_OUCheckbox);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrgUnitTree = function (_React$Component) {
    (0, _inherits3.default)(OrgUnitTree, _React$Component);

    function OrgUnitTree(props) {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, OrgUnitTree);

        var _this = (0, _possibleConstructorReturn3.default)(this, (OrgUnitTree.__proto__ || (0, _getPrototypeOf2.default)(OrgUnitTree)).call(this, props));

        _this.onCollapse = function (orgUnit) {
            if (typeof _this.props.onCollapse === 'function') {
                _this.props.onCollapse(orgUnit);
            }
        };

        _this.onExpand = function (orgUnit) {
            _this.loadChildren();

            if (typeof _this.props.onExpand === 'function') {
                _this.props.onExpand(orgUnit);
            }
        };

        _this.onContextMenuClick = function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (_this.props.onContextMenuClick !== undefined) {
                _this.props.onContextMenuClick(e, _this.props.root, _this.hasChildren(), _this.loadChildren);
            }
        };

        _this.setChildState = function (children) {
            var data = children;

            if (_this.props.onChildrenLoaded) {
                _this.props.onChildrenLoaded(children);
            }

            if (!Array.isArray(children)) {
                data = children.toArray();
            }

            _this.setState({
                children: data.sort(function (a, b) {
                    return a.displayName.localeCompare(b.displayName);
                }),
                loading: false
            });
        };

        _this.hideChildren = function () {
            _this.setChildState([]);
        };

        _this.loadChildren = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var children;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!(_this.state.children !== undefined)) {
                                _context.next = 2;
                                break;
                            }

                            return _context.abrupt('return', _this.state.children);

                        case 2:
                            if (!(_this.state.children === undefined && !_this.state.loading || _this.props.idsThatShouldBeReloaded.indexOf(_this.props.root.id) >= 0)) {
                                _context.next = 9;
                                break;
                            }

                            _this.setState({ loading: true });

                            _context.next = 6;
                            return (0, _utils.loadChildren)(_this.props.root, _this.props.displayNameProperty, _this.props.forceReloadChildren);

                        case 6:
                            children = _context.sent;


                            _this.setChildState(children);

                            return _context.abrupt('return', children);

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));

        _this.handleSelectClick = function (e) {
            if (_this.props.onSelectClick) {
                _this.props.onSelectClick(e, _this.props.root);
            }
            e.stopPropagation();
        };

        _this.hasChildren = function () {
            console.log('hasChildren fn', _this.state.children);

            return _this.state.children === undefined || Array.isArray(_this.state.children) && _this.state.children.length > 0;
        };

        _this.shouldIncludeOrgUnit = function (orgUnit) {
            if (!_this.props.orgUnitsPathsToInclude || _this.props.orgUnitsPathsToInclude.length === 0) {
                return true;
            }
            return !!_this.props.orgUnitsPathsToInclude.some(function (ou) {
                return ou.includes('/' + orgUnit.id);
            });
        };

        _this.setCurrentRoot = function (e) {
            e.stopPropagation();

            _this.props.onChangeCurrentRoot(_this.props.root);
        };

        _this.state = {
            children: props.root.children === false || Array.isArray(props.root.children) && props.root.children.length === 0 ? [] : undefined,
            loading: false
        };
        console.log('is it a function?', typeof props.root.children.toArray === 'function');
        if (props.root.children && typeof props.root.children.toArray === 'function' && !props.root.children.hasUnloadedData) {
            _this.state.children = props.root.children.toArray()
            // Sort here since the API returns nested children in random order
            .sort(function (a, b) {
                return a.displayName.localeCompare(b.displayName);
            });
        }
        return _this;
    }

    (0, _createClass3.default)(OrgUnitTree, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            if (this.props.initiallyExpanded.some(function (ou) {
                return ou.includes('/' + _this3.props.root.id);
            })) {
                this.loadChildren();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (newProps.initiallyExpanded.some(function (ou) {
                return ou.includes('/' + newProps.root.id);
            }) || newProps.idsThatShouldBeReloaded.includes(newProps.root.id)) {
                this.loadChildren();
            }
        }
    }, {
        key: 'renderChild',
        value: function renderChild(orgUnit, expandedProp) {
            if (!this.shouldIncludeOrgUnit(orgUnit)) {
                return null;
            }

            var highlighted = this.props.searchResults.includes(orgUnit.path) && this.props.highlightSearchResults;

            return _react2.default.createElement(OrgUnitTree, {
                key: orgUnit.id,
                root: orgUnit,
                onExpand: this.onExpand,
                onCollapse: this.onCollapse,
                selected: this.props.selected,
                initiallyExpanded: expandedProp,
                onSelectClick: this.props.onSelectClick,
                onContextMenuClick: this.props.onContextMenuClick,
                currentRoot: this.props.currentRoot,
                onChangeCurrentRoot: this.props.onChangeCurrentRoot,
                labelStyle: (0, _extends3.default)({}, this.props.labelStyle, {
                    fontWeight: highlighted ? 500 : this.props.labelStyle.fontWeight,
                    color: highlighted ? 'orange' : 'inherit'
                }),
                selectedLabelStyle: this.props.selectedLabelStyle,
                arrowSymbol: this.props.arrowSymbol,
                idsThatShouldBeReloaded: this.props.idsThatShouldBeReloaded,
                hideCheckboxes: this.props.hideCheckboxes,
                onChildrenLoaded: this.props.onChildrenLoaded,
                hideMemberCount: this.props.hideMemberCount,
                orgUnitsPathsToInclude: this.props.orgUnitsPathsToInclude,
                treeStyle: this.props.treeStyle,
                searchResults: this.props.searchResults,
                highlightSearchResults: this.props.highlightSearchResults,
                forceReloadChildren: this.props.forceReloadChildren,
                showFolderIcon: this.props.showFolderIcon,
                disableSpacer: this.props.disableSpacer,
                checkboxColor: this.props.checkboxColor,
                displayNameProperty: this.props.displayNameProperty
            });
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var _this4 = this;

            // If initiallyExpanded is an array, remove the current root id and pass the rest on
            // If it's a string, pass it on unless it's the current root id
            var expandedProp = Array.isArray(this.props.initiallyExpanded) ? this.props.initiallyExpanded.filter(function (id) {
                return id !== _this4.props.root.id;
            }) : this.props.initiallyExpanded !== this.props.root.id && this.props.initiallyExpanded || [];

            if (Array.isArray(this.state.children) && this.state.children.length > 0) {
                return this.state.children.map(function (orgUnit) {
                    return _this4.renderChild(orgUnit, expandedProp);
                });
            }

            if (this.state.loading) {
                return _react2.default.createElement(
                    'div',
                    { style: _OrgUnitTreeComponent2.default.progress },
                    _react2.default.createElement(_LinearProgress2.default, { style: _OrgUnitTreeComponent2.default.progressBar })
                );
            }

            return null;
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel(isSelected, isSelectable, isInitiallyExpanded, canBecomeCurrentRoot, currentOu, hasChildren, memberCount) {
            var labelStyle = (0, _extends3.default)({}, _OrgUnitTreeComponent2.default.label, {
                fontWeight: isSelected ? 500 : 300,
                color: isSelected ? 'orange' : 'inherit',
                cursor: canBecomeCurrentRoot ? 'pointer' : 'default'
            }, isSelected ? this.props.selectedLabelStyle : this.props.labelStyle);

            return _react2.default.createElement(
                'div',
                {
                    style: labelStyle,
                    onClick: canBecomeCurrentRoot ? this.setCurrentRoot : isSelectable ? this.handleSelectClick : undefined,
                    onContextMenu: this.onContextMenuClick,
                    role: 'button',
                    tabIndex: 0
                },
                isSelectable && !this.props.hideCheckboxes && _react2.default.createElement(_OUCheckbox2.default, {
                    checked: isSelected,
                    disabled: !isSelectable,
                    onClick: this.handleSelectClick,
                    color: this.props.checkboxColor
                }),
                this.props.showFolderIcon && hasChildren && _react2.default.createElement(_OUFolderIcon2.default, {
                    isExpanded: isInitiallyExpanded,
                    styles: this.props.labelStyle.folderIcon
                }),
                this.props.showFolderIcon && !hasChildren && _react2.default.createElement(_Stop2.default, { style: (0, _extends3.default)({}, _OrgUnitTreeComponent2.default.stopIcon, this.props.labelStyle.stopIcon) }),
                _react2.default.createElement(
                    'span',
                    { style: this.props.labelStyle.text },
                    currentOu.displayName
                ),
                hasChildren && !this.props.hideMemberCount && !!memberCount && _react2.default.createElement(
                    'span',
                    { style: _OrgUnitTreeComponent2.default.memberCount },
                    '(',
                    memberCount,
                    ')'
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var currentOu = this.props.root;
            var hasChildren = this.hasChildren();
            var isSelectable = !!this.props.onSelectClick;
            var pathRegEx = new RegExp('/' + currentOu.id + '$');
            var memberRegEx = new RegExp('/' + currentOu.id);
            var isSelected = this.props.selected && this.props.selected.some(function (ou) {
                return pathRegEx.test(ou);
            });
            var isCurrentRoot = this.props.currentRoot && this.props.currentRoot.id === currentOu.id;
            var isInitiallyExpanded = this.props.initiallyExpanded.some(function (ou) {
                return ou.includes('/' + currentOu.id);
            });
            var canBecomeCurrentRoot = this.props.onChangeCurrentRoot && !isCurrentRoot && hasChildren;

            var memberCount = this.props.selected !== undefined ? this.props.selected.filter(function (ou) {
                return memberRegEx.test(ou);
            }).length : currentOu.memberCount;

            var ouContainerStyle = (0, _extends3.default)({}, _OrgUnitTreeComponent2.default.ouContainer, isCurrentRoot ? _OrgUnitTreeComponent2.default.currentOuContainer : {}, this.props.treeStyle);

            var label = this.renderLabel(isSelected, isSelectable, isInitiallyExpanded, canBecomeCurrentRoot, currentOu, hasChildren, memberCount);

            console.log('hasChildren?', hasChildren);

            if (hasChildren) {
                return _react2.default.createElement(
                    _TreeView2.default,
                    {
                        label: label,
                        onExpand: this.onExpand,
                        onCollapse: this.onCollapse,
                        model: this.props.root,
                        initiallyExpanded: isInitiallyExpanded,
                        arrowSymbol: this.props.arrowSymbol,
                        className: 'orgunit with-children',
                        style: ouContainerStyle,
                        persistent: true
                    },
                    this.renderChildren()
                );
            }

            return _react2.default.createElement(
                'div',
                {
                    onClick: isSelectable ? this.handleSelectClick : undefined,
                    className: 'orgunit without-children',
                    style: ouContainerStyle,
                    role: 'button',
                    tabIndex: 0
                },
                !this.props.disableSpacer && _react2.default.createElement('div', { style: _OrgUnitTreeComponent2.default.spacer }),
                label
            );
        }
    }]);
    return OrgUnitTree;
}(_react2.default.Component);

function orgUnitPathPropValidator(propValue, key, compName, location, propFullName) {
    if (!/(\/[a-zA-Z][a-zA-Z0-9]{10})+/.test(propValue[key])) {
        return new Error('Invalid org unit path `' + propValue[key] + '` supplied to `' + compName + '.' + propFullName + '`');
    }
    return undefined;
}

OrgUnitTree.propTypes = {
    /**
     * The root OrganisationUnit of the tree, ModelBase
     *
     * If the root OU is known to have no children, the `children` property of the root OU should be either
     * `false` or an empty array. If the children property is undefined, the children will be fetched from
     * the server when the tree is expanded.
     */
    root: _propTypes2.default.object.isRequired,

    /**
     * Display name property
     */
    displayNameProperty: _propTypes2.default.string,

    /**
     * An array of paths of selected OUs
     *
     * The path of an OU is the UIDs of the OU and all its parent OUs separated by slashes (/)
     */
    selected: _propTypes2.default.arrayOf(orgUnitPathPropValidator),

    /**
     * An array of OU paths that will be expanded automatically as soon as they are encountered
     *
     * The path of an OU is the UIDs of the OU and all its parent OUs separated by slashes (/)
     */
    initiallyExpanded: _propTypes2.default.arrayOf(orgUnitPathPropValidator),

    /**
     * onExpand callback is triggered when user expands organisation unit
     *
     * Will receive one argument - OU that was expanded
     */
    onExpand: _propTypes2.default.func,

    /**
     * onCollapse callback is triggered when user collapses organisation unit
     *
     * Will receive one argument - OU that was collapsed
     */
    onCollapse: _propTypes2.default.func,

    /**
     * onSelectClick callback, which is triggered when a click triggers the selection of an organisation unit
     *
     * The onSelectClick callback will receive two arguments: The original click event, and the OU that was clicked
     */
    onSelectClick: _propTypes2.default.func,

    /**
     * onChangeCurrentRoot callback, which is triggered when the change current root label is clicked. Setting this also
     * enables the display of the change current root label
     *
     * the onChangeCurrentRoot callback will receive two arguments: The original click event, and the organisation unit
     * model object that was selected as the new root
     */
    onChangeCurrentRoot: _propTypes2.default.func,

    /**
     * Organisation unit model representing the current root
     */
    currentRoot: _propTypes2.default.object,

    /**
     * onChildrenLoaded callback, which is triggered when the children of this root org unit have been loaded
     *
     * The callback receives one argument: A D2 ModelCollection object that contains all the newly loaded org units
     */
    onChildrenLoaded: _propTypes2.default.func,

    /**
     * Custom styling for OU labels
     */
    labelStyle: _propTypes2.default.object,

    /**
     * Custom styling for trees
     */
    treeStyle: _propTypes2.default.object,

    /**
     * Custom styling for the labels of selected OUs
     */
    selectedLabelStyle: _propTypes2.default.object,

    /**
     * An array of organisation unit IDs that should be reloaded from the API
     */
    idsThatShouldBeReloaded: _propTypes2.default.arrayOf(_propTypes2.default.string),

    /**
     * Custom arrow symbol
     */
    arrowSymbol: _propTypes2.default.string,

    /**
     * If true, don't display checkboxes next to org unit labels
     */
    hideCheckboxes: _propTypes2.default.bool,

    /**
     * if true, don't display the selected member count next to org unit labels
     */
    hideMemberCount: _propTypes2.default.bool,

    /**
     * Array of paths of Organisation Units to include on tree. If not defined or empty, all children from root to leafs will be shown
     */
    orgUnitsPathsToInclude: _propTypes2.default.array,

    /**
     * If true `root.children.load` (a method on d2.ModelCollectionProperty) will be called with forceReload set to true, which is required
     * for dynamic OrgUnitTrees, i.e. in cases where parent-child relations are updated
     */
    forceReloadChildren: _propTypes2.default.bool,

    /**
     * Results from search
     */
    searchResults: _propTypes2.default.array,

    /**
     * Indicates if search results should be highlighted
     */
    highlightSearchResults: _propTypes2.default.bool,

    /**
     * Indicates if showing folder icon is enabled
     */
    showFolderIcon: _propTypes2.default.bool,

    /**
     * Prop indicating if spacer should be enabled
     */
    disableSpacer: _propTypes2.default.bool,

    /**
     * Prop indicating checkbox color
     */
    checkboxColor: _propTypes2.default.string,

    /**
     * Prop function invoked when user opens context menu against org unit
     */
    onContextMenuClick: _propTypes2.default.func
};

OrgUnitTree.defaultProps = {
    displayNameProperty: 'displayName',
    selected: [],
    initiallyExpanded: [],
    onSelectClick: undefined,
    onContextMenuClick: undefined,
    onExpand: undefined,
    onCollapse: undefined,
    onChangeCurrentRoot: undefined,
    currentRoot: undefined,
    onChildrenLoaded: undefined,
    labelStyle: {},
    treeStyle: {},
    selectedLabelStyle: {},
    idsThatShouldBeReloaded: [],
    arrowSymbol: undefined,
    hideCheckboxes: false,
    hideMemberCount: false,
    orgUnitsPathsToInclude: null,
    forceReloadChildren: false,
    searchResults: [],
    highlightSearchResults: false,
    showFolderIcon: false,
    disableSpacer: false,
    checkboxColor: 'primary'
};

exports.default = OrgUnitTree;