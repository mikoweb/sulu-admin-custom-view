import { ApplicationRef, Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CustomElementRegistry } from '@app/core/application/custom-element/custom-element';
import commandBusLoader from '@app/shared/infrastructure/config/command-bus/loaders';
import CommandBus from '@app/core/application/command-bus/command-bus';
import { LayoutReady } from '@app/module/layout/ui/layout-ready';
import { LayoutInitializer } from '@app/module/layout/ui/layout-initializer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterOutlet],
})
export class AppComponent {
  constructor(appRef: ApplicationRef) {
    this.initApp(appRef);
  }

  private async initApp(appRef: ApplicationRef) {
    commandBusLoader();
    const commandBus = inject(CommandBus);

    CustomElementRegistry.init(appRef);
    // await import('../import-global-elements');

    // place where you can run global command

    LayoutReady.init();
    LayoutInitializer.init();
  }
}
