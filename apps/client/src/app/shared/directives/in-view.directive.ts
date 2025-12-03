import { Directive, ElementRef, Renderer2, input, effect, inject } from '@angular/core';

@Directive({
  selector: '[appInView]',
  standalone: true
})
export class InViewDirective {
  appInViewClass = input('in-view');
  appInViewThreshold = input(0.2);
  appInViewOnce = input(true);

  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() {
    effect((onCleanup) => {
      const threshold = this.appInViewThreshold();
      const className = this.appInViewClass();
      const once = this.appInViewOnce();
      const element = this.elementRef.nativeElement;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(element, className);
            if (once) {
              observer.disconnect();
            }
          } else {
            if (!once) {
              this.renderer.removeClass(element, className);
            }
          }
        });
      }, { threshold });

      observer.observe(element);
      
      onCleanup(() => {
        observer.disconnect();
      });
    });
  }
}
