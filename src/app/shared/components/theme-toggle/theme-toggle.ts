import { Component, OnInit } from '@angular/core';
import { Theme, ThemeService } from '../../../core/services/themMode-service';

@Component({
  selector: 'app-theme-toggle',
  standalone: false,
  templateUrl: './theme-toggle.html',
  styleUrls: ['./theme-toggle.scss']
})
export class ThemeToggle implements OnInit {

  current: Theme = 'system';

  constructor(private theme: ThemeService) { }

  ngOnInit(): void {
    this.current = this.theme.getTheme();
    this.theme.theme$.subscribe(t => this.current = t);
  }

  toggle() {
    // simple toggle cycle: system -> dark -> light -> system
    const next = this.current === 'system' ? 'dark' : this.current === 'dark' ? 'light' : 'system';
    this.theme.setTheme(next);
  }
}
