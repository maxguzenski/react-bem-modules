'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function isPlain(value) {
  var type = typeof value;
  return type === 'number' || type === 'string' || type === 'boolean';
}

exports['default'] = function (css, rootName) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  css = !css ? {} : css;
  options = typeof rootName === 'string' ? options : rootName;
  rootName = typeof rootName === 'string' ? rootName : 'root';

  options = _extends({ mergeStyles: true }, options);

  function getClass(k, v) {
    return css[isPlain(v) ? rootName + '--' + k + '-' + v : rootName + '--' + k + '-' + !!v];
  }

  function buildBemClasses(self, node) {
    var allKlzzs = [];
    var allProps = _extends({}, self.state || {}, self.props);

    for (var k in allProps) {
      var sp = getClass(k, allProps[k]);
      sp && allKlzzs.push(sp);
    }

    var className = (0, _classnames2['default'])(css[rootName], allKlzzs, node.props.className, self.props.className);

    if (className.trim) className = className.trim();
    if (className === '') className = null;

    if (options.mergeStyles) {
      return { className: className, style: _extends({}, self.props.style, node.props.style) };
    } else {
      return { className: className };
    }
  }

  return function (DecoredComponent) {
    return (function (_DecoredComponent) {
      _inherits(WrapComponent, _DecoredComponent);

      function WrapComponent() {
        _classCallCheck(this, WrapComponent);

        _get(Object.getPrototypeOf(WrapComponent.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(WrapComponent, [{
        key: 'render',
        value: function render() {
          var elem = _get(Object.getPrototypeOf(WrapComponent.prototype), 'render', this).call(this);
          if (!elem) return elem;

          var props = buildBemClasses(this, elem);
          return _react2['default'].cloneElement(elem, props);
        }
      }]);

      return WrapComponent;
    })(DecoredComponent);
  };
};

module.exports = exports['default'];