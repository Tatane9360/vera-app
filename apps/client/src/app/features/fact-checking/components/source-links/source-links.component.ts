import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourceLink } from '../../models/chat-message.model';

@Component({
  selector: 'app-source-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './source-links.component.html',
  styleUrl: './source-links.component.scss',
})
export class SourceLinksComponent {
  links = input<SourceLink[]>([]);
}
