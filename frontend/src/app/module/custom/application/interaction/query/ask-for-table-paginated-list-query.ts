import { Injectable } from '@angular/core';
import CustomTableListItemDto from '@app/module/custom/ui/dto/custom-table-list-item-dto';
import PaginationRequest from '@app/core/domain/pagination/pagination-request';
import Pagination from '@app/core/domain/pagination/pagination';
import AbstractAdminPaginatedQuery from '@app/core/application/pagination/abstract-admin-paginated-query';
import CustomTableParamsDto from '@app/module/custom/ui/dto/custom-table-params-dto';

@Injectable({
  providedIn: 'root',
})
export default class AskForTablePaginatedListQuery extends AbstractAdminPaginatedQuery<CustomTableListItemDto> {
  private paramsDto: CustomTableParamsDto | null = null;

  public async ask(
    request: PaginationRequest,
    paramsDto: CustomTableParamsDto = new CustomTableParamsDto(),
  ): Promise<Pagination<CustomTableListItemDto>> {
    this.paramsDto = paramsDto;

    return this.paginate('/custom/table', request);
  }

  protected mapItems(items: any[]): CustomTableListItemDto[] {
    return items.map((item: any) => CustomTableListItemDto.createFromObject(item));
  }

  protected override buildQueryParams(params: URLSearchParams) {
    if (this.paramsDto?.sort) {
      params.set('sort', this.paramsDto?.sort);
    }

    if (this.paramsDto?.sortBy) {
      params.set('sortBy', this.paramsDto?.sortBy);
    }
  }
}
