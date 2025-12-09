import { Component, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterAdmin {

  currentYear: number = new Date().getFullYear();
  showBackToTop = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showBackToTop = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
