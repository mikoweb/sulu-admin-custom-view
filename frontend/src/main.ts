import {
  enableProdMode,
  EnvironmentProviders,
  importProvidersFrom,
  LOCALE_ID,
  Provider,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { configure } from 'mobx';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePl from '@angular/common/locales/pl';
import TranslateModuleFacade from '@app/core/application/translator/TranslateModuleFacade';

import { environment } from './environments/environment';
import { AppComponent } from '@app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorIntl } from '@angular/material/paginator';
import PaginatorIntl from '@app/core/application/pagination/paginator-intl';

configure({
  enforceActions: 'never',
  isolateGlobalState: true,
});

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localePl);

const providers: Array<Provider | EnvironmentProviders> = [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  { provide: LOCALE_ID, useValue: environment.defaultLanguage },
  { provide: MatPaginatorIntl, useClass: PaginatorIntl },
  provideAnimationsAsync(),
  importProvidersFrom(
    IonicModule.forRoot({}),
    HttpClientModule,
    TranslateModuleFacade.forRoot(),
  ),
];

bootstrapApplication(AppComponent, {
  providers,
});
