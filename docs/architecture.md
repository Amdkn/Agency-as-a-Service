# Dossier d’Architecture Technique : Projet Genesis (Infrastructure AaaS & Orchestration n8n)

## 1. Vision Stratégique et Architecture Globale

Le Projet Genesis constitue l'épine dorsale technologique d'une "Muse Industrielle". Il marque la transition déterministe entre le "Digital Garden" (le prototype expérimental) et la "Passerelle de l'Enterprise" (le QG stratégique souverain). Cette infrastructure Agency as a Service (AaaS) ne se contente pas d'automatiser des tâches ; elle déploie un système d'exploitation business complet où le temps du fondateur est sanctuarisé. L'objectif stratégique est le passage d'une production artisanale à une orchestration logicielle résiliente, garantissant que la croissance des revenus ne dépend plus de l'unité de temps travaillée, mais de la robustesse de l'algorithme opérationnel.

### Les Objectifs de la "Muse" : Le Framework DEAL

L'architecture technique de Genesis est conçue comme un système de contraintes physiques appliquant le framework DEAL :

* **Définir (D)** : Standardisation chirurgicale des services en actifs numériques vendables.
* **Éliminer (E)** : Suppression radicale du "sur-mesure" par des barrières logiques en base de données (Zero-Custom Rule).
* **Automatiser (A)** : Orchestration déterministe via n8n remplaçant tout arbitrage humain.
* **Libérer (L)** : Découplage structurel entre la possession du système et son exécution.

### La Justice League IA (Agents A'2) & Squads A'3

Le pilotage est assuré par une hiérarchie d'agents IA. Les agents A'2 (Stratégie) dirigent des squads A'3 (Tactique/Marvel) pour l'exécution massive.

| Agent (A'2) | Domaine | Mission Spécifique | Squad A'3 Associée |
| :--- | :--- | :--- | :--- |
| 🧠 Jerry | CEO / Pulse | Orchestration globale et validation du Brand Voice. | - |
| 🚀 Superman | Growth | Leader SEO Fractal et acquisition de leads. | Guardians of the Galaxy (SEO/Backlinks) |
| 🦇 Batman | Operations | Architecte de l'usine de production et des SOPs. | Avengers Tech (Automatisation/QA) |
| ⚡ Flash | Product | Génération des Landing Pages et produits d'appel. | - |
| 💫 Wonder Woman | Finance | Sécurisation du cashflow et automatisation Stripe. | - |
| 💚 Green Lantern | People | Protection de l'énergie et gestion de la capacité. | - |
| 🦾 Cyborg | IT | Gardien de la grille technique (Supabase/RLS/Coolify). | - |
| 🔱 Aquaman | Legal | Automatisation du bouclier juridique (Click-wrap). | - |

### Hiérarchie des Offres (Tiers)

L'infrastructure supporte trois niveaux d'isolation et de personnalisation, pilotés par la configuration logicielle :

1. **Start (300€/an)** : Instance partagée sous branding A'Space.
2. **Sovereign (700€/an)** : Instance White Label. L'UI est rendue dynamiquement via le `config_json` (logo, couleurs, vocabulaire métier) avec routage par slug.
3. **Fleet (1500€/an)** : Modèle de franchise permettant la revente de sous-comptes via Stripe Connect.

## 2. Architecture de Données : Le Socle PostgreSQL/Supabase

Le choix de PostgreSQL/Supabase est une décision d'ingénierie dictée par la nécessité de souveraineté absolue. Contrairement aux solutions SaaS fermées, ce socle garantit que le client loue le moteur mais possède son carburant (données exportables en SQL/JSON).

### Le Modèle Multi-Tenant et l'Isolation tenant_id

L'isolation est garantie par une "Muraille de Chine" logique. Chaque table contient une colonne `tenant_id`. L'accès aux données est filtré par le slug de l'URL, qui identifie le tenant et charge sa configuration spécifique. Ce modèle de "Zero-Trust Multi-tenancy" empêche toute fuite de données entre locataires au niveau de la couche de base de données elle-même.

### Sécurité et Row Level Security (RLS)

Le verrouillage repose sur les politiques RLS (Row Level Security). Aucune requête ne peut outrepasser l'isolation du tenant, même en cas de faille front-end.

**Politique d'isolation stricte (Exemple SQL) :**

```sql
-- Politique garantissant qu'un profil ne voit que les SOPs de son propre tenant
create policy "Tenant Isolation" on public.sops
using (tenant_id = (select tenant_id from public.profiles where id = auth.uid()));
```

### Schéma Maître et config_json

Le schéma intègre des tables critiques (`tenants`, `profiles`, `sops`, `tasks`, `offerings`, `leads`, `clients`, `invoices`, `capacity_logs`, `legal_docs`). La table `tenants` inclut une colonne `config_json` structurée pour le White Label :

* `branding`: `{ "primary_color": "#hex", "logo_url": "string" }`
* `vocabulary`: `{ "project": "Dossier", "task": "Action" }`

Cette structure permet un rendu UI dynamique sans déploiement de code.

## 3. La "Règle d'Or" : Intégrité des Flux Opérationnels

La pérennité de la Muse repose sur une contrainte système inviolable, la Règle d'Or : **Ops → Product → Growth**. Il est physiquement impossible de mettre en marché ce que l'usine ne sait pas produire de manière standardisée.

### Lien Structurel SOPs <-> Tasks : La Loi de la Standardisation

L'architecture impose une contrainte de clé étrangère (Foreign Key) : une tâche ne peut être instanciée sans être liée à une `sop_id`. Cette "Loi de la Standardisation" transforme chaque action en une unité d'exécution industrielle prévisible.

### Le Couplage Offres (offerings) et SOPs Racines

La table `offerings` est structurellement liée à une `root_sop_id`. Ce couplage "Hard-Coded" interdit la publication d'une offre sur une Landing Page si le protocole de livraison n'est pas préalablement documenté. On ne vend que ce qui est déjà processé.

### Le Catalogue de Procédures (MVO)

Le système est initialisé avec le Minimum Viable Operations (MVO) :

* **Onboarding** : Activation immédiate post-paiement.
* **Facturation** : Cashflow Upfront obligatoire.
* **Livraison** : Standard de clôture et boucle de feedback (NPS).
* **Sales** : Script de qualification BANT pour écarter les profils "hors-système" (Red Flags).
* **Capacity** : Le rituel "Sunday Uplink" pour le pilotage stratégique.

## 4. Orchestration n8n : Le Système Nerveux

n8n agit comme le système nerveux central, coordonnant les flux entre Stripe, Supabase et les interfaces de communication.

### Le Flux "Cash-in" (Wonder Woman ⚡)

Ce flux traite la conversion financière en exécution opérationnelle.

* **Trigger** : Webhook Stripe `checkout.session.completed`.
* **Métadonnées Critiques** : Le flux exige la présence de `tenant_id` et `offering_id` dans les métadonnées Stripe pour lier le paiement au bon locataire.
* **Étapes** : Upsert Client → Record Invoice → Auto-Sign Click-wrap Contract → Email Welcome (Wow Effect).

### Le Flux "Inbound" (Superman 🚀)

Ce workflow protège la croissance via un "Circuit Breaker" automatique.

* **Logique** : Le flux effectue un lookup sur `capacity_logs` avant toute action.
* **Branchement** : Si la charge est < 10h/semaine, le lead est routé vers la branche "Active". Si le seuil est dépassé, le système active le "Shield" et route le prospect vers une "Waitlist" automatisée, créant une rareté technique.

### Le Flux "Sunday Uplink" (Green Lantern 💚)

Le rituel de pilotage hebdomadaire exécuté chaque dimanche à 20h.

1. **Scan SQL Parallèle** : Exécution de 4 requêtes (Finance/MTD, Growth/Leads, Ops/Velocity, Energy/Stress).
2. **Intelligence Artificielle** : Un Node AI, infusé de la personnalité "Jerry (CEO IA)", analyse les métriques pour générer un "Commander Brief" (Status: Green/Amber/Red) avec recommandations stratégiques.

## 5. Protection du Fondateur : Le Système "Circuit Breaker"

L'architecture Genesis place la durabilité humaine au sommet de ses priorités techniques via le monitoring du "Founder Load".

### La Table capacity_logs : Le Baromètre de Stress

Le système ne se contente pas de compter les heures ; il analyse le ratio Heures / Stress.

* **Architecte (Mode Amadeus)** : Volume d'heures maîtrisé, stress faible.
* **Ouvrier** : Volume d'heures élevé ou stress maximal (signalant une friction de design ou un mauvais client).

### Logique du Fusible Opérationnel

Si la table `capacity_logs` enregistre une charge > 10h/semaine, le workflow n8n "Inbound" désactive automatiquement les formulaires de vente. Ce mécanisme de "Circuit Breaker" protège le fondateur du succès toxique en gelant l'acquisition jusqu'au retour à l'équilibre.

## 6. Le Bouclier Juridique et Conformité (Aquaman 🔱)

La protection juridique n'est pas une option, mais une fonctionnalité native intégrée au flux de paiement via le protocole Click-wrap.

### Gestion des legal_docs et Preuve Numérique

Le système automatise la génération de preuve sans intervention humaine :

* **Click-wrap** : L'acceptation des CGV est tacite lors de la validation du paiement Stripe.
* **Enregistrement** : Le flux n8n enregistre l'adresse IP, le Timestamp et le contenu du contrat (Article 3 protégeant l'IP du fondateur) dans la table `legal_docs`.
* **Souveraineté** : Le contrat stipule explicitement la propriété des données pour le client, tout en blindant la propriété intellectuelle de l'infrastructure pour le fondateur.

## 7. Conclusion : Un Système Vivant et Souverain

Le Projet Genesis transforme une expertise humaine en une infrastructure logicielle autonome. En s'appuyant sur une stack souveraine (Supabase + n8n + Coolify/VPS), le fondateur s'affranchit de la dépendance aux plateformes SaaS fermées. Ce système n'est plus un outil de gestion, mais un organisme vivant capable de générer des revenus, de livrer de la valeur et de s'auto-réguler pour protéger sa ressource la plus précieuse : le temps du créateur. La souveraineté technique est ici le garant ultime de la liberté entrepreneuriale.
