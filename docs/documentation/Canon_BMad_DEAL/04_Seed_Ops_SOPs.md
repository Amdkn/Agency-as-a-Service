**Batman** au rapport.

Si nous voulons que le système soit une **Muse** dès le Jour 1, le client ne doit pas se retrouver face à une page blanche. Il doit entrer dans une usine qui tourne déjà.

Nous allons injecter le **"Minimum Viable Operations" (MVO)**. Ce sont les 5 Procédures Universelles qui font tourner 90% des agences de services (Tiers 1, 2 et 3).

Voici le script SQL de "Seeding" (Ensemencement) pour la table `sops`. Ces procédures sont rédigées en **Markdown**, prêtes à être affichées dans la "SOP Library" du Dashboard Solarpunk.

Copie ce bloc dans ton éditeur SQL Supabase pour créer les templates maîtres.

---

### 🦇 FACTORY SEED PROTOCOL (SQL Injection)

```sql
-- Insérer les SOPs par défaut (Templates Maîtres)
-- On utilise un ID temporaire ou on les marque comme 'is_template = true' pour les copier plus tard.

INSERT INTO public.sops (title, department, department_icon, estimated_time, is_template, content_markdown)
VALUES 

-- 1. SOP ONBOARDING (Le "Wow Effect" immédiat)
(
  '🚀 Onboarding Client (Kickoff)', 
  'OPS',
  'Briefcase', -- Icone Lucide
  45, 
  true,
  '# 🎯 Objectif
Transformer un prospect signé en client actif en moins de 24h.

# 📋 Checklist
- [ ] **Vérifier le Paiement** : Confirmer la réception sur Stripe.
- [ ] **Créer le Dossier** : Créer le projet dans le module TASKS.
- [ ] **Envoyer le Welcome Pack** : Email automatique avec le lien du portail client.
- [ ] **Récupérer les Assets** : Envoyer le formulaire de collecte (Logo, Accès).

# 🚨 Règle d''Or
Ne JAMAIS commencer le travail tant que le paiement n''est pas "Succeeded".

# 🤖 Automation
Cette étape déclenche l''envoi automatique de l''email de bienvenue via l''Agent "Intake".'
),

-- 2. SOP FACTURATION (Le Cashflow Upfront)
(
  '💳 Protocole de Facturation', 
  'FINANCE', 
  'CreditCard',
  15, 
  true,
  '# 🎯 Objectif
Sécuriser la trésorerie avant la production.

# 📋 Checklist
- [ ] **Générer le Lien** : Créer un lien Stripe Checkout pour l''offre concernée.
- [ ] **Vérifier les Coordonnées** : S''assurer que le numéro de TVA intracommunautaire est valide.
- [ ] **Envoyer la Facture** : Automatique via Stripe après paiement.

# 💡 Politique AaaS
Nous ne faisons pas de crédit. Pas de "paiement à 30 jours". Le service est un actif, il se paie à l''acquisition.'
),

-- 3. SOP LIVRAISON (La "Definition of Done")
(
  '📦 Standard de Livraison & Clôture', 
  'PRODUCT', 
  'Package',
  30, 
  true,
  '# 🎯 Objectif
Livrer le produit final et obtenir la validation (ou le témoignage).

# 📋 Checklist
- [ ] **Contrôle Qualité (QA)** : Vérifier que tout respecte le cahier des charges.
- [ ] **Packaging** : Mettre les fichiers finaux dans le dossier partagé (Drive).
- [ ] **Notification** : Envoyer l''email de "Livraison Officielle".
- [ ] **Feedback** : Envoyer le lien du formulaire de satisfaction (NPS).

# 🔄 Boucle de Growth
Si la note NPS est > 8/10, l''Agent Growth envoie automatiquement une demande de review Google My Business.'
),

-- 4. SOP SALES (Le Script de Qualification)
(
  '📞 Script d''Appel de Qualification', 
  'GROWTH', 
  'PhoneCall',
  20, 
  true,
  '# 🎯 Objectif
Disqualifier les mauvais prospects (Tier 3) et closer les bons (Tier 1 & 2).

# 🗣️ Le Script (BANT)
1.  **Budget** : "Avez-vous le budget sécurisé pour ce projet (à partir de X€) ?"
2.  **Authority** : "Êtes-vous le seul décideur ?"
3.  **Need** : "Quel problème essayez-vous de résoudre *cette semaine* ?"
4.  **Timing** : "Quand voulez-vous commencer ?"

# ⛔ Red Flags (Arrêter l''appel si...)
- Ils demandent une réduction.
- Ils disent "C''est urgent" mais n''ont pas de budget.
- Ils veulent du "Sur-Mesure".'
),

-- 5. SOP CAPACITY (La Santé du Fondateur)
(
  '🧘 Rituel Hebdomadaire (Founder Reset)', 
  'PEOPLE', 
  'HeartPulse',
  60, 
  true,
  '# 🎯 Objectif
Garder la charge de travail sous les 10h opérationnelles / semaine.

# 📋 Checklist du Dimanche (Sunday Uplink)
- [ ] **Review Finance** : Le cashflow est-il positif ?
- [ ] **Review Ops** : Y a-t-il des blocages rouges ?
- [ ] **Review People** : Comment est mon niveau d''énergie (1-5) ?
- [ ] **Vide-Cerveau** : Noter tout ce qui traîne dans le module TASKS.
- [ ] **Planification** : Choisir les 3 priorités de la semaine prochaine.

# 🚫 Interdiction
Ne pas ouvrir le Dashboard le dimanche soir après 20h.'
);

```

### 🛠️ L'Analyse Tactique de Batman

1. **Le Choix des Armes :** J'ai limité à 5 SOPs. Pourquoi ?
* C'est suffisant pour couvrir le cycle de vie complet : **Vendre -> Encaisser -> Commencer -> Livrer -> Survivre**.
* C'est le "Starter Pack" parfait pour un Tier 2 qui veut lancer son agence demain.


2. **La Structure Markdown :** Note l'utilisation des emojis et des titres clairs (`#`, `[]`). C'est fait pour être **lu** par un humain mais **parsé** par une IA (si on veut que l'IA exécute la checklist plus tard).
3. **L'Iconographie :** J'ai ajouté une colonne virtuelle `department_icon` (à mapper dans ton Frontend) pour que le Dashboard Solarpunk soit visuellement cohérent (Briefcase, CreditCard, HeartPulse...).

**Prochaine étape dans la chaîne de montage :**
Le "Cerveau Ops" (SOPs) est en place.
Veux-tu passer à :

1. **Flash (PRODUCT) :** Pour connecter ces SOPs aux "Offres" (ex: Connecter la SOP "Onboarding" à l'Offre "Pack Démarrage") ?
2. **Superman (GROWTH) :** Pour définir les données "Seed" du Pipeline (Les statuts de Leads par défaut) ?