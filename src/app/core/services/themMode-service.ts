import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'ngshop_theme';
  private _theme$ = new BehaviorSubject<Theme>(this.getInitialTheme());
  theme$ = this._theme$.asObservable();

  constructor() {
    // Apply initial theme to document
    this.applyTheme(this._theme$.value);

    // If system preference changes and theme = 'system', update applied theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this._theme$.value === 'system') {
        this.applyTheme('system');
      }
    });
  }

  setTheme(theme: Theme) {
    this._theme$.next(theme);
    localStorage.setItem(this.storageKey, theme);
    this.applyTheme(theme);
  }

  getTheme(): Theme {
    return this._theme$.value;
  }

  private getInitialTheme(): Theme {
    const saved = localStorage.getItem(this.storageKey) as Theme | null;
    if (saved) return saved;
    // default to system
    return 'system';
  }

  private applyTheme(theme: Theme) {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    let isDark: boolean;
    if (theme === 'system') {
      isDark = prefersDark;
    } else {
      isDark = theme === 'dark';
    }

    // Set data-theme attribute on documentElement
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      // Alternatively: document.documentElement.setAttribute('data-theme', 'light');
    }
  }
}
