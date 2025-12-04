import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-welcome-message',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './welcome-message.component.html',
  styleUrl: './welcome-message.component.scss',
})
export class WelcomeMessageComponent {}
