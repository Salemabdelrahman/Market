// src/app/layout/layout-module.ts
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// components
import { Footer } from './user/footer/footer';
import { Login } from './login/login';
import { UserLayout } from './user-layout/user-layout';
import { AdminLayout } from './admin-layout/admin-layout';
import { SharedModule } from "../shared/shared-module";
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';






@NgModule({
  declarations: [Footer, Login, UserLayout, AdminLayout],
  imports: [CommonModule, RouterModule, FormsModule, SharedModule, TranslateModule, FontAwesomeModule],
  exports: [Footer, Login, UserLayout, AdminLayout],
})
export class LayoutModule { }
