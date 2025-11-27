import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FactCheckingService } from './fact-checking.service';

@Component({
  selector: 'app-fact-checking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fact-checking.component.html',
  styleUrl: './fact-checking.component.scss',
})
export class FactCheckingComponent {
  private factCheckingService = inject(FactCheckingService);

  activeTab = signal<'image' | 'url'>('image');
  isLoading = signal(false);
  result = signal<string | null>(null);
  verificationResult = signal<string | null>(null);
  error = signal<string | null>(null);

  // Image
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  // URL
  urlInput = '';

  setActiveTab(tab: 'image' | 'url') {
    this.activeTab.set(tab);
    this.result.set(null);
    this.verificationResult.set(null);
    this.error.set(null);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      // Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  analyzeImage() {
    if (!this.selectedFile) return;
    
    this.isLoading.set(true);
    this.error.set(null);
    this.result.set(null);
    this.verificationResult.set(null);

    this.factCheckingService.analyzeImage(this.selectedFile).subscribe({
      next: (response) => {
        this.result.set(response.text);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Une erreur est survenue lors de l\'analyse de l\'image.');
        this.isLoading.set(false);
      }
    });
  }

  analyzeUrl() {
    if (!this.urlInput) return;

    this.isLoading.set(true);
    this.error.set(null);
    this.result.set(null);
    this.verificationResult.set(null);

    this.factCheckingService.analyzeUrl(this.urlInput).subscribe({
      next: (response) => {
        this.result.set(response.text);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Une erreur est survenue lors de l\'analyse de l\'URL.');
        this.isLoading.set(false);
      }
    });
  }

  verifyClaim() {
    const claim = this.result();
    if (!claim) return;

    this.isLoading.set(true);
    this.error.set(null);
    this.verificationResult.set(null);

    this.factCheckingService.verifyClaim(claim).subscribe({
      next: (response) => {
        this.verificationResult.set(response.result);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Une erreur est survenue lors de la vérification avec VERA.');
        this.isLoading.set(false);
      }
    });
  }
}
