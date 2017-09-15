"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
/**
 * Abstract entity is a class that contains columns and relations for all entities that will inherit this entity.
 * Database table for the abstract entity is not created.
 *
 * @deprecated don't use it anymore. Now entity can extend any class with columns, no need to mark it with this decorator
 */
function AbstractEntity() {
    return function (target) {
        var args = {
            target: target,
            name: undefined,
            type: "abstract"
        };
        index_1.getMetadataArgsStorage().tables.push(args);
    };
}
exports.AbstractEntity = AbstractEntity;

//# sourceMappingURL=AbstractEntity.js.map
