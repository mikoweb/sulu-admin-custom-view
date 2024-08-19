import { ApplicationRef, Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CustomElementRegistry } from '@app/core/application/custom-element/custom-element';
import commandBusLoader from '@app/shared/infrastructure/config/command-bus/loaders';
import CommandBus from '@app/core/application/command-bus/command-bus';
import { LayoutInitializer } from '@app/module/layout/ui/layout-initializer';
import { RouterOutlet } from '@angular/router';
import { LayoutReady } from '@app/shared/ui/layout-ready';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import AppRouter from '@app/shared/infrastructure/routes/app-router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterOutlet],
})
export class AppComponent {
  constructor(
    appRef: ApplicationRef,
    private readonly translate: TranslateService,
    private readonly appRouter: AppRouter,
  ) {
    this.initApp(appRef);
  }

  private async initApp(appRef: ApplicationRef) {
    this.translate.setDefaultLang(environment.defaultLanguage);
    commandBusLoader();
    const commandBus = inject(CommandBus);

    this.appRouter.init();

    CustomElementRegistry.init(appRef);
    await import('../import-global-elements');

    // place where you can run global command

    LayoutReady.init();
    LayoutInitializer.init();
  }
}
