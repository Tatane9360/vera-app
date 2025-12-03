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
  // Row 1: Fact-Checking & News Agencies
  sourcesRow1 = [
    'AFP Factuel', 'Le Monde', 'Libération', '20 Minutes', 'France Info', 
    'Reuters', 'AP News', 'Snopes', 'PolitiFact', 'FactCheck.org',
    'Les Décodeurs', 'CheckNews', 'Vrai ou Fake', 'L\'Obs', 'Le Figaro'
  ];

  // Row 2: Media & Institutions
  sourcesRow2 = [
    'CNRS', 'INSERM', 'OMS', 'NASA', 'Eurostat',
    'INSEE', 'Cour des comptes', 'Vie Publique', 'Légifrance', 'Service-Public',
    'The Guardian', 'BBC News', 'New York Times', 'Washington Post', 'Euronews'
  ];
}
