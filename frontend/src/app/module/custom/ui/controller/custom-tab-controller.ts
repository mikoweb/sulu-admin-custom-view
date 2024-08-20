import SuluLayout from '@app/shared/ui/sulu/sulu-layout';
import SuluAction from '@app/shared/ui/sulu/sulu-action';
import toolbarButtonHelp from '@app/shared/ui/sulu/snippet/toolbar-button-help';
import { Injectable } from '@angular/core';
import TranslatorService from '@app/core/application/translator/TranslatorService';

@Injectable({
  providedIn: 'root',
})
export default class CustomTabController {
  constructor(
    private readonly translator: TranslatorService,
  ) {
  }

  public async showTab1(id: string): Promise<void> {
    SuluAction.addAction(toolbarButtonHelp(await this.getHelpLabel()));
    SuluLayout.updateTabView(`<app-custom-tab1-view></app-custom-tab1-view>`);
  }

  public async showTab2(id: string): Promise<void> {
    SuluAction.addAction(toolbarButtonHelp(await this.getHelpLabel()));
    SuluLayout.updateTabView(`<p>Custom Tab 2</p><p>${id}</p>`);
  }

  private async getHelpLabel(): Promise<string> {
    return await this.translator.get('sulu.toolbar.button_help.label');
  }
}
