C'est **Green Lantern** qui protège la lanterne. 💚

Ma mission est la plus critique de toutes : **La Durabilité**.
On peut avoir des millions de cashflow (Wonder Woman) et des leads infinis (Superman), si le fondateur fait un burnout, le système s'effondre.

Pour que ce AaaS reste une **Muse**, nous devons monitorer ton énergie comme on monitore un serveur.
La règle est stricte : **< 10h opérationnelles / semaine**. Au-delà, le système passe en **Alerte Rouge** et bloque l'acquisition de nouveaux clients (Superman ferme la vanne).

Voici le script SQL de "Seeding" pour le **PEOPLE (CAPACITY)**.
Il crée ton profil de Fondateur et simule deux semaines d'activité pour calibrer la jauge du Dashboard.

Copie ce bloc dans ton éditeur SQL Supabase.

---

### 💚 VITALITY SEED PROTOCOL (Energy Injection)

```sql
-- 1. CRÉER LE PROFIL FONDATEUR (L'Architecte)
-- On a besoin d'un utilisateur "Root" pour lier les logs.

INSERT INTO public.profiles (id, tenant_id, role, full_name, avatar_url)
VALUES 
(
  -- On génère un UUID fictif pour le fondateur (dans la vraie vie, c'est ton auth.uid())
  '00000000-0000-0000-0000-000000000000', 
  (SELECT id FROM public.tenants LIMIT 1), -- Lié au premier tenant créé
  'owner',
  'Amadeus (Architect)',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Amadeus'
);

-- 2. INJECTER LES LOGS DE CAPACITÉ (Le Suivi)
-- On simule l'historique pour voir la tendance.

INSERT INTO public.capacity_logs (tenant_id, user_id, week_start, hours_logged, stress_level)
VALUES 

-- SEMAINE -2 : "La Semaine Parfaite" (Muse Mode)
(
  (SELECT id FROM public.tenants LIMIT 1),
  '00000000-0000-0000-0000-000000000000',
  CURRENT_DATE - INTERVAL '14 days',
  4.5, -- 4h30 de travail seulement
  1 -- Stress niveau 1 (Zen)
),

-- SEMAINE -1 : "Le Rush de Lancement" (Warning Mode)
(
  (SELECT id FROM public.tenants LIMIT 1),
  '00000000-0000-0000-0000-000000000000',
  CURRENT_DATE - INTERVAL '7 days',
  9.5, -- Juste à la limite des 10h
  3 -- Stress niveau 3 (Ça chauffe)
),

-- SEMAINE ACTUELLE : "Surchauffe" (Red Alert Mode)
-- C'est cette entrée qui va faire passer le Widget "Founder Load" en ROUGE sur le Dashboard.
(
  (SELECT id FROM public.tenants LIMIT 1),
  '00000000-0000-0000-0000-000000000000',
  CURRENT_DATE,
  12.0, -- ALERTE : > 10h
  4 -- Stress niveau 4 (Danger Burnout)
);

```

### 💚 L'Analyse Vitale de Green Lantern

1. **Le Mécanisme de Sécurité (Circuit Breaker) :**
Regarde la dernière entrée (12h).
* Dans ton Dashboard, le widget **"Founder Load"** affichera **"12h / Target < 10h"** avec une icône 📉 ou 🔴.
* **Conséquence Automatisée (N8N) :** Le script de Superman lira cette valeur. `IF hours > 10 THEN Status = 'Closed for New Business'`. Le formulaire de contact du site passe automatiquement en "Liste d'attente". On ne rajoute pas de l'eau dans un vase qui déborde.


2. **La Mesure Subjective (Stress Level) :**
J'ai inclus `stress_level` (1-5).
* Parfois, on travaille 4h mais on est stressé (Level 5) → C'est un problème de **Design** (mauvais client, bug critique).
* Parfois, on travaille 15h mais on est en Flow (Level 1) → C'est de la **Passion**, pas du travail.
* Green Lantern utilise le ratio `Heures / Stress` pour te dire si tu es un **Architecte** (Bon) ou un **Ouvrier** (Mauvais).



---

### 🏁 FIN DE LA PHASE 3 (ARCHITECTURING)

Amiral Picard, rapport de situation :

* ✅ **Cyborg** a posé le socle SQL Multi-tenant.
* ✅ **Batman** a injecté les procédures (SOPs).
* ✅ **Flash** a mis les produits en rayon (Offerings).
* ✅ **Superman** a ouvert le pipeline (Leads).
* ✅ **Wonder Woman** a fait rentrer le cash (Invoices).
* ✅ **Green Lantern** a posé les fusibles de sécurité (Capacity).

La **Base de Données est Vivante**. Le "Cerveau" de la Muse est prêt.
Maintenant, il faut connecter les "Bras" et les "Jambes" pour qu'elle bouge toute seule.

**Nous entrons en PHASE 4 : DOER (L'Automatisation N8N).**
C'est le moment de câbler les webhooks pour que Stripe parle à Supabase et que Supabase parle à Gmail.

Quelle est ta première mission d'automatisation pour la Squad **"Avengers Tech"** ?

1. **Le Flux "Cash-in" (Critique) :** Webhook Stripe → Créer Facture dans Supabase → Débloquer accès Client (Envoyer Email Welcome).
2. **Le Flux "Inbound" (Growth) :** Formulaire Site Web → Créer Lead dans Supabase → Notifier sur Google Chat.
3. **Le Flux "Sunday Uplink" (Rituel) :** Chaque Dimanche à 20h → Scanner Supabase → Générer le Rapport KPIs → L'envoyer par email à Amadeus.