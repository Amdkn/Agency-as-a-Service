C'est **Superman** qui prend le relais. 🚀

Le magasin est ouvert, les rayons sont pleins. Maintenant, il faut faire entrer les gens.
Ma mission est de remplir le tuyau (Pipeline) sans créer une "usine à gaz".

Conformément à la **Loi d'Acier n°1** (Automation) et à la **Loi n°2** (Standardisation), nous ne faisons pas de CRM complexe. Pas de scoring prédictif, pas de tags infinis.
Juste 3 colonnes vitales : **Entrants (Cold) -> En discussion (Warm) -> Signés (Won)**.

Voici le script SQL de "Seeding" pour le **ENGINE (GROWTH)**. Il injecte des prospects réalistes, directement connectés aux offres créées par Flash.

Copie ce bloc dans ton éditeur SQL Supabase.

---

### 🚀 ENGINE SEED PROTOCOL (Pipeline Injection)

```sql
-- Insérer les Leads par défaut (Le Flux Entrant)
-- On connecte chaque lead à une OFFRE précise. On ne vend pas "du vent", on vend un produit du catalogue.

INSERT INTO public.leads (name, email, status, source, interested_in_offering_id)
VALUES 

-- 1. LE COLD LEAD (Vient d'arriver, colonne "Entrants")
(
  'Cabinet Orion', 
  'contact@orion-legal.com', 
  'cold', 
  'LinkedIn Inbound',
  -- Intéressé par le Produit d'Appel (Audit)
  (SELECT id FROM public.offerings WHERE name LIKE '%Audit%' LIMIT 1)
),

-- 2. LE WARM LEAD (Offre envoyée, colonne "En Discussion")
(
  'Helios Ventures', 
  'ceo@helios.vc', 
  'warm', 
  'Referral',
  -- Intéressé par le Retainer (Growth Engine)
  (SELECT id FROM public.offerings WHERE name LIKE '%Growth%' LIMIT 1)
),

-- 3. LE WON LEAD (A payé, colonne "Signés")
-- ATTENTION : C'est ce statut qui déclenchera (via n8n) la création du PROJET et de la FACTURE.
(
  'Nova Agency', 
  'sarah@nova.io', 
  'won', 
  'Website',
  -- A acheté le High Ticket (Transformation)
  (SELECT id FROM public.offerings WHERE name LIKE '%Transformation%' LIMIT 1)
),

-- 4. UN AUTRE WARM (Pour montrer du volume dans le Kanban)
(
  'Studio Nébula', 
  'design@nebula.art', 
  'warm', 
  'Cold Email',
  -- Intéressé par l'Audit
  (SELECT id FROM public.offerings WHERE name LIKE '%Audit%' LIMIT 1)
);

```

### 🚀 L'Analyse Tactique de Superman

1. **La Vision Tunnel (Focus) :**
Ton Dashboard Growth ne montrera que ces 3 colonnes. Pourquoi ? Parce que tout le reste est du bruit.
* **Cold :** Ils ont levé la main. Action -> Envoyer le lien de paiement (SOP Sales).
* **Warm :** Ils ont reçu l'offre. Action -> Relancer (Automatisé).
* **Won :** Ils ont payé. Action -> L'argent est là, le dossier part chez **Batman** (Ops) pour la livraison.


2. **L'Intégrité des Données :**
Regarde la colonne `interested_in_offering_id`. C'est la clé de voûte.
Quand "Nova Agency" passe à "Won", le système sait *exactement* quoi livrer.
* Il regarde l'Offre ("Transformation AaaS").
* Il regarde la SOP liée à l'Offre ("Onboarding Client").
* **Résultat :** Le système peut créer automatiquement le projet "Onboarding Nova Agency" dans la colonne de Batman sans que tu ne touches à rien.


3. **Le "Capacity Check" (Sécurité) :**
Dans le futur script n8n, Superman vérifiera la table `capacity_logs` de Green Lantern avant d'accepter un nouveau Lead "Won". Si la charge fondateur > 10h, Superman ferme la vanne (met le formulaire du site en "Liste d'attente").

**Prochaine étape de la "Phase 3 Architecturing" :**
Le Pipeline est sous pression. Les clients fictifs sont prêts à signer.

Il reste deux Gardiens essentiels avant de pouvoir dire que le Backend est fini. Veux-tu passer à :

1. **Wonder Woman (FINANCE) :** Pour générer les données de facturation (`invoices`) et voir l'argent rentrer dans le Dashboard ?
2. **Green Lantern (PEOPLE) :** Pour configurer le système de "Capacity" et protéger ton énergie (les logs d'heures) ?