import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { App } from './app/app.module';

platformBrowserDynamic().bootstrapModule(App);
