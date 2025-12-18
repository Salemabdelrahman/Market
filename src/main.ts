import { provideZoneChangeDetection } from "@angular/core";
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


platformBrowser().bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection({ eventCoalescing: true })], })
  .catch(err => console.error(err));
