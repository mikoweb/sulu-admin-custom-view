export default class Pagination<T> {
  constructor(
    public readonly items: T[],
    public readonly currentPageNumber: number,
    public readonly pageCount: number,
    public readonly itemNumberPerPage: number,
    public readonly totalItemCount: number,
    public readonly offset: number,
  ) {
  }
}
