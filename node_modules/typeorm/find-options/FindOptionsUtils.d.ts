import { FindManyOptions } from "./FindManyOptions";
import { FindOneOptions } from "./FindOneOptions";
import { ObjectLiteral } from "../common/ObjectLiteral";
import { SelectQueryBuilder } from "../query-builder/SelectQueryBuilder";
/**
 * Utilities to work with FindOptions.
 */
export declare class FindOptionsUtils {
    /**
     * Checks if given object is really instance of FindOneOptions interface.
     */
    static isFindOneOptions(obj: any): obj is FindOneOptions<any>;
    /**
     * Checks if given object is really instance of FindManyOptions interface.
     */
    static isFindManyOptions(obj: any): obj is FindManyOptions<any>;
    /**
     * Checks if given object is really instance of FindOptions interface.
     */
    static extractFindOneOptionsAlias(object: any): string | undefined;
    /**
     * Checks if given object is really instance of FindOptions interface.
     */
    static extractFindManyOptionsAlias(object: any): string | undefined;
    /**
     * Applies give find one options to the given query builder.
     */
    static applyFindOneOptionsOrConditionsToQueryBuilder<T>(qb: SelectQueryBuilder<T>, options: FindOneOptions<T> | Partial<T> | undefined): SelectQueryBuilder<T>;
    /**
     * Applies give find many options to the given query builder.
     */
    static applyFindManyOptionsOrConditionsToQueryBuilder<T>(qb: SelectQueryBuilder<T>, options: FindManyOptions<T> | Partial<T> | undefined): SelectQueryBuilder<T>;
    /**
     * Applies give find options to the given query builder.
     */
    static applyOptionsToQueryBuilder<T>(qb: SelectQueryBuilder<T>, options: FindOneOptions<T> | FindManyOptions<T> | undefined): SelectQueryBuilder<T>;
    /**
     * Applies given simple conditions set to a given query builder.
     */
    static applyConditions<T>(qb: SelectQueryBuilder<T>, conditions: ObjectLiteral): SelectQueryBuilder<T>;
}
