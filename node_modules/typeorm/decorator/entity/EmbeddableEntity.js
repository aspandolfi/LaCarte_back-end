"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
/**
 * This decorator is used on the entities that must be embedded into another entities.
 *
 * @deprecated don't use it anymore. Now entity can embed any class with columns, no need to mark it with this decorator
 */
function EmbeddableEntity() {
    return function (target) {
        var args = {
            target: target,
            type: "embeddable",
            orderBy: undefined
        };
        index_1.getMetadataArgsStorage().tables.push(args);
    };
}
exports.EmbeddableEntity = EmbeddableEntity;

//# sourceMappingURL=EmbeddableEntity.js.map
