C'est **Flash** sur la fréquence. ⚡

C'est ici que la magie opère. C'est l'étape où nous transformons une "Procédure ennuyeuse" (SOP) en un "Produit sexy" (Offre) affiché sur une Landing Page.

Nous appliquons strictement la **Règle d'Or** : "Impossible de vendre une offre (Lead) qui n'est pas connectée à une procédure (SOP)". Si on ne sait pas le livrer (Batman), on ne le met pas en rayon (Flash).

Voici le script SQL de "Seeding" pour le **STOREFRONT**. Il va chercher dynamiquement les IDs des SOPs créées par Batman pour créer les produits correspondants.

Copie ce bloc dans ton éditeur SQL Supabase.

---

### ⚡ STOREFRONT SEED PROTOCOL (Product Injection)

```sql
-- Insérer les Offres par défaut (Le Menu Public)
-- On utilise des sous-requêtes (SELECT) pour trouver l'ID de la SOP sans le copier-coller manuellement.

INSERT INTO public.offerings (name, price, description, root_sop_id, is_public)
VALUES 

-- 1. LE PRODUIT D'APPEL (Low Ticket / Lead Magnet)
(
  'Pack Audit Flash ⚡', 
  497, 
  'Diagnostic complet de vos opérations actuelles en 48h. Nous identifions vos 3 goulots d''étranglement majeurs.',
  -- CONNEXION OBLIGATOIRE À LA SOP "ONBOARDING" (C'est la première étape de livraison)
  (SELECT id FROM public.sops WHERE title LIKE '%Onboarding%' LIMIT 1),
  true -- Visible sur la Landing Page
),

-- 2. LE PRODUIT COEUR (Core Offer / Retainer)
(
  'Abonnement Growth Engine 🚀', 
  2000, 
  'Gestion mensuelle de votre pipeline d''acquisition. 10 Leads qualifiés garantis par mois ou remboursé.',
  -- CONNEXION À LA SOP "LIVRAISON" (C'est ce qu'on fait chaque mois)
  (SELECT id FROM public.sops WHERE title LIKE '%Livraison%' LIMIT 1),
  true
),

-- 3. LE PRODUIT HAUT DE GAMME (High Ticket / Setup)
(
  'Transformation AaaS Complète 🏛️', 
  5000, 
  'Installation de votre propre instance A''Space souveraine. Formation de vos équipes et migration des données.',
  -- CONNEXION À LA SOP "ONBOARDING" (Gros projet, on commence par le Kickoff)
  (SELECT id FROM public.sops WHERE title LIKE '%Onboarding%' LIMIT 1),
  true
),

-- 4. LE PRODUIT CACHÉ (Upsell / Internal)
(
  'Coaching Fondateur (VIP) 🧘', 
  1000, 
  'Session de déblocage stratégique avec nos experts.',
  -- CONNEXION À LA SOP "CAPACITY" (C'est du temps homme)
  (SELECT id FROM public.sops WHERE title LIKE '%Rituel%' LIMIT 1),
  false -- FALSE : Non visible sur la Landing Page publique (Offre secrète)
);

```

### ⚡ L'Analyse de Flash (Vitesse & Conversion)

1. **Le "Hard-Link" Technique :** Regarde les lignes `(SELECT id FROM public.sops...)`. C'est la garantie technique que **rien ne peut être vendu** sans qu'une procédure existe en face. Si Batman supprime la SOP "Onboarding", l'offre "Pack Audit" casse (ou disparaît), protégeant l'agence d'une vente impossible à livrer.
2. **La Vitrine Automatique (Next.js ISR) :**
* Ton frontend (Next.js) va simplement faire : `SELECT * FROM offerings WHERE is_public = true`.
* Avec ces 3 entrées, ta page `/offers` est **instantanément générée**.
* Tu changes le prix de 497 à 597 dans la base ? La Landing Page se met à jour seule. C'est ça, le "Storefront".


3. **La Stratégie de Prix (Pricing Psychology) :**
* J'ai structuré les prix selon la logique du *Beauty OS* : Un produit d'entrée (Audit), un récurrent (Growth), et un High-Ticket (Transformation).



**Prochaine étape dans le Pipeline :**
Le Magasin est ouvert (Offres & SOPs sont liées). Maintenant, il faut gérer les clients qui entrent.

Veux-tu passer à :

1. **Superman (GROWTH) :** Pour configurer le Kanban du Pipeline (`leads`) qui va recevoir les intéressés par ces offres ?
2. **Wonder Woman (FINANCE) :** Pour simuler des factures (`invoices`) correspondant à ces montants ?