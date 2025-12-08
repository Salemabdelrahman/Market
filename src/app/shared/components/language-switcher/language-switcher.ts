// language-switcher.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Language, LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: false,
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss'
})
export class LanguageSwitcher implements OnInit, OnDestroy {

  currentLang$: Observable<Language>; // declare the currentLang$ property
  currentLang: Language = 'en';
  private destroy$ = new Subject<void>();

  constructor(public langService: LanguageService) {
    this.currentLang$ = this.langService.currentLang$; // assign the currentLang$ property from the LanguageService
  }


  ngOnInit() {
    // اشتراك في تغييرات اللغة
    this.currentLang$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(lang => {
      this.currentLang = lang;
      console.log('Language changed to:', lang);
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // دالة للتبديل السريع
  toggleLanguage() {
    this.langService.toggleLanguage();
  }

  // دالة للتحقق من اللغة الحالية
  isCurrentLanguage(lang: Language): boolean {
    return this.currentLang === lang;
  }



}
