import perf    from 'performance-plus';
const defaultOnSlow = () => {};
const defaultLimit = 0;

/**
 * Redux action performance measuring middleware
 *
 * @access public
 * @param {Object} options
 * @param {Number} [options.limit]
 * @param {Function} [options.onSlow]
 * @returns {Function} Redux middleware
 */
const perfMiddleware = options => store => next => action => {
    perf.start(action.type);
    let result = next(action);
    perf.end(action.type);
    
    if (perf.duration(action.type) > ((options || {}).limit || defaultLimit)) {
        ((options || {}).onSlow || defaultOnSlow)(Object.assign({}, action, {
            duration:     perf.duration.bind(perf, action.type),
            mean:         perf.mean.bind(perf, action.type),
            sdev:         perf.sdev.bind(perf, action.type),
            samples:      perf.getEntriesByName.bind(perf, action.type),
            percentile:   perf.percentile.bind(perf, action.type),
        }));
    }
    return result;
};

export default perfMiddleware;
