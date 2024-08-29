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

    SuluLayout.getPromisedElement('controls').then((element: Element) => SuluLayout.updateElementContent(element, ''));
    SuluLayout.getPromisedElement('view').then((element: Element) => SuluLayout.updateElementContent(element, ''));

    switch (type) {
    }
  }
}
