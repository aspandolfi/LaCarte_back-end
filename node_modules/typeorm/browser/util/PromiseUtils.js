/**
 * Utils to help to work with Promise objects.
 */
var PromiseUtils = /** @class */ (function () {
    function PromiseUtils() {
    }
    /**
     * Runs given callback that returns promise for each item in the given collection in order.
     * Operations executed after each other, right after previous promise being resolved.
     */
    PromiseUtils.runInSequence = function (collection, callback) {
        var results = [];
        return collection.reduce(function (promise, item) {
            return promise.then(function () {
                return callback(item);
            }).then(function (result) {
                results.push(result);
            });
        }, Promise.resolve()).then(function () {
            return results;
        });
    };
    return PromiseUtils;
}());
export { PromiseUtils };

//# sourceMappingURL=PromiseUtils.js.map
