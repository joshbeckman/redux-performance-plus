# Redux Performance Plus

This is a utility and convenience library for measuring Redux action timings. It uses [performance-plus][0] to access the browser-based performance API, with support for IE8+.

You can pass a custom action duration limit, where actions exceeding that timing limit (in ms) are passed to an `onSlow` callback with relevant data.

## Example Usage

~~~js
import { applyMiddleware } from 'redux';
import performance         from 'redux-peformance-plus';

const middlewares = applyMiddleware(
    performance({
        limit: 83,               // 83ms is ~ 5 animation frames
        onSlow: (action) => {
            console.warn(`${action.type} took ${action.duration().toFixed(2)ms}`, {
                mean:          action.mean(),
                sampleSize:    action.samples().length,
                '95th_perc':   action.percentile(0.95)
            })
        }
    })
);
export default middlewares;
~~~

## Installation

~~~sh
$ npm install redux-performance-plus --save
~~~

## Configuration

The middleware constructor takes one argument with options.

~~~js
// Default configuration, no behavior
applyMiddleware(performance());

// Default configuration, log all actions
applyMiddleware(performance({
    onSlow: (action) => {
        console.log(`${action.type} took ${action.duration().toFixed(2)ms}`);
    }
}));

// Custom configuration, log all actions taking over 100ms
applyMiddleware(performance({
    limit: 100,
    onSlow: (action) => {
        console.log(`${action.type} took ${action.duration().toFixed(2)ms}`);
    }
}));
~~~

## Action Methods

The action data passed to `onSlow` contains the original action (with `type`, etc.), along with these methods:

~~~js
action.type             // unchanged
action.duration();      // latest duration for action type, in ms
action.mean();          // mean duration, in ms
action.sdev();          // standard deviation of mean duration, in ms
action.samples();       // all measures for this action type
action.percentile(0.5); // Percentile duration for recorded samples of this aciton type
~~~

## Acknowledgements

- [Repository for this code](https://github.com/andjosh/redux-performance-plus)
- [NPM registry for this code](https://www.npmjs.com/package/redux-performance-plus)

[0]: https://github.com/andjosh/performance-plus
