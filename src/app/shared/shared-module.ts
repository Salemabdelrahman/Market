import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCard } from './components/product-card/product-card';
import { Spinner } from './components/spinner/spinner';
import { Categories } from './components/categories/categories';
import { UserHeader } from './components/user-header/user-header';
import { AdminHeader } from './components/admin-header/admin-header';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from './components/language-switcher/language-switcher';




@NgModule({
  declarations: [Spinner, ProductCard, Categories, UserHeader, AdminHeader, ThemeToggle, LanguageSwitcher],
  imports: [CommonModule, RouterModule, TranslateModule],
  exports: [Spinner, ProductCard, Categories, UserHeader, AdminHeader, ThemeToggle, RouterModule],
})
export class SharedModule { }
