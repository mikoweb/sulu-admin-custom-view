import SuluLayout from '@app/shared/ui/sulu/sulu-layout';
import { Injectable } from '@angular/core';
import TranslatorService from '@app/core/application/translator/TranslatorService';
import SuluAction from '@app/shared/ui/sulu/sulu-action';
import toolbarButtonHelp from '@app/shared/ui/sulu/snippet/toolbar-button-help';

@Injectable({
  providedIn: 'root',
})
export default class CustomDashboardController {
  constructor(
    private readonly translator: TranslatorService,
  ) {
  }

  public async showDashboard(): Promise<void> {
    SuluAction.addAction(toolbarButtonHelp(await this.getHelpLabel()));
    SuluLayout.prepareCustomView(`<app-custom-dashboard-view></app-custom-dashboard-view>`, true);
  }

  private async getHelpLabel(): Promise<string> {
    return await this.translator.get('sulu.toolbar.button_help.label');
  }
}
