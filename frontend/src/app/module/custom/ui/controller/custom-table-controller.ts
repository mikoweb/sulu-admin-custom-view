import SuluLayout from '@app/shared/ui/sulu/sulu-layout';
import { Injectable } from '@angular/core';
import SuluAction from '@app/shared/ui/sulu/sulu-action';
import toolbarButtonHelp from '@app/shared/ui/sulu/snippet/toolbar-button-help';
import TranslatorService from '@app/core/application/translator/TranslatorService';

@Injectable({
  providedIn: 'root',
})
export default class CustomTableController {
  constructor(
    private readonly translator: TranslatorService,
  ) {
  }

  public async showTable(): Promise<void> {
    SuluAction.addAction(toolbarButtonHelp(await this.getHelpLabel()));
    SuluLayout.updateTableView(`<app-custom-table-view></app-custom-table-view>`);
  }

  private async getHelpLabel(): Promise<string> {
    return await this.translator.get('sulu.toolbar.button_help.label');
  }
}
