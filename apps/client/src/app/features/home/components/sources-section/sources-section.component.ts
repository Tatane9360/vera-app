import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiltDirective } from '../../../../shared/directives/tilt.directive';

@Component({
  selector: 'app-sources-section',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  templateUrl: './sources-section.component.html',
  styleUrl: './sources-section.component.scss'
})
export class SourcesSectionComponent {
  // Row 1: Images 1-7 (Duplicated for smooth infinite scroll)
  sourcesRow1 = [
    '/images/logo-carousel-1.png',
    '/images/logo-carousel-2.png',
    '/images/logo-carousel-3.png',
    '/images/logo-carousel-4.png',
    '/images/logo-carousel-5.png',
    '/images/logo-carousel-6.png',
    '/images/logo-carousel-7.png',
    // Duplicates
    '/images/logo-carousel-1.png',
    '/images/logo-carousel-2.png',
    '/images/logo-carousel-3.png',
    '/images/logo-carousel-4.png',
    '/images/logo-carousel-5.png',
    '/images/logo-carousel-6.png',
    '/images/logo-carousel-7.png',
    '/images/logo-carousel-1.png',
    '/images/logo-carousel-2.png',
    '/images/logo-carousel-3.png',
    '/images/logo-carousel-4.png',
    '/images/logo-carousel-5.png',
    '/images/logo-carousel-6.png',
    '/images/logo-carousel-7.png'
  ];

  // Row 2: Images 8-13 (Duplicated for smooth infinite scroll)
  sourcesRow2 = [
    '/images/logo-carousel-8.png',
    '/images/logo-carousel-9.png',
    '/images/logo-carousel-10.png',
    '/images/logo-carousel-11.png',
    '/images/logo-carousel-12.png',
    '/images/logo-carousel-13.png',
    // Duplicates
    '/images/logo-carousel-8.png',
    '/images/logo-carousel-9.png',
    '/images/logo-carousel-10.png',
    '/images/logo-carousel-11.png',
    '/images/logo-carousel-12.png',
    '/images/logo-carousel-13.png',
    '/images/logo-carousel-8.png',
    '/images/logo-carousel-9.png',
    '/images/logo-carousel-10.png',
    '/images/logo-carousel-11.png',
    '/images/logo-carousel-12.png',
    '/images/logo-carousel-13.png',
    '/images/logo-carousel-8.png',
    '/images/logo-carousel-9.png',
    '/images/logo-carousel-10.png',
    '/images/logo-carousel-11.png',
    '/images/logo-carousel-12.png',
    '/images/logo-carousel-13.png'
  ];
}
