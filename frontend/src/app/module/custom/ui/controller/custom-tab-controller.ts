import SuluLayout from '@app/shared/ui/sulu/sulu-layout';

export default class CustomTabController {
  public static showTab1(id: string): void {
    SuluLayout.updateTabView(`<p>Custom Tab 1</p><p>${id}</p>`);
  }

  public static showTab2(id: string): void {
    SuluLayout.updateTabView(`<p>Custom Tab 2</p><p>${id}</p>`);
  }
}
