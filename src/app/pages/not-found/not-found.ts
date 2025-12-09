import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: false,
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound implements OnInit, AfterViewInit, OnDestroy {

  // نستخدم ViewChild للإشارة إلى العناصر بدلاً من getElementById أو querySelector
  @ViewChild('starsContainer') starsContainer!: ElementRef;
  @ViewChild('astronautRef') astronautRef!: ElementRef;


  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createStars();
  }

  ngOnDestroy(): void {
  }

  private createStars(): void {
    const container = this.starsContainer.nativeElement;
    for (let i = 0; i < 100; i++) {
      const star = this.renderer.createElement('div');
      this.renderer.addClass(star, 'star');
      // استخدام Renderer2 لضبط الستايلات
      this.renderer.setStyle(star, 'left', Math.random() * 100 + '%');
      this.renderer.setStyle(star, 'top', Math.random() * 100 + '%');
      this.renderer.setStyle(star, 'animationDelay', Math.random() * 3 + 's');
      this.renderer.appendChild(container, star);
    }
  }

}
