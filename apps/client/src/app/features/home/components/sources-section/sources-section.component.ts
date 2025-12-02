import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sources-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-vera-green dark:bg-lime-900 transition-colors duration-300 overflow-hidden">
      <div class="container mx-auto px-4">
        
        <!-- Header -->
        <div class="text-center mb-12">
          <h2 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary dark:text-vera-cream max-w-4xl mx-auto leading-tight">
            Vera est connectée en temps réel <br/> à 400+ sites de fact-checking
          </h2>
          
          <!-- Logos Placeholder Row -->
          <div class="flex flex-wrap justify-center gap-4 mt-8 opacity-60 grayscale">
            <!-- Generating some placeholder logo boxes -->
            <div *ngFor="let i of [1,2,3,4,5,6,7,8,9,10]" class="w-12 h-12 bg-primary/20 rounded-md"></div>
          </div>
        </div>

        <!-- Cards Container -->
        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
          
          <!-- Card 1: Fact-Checking Sites -->
          <div class="bg-vera-cream dark:bg-primary border border-primary/5 dark:border-white/10 p-8 rounded-[2rem] shadow-xl transform md:-rotate-1 hover:rotate-0 transition-transform duration-300">
            <h3 class="font-display text-3xl md:text-4xl font-bold text-primary dark:text-vera-cream mb-2">
              150+ sites de fact-checking
            </h3>
            <p class="text-primary/70 dark:text-vera-cream/70 mb-8 font-medium">Pour la vérification de faits</p>
            
            <ul class="space-y-4 mb-10">
              <li class="flex items-start gap-3">
                <span class="material-icons-outlined text-green-600 mt-0.5">check</span>
                <span class="text-primary/90 dark:text-vera-cream/90">Signataires des chartes européennes IFCN et EFCSN</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-icons-outlined text-green-600 mt-0.5">check</span>
                <span class="text-primary/90 dark:text-vera-cream/90">Agences de presses spécialisées en fact-checking</span>
              </li>
            </ul>

            <button class="bg-primary text-white dark:bg-vera-cream dark:text-primary px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity w-full sm:w-auto">
              Voir la liste des sources
            </button>
          </div>

          <!-- Card 2: Reliable Media -->
          <div class="bg-vera-cream dark:bg-primary border border-primary/5 dark:border-white/10 p-8 rounded-[2rem] shadow-xl transform md:rotate-1 hover:rotate-0 transition-transform duration-300">
            <h3 class="font-display text-3xl md:text-4xl font-bold text-primary dark:text-vera-cream mb-2">
              250+ médias fiables et reconnus
            </h3>
            <p class="text-primary/70 dark:text-vera-cream/70 mb-8 font-medium">Pour connaître l'actualité</p>
            
            <ul class="space-y-4 mb-10">
              <li class="flex items-start gap-3">
                <span class="material-icons-outlined text-green-600 mt-0.5">check</span>
                <span class="text-primary/90 dark:text-vera-cream/90">Tous les bords politiques</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-icons-outlined text-green-600 mt-0.5">check</span>
                <span class="text-primary/90 dark:text-vera-cream/90">Réputés comme fiables et sérieux</span>
              </li>
            </ul>

            <button class="bg-primary text-white dark:bg-vera-cream dark:text-primary px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity w-full sm:w-auto">
              Voir la liste des sources
            </button>
          </div>

        </div>
      </div>
    </section>
  `
})
export class SourcesSectionComponent {}
