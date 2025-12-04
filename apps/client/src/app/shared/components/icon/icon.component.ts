import { Component, inject, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { appIcons, IconName } from '../../icons/icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [innerHTML]="svgContent()"
      [style.width.px]="width()"
      [style.height.px]="height()"
      [style.color]="color()"
      class="inline-block align-middle"
    ></span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      span {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      span :deep(svg) {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class IconComponent {
  private sanitizer = inject(DomSanitizer);

  icon = input.required<IconName>();
  width = input<number>(24);
  height = input<number>(24);
  color = input<string>('currentColor');

  svgContent = computed(() => {
    const svg = appIcons[this.icon()];
    return svg ? this.sanitizer.bypassSecurityTrustHtml(svg) : null;
  });
}
