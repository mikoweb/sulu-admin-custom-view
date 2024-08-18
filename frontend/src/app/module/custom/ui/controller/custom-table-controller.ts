import SuluLayout from '@app/shared/ui/sulu/sulu-layout';

export default class CustomTableController {
  public static showTable(): void {
    SuluLayout.updateTableView(`<h1>Custom Table</h1><p>Custom Table</p>`);
  }
}
