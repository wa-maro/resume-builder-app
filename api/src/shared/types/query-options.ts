export type SortOrderRepo = 1 | -1;

export type SortOrderDto = "asc" | "desc";

interface BaseQueryOptions<
  TFilter = Record<string, unknown>,
  TSort = Record<string, unknown>,
> {
  filter?: TFilter;
  limit?: number;
  sort?: keyof TSort;
}

export interface QueryOptions<
  TFilter = Record<string, unknown>,
  TSort = Record<string, unknown>,
> extends BaseQueryOptions<TFilter, TSort> {
  page?: number;
  sortOrder?: SortOrderDto;
}

export interface RepositoryQueryOptions<
  TFilter = Record<string, unknown>,
  TSort = Record<string, unknown>,
> extends BaseQueryOptions<TFilter, TSort> {
  skip?: number;
  order?: SortOrderRepo;
}
