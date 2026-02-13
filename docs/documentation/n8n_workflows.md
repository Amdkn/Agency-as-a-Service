# Documentation d'Orchestration n8n - Projet Genesis

Ce document détaille la logique des workflows n8n qui constituent le "système nerveux" de l'infrastructure Genesis.

## 1. Flux "Cash-in" (Wonder Woman ⚡)

**Objectif** : Transformer automatiquement une transaction financière en un processus d'onboarding complet, sans intervention humaine.

**Déclencheur (Trigger)** :
*   `Stripe Trigger` : Événement `checkout.session.completed`.

**Logique** :
1.  **Extraction des Métadonnées** :
    *   Récupérer `tenant_id` et `offering_id` depuis l'objet `metadata` de la session Stripe.
    *   *Validation* : Si `tenant_id` est manquant, alerter (Admin Alert).
2.  **Gestion Client (Supabase)** :
    *   `Supabase Node` : Upsert dans la table `clients` basé sur l'`email`.
    *   Lier le `stripe_customer_id`.
3.  **Enregistrement Facture et Contrat** :
    *   `Supabase Node` : Insérer dans `invoices` (Montant, ID Stripe).
    *   **Legal Click-wrap** :
        *   Générer le snapshot du contrat (texte standard + timestamp + IP).
        *   `Supabase Node` : Insérer dans `legal_docs` avec `client_id` et `tenant_id`.
4.  **Activation Opérationnelle** :
    *   *Optionnel* : Créer une tâche d'onboarding dans `tasks` liée à la `root_sop_id` de l'offre (`offerings`).
5.  **Communication** :
    *   `Gmail/Email Node` : Envoyer l'email de bienvenue ("Wow Effect"). Contenu dynamique basé sur le `config_json` du tenant (récupéré via un lookup préalable sur `tenants`).

## 2. Flux "Inbound" & Circuit Breaker (Superman 🚀)

**Objectif** : Protéger la capacité de production en filtrant les leads entrants selon la charge actuelle.

**Déclencheur (Trigger)** :
*   `Webhook` : Soumission formulaire (Landing Page / Tally / Typeform).

**Logique "Circuit Breaker"** :
1.  **Check Capacité (Supabase)** :
    *   `Supabase Node` : Query sur `capacity_logs` pour la semaine courante du `tenant_id`.
    *   Calculer la somme des `hours_logged` ou la moyenne du `stress_level`.
2.  **Branchement (If/Else)** :
    *   **Condition** : Charge > 10h OU Stress > 7.
    *   **Branche TRUE (Shield Active)** :
        *   `Supabase Node` : Insérer le lead dans `leads` avec statut `waitlist`.
        *   `Email Node` : Réponse automatique "Nous sommes complets, vous êtes sur liste d'attente VIP".
    *   **Branche FALSE (Open Business)** :
        *   `Supabase Node` : Insérer le lead dans `leads` avec statut `new`.
        *   `Slack/Teams Node` : Notification d'opportunité à l'équipe commerciale (ou Agent IA Sales).
        *   `Email Node` : Confirmation de prise en compte.

## 3. Flux "Sunday Uplink" (Green Lantern 💚)

**Objectif** : Rituel de pilotage hebdomadaire pour le "Commander Brief".

**Déclencheur (Trigger)** :
*   `Schedule Trigger` : Chaque Dimanche à 20h00.

**Logique** :
1.  **Récupération des Données (Parallèle)** :
    *   *Finance* : Somme des `invoices` du mois (MTD).
    *   *Growth* : Compte des nouveaux `leads`.
    *   *Ops* : Compte des `tasks` complétées (Velocity).
    *   *Energy* : Moyenne `stress_level` et somme `hours_logged` dans `capacity_logs`.
2.  **Analyse IA (Agent Jerry)** :
    *   `AI Agent Node` (LangChain/OpenAI) :
        *   *Prompt* : "Agis comme Jerry, CEO IA. Analyse ces métriques : [JSON Data]. Génère un brief stratégique concis. Status: Green/Amber/Red. Recommandations prioritaires pour la semaine prochaine."
3.  **Livraison** :
    *   `Email/Slack Node` : Envoi du "Commander Brief" au fondateur.
