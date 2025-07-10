import { Directive, ElementRef, Input, Renderer2, PLATFORM_ID, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appIntersection]',
  standalone: true // لو standalone
})
export class IntersectionDirective implements AfterViewInit, OnDestroy {
  @Input('appIntersection') animationClass: string = 'fade-in';
  private observer!: IntersectionObserver;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId); // ✅ نحدد لو هو browser
    if (this.isBrowser) {
      this.renderer.addClass(this.el.nativeElement, 'hidden');
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return; // ❌ لو مش متصفح، اخرج فورًا

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.removeClass(this.el.nativeElement, 'hidden');
          requestAnimationFrame(() => {
            this.renderer.addClass(this.el.nativeElement, this.animationClass);
          });
        } else {
          this.renderer.removeClass(this.el.nativeElement, this.animationClass);
          this.renderer.addClass(this.el.nativeElement, 'hidden');
        }
      });
    }, {
      threshold: 0.1
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.observer) {
      this.observer.disconnect();
    }
  }
}
