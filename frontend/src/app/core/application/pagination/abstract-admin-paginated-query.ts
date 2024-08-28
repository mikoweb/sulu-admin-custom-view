import AbstractPaginatedQuery from '@app/core/application/pagination/abstract-paginated-query';
import { AdminClient } from '@app/core/infrastructure/client/admin-client';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default abstract class AbstractAdminPaginatedQuery<T> extends AbstractPaginatedQuery<T> {
  protected constructor(
    override readonly client: AdminClient,
  ) {
    super(client);
  }
}
