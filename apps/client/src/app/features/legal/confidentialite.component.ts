import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confidentialite',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main id="main-content" class="min-h-screen bg-vera-cream dark:bg-primary py-24">
      <div class="container mx-auto px-6 max-w-4xl">
        <h1 class="font-display text-4xl md:text-5xl font-bold text-primary dark:text-vera-cream mb-8">
          Politique de confidentialité
        </h1>

        <div class="prose prose-lg dark:prose-invert max-w-none">
          <p class="text-primary/80 dark:text-vera-cream/80 mb-8 text-lg">
            Chez Vera, nous accordons une grande importance à la protection de vos données personnelles. 
            Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos données.
          </p>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">1. Responsable du traitement</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Le responsable du traitement des données est :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li><strong>Société :</strong> [À COMPLÉTER - Nom de votre société]</li>
              <li><strong>Adresse :</strong> [À COMPLÉTER]</li>
              <li><strong>Email :</strong> contact@vera.fr</li>
              <li><strong>DPO (Délégué à la Protection des Données) :</strong> [À COMPLÉTER si applicable]</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">2. Données collectées</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Nous collectons les données suivantes :
            </p>
            
            <h3 class="text-xl font-semibold text-primary dark:text-vera-cream mb-3">2.1. Données d'identification</h3>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2 mb-4">
              <li>Adresse email (lors de la création de compte)</li>
              <li>Nom d'utilisateur (si applicable)</li>
            </ul>

            <h3 class="text-xl font-semibold text-primary dark:text-vera-cream mb-3">2.2. Données d'utilisation</h3>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2 mb-4">
              <li>Questions posées à Vera</li>
              <li>Historique des conversations</li>
              <li>Préférences d'utilisation (thème clair/sombre, etc.)</li>
            </ul>

            <h3 class="text-xl font-semibold text-primary dark:text-vera-cream mb-3">2.3. Données techniques</h3>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li>Adresse IP</li>
              <li>Type de navigateur</li>
              <li>Système d'exploitation</li>
              <li>Pages visitées et durée de visite</li>
              <li>Cookies (voir section dédiée)</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">3. Finalités du traitement</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Vos données sont collectées pour les finalités suivantes :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li><strong>Fourniture du service :</strong> Permettre l'utilisation de Vera pour la vérification des faits</li>
              <li><strong>Amélioration du service :</strong> Analyser l'utilisation pour améliorer nos algorithmes</li>
              <li><strong>Communication :</strong> Vous envoyer des informations sur le service (si consentement)</li>
              <li><strong>Sécurité :</strong> Prévenir la fraude et garantir la sécurité du service</li>
              <li><strong>Obligations légales :</strong> Respecter nos obligations légales et réglementaires</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">4. Base légale du traitement</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Le traitement de vos données repose sur les bases légales suivantes :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li><strong>Exécution du contrat :</strong> Fourniture du service Vera</li>
              <li><strong>Consentement :</strong> Pour les communications marketing et certains cookies</li>
              <li><strong>Intérêt légitime :</strong> Amélioration du service et sécurité</li>
              <li><strong>Obligation légale :</strong> Conservation de certaines données pour conformité légale</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">5. Destinataires des données</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Vos données peuvent être partagées avec :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li><strong>Services de fact-checking :</strong> APIs des 400+ sites de vérification des faits</li>
              <li><strong>Hébergeur :</strong> Pour le stockage et le fonctionnement du service</li>
              <li><strong>Prestataires techniques :</strong> Services d'authentification, analytics (si applicable)</li>
              <li><strong>Autorités compétentes :</strong> En cas d'obligation légale</li>
            </ul>
            <p class="text-primary/80 dark:text-vera-cream/80 mt-4">
              Nous ne vendons jamais vos données personnelles à des tiers.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">6. Transferts hors UE</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Certaines de vos données peuvent être transférées vers des pays hors de l'Union Européenne. 
              Dans ce cas, nous nous assurons que des garanties appropriées sont mises en place (clauses contractuelles types, 
              Privacy Shield, etc.) pour protéger vos données conformément au RGPD.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">7. Durée de conservation</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Nous conservons vos données pour les durées suivantes :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li><strong>Données de compte :</strong> Jusqu'à la suppression de votre compte + 1 an</li>
              <li><strong>Historique des conversations :</strong> [À COMPLÉTER - ex: 2 ans]</li>
              <li><strong>Données de connexion :</strong> 1 an (obligation légale)</li>
              <li><strong>Cookies :</strong> Maximum 13 mois</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">8. Vos droits (RGPD)</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> Corriger vos données inexactes</li>
              <li><strong>Droit à l'effacement :</strong> Supprimer vos données (droit à l'oubli)</li>
              <li><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> S'opposer au traitement de vos données</li>
              <li><strong>Droit de retirer le consentement :</strong> À tout moment</li>
            </ul>
            <p class="text-primary/80 dark:text-vera-cream/80 mt-4">
              Pour exercer vos droits, contactez-nous à : 
              <a href="mailto:contact@vera.fr" class="text-primary dark:text-vera-cream underline hover:opacity-70">
                contact@vera.fr
              </a>
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">9. Sécurité des données</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre 
              la destruction accidentelle ou illicite, la perte, l'altération, la divulgation ou l'accès non autorisé. 
              Cela inclut le chiffrement des données, l'accès sécurisé et la surveillance continue.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">10. Cookies</h2>
            <p class="text-primary/80 dark:text-vera-cream/80 mb-4">
              Nous utilisons des cookies pour améliorer votre expérience. Les types de cookies utilisés sont :
            </p>
            <ul class="list-disc pl-6 text-primary/80 dark:text-vera-cream/80 space-y-2">
              <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site (authentification, préférences)</li>
              <li><strong>Cookies de performance :</strong> Analyse de l'utilisation du site (avec consentement)</li>
              <li><strong>Cookies fonctionnels :</strong> Mémorisation de vos préférences (thème, langue)</li>
            </ul>
            <p class="text-primary/80 dark:text-vera-cream/80 mt-4">
              Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">11. Modifications</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
              Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour. 
              Nous vous encourageons à consulter régulièrement cette page.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">12. Réclamation</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL :
            </p>
            <p class="text-primary/80 dark:text-vera-cream/80 mt-2">
              <strong>CNIL</strong><br>
              3 Place de Fontenoy - TSA 80715<br>
              75334 PARIS CEDEX 07<br>
              Téléphone : 01 53 73 22 22<br>
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" 
                 class="text-primary dark:text-vera-cream underline hover:opacity-70">
                www.cnil.fr
              </a>
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-primary dark:text-vera-cream mb-4">13. Contact</h2>
            <p class="text-primary/80 dark:text-vera-cream/80">
              Pour toute question concernant cette politique de confidentialité ou vos données personnelles, contactez-nous :
            </p>
            <p class="text-primary/80 dark:text-vera-cream/80 mt-2">
              Email : 
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
export class ConfidentialiteComponent {
  currentDate = new Date().toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
