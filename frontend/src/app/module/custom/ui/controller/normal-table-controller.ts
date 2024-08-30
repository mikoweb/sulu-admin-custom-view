import { Injectable } from '@angular/core';
import TranslatorService from '@app/core/application/translator/TranslatorService';
import SuluTable from '@app/shared/ui/sulu/sulu-table';

@Injectable({
  providedIn: 'root',
})
export default class NormalTableController {
  constructor(
    private readonly translator: TranslatorService,
  ) {
  }

  public async transformTable(): Promise<void> {
    SuluTable.startObserveActionColumns(
      await this.translator.get('sulu.action_column'),
      (id: string) => `<app-normal-table-actions id="${id}"></app-normal-table-actions>`,
    );
  }
}
