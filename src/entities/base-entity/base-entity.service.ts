export interface IServiceBase<T> {
  create(props: T, ...params: any[]): Promise<any>;

  readOne(id: number): Promise<any>;

  update(props: T): Promise<any>;

  drop(id: number): Promise<any>;

  readAll(...params: any[]): Promise<any[]>;
}
