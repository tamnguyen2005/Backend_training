export class PaginationMeta {
  totalItem!: number;
  itemCount!: number;
  itemPerPage!: number;
  totalPage!: number;
  currentPage!: number;
}
export class PaginatedResult<T> {
  data!: T[];
  meta!: PaginationMeta;
}
