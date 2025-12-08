// src/app/app-module.ts
// Angular
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages-module';
import { SharedModule } from './shared/shared-module';
import { LayoutModule } from './layout/layout-module';
import { RouterModule } from '@angular/router';

// Font Awesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PagesModule,
    SharedModule,
    LayoutModule,
    RouterModule,
    FontAwesomeModule,

    // Translation Module
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule {

  constructor(private faLibrary: FaIconLibrary) {
    library.add(fas);
    this.faLibrary.addIcons(faEye, faEdit, faTrash);
  }
}

// Translation Loader Factory
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
