import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cgu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main id="main-content" class="min-h-screen bg-vera-cream dark:bg-primary py-24">
      <div class="container mx-auto px-6 max-w-4xl">
        <h1 class="font-display text-4xl md:text-5xl font-bold text-primary dark:text-vera-cream mb-8">
          Conditions Générales d'Utilisation (CGU)
        </h1>

        <div class="prose prose-lg dark:prose-invert max-w-none">
          <p class="text-primary/80 dark:text-vera-cream/80 mb-8 text-lg">
            Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation du service Vera. 
            En utilisant Vera, vous acceptez sans réserve les présentes CGU.
          </p>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">1. Objet</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Les présentes CGU ont pour objet de définir les modalités et conditions d'utilisation du service Vera, 
              un assistant intelligent de vérification des faits connecté à plus de 400 sites de fact-checking.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">2. Acceptation des CGU</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              L'utilisation du service Vera implique l'acceptation pleine et entière des présentes CGU. 
              Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser le service.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">3. Description du service</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Vera est un service de vérification des faits qui permet aux utilisateurs de :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li>Poser des questions sur des informations qu'ils souhaitent vérifier</li>
              <li>Recevoir des réponses basées sur des sources fiables et vérifiées</li>
              <li>Accéder à plus de 400 sites de fact-checking reconnus</li>
              <li>Consulter des médias fiables et reconnus</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">4. Accès au service</h2>
            
            <h3 class="text-xl font-semibold text-primary dark:text-vera-cream mb-3">4.1. Conditions d'accès</h3>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Le service Vera est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. 
              Certaines fonctionnalités peuvent nécessiter la création d'un compte utilisateur.
            </p>

            <h3 class="text-xl font-semibold text-primary dark:text-vera-cream mb-3">4.2. Création de compte</h3>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Pour créer un compte, vous devez :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li>Fournir des informations exactes et à jour</li>
              <li>Être âgé d'au moins 13 ans (ou avoir l'autorisation parentale)</li>
              <li>Maintenir la confidentialité de vos identifiants de connexion</li>
              <li>Nous informer immédiatement de toute utilisation non autorisée de votre compte</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">5. Utilisation du service</h2>
            
            <h3 class="text-xl font-semibold text-primary dark:text-vera-cream mb-3">5.1. Utilisation autorisée</h3>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Vous vous engagez à utiliser Vera de manière responsable et conforme à la loi. Vous pouvez :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li>Poser des questions légitimes pour vérifier des informations</li>
              <li>Consulter les réponses et sources fournies</li>
              <li>Partager les résultats de vérification (avec attribution)</li>
            </ul>

            <h3 class="text-xl font-semibold text-primary dark:text-vera-cream mb-3 mt-6">5.2. Utilisations interdites</h3>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Il est strictement interdit de :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li>Utiliser le service à des fins illégales ou frauduleuses</li>
              <li>Tenter de contourner les mesures de sécurité du service</li>
              <li>Utiliser des robots, scripts ou outils automatisés sans autorisation</li>
              <li>Surcharger ou perturber le fonctionnement du service</li>
              <li>Collecter des données personnelles d'autres utilisateurs</li>
              <li>Diffuser du contenu offensant, diffamatoire ou illégal</li>
              <li>Usurper l'identité d'une autre personne ou entité</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">6. Propriété intellectuelle</h2>
            
            <h3 class="text-xl font-semibold text-primary dark:text-vera-cream mb-3">6.1. Droits de Vera</h3>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Tous les éléments du service Vera (logiciels, textes, images, logos, marques, base de données, etc.) 
              sont la propriété exclusive de Vera ou de ses partenaires. Toute reproduction, représentation, modification 
              ou exploitation non autorisée est interdite.
            </p>

            <h3 class="text-xl font-semibold text-primary dark:text-vera-cream mb-3">6.2. Licence d'utilisation</h3>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Vera vous accorde une licence non exclusive, non transférable et révocable pour utiliser le service 
              conformément aux présentes CGU.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">7. Responsabilités</h2>
            
            <h3 class="text-xl font-semibold text-primary dark:text-vera-cream mb-3">7.1. Responsabilité de Vera</h3>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Vera s'efforce de fournir des informations exactes et vérifiées. Toutefois :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li>Vera ne garantit pas l'exactitude absolue de toutes les informations fournies</li>
              <li>Les réponses sont basées sur des sources tierces que nous ne contrôlons pas</li>
              <li>Vera ne peut être tenu responsable des décisions prises sur la base des informations fournies</li>
              <li>Le service est fourni "en l'état" sans garantie de disponibilité continue</li>
            </ul>

            <h3 class="text-xl font-semibold text-primary dark:text-vera-cream mb-3 mt-6">7.2. Responsabilité de l'utilisateur</h3>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Vous êtes seul responsable de l'utilisation que vous faites du service et des conséquences qui en découlent. 
              Vous vous engagez à indemniser Vera de tout préjudice résultant de votre utilisation non conforme du service.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">8. Données personnelles</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Le traitement de vos données personnelles est régi par notre 
              <a routerLink="/confidentialite" class="text-primary dark:text-vera-cream underline hover:opacity-70">
                Politique de confidentialité
              </a>, 
              qui fait partie intégrante des présentes CGU.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">9. Disponibilité du service</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Vera s'efforce d'assurer une disponibilité maximale du service, mais ne peut garantir un accès ininterrompu. 
              Le service peut être temporairement indisponible pour maintenance, mise à jour ou pour toute autre raison technique.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">10. Modification du service</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Vera se réserve le droit de modifier, suspendre ou interrompre tout ou partie du service à tout moment, 
              sans préavis et sans indemnité.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">11. Résiliation</h2>
            
            <h3 class="text-xl font-semibold text-primary dark:text-vera-cream mb-3">11.1. Par l'utilisateur</h3>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Vous pouvez cesser d'utiliser le service à tout moment et supprimer votre compte depuis les paramètres.
            </p>

            <h3 class="text-xl font-semibold text-primary dark:text-vera-cream mb-3">11.2. Par Vera</h3>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Vera se réserve le droit de suspendre ou de résilier votre accès au service en cas de violation des présentes CGU, 
              sans préavis et sans indemnité.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">12. Modification des CGU</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Vera se réserve le droit de modifier les présentes CGU à tout moment. Les modifications seront publiées sur cette page 
              et prendront effet immédiatement. Votre utilisation continue du service après modification vaut acceptation des nouvelles CGU.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">13. Droit applicable et juridiction</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Les présentes CGU sont régies par le droit français. En cas de litige, et à défaut de résolution amiable, 
              les tribunaux français seront seuls compétents.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">14. Contact</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Pour toute question concernant les présentes CGU, contactez-nous à : 
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
export class CguComponent {
  currentDate = new Date().toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
