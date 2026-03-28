export type PagedResponseT<T> = {
  meta: {
    itemsCount: number;
    pagesCount: number;
    pageNumber: number;
    pageSize: number;
  };
  items: Array<T>;
};

export type PaginationT = {
  pageNumber: number;
  pageSize: number;
};
