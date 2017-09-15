"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MetadataUtils_1 = require("../metadata-builder/MetadataUtils");
/**
 * Storage all metadatas args of all available types: tables, columns, subscribers, relations, etc.
 * Each metadata args represents some specifications of what it represents.
 * MetadataArgs used to create a real Metadata objects.
 */
var MetadataArgsStorage = /** @class */ (function () {
    function MetadataArgsStorage() {
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this.tables = [];
        this.entityRepositories = [];
        this.transactionEntityManagers = [];
        this.transactionRepositories = [];
        this.namingStrategies = [];
        this.entitySubscribers = [];
        this.indices = [];
        this.columns = [];
        this.generations = [];
        this.relations = [];
        this.joinColumns = [];
        this.joinTables = [];
        this.entityListeners = [];
        this.relationCounts = [];
        this.relationIds = [];
        this.embeddeds = [];
        this.inheritances = [];
        this.discriminatorValues = [];
    }
    MetadataArgsStorage.prototype.filterTables = function (target) {
        return this.tables.filter(function (table) {
            return target instanceof Array ? target.indexOf(table.target) !== -1 : table.target === target;
        });
    };
    MetadataArgsStorage.prototype.filterColumns = function (target) {
        return this.columns.filter(function (column) {
            return target instanceof Array ? target.indexOf(column.target) !== -1 : column.target === target;
        });
    };
    MetadataArgsStorage.prototype.findGenerated = function (target, propertyName) {
        return this.generations.find(function (generated) {
            return (target instanceof Array ? target.indexOf(generated.target) !== -1 : generated.target === target) && generated.propertyName === propertyName;
        });
    };
    MetadataArgsStorage.prototype.filterRelations = function (target) {
        return this.relations.filter(function (relation) {
            return target instanceof Array ? target.indexOf(relation.target) !== -1 : relation.target === target;
        });
    };
    MetadataArgsStorage.prototype.filterRelationIds = function (target) {
        return this.relationIds.filter(function (relationId) {
            return target instanceof Array ? target.indexOf(relationId.target) !== -1 : relationId.target === target;
        });
    };
    MetadataArgsStorage.prototype.filterRelationCounts = function (target) {
        return this.relationCounts.filter(function (relationCount) {
            return target instanceof Array ? target.indexOf(relationCount.target) !== -1 : relationCount.target === target;
        });
    };
    MetadataArgsStorage.prototype.filterIndices = function (target) {
        return this.indices.filter(function (index) {
            return target instanceof Array ? target.indexOf(index.target) !== -1 : index.target === target;
        });
    };
    MetadataArgsStorage.prototype.filterListeners = function (target) {
        return this.entityListeners.filter(function (index) {
            return target instanceof Array ? target.indexOf(index.target) !== -1 : index.target === target;
        });
    };
    MetadataArgsStorage.prototype.filterEmbeddeds = function (target) {
        return this.embeddeds.filter(function (embedded) {
            return target instanceof Array ? target.indexOf(embedded.target) !== -1 : embedded.target === target;
        });
    };
    MetadataArgsStorage.prototype.findJoinTable = function (target, propertyName) {
        return this.joinTables.find(function (joinTable) {
            return joinTable.target === target && joinTable.propertyName === propertyName;
        });
    };
    MetadataArgsStorage.prototype.filterJoinColumns = function (target, propertyName) {
        return this.joinColumns.filter(function (joinColumn) {
            return joinColumn.target === target && joinColumn.propertyName === propertyName;
        });
    };
    MetadataArgsStorage.prototype.filterSubscribers = function (target) {
        return this.entitySubscribers.filter(function (subscriber) {
            return target instanceof Array ? target.indexOf(subscriber.target) !== -1 : subscriber.target === target;
        });
    };
    MetadataArgsStorage.prototype.filterNamingStrategies = function (target) {
        return this.namingStrategies.filter(function (subscriber) {
            return target instanceof Array ? target.indexOf(subscriber.target) !== -1 : subscriber.target === target;
        });
    };
    MetadataArgsStorage.prototype.filterTransactionEntityManagers = function (target) {
        return this.transactionEntityManagers.filter(function (subscriber) {
            return target instanceof Array ? target.indexOf(subscriber.target) !== -1 : subscriber.target === target;
        });
    };
    MetadataArgsStorage.prototype.filterTransactionRepository = function (target) {
        return this.transactionRepositories.filter(function (subscriber) {
            return target instanceof Array ? target.indexOf(subscriber.target) !== -1 : subscriber.target === target;
        });
    };
    MetadataArgsStorage.prototype.filterSingleTableChildren = function (target) {
        return this.tables.filter(function (table) {
            return table.target instanceof Function
                && target instanceof Function
                && MetadataUtils_1.MetadataUtils.isInherited(table.target, target)
                && table.type === "single-table-child";
        });
    };
    MetadataArgsStorage.prototype.findInheritanceType = function (target) {
        return this.inheritances.find(function (inheritance) { return inheritance.target === target; });
    };
    MetadataArgsStorage.prototype.findDiscriminatorValue = function (target) {
        return this.discriminatorValues.find(function (discriminatorValue) { return discriminatorValue.target === target; });
    };
    return MetadataArgsStorage;
}());
exports.MetadataArgsStorage = MetadataArgsStorage;

//# sourceMappingURL=MetadataArgsStorage.js.map
