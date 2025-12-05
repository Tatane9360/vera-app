import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main id="main-content" class="min-h-screen bg-vera-cream dark:bg-primary py-24">
      <div class="container mx-auto px-6 max-w-4xl">
        <h1 class="font-display text-4xl md:text-5xl font-bold text-primary dark:text-vera-cream mb-8">
          Mentions légales
        </h1>

        <div class="prose prose-lg dark:prose-invert max-w-none">
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">1. Éditeur du site</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Le site <strong>Vera</strong> est édité par :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li><strong>Raison sociale :</strong> [À COMPLÉTER - Nom de votre société]</li>
              <li><strong>Forme juridique :</strong> [À COMPLÉTER - SAS, SARL, etc.]</li>
              <li><strong>Capital social :</strong> [À COMPLÉTER]</li>
              <li><strong>Siège social :</strong> [À COMPLÉTER - Adresse complète]</li>
              <li><strong>SIRET :</strong> [À COMPLÉTER]</li>
              <li><strong>RCS :</strong> [À COMPLÉTER]</li>
              <li><strong>Numéro de TVA intracommunautaire :</strong> [À COMPLÉTER]</li>
              <li><strong>Email :</strong> contact@vera.fr</li>
              <li><strong>Téléphone :</strong> [À COMPLÉTER]</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">2. Directeur de publication</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              <strong>Directeur de la publication :</strong> [À COMPLÉTER - Nom et prénom]<br>
              <strong>Qualité :</strong> [À COMPLÉTER - Président, Gérant, etc.]
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">3. Hébergement</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Le site est hébergé par :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li><strong>Hébergeur :</strong> [À COMPLÉTER - ex: OVH, AWS, Vercel, etc.]</li>
              <li><strong>Adresse :</strong> [À COMPLÉTER]</li>
              <li><strong>Téléphone :</strong> [À COMPLÉTER]</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">4. Propriété intellectuelle</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.) est la propriété exclusive de Vera, 
              sauf mention contraire. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, 
              même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de Vera.
            </p>
            <p class="text-primary/80 dark:text-vera-cream/80">
              La marque "Vera" ainsi que les logos sont des marques déposées. Toute reproduction non autorisée de ces marques, 
              logos et signes constitue une contrefaçon passible de sanctions pénales.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">5. Données personnelles</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, 
              vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
            </p>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Pour plus d'informations, consultez notre 
              <a routerLink="/confidentialite" class="text-primary dark:text-vera-cream underline hover:opacity-70">
                Politique de confidentialité
              </a>.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">6. Cookies</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Le site utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez configurer votre navigateur 
              pour refuser les cookies. Pour plus d'informations, consultez notre politique de cookies.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">7. Responsabilité</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Vera s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. 
              Toutefois, Vera ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
            </p>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Vera décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations 
              disponibles sur le site.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">8. Droit applicable</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Les présentes mentions légales sont régies par le droit français. En cas de litige, 
              les tribunaux français seront seuls compétents.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">9. Contact</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Pour toute question concernant les mentions légales, vous pouvez nous contacter à l'adresse : 
              <a href="mailto:contact@vera.fr" class="text-primary dark:text-vera-cream underline hover:opacity-70">
                contact@vera.fr
              </a>
            </p>
          </section>

          <p class="text-sm text-primary/50 dark:text-vera-cream/50 mt-12">
            Dernière mise à jour : {{ currentDate }}
          </p>
        </div>

        <div class="mt-12">
          <a 
            routerLink="/" 
            class="inline-flex items-center gap-2 text-primary dark:text-vera-cream hover:opacity-70 transition-opacity">
            <span class="material-icons-outlined">arrow_back</span>
            Retour à l'accueil
          </a>
        </div>
      </div>
    </main>
  `,
})
export class MentionsLegalesComponent {
  currentDate = new Date().toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
