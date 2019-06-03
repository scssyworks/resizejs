(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.resizejs = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  var mediaTypes = {
    MOBILE: 'mobile',
    MOBILE_SMALL: 'mobile-small',
    MOBILE_LARGE: 'mobile-large',
    TABLET: 'tablet',
    TABLET_LARGE: 'tablet-large',
    DESKTOP: 'desktop',
    UNSUPPORTED: 'unsupported'
  };
  var orientationTypes = {
    LANDSCAPE: 'landscape',
    PORTRAIT: 'portrait',
    UNSUPPORTED: 'unsupported'
  };

  /**
   * Gets orientation of device
   * @private
   * @returns {string} orientation
   */

  function _getOrientation() {
    if (window.matchMedia('(orientation: portrait)').matches) {
      return orientationTypes.PORTRAIT;
    } else if (window.matchMedia('(orientation: landscape)')) {
      return orientationTypes.LANDSCAPE;
    }

    return orientationTypes.UNSUPPORTED;
  }
  /**
   * Checks if new media matches current media. If yes then returns true, else returns false and updates the currentMedia
   * @private
   * @param {object} newMedia
   * @returns {boolean} true|false
   */


  function _matches(newMedia) {
    var testConditions = this.currentMedia.media === newMedia.media;

    if (this.config.enableOrientationChange) {
      testConditions = testConditions && this.currentMedia.orientation === newMedia.orientation;
    }

    if (testConditions) {
      return true;
    }

    this.currentMedia = newMedia;
    return false;
  }
  /**
   * Checks if new media matches current media. If yes then returns true, else returns false and updates the currentMedia
   * @private
   * @param {object} newMedia
   * @returns {boolean} true|false
   */


  function _baseMatches(newMedia) {
    var testConditions = this.currentMedia.baseMedia === newMedia.baseMedia;

    if (this.config.enableOrientationChange) {
      testConditions = testConditions && this.currentMedia.orientation === newMedia.orientation;
    }

    return testConditions;
  }
  /**
   * Get's current device media details
   * @private
   * @returns {Object} media object
   */


  function _getMedia() {
    var _this$config$breakpoi = this.config.breakpoints,
        mobile = _this$config$breakpoi.mobile,
        mobileLarge = _this$config$breakpoi.mobileLarge,
        tablet = _this$config$breakpoi.tablet,
        tabletLarge = _this$config$breakpoi.tabletLarge,
        desktop = _this$config$breakpoi.desktop;
    var mediaInfo = {
      orientation: this.getOrientation()
    };

    if (window.matchMedia("(max-width: ".concat(mobile - 1, "px)")).matches) {
      return _objectSpread({
        media: mediaTypes.MOBILE_SMALL,
        baseMedia: mediaTypes.MOBILE
      }, mediaInfo);
    } else if (window.matchMedia("(min-width: ".concat(mobile, "px) and (max-width: ").concat(mobileLarge - 1, ")")).matches) {
      return _objectSpread({
        media: mediaTypes.MOBILE,
        baseMedia: mediaTypes.MOBILE
      }, mediaInfo);
    } else if (window.matchMedia("(min-width: ".concat(mobileLarge, "px) and (max-width: ").concat(tablet - 1, ")")).matches) {
      return _objectSpread({
        media: mediaTypes.MOBILE_LARGE,
        baseMedia: mediaTypes.MOBILE
      }, mediaInfo);
    } else if (window.matchMedia("(min-width: ".concat(tablet, "px) and (max-width: ").concat(tabletLarge - 1, ")")).matches) {
      return _objectSpread({
        media: mediaTypes.TABLET,
        baseMedia: mediaTypes.TABLET
      }, mediaInfo);
    } else if (window.matchMedia("(min-width: ".concat(tabletLarge, "px) and (max-width: ").concat(desktop - 1, ")")).matches) {
      return _objectSpread({
        media: mediaTypes.TABLET_LARGE,
        baseMedia: mediaTypes.TABLET
      }, mediaInfo);
    } else {
      return _objectSpread({
        media: mediaTypes.DESKTOP,
        baseMedia: mediaTypes.DESKTOP
      }, mediaInfo);
    }
  }
  /**
   * Resizable class for responsive events
   * @public
   */


  var Resizable =
  /*#__PURE__*/
  function () {
    /**
     * Resizable constructor
     * @constructor
     * @param {object} config Configuration object
     */
    function Resizable(config) {
      var _this = this;

      _classCallCheck(this, Resizable);

      config = config && _typeof(config) === 'object' ? config : {};
      this.currentMedia = null;
      this.config = _objectSpread({
        breakpoints: {
          mobile: 320,
          mobileLarge: 414,
          tablet: 768,
          tabletLarge: 1024,
          desktop: 1200
        },
        enableOrientationChange: false
      }, config);
      window.addEventListener('resize', function () {
        var CustomEventConst = CustomEvent || Event;

        var newMedia = _this.getMedia();

        var customEventConfig = {
          detail: _objectSpread({}, newMedia),
          bubbles: false,
          cancelable: false
        };
        var mediaChanged = new CustomEventConst('media.changed', customEventConfig);
        var baseMediaChanged = new CustomEventConst('basemedia.changed', customEventConfig);

        if (!_matches.apply(_this, [newMedia])) {
          window.dispatchEvent(mediaChanged);
        }

        if (!_baseMatches.apply(_this, [newMedia])) {
          window.dispatchEvent(baseMediaChanged);
        }
      });
    }

    _createClass(Resizable, [{
      key: "getMedia",
      value: function getMedia() {
        return _getMedia.apply(this, arguments);
      }
    }, {
      key: "getOrientation",
      value: function getOrientation() {
        return _getOrientation.apply(this, arguments);
      }
    }]);

    return Resizable;
  }();

  return Resizable;

}));
//# sourceMappingURL=resize.js.map
