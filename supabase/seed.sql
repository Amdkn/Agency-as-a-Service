-- PROJECT GENESIS — SEED DATA
-- Source: Canon_BMad_DEAL/04_Seed_Ops_SOPs.md to 09_Seed_Legal_Documents.md

-- =============================================
-- 0. INITIALISATION DU TENANT
-- =============================================

-- Création d'un tenant fictif pour le seeding
INSERT INTO public.tenants (name, slug, subscription_status)
VALUES ('Genesis Agency', 'genesis-agency', 'active');

-- =============================================
-- 0.1. INITIALISATION DU SUPER ADMIN (Auth)
-- =============================================
INSERT INTO auth.users (id, aud, role, email, email_confirmed_at)
VALUES ('00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'amadeus@genesis.local', current_timestamp)
ON CONFLICT (id) DO NOTHING;


-- =============================================
-- 1. FACTORY SEED PROTOCOL (Batman - OPS)
-- =============================================

INSERT INTO public.sops (tenant_id, title, department, department_icon, estimated_time, is_template, content_markdown)
VALUES 
-- 1. SOP ONBOARDING (Le "Wow Effect" immédiat)
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
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
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
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
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
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
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
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
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
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


-- =============================================
-- 2. STOREFRONT SEED PROTOCOL (Flash - PRODUCT)
-- =============================================

INSERT INTO public.offerings (tenant_id, name, price, description, root_sop_id, is_public)
VALUES 

-- 1. LE PRODUIT D'APPEL (Low Ticket / Lead Magnet)
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  'Pack Audit Flash ⚡', 
  497, 
  'Diagnostic complet de vos opérations actuelles en 48h. Nous identifions vos 3 goulots d''étranglement majeurs.',
  -- CONNEXION OBLIGATOIRE À LA SOP "ONBOARDING" (C'est la première étape de livraison)
  (SELECT id FROM public.sops WHERE title LIKE '%Onboarding%' AND tenant_id=(SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1) LIMIT 1),
  true -- Visible sur la Landing Page
),

-- 2. LE PRODUIT COEUR (Core Offer / Retainer)
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  'Abonnement Growth Engine 🚀', 
  2000, 
  'Gestion mensuelle de votre pipeline d''acquisition. 10 Leads qualifiés garantis par mois ou remboursé.',
  -- CONNEXION À LA SOP "LIVRAISON" (C'est ce qu'on fait chaque mois)
  (SELECT id FROM public.sops WHERE title LIKE '%Livraison%' AND tenant_id=(SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1) LIMIT 1),
  true
),

-- 3. LE PRODUIT HAUT DE GAMME (High Ticket / Setup)
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  'Transformation AaaS Complète 🏛️', 
  5000, 
  'Installation de votre propre instance A''Space souveraine. Formation de vos équipes et migration des données.',
  -- CONNEXION À LA SOP "ONBOARDING" (Gros projet, on commence par le Kickoff)
  (SELECT id FROM public.sops WHERE title LIKE '%Onboarding%' AND tenant_id=(SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1) LIMIT 1),
  true
),

-- 4. LE PRODUIT CACHÉ (Upsell / Internal)
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  'Coaching Fondateur (VIP) 🧘', 
  1000, 
  'Session de déblocage stratégique avec nos experts.',
  -- CONNEXION À LA SOP "CAPACITY" (C'est du temps homme)
  (SELECT id FROM public.sops WHERE title LIKE '%Rituel%' AND tenant_id=(SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1) LIMIT 1),
  false -- FALSE : Non visible sur la Landing Page publique (Offre secrète)
);


-- =============================================
-- 3. ENGINE SEED PROTOCOL (Superman - GROWTH)
-- =============================================

INSERT INTO public.leads (tenant_id, name, email, status, source, interested_in_offering_id)
VALUES 

-- 1. LE COLD LEAD (Vient d'arriver, colonne "Entrants")
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  'Cabinet Orion', 
  'contact@orion-legal.com', 
  'cold', 
  'LinkedIn Inbound',
  -- Intéressé par le Produit d'Appel (Audit)
  (SELECT id FROM public.offerings WHERE name LIKE '%Audit%' AND tenant_id=(SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1) LIMIT 1)
),

-- 2. LE WARM LEAD (Offre envoyée, colonne "En Discussion")
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  'Helios Ventures', 
  'ceo@helios.vc', 
  'warm', 
  'Referral',
  -- Intéressé par le Retainer (Growth Engine)
  (SELECT id FROM public.offerings WHERE name LIKE '%Growth%' AND tenant_id=(SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1) LIMIT 1)
),

-- 3. LE WON LEAD (A payé, colonne "Signés")
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  'Nova Agency', 
  'sarah@nova.io', 
  'won', 
  'Website',
  -- A acheté le High Ticket (Transformation)
  (SELECT id FROM public.offerings WHERE name LIKE '%Transformation%' AND tenant_id=(SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1) LIMIT 1)
),

-- 4. UN AUTRE WARM
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  'Studio Nébula', 
  'design@nebula.art', 
  'warm', 
  'Cold Email',
  -- Intéressé par l'Audit
  (SELECT id FROM public.offerings WHERE name LIKE '%Audit%' AND tenant_id=(SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1) LIMIT 1)
);


-- =============================================
-- 4. PULSE SEED PROTOCOL (Wonder Woman - FINANCE)
-- =============================================

INSERT INTO public.clients (tenant_id, name, email, onboarding_status)
VALUES 
-- Le Client "Transformation" (Vient de signer)
((SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1), 'Nova Agency', 'sarah@nova.io', 'pending'),

-- Un Client Récurrent (Abonné au Growth Engine)
((SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1), 'Alpha Corp', 'contact@alphacorp.com', 'active'),

-- Un Client One-Shot (Acheté un Audit)
((SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1), 'Beta Startups', 'ceo@betastart.co', 'completed');


-- GÉNÉRER LE CASHFLOW (Les Factures)

INSERT INTO public.invoices (tenant_id, client_id, amount, status, issued_at)
VALUES 

-- FACTURE 1 : Nova Agency (High Ticket - Payé d'avance)
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  (SELECT id FROM public.clients WHERE name = 'Nova Agency' AND tenant_id=(SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1) LIMIT 1),
  5000, -- Prix de l'offre Transformation
  'paid', -- L'argent est sur le compte
  CURRENT_DATE -- C'est arrivé aujourd'hui
),

-- FACTURE 2 : Alpha Corp (Retainer Mensuel)
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  (SELECT id FROM public.clients WHERE name = 'Alpha Corp' AND tenant_id=(SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1) LIMIT 1),
  2000, -- Prix de l'offre Growth Engine
  'paid',
  CURRENT_DATE - INTERVAL '2 days' -- Payé il y a 2 jours
),

-- FACTURE 3 : Beta Startups (Petit Ticket - Problème)
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  (SELECT id FROM public.clients WHERE name = 'Beta Startups' AND tenant_id=(SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1) LIMIT 1),
  497, -- Prix de l'offre Audit
  'overdue', -- AÏE ! Paiement échoué
  CURRENT_DATE - INTERVAL '5 days'
);


-- =============================================
-- 5. VITALITY SEED PROTOCOL (Green Lantern - PEOPLE)
-- =============================================

-- CRÉER LE PROFIL FONDATEUR
INSERT INTO public.profiles (id, tenant_id, role, full_name, avatar_url)
VALUES 
(
  -- UUID fictif pour le fondateur (dans la vraie vie, c'est ton auth.uid())
  '00000000-0000-0000-0000-000000000000', 
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1), 
  'owner',
  'Amadeus (Architect)',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Amadeus'
);

-- INJECTER LES LOGS DE CAPACITÉ

INSERT INTO public.capacity_logs (tenant_id, user_id, week_start, hours_logged, stress_level)
VALUES 

-- SEMAINE -2 : "La Semaine Parfaite"
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  '00000000-0000-0000-0000-000000000000',
  CURRENT_DATE - INTERVAL '14 days',
  4.5, 
  1 
),

-- SEMAINE -1 : "Le Rush de Lancement"
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  '00000000-0000-0000-0000-000000000000',
  CURRENT_DATE - INTERVAL '7 days',
  9.5, 
  3 
),

-- SEMAINE ACTUELLE : "Surchauffe"
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  '00000000-0000-0000-0000-000000000000',
  CURRENT_DATE,
  12.0, -- ALERTE : > 10h
  4 
);


-- =============================================
-- 6. SHIELD SEED PROTOCOL (Aquaman - LEGAL)
-- =============================================

INSERT INTO public.legal_docs (tenant_id, title, type, content_markdown, version)
VALUES 

-- LE BOUCLIER PRINCIPAL : Terms of Service (SaaS)
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  'Conditions Générales de Vente (AaaS Standard)', 
  'template',
  '# ARTICLE 1 : OBJET
Le présent contrat a pour objet la mise à disposition d''une infrastructure de gestion (AaaS).

# ARTICLE 2 : PAIEMENT
Le service est délivré exclusivement après paiement complet. Aucun remboursement n''est possible une fois l''accès au "Digital Garden" délivré.

# ARTICLE 3 : PROPRIÉTÉ
Le Client reste propriétaire de ses données (Data Sovereignty). Le Prestataire reste propriétaire du code source de l''infrastructure (IP Rights).',
  '2026.v1'
),

-- LE BOUCLIER SECONDAIRE : DPA (GDPR)
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  'Data Processing Agreement (RGPD)', 
  'template',
  '# PROTECTION DES DONNÉES
En tant que sous-traitant, nous nous engageons à sécuriser les données de vos clients finaux selon les normes standards de l''industrie.',
  '2026.v1'
),

-- LE CONTRAT SIGNÉ (Simulation)
(
  (SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1),
  'Contrat de Service - Nova Agency',
  'signed_contract',
  'Reference au Template CGV 2026.v1...',
  '1.0'
);

-- Mettre à jour le lien client <-> contrat signé
UPDATE public.legal_docs 
SET client_id = (SELECT id FROM public.clients WHERE name = 'Nova Agency' AND tenant_id=(SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1) LIMIT 1),
    signed_at = CURRENT_TIMESTAMP,
    ip_address = '192.168.1.42'
WHERE title = 'Contrat de Service - Nova Agency' AND tenant_id=(SELECT id FROM public.tenants WHERE slug='genesis-agency' LIMIT 1);
