export type SortOrder = 1 | -1;

interface BaseQueryOptions<
  TFilter = Record<string, unknown>,
  TSort = Record<string, unknown>,
> {
  filter?: TFilter;
  limit?: number;
  sort?: keyof TSort;
  order?: SortOrder;
}

export interface QueryOptions<
  TFilter = Record<string, unknown>,
  TSort = Record<string, unknown>,
> extends BaseQueryOptions<TFilter, TSort> {
  page?: number;
}

export interface RepositoryQueryOptions<
  TFilter = Record<string, unknown>,
  TSort = Record<string, unknown>,
> extends BaseQueryOptions<TFilter, TSort> {
  skip?: number;
}
