C'est **Wonder Woman** à l'appareil. 💫

L'argent est le sang de la guerre. Si le Cashflow s'arrête, l'empire s'effondre.
Ma mission est stricte : **Sécuriser la trésorerie AVANT la production**.

Dans ton modèle AaaS, nous appliquons la **Loi de la Richesse** : "Le service n'est délivré que si le paiement est sécurisé d'avance". Pas de chasse aux impayés, pas de délais de paiement à 60 jours.

Voici le script SQL de "Seeding" pour le **PULSE (FINANCE)**.
Il va générer des clients actifs et des factures (payées et en retard) pour allumer les indicateurs verts (et rouges) de ton Dashboard.

Copie ce bloc dans ton éditeur SQL Supabase.

---

### 💫 TREASURY SEED PROTOCOL (Cashflow Injection)

```sql
-- 1. CONVERTIR LES LEADS EN CLIENTS
-- On crée les profils de ceux qui ont signé.
-- Normalement, c'est le Webhook Stripe qui fait ça automatiquement.

INSERT INTO public.clients (name, email, onboarding_status)
VALUES 
-- Le Client "Transformation" (Vient de signer)
('Nova Agency', 'sarah@nova.io', 'pending'),

-- Un Client Récurrent (Abonné au Growth Engine)
('Alpha Corp', 'contact@alphacorp.com', 'active'),

-- Un Client One-Shot (Acheté un Audit)
('Beta Startups', 'ceo@betastart.co', 'completed');


-- 2. GÉNÉRER LE CASHFLOW (Les Factures)
-- C'est ici qu'on peuple le KPI "€12,500 Cashflow MTD".

INSERT INTO public.invoices (client_id, amount, status, issued_at)
VALUES 

-- FACTURE 1 : Nova Agency (High Ticket - Payé d'avance)
-- Le gros montant qui fait plaisir au MTD.
(
  (SELECT id FROM public.clients WHERE name = 'Nova Agency' LIMIT 1),
  5000, -- Prix de l'offre Transformation
  'paid', -- L'argent est sur le compte
  CURRENT_DATE -- C'est arrivé aujourd'hui
),

-- FACTURE 2 : Alpha Corp (Retainer Mensuel)
-- Le revenu récurrent fiable.
(
  (SELECT id FROM public.clients WHERE name = 'Alpha Corp' LIMIT 1),
  2000, -- Prix de l'offre Growth Engine
  'paid',
  CURRENT_DATE - INTERVAL '2 days' -- Payé il y a 2 jours
),

-- FACTURE 3 : Beta Startups (Petit Ticket - Problème)
-- Pour tester l'alerte "Overdue" du Dashboard.
(
  (SELECT id FROM public.clients WHERE name = 'Beta Startups' LIMIT 1),
  497, -- Prix de l'offre Audit
  'overdue', -- AÏE ! Paiement échoué (Carte expirée ?)
  CURRENT_DATE - INTERVAL '5 days'
);

```

### 💫 L'Analyse Financière de Wonder Woman

1. **L'Alimentation du Dashboard :**
Avec ces données, ton composant "Finance Card" va calculer :
* **Cashflow MTD (Month-to-Date) :** 5000 + 2000 = **7 000 €** (Vert 🟢).
* **Pending/Overdue :** 497 € (Rouge 🔴).


2. **La Gestion de l'Anomalie (Overdue) :**
J'ai volontairement injecté une facture `overdue` pour "Beta Startups".
* **Pourquoi ?** Pour vérifier que ton Dashboard affiche bien l'alerte : *"1 Invoice Overdue to chase"*.
* **L'Action AaaS :** Dans notre système, pas d'appel de relance manuel. L'Agent **Billing-Bot** enverra une séquence d'emails automatiques. Si pas payé en 48h, l'accès au portail est coupé.


3. **La Preuve de Concept (Stripe) :**
Dans la production réelle, tu n'écriras jamais ces lignes SQL (`INSERT INTO invoices`). C'est **Stripe Connect** qui, via un Webhook reçu par n8n, insérera la ligne avec le `stripe_invoice_id`. Nous simulons ici la fin parfaite du processus.

**Dernière étape de la "Phase 3 Architecturing" :**
L'argent est là. Les clients sont là. Les produits sont là.

Il ne reste qu'un seul pilier critique pour que le système soit durable et humain : **La Protection de ton Énergie**.

Veux-tu activer :
**Green Lantern (PEOPLE) :** Pour configurer les logs de capacité (`capacity_logs`) et t'assurer que tu ne travailles pas plus de 10h/semaine sur ce système ?