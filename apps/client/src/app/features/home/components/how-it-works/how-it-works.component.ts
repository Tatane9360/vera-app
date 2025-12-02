import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-vera-green dark:bg-lime-900 transition-colors duration-300 overflow-hidden">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-16">
          <p class="text-sm font-medium uppercase tracking-wider text-primary/70 dark:text-vera-cream/70 mb-4">Comment ça marche ?</p>
          <h2 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary dark:text-vera-cream">
            Posez votre question directement sur Vera Web
          </h2>
        </div>

        <div class="relative grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          <!-- Left Column: Phone & CTA -->
          <div class="relative flex flex-col items-center">
            <!-- Phone Mockup -->
            <div class="relative z-10 w-64 md:w-72 mx-auto mb-8">
              <div class="relative rounded-[3rem] border-8 border-primary dark:border-gray-800 bg-vera-cream dark:bg-gray-900 overflow-hidden shadow-2xl">
                <!-- Screen Content -->
                <div class="h-[500px] bg-vera-cream dark:bg-gray-800 flex flex-col relative">
                  <!-- Status Bar -->
                  <div class="h-6 w-full bg-transparent flex justify-between px-6 py-2 text-[10px] font-bold text-primary dark:text-white">
                    <span>9:41</span>
                    <div class="flex gap-1">
                      <span class="material-icons-outlined text-[10px]">signal_cellular_alt</span>
                      <span class="material-icons-outlined text-[10px]">wifi</span>
                      <span class="material-icons-outlined text-[10px]">battery_full</span>
                    </div>
                  </div>
                  
                  <!-- App Content -->
                  <div class="flex-1 p-4 flex flex-col items-center justify-center text-center">
                    <div class="mb-4">
                       <span class="font-display text-4xl font-bold">V</span>
                    </div>
                    <p class="text-xs text-gray-500 mb-8">Votre feed vous plaît, mais dit-il vrai</p>
                    
                    <!-- Chat Input Mock -->
                    <div class="mt-auto w-full bg-primary text-white p-3 rounded-2xl flex items-center justify-between text-xs">
                      <span>Entrer l'information à vérifier</span>
                      <div class="flex gap-2">
                        <span class="material-icons-outlined text-sm">mic</span>
                        <span class="material-icons-outlined text-sm bg-vera-green text-primary rounded-full p-0.5">arrow_upward</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom CTA -->
            <div class="text-center relative z-10">
              <h3 class="font-display text-2xl md:text-3xl mb-4 text-primary dark:text-vera-cream">Accédez à Vera Web en ligne</h3>
              <button class="bg-primary text-white dark:bg-vera-cream dark:text-primary px-8 py-3 rounded-full font-medium text-sm md:text-base hover:scale-105 transition-transform">
                Sans installation et à tout moment
              </button>
              
              <!-- Decorative Scribble (Bottom Left) -->
              <svg class="absolute -left-16 top-1/2 -translate-y-1/2 w-16 h-16 text-primary dark:text-vera-cream opacity-80 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3">
                 <path d="M10,10 Q50,50 10,90 M30,20 Q70,60 30,80 M50,30 Q90,70 50,70" />
              </svg>
            </div>

            <!-- Arrow 1 (Phone to Right Top) -->
            <svg class="absolute top-1/4 -right-12 w-24 h-24 text-primary dark:text-vera-cream hidden lg:block transform rotate-[-20deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M10,80 Q50,10 90,30" marker-end="url(#arrowhead)" />
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                </marker>
              </defs>
            </svg>
            
             <!-- Arrow 2 (Phone to Right Bottom) -->
            <svg class="absolute bottom-1/4 -right-12 w-24 h-24 text-primary dark:text-vera-cream hidden lg:block transform rotate-[20deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M10,20 Q50,90 90,70" marker-end="url(#arrowhead)" />
            </svg>

          </div>

          <!-- Right Column: Steps -->
          <div class="flex flex-col items-center lg:items-start space-y-16 text-center lg:text-center pt-10 lg:pt-0">
            
            <!-- Step 1 -->
            <div class="w-full flex flex-col items-center">
              <div class="mb-4">
                 <!-- Avatar Icon -->
                 <svg class="w-16 h-16 text-primary dark:text-vera-cream" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                   <circle cx="12" cy="8" r="4" />
                   <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                 </svg>
              </div>
              <h3 class="font-display text-3xl md:text-4xl text-primary dark:text-vera-cream mb-2">Rendez-vous</h3>
              <p class="font-display text-2xl md:text-3xl text-primary dark:text-vera-cream">sur notre site</p>
            </div>

            <!-- Step 2 -->
            <div class="w-full flex flex-col items-center relative">
              <!-- Chat Bubbles -->
              <div class="relative mb-6 w-full max-w-xs mx-auto">
                <div class="bg-white text-primary p-4 rounded-2xl rounded-tl-none shadow-lg mb-4 transform -rotate-2 text-sm text-left">
                  Les migrants aux États-Unis mangent-ils vraiment des chats et des chiens ?
                </div>
                <div class="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-lg transform rotate-2 text-sm text-left ml-auto">
                  Cette rumeur a été largement démentie par...
                </div>
              </div>
              
              <h3 class="font-display text-3xl md:text-4xl text-primary dark:text-vera-cream mb-2">Tapez votre question</h3>
              <p class="font-display text-2xl md:text-3xl text-primary dark:text-vera-cream mb-2">dans le chat et</p>
              <p class="font-display text-2xl md:text-3xl text-primary dark:text-vera-cream">obtenez une réponse fiable</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  `
})
export class HowItWorksComponent {}
