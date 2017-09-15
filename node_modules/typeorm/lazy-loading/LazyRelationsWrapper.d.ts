import { RelationMetadata } from "../metadata/RelationMetadata";
import { Connection } from "../connection/Connection";
import { ObjectLiteral } from "../common/ObjectLiteral";
/**
 * Wraps entities and creates getters/setters for their relations
 * to be able to lazily load relations when accessing these relations.
 */
export declare class LazyRelationsWrapper {
    private connection;
    constructor(connection: Connection);
    /**
     * Wraps given entity and creates getters/setters for its given relation
     * to be able to lazily load data when accessing these relation.
     */
    wrap(object: ObjectLiteral, relation: RelationMetadata): void;
    /**
     * Loads relation data for the given entity and its relation.
     */
    protected loadRelationResults(relation: RelationMetadata, entity: ObjectLiteral): Promise<any>;
    /**
     * Loads data for many-to-one and one-to-one owner relations.
     *
     * (ow) post.category<=>category.post
     * loaded: category from post
     * example: SELECT category.id AS category_id, category.name AS category_name FROM category category
     *              INNER JOIN post Post ON Post.category=category.id WHERE Post.id=1
     */
    protected loadManyToOneOrOneToOneOwner(relation: RelationMetadata, entity: ObjectLiteral): Promise<any>;
    /**
     * Loads data for one-to-many and one-to-one not owner relations.
     *
     * SELECT post
     * FROM post post
     * WHERE post.[joinColumn.name] = entity[joinColumn.referencedColumn]
     */
    protected loadOneToManyOrOneToOneNotOwner(relation: RelationMetadata, entity: ObjectLiteral): Promise<any>;
    /**
     * Loads data for many-to-many owner relations.
     *
     * SELECT category
     * FROM category category
     * INNER JOIN post_categories post_categories
     * ON post_categories.postId = :postId
     * AND post_categories.categoryId = category.id
     */
    protected loadManyToManyOwner(relation: RelationMetadata, entity: ObjectLiteral): Promise<any>;
    /**
     * Loads data for many-to-many not owner relations.
     *
     * SELECT post
     * FROM post post
     * INNER JOIN post_categories post_categories
     * ON post_categories.postId = post.id
     * AND post_categories.categoryId = post_categories.categoryId
     */
    protected loadManyToManyNotOwner(relation: RelationMetadata, entity: ObjectLiteral): Promise<any>;
}
