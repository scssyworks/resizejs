# ResizeJS
Resize JS is a tiny plugin to implement responsive events


## Install

```sh
npm install --save resizejs
```

## Usage

### Basic
```js
import Resizable from 'resizejs';

const resp = new Resizable();
window.addEventListener('media.changed', () => {
    const media = resp.getMedia();
    const orientation = resp.getOrientation();
});
```

### On orientation change
```js
import Resizable from 'resizejs';

const resp = new Resizable({
    enableOrientationChange: true
});
window.addEventListener('media.changed', () => {
    const media = resp.getMedia();
    const orientation = resp.getOrientation();
});
```

### Customize breakpoints
```js
import Resizable from 'resizejs';

const resp = new Resizable({
    breakpoints: {
        mobile: 320,
        mobileLarge: 414,
        tablet: 768,
        tabletLarge: 1024,
        desktop: 1200
    }
});
window.addEventListener('media.changed', () => {
    const media = resp.getMedia();
    const orientation = resp.getOrientation();
});
```

### Only when base media changes
For example: Tablet to Desktop or Mobile to Tablet <br>
```js
import Resizable from 'resizejs';

const resp = new Resizable({
    breakpoints: {
        mobile: 320,
        mobileLarge: 414,
        tablet: 768,
        tabletLarge: 1024,
        desktop: 1200
    }
});
window.addEventListener('basemedia.changed', () => {
    const media = resp.getMedia();
    const orientation = resp.getOrientation();
});
```

## Note
This library uses ``window.matchMedia``. To support old browsers please use a polyfill.