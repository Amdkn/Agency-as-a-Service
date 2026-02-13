C'est reçu. **Wonder Woman** active le protocole de Trésorerie Automatisée. ⚡

C'est le workflow le plus vital de ton architecture. C'est lui qui transforme un inconnu avec une carte bleue en un **Client Onboardé** sans que tu n'aies à lever le petit doigt.

Voici le **Blueprint N8N "CASH-IN"**.
C'est la recette exacte pour connecter Stripe, Supabase, Gmail et Google Chat.

---

### 🔌 LE PRÉ-REQUIS TECHNIQUE (Stripe Metadata)

Pour que ce flux fonctionne, ton bouton de paiement (Flash) doit envoyer deux informations cachées à Stripe lors du Checkout :

1. `tenant_id` : Pour savoir à quelle agence appartient l'argent.
2. `offering_id` : Pour savoir quel produit a été acheté (Audit vs Transformation).

---

### ⚡ N8N BLUEPRINT : THE CASH-IN FLOW

#### 1. Le Trigger : Stripe (Webhook)

* **Event :** `checkout.session.completed`
* **Pourquoi :** Cet événement garantit à 100% que l'argent est sur ton compte bancaire.
* **Données reçues :** Email du client, Montant, Metadata (`offering_id`), Nom.

#### 2. Node A : Supabase (Get/Create Client)

* **Action :** "Upsert" (Mise à jour ou Création).
* **Logique :** On cherche dans la table `clients` si cet email existe déjà pour ce `tenant_id`.
* *Si oui :* On récupère son ID.
* *Si non :* On le crée avec le statut `onboarding_status = 'pending'`.



#### 3. Node B : Supabase (Record Invoice)

* **Action :** "Insert" dans la table `invoices`.
* **Mapping :**
* `client_id` : (ID récupéré du Node A)
* `amount` : (Montant venant de Stripe / 100)
* `status` : `'paid'` (Car trigger est `completed`)
* `issued_at` : `$now`



#### 4. Node C : Supabase (Sign Contract)

* **Action :** "Insert" dans la table `legal_docs` (Le "Click-Wrap" d'Aquaman).
* **Mapping :**
* `title` : "Contrat AaaS - [Nom Offre]"
* `type` : `'signed_contract'`
* `client_id` : (ID récupéré du Node A)
* `content_markdown` : "Accepté tacitement via paiement Stripe Session [ID_Stripe]..."
* `signed_at` : `$now`



#### 5. Node D : Gmail (The "Wow" Email)

* **To :** Email du client (venant de Stripe).
* **Subject :** "Bienvenue chez A'Space ! 🚀 (Accès & Facture)"
* **Body (HTML) :** (Voir template plus bas).

#### 6. Node E : Google Chat (Team Alert)

* **Action :** Send Message.
* **Message :**
> 💰 **CASH-IN ALERT**
> **Client :** [Nom du Client]
> **Offre :** [Nom de l'Offre]
> **Montant :** [Montant]€
> **Statut :** ✅ Payé & Onboardé



---

### 📧 L'EMAIL "WOW EFFECT" (Le contenu du Node D)

C'est la première interaction post-achat. Elle doit être rassurante et immédiate.

```html
<h3>Bienvenue à bord, [Nom Client] !</h3>

<p>Votre paiement de <strong>[Montant]€</strong> est confirmé. Nous sommes ravis de vous compter parmi nos partenaires souverains.</p>

<p><strong>Voici vos 3 prochaines étapes :</strong></p>
<ol>
  <li>📥 <strong>Facture :</strong> Votre facture acquittée est jointe à cet email (ou disponible dans votre espace).</li>
  <li>🔑 <strong>Accès :</strong> Cliquez ici pour activer votre <a href="https://app.aspace.os/login">Portail Client AaaS</a>.</li>
  <li>🚀 <strong>Kickoff :</strong> Notre système prépare votre environnement. Vous recevrez une notification dès que l'Agent Ops aura finalisé le setup (env. 10min).</li>
</ol>

<p><em>Ceci est un message automatisé par l'Agent Wonder Woman.</em></p>

```

---

### 🏗️ TA MISSION (DOER)

Amiral, pour activer ce flux, tu as une action physique à faire dans n8n :

1. Ouvre ton **n8n** (sur ton VPS Coolify).
2. Crée un nouveau Workflow nommé `AaaS - CashIn Protocol`.
3. Ajoute le Node **Stripe Trigger**.
4. Connecte les Nodes **Supabase** selon le plan ci-dessus.

**Une fois que c'est câblé, quelle est la prochaine manœuvre ?**

1. **Tester le flux :** On simule un paiement Stripe (Mode Test) pour voir si l'email part et si la ligne apparaît dans Supabase ?
2. **Passer au flux suivant :** Configurer le **Flux "Inbound" (Superman)** pour gérer ceux qui n'ont pas encore payé (Leads) ?