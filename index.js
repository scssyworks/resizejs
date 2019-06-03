import { mediaTypes, orientationTypes } from './lib/constants';

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
    let testConditions = this.currentMedia.media === newMedia.media;
    if (this.config.enableOrientationChange) {
        testConditions = testConditions && this.currentMedia.orientation === newMedia.orientation
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
    let testConditions = this.currentMedia.baseMedia === newMedia.baseMedia;
    if (this.config.enableOrientationChange) {
        testConditions = testConditions && this.currentMedia.orientation === newMedia.orientation
    }
    return testConditions;
}

/**
 * Get's current device media details
 * @private
 * @returns {Object} media object
 */
function _getMedia() {
    const { mobile, mobileLarge, tablet, tabletLarge, desktop } = this.config.breakpoints;
    const mediaInfo = {
        orientation: this.getOrientation()
    };
    if (
        window.matchMedia(`(max-width: ${mobile - 1}px)`).matches
    ) {
        return {
            media: mediaTypes.MOBILE_SMALL,
            baseMedia: mediaTypes.MOBILE,
            ...mediaInfo
        };
    } else if (
        window.matchMedia(`(min-width: ${mobile}px) and (max-width: ${mobileLarge - 1})`).matches
    ) {
        return {
            media: mediaTypes.MOBILE,
            baseMedia: mediaTypes.MOBILE,
            ...mediaInfo
        };
    } else if (
        window.matchMedia(`(min-width: ${mobileLarge}px) and (max-width: ${tablet - 1})`).matches
    ) {
        return {
            media: mediaTypes.MOBILE_LARGE,
            baseMedia: mediaTypes.MOBILE,
            ...mediaInfo
        };
    } else if (
        window.matchMedia(`(min-width: ${tablet}px) and (max-width: ${tabletLarge - 1})`).matches
    ) {
        return {
            media: mediaTypes.TABLET,
            baseMedia: mediaTypes.TABLET,
            ...mediaInfo
        };
    } else if (
        window.matchMedia(`(min-width: ${tabletLarge}px) and (max-width: ${desktop - 1})`).matches
    ) {
        return {
            media: mediaTypes.TABLET_LARGE,
            baseMedia: mediaTypes.TABLET,
            ...mediaInfo
        };
    } else {
        return {
            media: mediaTypes.DESKTOP,
            baseMedia: mediaTypes.DESKTOP,
            ...mediaInfo
        };
    }
}

/**
 * Resizable class for responsive events
 * @public
 */
export default class Resizable {
    /**
     * Resizable constructor
     * @constructor
     * @param {object} config Configuration object
     */
    constructor(config) {
        config = config && typeof config === 'object' ? config : {};
        this.currentMedia = null;
        this.config = {
            breakpoints: {
                mobile: 320,
                mobileLarge: 414,
                tablet: 768,
                tabletLarge: 1024,
                desktop: 1200
            },
            enableOrientationChange: false,
            ...config
        };
        window.addEventListener('resize', () => {
            const CustomEventConst = CustomEvent || Event;
            const newMedia = this.getMedia();
            const customEventConfig = {
                detail: {
                    ...newMedia
                },
                bubbles: false,
                cancelable: false
            };
            const mediaChanged = new CustomEventConst(
                'media.changed',
                customEventConfig
            );
            const baseMediaChanged = new CustomEventConst(
                'basemedia.changed',
                customEventConfig
            );
            if (!_matches.apply(this, [newMedia])) {
                window.dispatchEvent(mediaChanged);
            }
            if (!_baseMatches.apply(this, [newMedia])) {
                window.dispatchEvent(baseMediaChanged);
            }
        });
    }
    getMedia() {
        return _getMedia.apply(this, arguments);
    }
    getOrientation() {
        return _getOrientation.apply(this, arguments);
    }
}