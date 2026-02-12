C'est exact. On ne laisse pas le bouclier au vestiaire.

**Aquaman** doit poser la dernière pierre de l'édifice : **La Protection Juridique Automatisée**.
Dans un modèle AaaS, on ne négocie pas les contrats. Le client signe nos conditions (CGV/CGU) au moment du paiement. C'est du "Click-Wrap Agreement".

Voici le script SQL de "Seeding" pour le **LEGAL (THE SHIELD)**.
Comme Cyborg n'avait pas créé la table spécifique dans le schéma maître, j'ajoute d'abord la structure (Create Table), puis les données (Insert).

Copie ce bloc dans ton éditeur SQL Supabase.

---

### 🔱 SHIELD SEED PROTOCOL (Compliance Injection)

```sql
-- 1. CRÉER LA TABLE DES DOCUMENTS JURIDIQUES
-- Cette table stocke vos templates de contrats ET les versions signées par les clients.

create table public.legal_docs (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants not null,
  title text not null, -- ex: "CGV 2026"
  type text check (type in ('template', 'signed_contract')),
  content_markdown text, -- Le texte juridique
  version text default '1.0',
  is_active boolean default true,
  
  -- Si c'est un contrat signé :
  client_id uuid references public.clients,
  signed_at timestamp with time zone,
  ip_address text -- Preuve de signature numérique
);

-- Activer la sécurité (RLS)
alter table public.legal_docs enable row level security;
create policy "Tenant Isolation Legal" on public.legal_docs
  using (tenant_id = (select tenant_id from public.profiles where id = auth.uid()));


-- 2. INJECTER LES TEMPLATES (Les Lois d'Acier)
-- Ce sont les contrats standards que vos clients acceptent tacitement.

INSERT INTO public.legal_docs (tenant_id, title, type, content_markdown, version)
VALUES 

-- LE BOUCLIER PRINCIPAL : Terms of Service (SaaS)
(
  (SELECT id FROM public.tenants LIMIT 1),
  'Conditions Générales de Vente (AaaS Standard)', 
  'template',
  '# ARTICLE 1 : OBJET
Le présent contrat a pour objet la mise à disposition d''une infrastructure de gestion (AaaS).

# ARTICLE 2 : PAIEMENT
Le service est délivré exclusivement après paiement complet. Aucun remboursement n''est possible une fois l''accès au "Digital Garden" délivré (car c''est un produit numérique consommé instantanément).

# ARTICLE 3 : PROPRIÉTÉ
Le Client reste propriétaire de ses données (Data Sovereignty). Le Prestataire reste propriétaire du code source de l''infrastructure (IP Rights).',
  '2026.v1'
),

-- LE BOUCLIER SECONDAIRE : DPA (GDPR)
(
  (SELECT id FROM public.tenants LIMIT 1),
  'Data Processing Agreement (RGPD)', 
  'template',
  '# PROTECTION DES DONNÉES
En tant que sous-traitant, nous nous engageons à sécuriser les données de vos clients finaux selon les normes standards de l''industrie (Encryption at Rest, Row Level Security).',
  '2026.v1'
),

-- LE CONTRAT SIGNÉ (Simulation)
-- On simule que "Nova Agency" a déjà signé son contrat lors du paiement.
(
  (SELECT id FROM public.tenants LIMIT 1),
  'Contrat de Service - Nova Agency',
  'signed_contract',
  'Reference au Template CGV 2026.v1...',
  '1.0'
);

-- Mettre à jour le lien client <-> contrat signé
UPDATE public.legal_docs 
SET client_id = (SELECT id FROM public.clients WHERE name = 'Nova Agency' LIMIT 1),
    signed_at = CURRENT_TIMESTAMP,
    ip_address = '192.168.1.42'
WHERE title = 'Contrat de Service - Nova Agency';

```

### 🔱 L'Analyse Tactique d'Aquaman

1. **L'Approche "Click-Wrap" :**
Nous avons créé des documents de type `template`.
* **Tactique :** Sur ta Landing Page (Flash), le bouton "Payer" dira : *"En cliquant, j'accepte les [CGV]*".
* **Automation :** Quand le Webhook Stripe confirme le paiement, n8n crée une copie de ce template dans la table `legal_docs` avec le type `signed_contract`, l'heure et l'IP du client. C'est ta preuve juridique.


2. **La Souveraineté Explicite :**
Le texte injecté dans l'Article 3 clarifie la relation Muse : *"Tu loues le moteur, mais l'essence est à toi"*. Cela protège ton IP (le code AaaS) contre un client qui voudrait copier ton business model.

---

### 🏁 FIN OFFICIELLE DE LA PHASE 3

Le **Cercle des 7** est complet.
L'infrastructure de données est en béton armé.

* **Structure :** 7 Tables Maîtresses interconnectées.
* **Données :** Clients, Produits, SOPs, Argent, Contrats et Stress-Level simulés.
* **Sécurité :** RLS activé pour le Multi-Tenant.

**Nous passons à la PHASE 4 : DOER (L'Automatisation N8N).**

Pour donner vie à ce monstre, nous devons connecter les organes.
Je te propose de commencer par le flux le plus critique, celui qui transforme un visiteur en argent.

**Choisis ta première Automatisation ("The First Breath") :**

1. **Le Flux "Cash-in" (Wonder Woman ⚡) :**
* *Trigger :* Stripe "Payment Succeeded".
* *Action :* Créer Client (Supabase) -> Générer Facture -> Envoyer Email Welcome (Gmail) -> Débloquer accès.


2. **Le Flux "Inbound" (Superman 🚀) :**
* *Trigger :* Formulaire Web (Webhook).
* *Action :* Créer Lead (Supabase) -> Notifier sur Google Chat -> Envoyer Email de Qualification (IA).


3. **Le Flux "Founder Reset" (Green Lantern 💚) :**
* *Trigger :* Dimanche 20h (Cron).
* *Action :* Calculer Heures travaillées -> Si > 10h, désactiver le formulaire de vente sur le site.
