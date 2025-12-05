import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questions-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section 
      class="py-12 bg-[#1E1E1E] text-[#F5ECDE]"
      aria-labelledby="questions-heading">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="flex items-center gap-4 mb-10">
          <div class="w-8 h-10 flex-shrink-0" aria-hidden="true">
            <svg
              width="21"
              height="29"
              viewBox="0 0 21 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-full scale-150"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.3713 0.190557C4.30701 0.764852 0.463586 3.41546 0.0954481 8.80503C-0.169616 12.8252 -0.14015 12.8546 3.71793 12.0741C6.97231 11.4114 6.79556 11.5882 6.79556 9.11428C6.79556 7.00846 7.38464 5.81573 8.98971 4.99109C12.5533 3.17984 15.1156 7.95096 15.1156 9.45294C15.1156 11.1022 13.9375 11.971 10.2266 13.046C7.19314 13.9296 6.22124 15.1812 6.10349 18.3178C6.07399 19.2455 5.97099 19.9818 5.86791 20.0996C5.41141 20.6592 7.00173 21.1746 8.69521 21.0272C13.7755 20.5707 13.7019 20.615 13.4221 18.7006C13.2454 17.5079 13.3632 17.3311 14.5707 16.963C17.4864 16.0795 19.1504 14.4007 20.0339 11.4557C22.3458 3.85723 17.2655 -1.0464 8.3713 0.190557ZM13.1276 1.07409C16.4409 1.56004 19.5333 5.84519 18.9589 9.18786C18.4289 12.2802 16.75 14.1799 13.4074 15.4315C11.7876 16.0353 11.2722 16.801 11.2574 18.5975V19.5989C9.46087 19.7756 9.34312 19.7756 8.16505 19.9523C8.37121 15.6082 8.07672 15.1665 13.4516 13.2816C16.8238 12.1036 17.56 9.29094 15.3659 6.02189C11.8465 0.779576 2.79027 4.25481 4.51309 10.1892C4.58675 10.469 4.63092 10.7193 4.6015 10.7488C4.55734 10.793 2.64294 11.22 2.49569 11.22C2.48094 11.22 2.37786 9.40877 2.28953 8.79028C1.50909 3.47435 7.14898 0.220007 13.1276 1.07409ZM7.53189 22.706C4.88125 23.9135 4.77817 27.1531 7.35514 28.0808C12.4943 29.9362 17.1477 26.8881 14.2467 23.5748C13.3927 22.5735 9.03388 22.0139 7.53189 22.706ZM11.3016 23.5896C12.4797 23.7662 13.5105 24.7087 13.5105 25.5922C13.5105 27.2268 9.50512 28.0367 8.06205 26.6966C7.35514 26.034 7.11956 22.9563 11.3016 23.5896Z"
                fill="#F5ECDE"
              />
            </svg>
          </div>
          <h2 
            id="questions-heading"
            class="font-display text-3xl md:text-4xl lg:text-5xl">
            Quelles questions puis-je poser à Vera ?
          </h2>
        </div>

        <ul 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Exemples de questions à poser à Vera">
          <li
            *ngFor="let question of questions; let i = index"
            class="bg-[url('/images/background.png')] bg-cover bg-center p-6 rounded-2xl h-full min-h-[140px] flex items-center transition-transform hover:-translate-y-1 duration-300"
          >
            <p class="text-[#1E1E1E] font-medium text-lg leading-relaxed">
              "{{ question }}"
            </p>
          </li>
        </ul>
      </div>
    </section>
  `,
  styles: [
    `
      @media (prefers-reduced-motion: reduce) {
        .hover\\:-translate-y-1:hover {
          transform: none;
        }

        .transition-transform {
          transition: none;
        }
      }
    `,
  ],
})
export class QuestionsSectionComponent {
  questions = [
    "Un collègue me dit que les inondations en Espagne viennent de l'ensemencement des nuages ??",
    "C'est vrai que les vaccins anticovid provoquent des turbocancers ?",
    "Zelensky se serait offert la Mercedes d'Hitler : c'est vrai ?",
    "J'ai lu qu'Elon Musk travaille sur un projet secret d'avion militaire hypersonique",
    "C'est vrai que des milliers de scientifiques dénoncent le canular de la crise climatique ?",
    'Mon père dit que le gilet fluo va être obligatoire pour se promener en forêt',
  ];
}

