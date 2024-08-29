import { MatPaginatorIntl } from '@angular/material/paginator';
import TranslatorService from '@app/core/application/translator/TranslatorService';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class PaginatorIntl extends MatPaginatorIntl
{
  constructor(
    private readonly translator: TranslatorService
  ) {
    super();
    this.init();
  }

  private async init(): Promise<void> {
    const withLabel = await this.translator.get('paginator.with_label');
    this.firstPageLabel = await this.translator.get('paginator.first_page_label');
    this.lastPageLabel = await this.translator.get('paginator.last_page_label');
    this.nextPageLabel = await this.translator.get('paginator.next_page_label');
    this.previousPageLabel = await this.translator.get('paginator.previous_page_label');
    this.itemsPerPageLabel = await this.translator.get('paginator.items_per_page_label');

    this.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `0 ${withLabel} ${length}`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} ${withLabel} ${length}`;
    }

    this.changes.next();
  }
}
