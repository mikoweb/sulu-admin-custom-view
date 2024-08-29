import SuluLayout from '@app/shared/ui/sulu/sulu-layout';
import toolbarControls from '@app/shared/ui/sulu/snippet/toolbar-controls';

export default class SuluAction {
  public static async addAction(buttonSnippet: string): Promise<void> {
    const controls: Element = await SuluLayout.getPromisedElement('controls');

    let container: HTMLElement | null = null;

    if (controls.querySelectorAll('ul[class*=items--], ul.app-toolbar-controls__items').length === 0) {
      const template = document.createElement('template');
      template.innerHTML = toolbarControls;
      const fragment = template.content.querySelector('.app-toolbar-controls');

      if (fragment) {
        controls.appendChild(fragment);
        container = controls.querySelector('ul.app-toolbar-controls__items');
      }
    } else {
      container = controls.querySelector('ul[class*=items--], ul.app-toolbar-controls__items');
    }

    if (container) {
      const li = document.createElement('li');
      li.innerHTML = buttonSnippet;
      container.appendChild(li);
    }
  }

  public static async clearActions(): Promise<void> {
    const controls: Element = await SuluLayout.getPromisedElement('controls');

    for (const item of controls.querySelectorAll('.app-toolbar-controls')) {
      item.remove();
    }

    return;
  }
}
