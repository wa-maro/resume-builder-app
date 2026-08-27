export type SortOrder = 1 | -1;

export interface QueryOptions<
  TFilter = Record<string, unknown>,
  TSort = Record<string, unknown>,
> {
  filter?: TFilter;
  skip?: number;
  limit?: number;
  sort?: keyof TSort;
  order?: SortOrder;
}
