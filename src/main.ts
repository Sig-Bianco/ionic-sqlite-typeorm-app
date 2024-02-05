import {enableProdMode} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {RouteReuseStrategy, provideRouter} from '@angular/router';
import {IonicRouteStrategy, provideIonicAngular} from '@ionic/angular/standalone';
import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader';
import { defineCustomElements as pwaElements} from '@ionic/pwa-elements/loader';
import {routes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {environment} from './environments/environment';
import {Capacitor} from "@capacitor/core";

if (environment.production) {
  enableProdMode();
}
try {
  bootstrapApplication(AppComponent, {
    providers: [
      {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
      provideIonicAngular(),
      provideRouter(routes),
    ],
  })
} catch (e) {
  console.error('Erro ao inicializar a aplicação', e)
}
