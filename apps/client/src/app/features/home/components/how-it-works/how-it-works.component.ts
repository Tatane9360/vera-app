import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, InViewDirective],
  template: `
    <section class="py-32 bg-vera-green dark:bg-lime-900 transition-colors duration-300 overflow-hidden">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center mb-24">
          <p class="text-sm font-medium uppercase tracking-wider text-primary/70 dark:text-vera-cream/70 mb-4">Comment ça marche ?</p>
          <h2 class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary dark:text-vera-cream">
            Posez votre question 
            <span 
              appInView 
              [appInViewThreshold]="0.6"
              class="highlighter-effect px-2 rounded-lg inline-block transform -rotate-1"
            >
              directement sur Vera Web
            </span>
          </h2>
        </div>

        <div class="relative grid lg:grid-cols-2 gap-32 items-center max-w-7xl mx-auto">
          
          <!-- Left Column: Phone & CTA -->
          <div class="relative flex flex-col items-center">
            <!-- Phone Mockup -->
            <div class="relative z-10 w-64 md:w-80 mx-auto mb-12">
              <div class="relative rounded-[3rem] border-8 border-primary dark:border-gray-800 bg-vera-cream dark:bg-gray-900 overflow-hidden shadow-2xl">
                <!-- Screen Content -->
                <div class="h-[550px] bg-vera-cream dark:bg-gray-800 flex flex-col relative">
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
                       <span class="font-display text-6xl font-bold">V</span>
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
              <h3 class="font-display text-2xl md:text-3xl mb-6 text-primary dark:text-vera-cream">Accédez à Vera Web en ligne</h3>
              <button class="bg-primary text-white dark:bg-vera-cream dark:text-primary px-8 py-4 rounded-full font-medium text-base hover:scale-105 transition-transform shadow-lg">
                Sans installation et à tout moment
              </button>
            </div>

            <!-- Arrow 1 (Phone to Right Top) -->
            <img 
              src="/images/fleche-1.png" 
              alt="Arrow pointing to step 1" 
              class="absolute top-[20%] -right-40 w-56 hidden lg:block z-20 transform rotate-12"
            />
            
             <!-- Arrow 2 (Phone to Right Bottom) -->
            <img 
              src="/images/fleche-2.png" 
              alt="Arrow pointing to step 2" 
              class="absolute bottom-[25%] -right-40 w-56 hidden lg:block z-20 transform -rotate-12"
            />

          </div>

          <!-- Right Column: Steps -->
          <div class="flex flex-col items-center lg:items-start space-y-24 text-center lg:text-left pt-10 lg:pt-0 lg:pl-10">
            
            <!-- Step 1 -->
            <div class="w-full flex flex-col items-center">
              <div class="mb-6">
                 <!-- Avatar Image -->
                 <img 
                   src="/images/avatar.png" 
                   alt="Avatar utilisateurs" 
                   class="w-24 h-auto object-contain"
                 />
              </div>
              <h3 class="font-display text-3xl md:text-4xl text-primary dark:text-vera-cream mb-2">Rendez-vous sur</h3>
              <p class="font-display text-3xl md:text-4xl text-primary dark:text-vera-cream">notre site</p>
            </div>

            <!-- Step 2 -->
            <div class="w-full flex flex-col items-center relative">
              <!-- Chat Bubbles -->
              <div class="relative mb-8 w-full max-w-xs mx-auto space-y-4">
                <div class="bg-white text-primary p-4 rounded-2xl rounded-tl-none shadow-lg text-sm text-left font-medium animate-float">
                  Les migrants aux États-Unis mangent-ils vraiment des chats et des chiens ?
                </div>
                <div class="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-lg text-sm text-left ml-auto font-medium animate-float-delayed">
                  Cette rumeur a été largement démentie par...
                </div>
              </div>
              
              <h3 class="font-display text-3xl md:text-4xl text-primary dark:text-vera-cream mb-2">Tapez votre question</h3>
              <p class="font-display text-3xl md:text-4xl text-primary dark:text-vera-cream mb-2">dans le chat et</p>
              <p class="font-display text-3xl md:text-4xl text-primary dark:text-vera-cream">obtenez une réponse fiable</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(-1deg); }
      50% { transform: translateY(-10px) rotate(1deg); }
    }
    
    @keyframes float-reverse {
      0%, 100% { transform: translateY(0px) rotate(1deg); }
      50% { transform: translateY(-10px) rotate(-1deg); }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .animate-float-delayed {
      animation: float-reverse 7s ease-in-out infinite;
      animation-delay: 1s;
    }

    /* Highlighter Effect */
    .highlighter-effect {
      background-image: linear-gradient(to right, white, white);
      background-size: 0% 100%;
      background-repeat: no-repeat;
      transition: background-size 2s cubic-bezier(0.22, 1, 0.36, 1);
    }
    
    /* When the directive adds the .in-view class */
    .highlighter-effect.in-view {
      background-size: 100% 100%;
    }

    /* Dark mode support */
    :host-context(.dark) .highlighter-effect {
      background-image: linear-gradient(to right, #1f2937, #1f2937); /* gray-800 */
    }
  `]
})
export class HowItWorksComponent {}
