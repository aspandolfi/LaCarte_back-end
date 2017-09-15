import { getMetadataArgsStorage } from "../../index";
/**
 * JoinTable decorator is used in many-to-many relationship to specify owner side of relationship.
 * Its also used to set a custom junction table's name, column names and referenced columns.
 */
export function JoinTable(options) {
    return function (object, propertyName) {
        options = options || {};
        var args = {
            target: object.constructor,
            propertyName: propertyName,
            name: options.name,
            joinColumns: (options && options.joinColumn ? [options.joinColumn] : options.joinColumns),
            inverseJoinColumns: (options && options.inverseJoinColumn ? [options.inverseJoinColumn] : options.inverseJoinColumns),
        };
        getMetadataArgsStorage().joinTables.push(args);
    };
}

//# sourceMappingURL=JoinTable.js.map
