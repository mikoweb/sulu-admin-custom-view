import { Client } from '@app/core/infrastructure/client/client';
import PaginationRequest from '@app/core/domain/pagination/pagination-request';
import Pagination from '@app/core/domain/pagination/pagination';

export default abstract class AbstractPaginatedQuery<T> {
  protected constructor(
    protected readonly client: Client,
  ) {
  }

  protected async paginate(
    path: string,
    request: PaginationRequest
  ): Promise<Pagination<T>> {
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = path;
    const params = new URLSearchParams(a.search);
    params.set('page', request.page.toString());
    params.set('limit', request.limit.toString());
    this.buildQueryParams(params);
    const response = await this.client.method.get(path + '?' + params.toString());
    const data = response.data;

    return new Pagination<T>(
      this.mapItems(data.items ?? []),
      data.currentPageNumber ?? 0,
      data.pageCount ?? 0,
      data.itemNumberPerPage ?? 0,
      data.totalItemCount ?? 0,
      data.offset ?? 0,
    );
  }

  protected abstract mapItems(items: any[]): any[];

  protected buildQueryParams(params: URLSearchParams): void {
  }
}
