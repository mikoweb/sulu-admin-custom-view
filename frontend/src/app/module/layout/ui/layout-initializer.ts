import { LayoutReady } from './layout-ready';
import { AppProgressBehavior } from './behavior/app-progress-behavior';
import { IonProgressBar } from '@ionic/angular/directives/proxies';
import { DemoLinkBehavior } from '@app/module/layout/ui/behavior/demo-link-behavior';

export class LayoutInitializer {
  public static init(): void {
    LayoutReady.onReady(() => {
      this.initAppProgress();
      this.initElementsReady();
      this.initDemoLinks();
    });
  }

  private static initAppProgress(): void {
    const progress = document.querySelector('#app-progress');

    if (progress) {
      new AppProgressBehavior(progress as HTMLElement & IonProgressBar);
    }
  }

  private static initElementsReady(): void {
    for (const el of document.querySelectorAll('*[wc-hidden], *[wc-lazy], *[wc-ready]')) {
      el.classList.add('ready');
    }
  }

  private static initDemoLinks(): void {
    for (const el of document.querySelectorAll('.app-demo-link')) {
      new DemoLinkBehavior(el);
    }
  }
}
