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
  importProvidersFrom(
    IonicModule.forRoot({}),
    HttpClientModule,
    TranslateModuleFacade.forRoot(),
  ),
];

bootstrapApplication(AppComponent, {
  providers,
});
