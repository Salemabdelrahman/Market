import { Component, signal } from '@angular/core';
import { ThemeService } from './core/services/themMode-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('market');

  constructor(private theme: ThemeService) {
    // ThemeService constructor already applies initial theme

  }
}
