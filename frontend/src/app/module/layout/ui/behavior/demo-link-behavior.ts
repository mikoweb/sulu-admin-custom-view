import Behavior from '@app/core/application/behavior/behavior';
import BehaviorEvent from '@app/core/application/behavior/value-object/behavior-event';
import SuluLayout from '@app/shared/ui/sulu/sulu-layout';

export class DemoLinkBehavior extends Behavior {
  protected get events(): BehaviorEvent[] {
    return [
      new BehaviorEvent('click', (event: Event) => this.onClick(event)),
    ];
  }

  private onClick(event: Event): void {
    const type = (this.element as HTMLElement).dataset['type'];

    SuluLayout.loadEmptyControls();
    SuluLayout.loadEmptyView();

    switch (type) {
      case 'tab':
        SuluLayout.loadEmptyTabView();
        break;
      case 'table':
        SuluLayout.loadEmptyTableView();
        break;
    }
  }
}
