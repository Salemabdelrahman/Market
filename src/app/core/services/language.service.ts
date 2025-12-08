import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'en' | 'ar';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  private readonly storageKey = 'ngshop_language';
  private _currentLang$ = new BehaviorSubject<Language>(this.getInitialLanguage());
  currentLang$ = this._currentLang$.asObservable();

  constructor(private translate: TranslateService) {
    const initialLang = this.getInitialLanguage();
    this.setLanguage(initialLang);
  }

  // Set Language
  setLanguage(lang: Language): void {
    this.translate.use(lang); // 1- use language to translate
    this._currentLang$.next(lang); // 2- set current language
    localStorage.setItem(this.storageKey, lang); // 3- set language in local storage

    // Change direction
    document.documentElement.lang = lang; // 4- set direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; // 5- set direction
  }


  // toggle Language for Treansfoem between ar and en
  toggleLanguage(): void {
    const newLang = this._currentLang$.value === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }

  // Get Current Language
  getCurrentLanguage(): Language {
    return this._currentLang$.value;
  }

  // Get Initial Language
  private getInitialLanguage(): Language {
    const saved = localStorage.getItem(this.storageKey) as Language | null;
    return saved || 'en';
  }






}
