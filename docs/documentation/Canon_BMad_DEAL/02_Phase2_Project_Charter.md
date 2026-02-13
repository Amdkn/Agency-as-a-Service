C'est acté, Amiral. La Constitution est ratifiée. Le périmètre est scellé. Nous ne construisons pas un logiciel, nous construisons une **Muse Industrielle**.

Voici le **PROJECT CHARTER (Phase 2 - Management)**.
C'est l'Ordre de Mission Officiel que tu vas déposer sur la table de la Justice League pour lancer l'exécution.

---

# 📜 A'SPACE AaaS — PROJECT CHARTER

**Code Name:** `PROJECT GENESIS`
**Classification:** SOUVERAIN / MUSE
**Date:** 29 Janvier 2026
**Commandant:** Picard (Strategy)

## 1. LA MISSION (The North Star)

Construire l'infrastructure "Agency as a Service" qui permet à tout expert (Agence, Cabinet, PME) de transformer son **Savoir-Faire (Service)** en **Actif Vendable (Asset)**.

* **Mantra :** "Le client ne construit pas la machine, il la conduit."
* **Objectif Muse :** Zéro intervention humaine du Fondateur A'Space après le setup d'un client.

## 2. LES 3 LOIS D'ACIER (Constraints)

Pour protéger la Muse, ces lois sont inviolables par les Agents :

1. **Loi de l'Automation (The "No-Human" Rule) :** Si une feature requiert que nous (A'Space HQ) validions manuellement quelque chose au quotidien, elle est rejetée.
2. **Loi de la Standardisation (The "No-Custom" Rule) :** Le code est unique. Seule la configuration JSON (Logo/Couleur) change. Pas de "feature spéciale" pour un gros client.
3. **Loi de la Richesse (The "Upfront" Rule) :** Le service n'est délivré que *si et seulement si* le paiement est sécurisé d'avance (Stripe). Pas de chasse aux impayés.

## 3. L'OFFRE COMMERCIALE (The tiers)

* **TIER 1 (Start - 300€) :** L'Ordre. Accès SaaS partagé. Branding A'Space.
* **TIER 2 (Sovereign - 700€) :** L'Identité. Instance dédiée ou White Label. Branding Client.
* **TIER 3 (Fleet - 1500€) :** L'Empire. Capacité de revendre des sous-comptes (Franchise).

---

## 4. ORDRES DE MISSION : LA JUSTICE LEAGUE (Distribution des Rôles)

Chaque Agent A'2 est désormais responsable de livrer son module "Clé en Main".

### 🦇 BATMAN (OPS) — "The Factory Architect"

**Objectif :** Construire l'usine qui ne s'arrête jamais.

* **Livrable Prioritaire :** Le Schéma SQL `sops` <-> `tasks`.
* **Directive Spéciale :** "Unifie la structure. Une tâche ne peut exister sans SOP. Si un utilisateur veut créer une tâche 'floue', le système le bloque et lui demande de l'attacher à une procédure."

### ⚡ FLASH (PRODUCT) — "The Speed Merchant"

**Objectif :** Transformer le service en produit d'étagère.

* **Livrable Prioritaire :** Le générateur de Landing Page (Next.js) basé sur la table `offerings`.
* **Directive Spéciale :** "Fais en sorte que la page de vente se génère en moins de 100ms. Le client change un prix, le site est à jour. Pas de Webflow, pas de Wordpress. Du code pur."

### 🚀 SUPERMAN (GROWTH) — "The Pipeline Master"

**Objectif :** Remplir l'usine sans effort.

* **Livrable Prioritaire :** Le Kanban simplifié (3 colonnes).
* **Directive Spéciale :** "Tue le CRM complexe. Je ne veux pas de 'Scoring' ou de 'Tags' infinis. Juste : Qui est intéressé ? Qui a payé ? C'est tout."

### 💫 WONDER WOMAN (FINANCE) — "The Treasury Guard"

**Objectif :** Sécuriser le cashflow avant le travail.

* **Livrable Prioritaire :** Intégration Stripe Connect (Split payments pour le Tier 3).
* **Directive Spéciale :** "Automatise la facture. Le client ne doit jamais ouvrir Word pour faire une facture. C'est le système qui l'émet quand Stripe valide le paiement."

### 💚 GREEN LANTERN (PEOPLE) — "The Capacity Keeper"

**Objectif :** Protéger l'énergie du fondateur.

* **Livrable Prioritaire :** L'Algorithme "Founder Load".
* **Directive Spéciale :** "Si la charge dépasse 10h/semaine, le Dashboard doit passer au ROUGE. C'est la seule alerte qui compte."

### 🦾 CYBORG (IT) — "The Grid Guardian"

**Objectif :** Assurer la souveraineté technique.

* **Livrable Prioritaire :** L'Architecture Multi-Tenant Supabase (Row Level Security).
* **Directive Spéciale :** "Assure-toi que les données du Client A sont physiquement invisibles pour le Client B. C'est la base de la confiance Tier 2."

### 🔱 AQUAMAN (LEGAL) — "The Shield"

**Objectif :** Blinder le modèle AaaS.

* **Livrable Prioritaire :** Les CGV (Conditions Générales de Vente) standards injectées dans le checkout.
* **Directive Spéciale :** "Le contrat est signé numériquement au paiement. Pas de PDF à signer via DocuSign à part. Le paiement VAUT signature."

---

## 5. NEXT STEPS (Passage à l'Action)

Amiral, la Phase 2 (Management) est initialisée. Les ordres sont clairs.
La prochaine étape logique est la **Phase 3 (Architecturing)** : Traduire ces missions en **Schémas de Base de Données (SQL)** et en **Flux N8N**.

**Par quel Agent veux-tu commencer le design technique détaillé ?**

1. **Cyborg (IT) :** Pour poser les fondations de la base de données (Le Schéma SQL complet).
2. **Batman (OPS) :** Pour structurer le cœur du réacteur (SOPs & Tâches).
3. **Flash (PRODUCT) :** Pour coder le moteur de Landing Page (La vitrine).