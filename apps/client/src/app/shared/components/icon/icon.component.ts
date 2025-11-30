import { Component, inject, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { appIcons, IconName } from '../../icons/icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [innerHTML]="svgContent()" class="inline-block align-middle"></span>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class IconComponent {
  private sanitizer = inject(DomSanitizer);

  icon = input.required<IconName>();

  svgContent = computed(() => {
    const svg = appIcons[this.icon()];
    return svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : null;
  });
}
