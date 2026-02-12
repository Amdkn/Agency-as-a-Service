C'est **Superman** qui décolle. 🚀

Le flux "Inbound" n'est pas juste un formulaire de contact. C'est le **Système Immunitaire** de ta croissance.

Contrairement aux agences classiques qui disent "Oui" à tout le monde, ton AaaS applique la **Loi de la Capacité** (Green Lantern). Avant d'accepter un prospect, le système vérifie si tu as l'énergie pour le servir.

Voici le **Blueprint N8N "INBOUND PROTOCOL"**.
Il intègre une sécurité unique : le "Circuit Breaker" qui t'empêche de te noyer.

---

### 🔌 LE PRÉ-REQUIS TECHNIQUE (Le Formulaire)

Ton générateur de Landing Page (Flash) doit envoyer un JSON POST à ce Webhook N8N avec :

* `email`
* `name`
* `offering_slug` (ex: 'audit-flash', 'transformation')

---

### 🚀 N8N BLUEPRINT : THE INBOUND FLOW

#### 1. Le Trigger : Webhook (POST)

* **Path :** `/webhook/inbound-lead`
* **Auth :** Header Auth (ou Public si protégé par Captcha côté front).

#### 2. Node A : Supabase (Check Capacity - THE SHIELD)

* **Action :** "Get Many" sur la table `capacity_logs`.
* **Filtre :** Order by `week_start` DESC, Limit 1.
* **Pourquoi :** On demande à Green Lantern : *"Quel est le niveau de charge actuel ?"*
* **Logique :** Si la dernière entrée indique `hours_logged > 10` ou `stress_level >= 4`, le système passe en mode "Défensif".

#### 3. Node B : IF (Circuit Breaker)

* **Condition :** `Current_Load` > 10 ?
* **TRUE (Burnout Risk) :** Route vers la branche "Waitlist".
* **FALSE (All Good) :** Route vers la branche "Active Lead".



#### 4. BRANCH "ACTIVE LEAD" (La Voie Rapide)

* **Node C1 (Supabase) :** Insert Lead avec `status = 'warm'`.
* **Node D1 (Google Chat) :**
> 🚀 **NEW OPPORTUNITY**
> **Prospect :** [Nom]
> **Intérêt :** [Offre]
> **Action :** Email de qualification envoyé.


* **Node E1 (Gmail) :** Envoie l'email "Book a Call" ou le lien de paiement direct (selon l'offre).

#### 5. BRANCH "WAITLIST" (Le Bouclier)

* **Node C2 (Supabase) :** Insert Lead avec `status = 'cold'` et note interne *"Blocked by Capacity Protocol"*.
* **Node D2 (Google Chat) :**
> 🛡️ **SHIELD ACTIVE**
> **Prospect :** [Nom] mis sur liste d'attente.
> **Raison :** Charge fondateur critique (>10h).


* **Node E2 (Gmail) :** Envoie l'email "Liste d'Attente" (très poli, crée de la rareté).

---

### 📧 LES EMAILS "SUPERMAN" (Le contenu des Nodes E)

#### Cas 1 : La Route Active (Tu es dispo)

**Subject :** Votre demande pour [Nom Offre] (Accès AaaS)

```html
<p>Bonjour [Nom],</p>
<p>J'ai bien reçu votre demande pour le <strong>[Nom Offre]</strong>.</p>
<p>Notre système indique que nous avons un slot de production disponible cette semaine.</p>
<p>Si vous êtes prêt à avancer, voici le lien pour sécuriser ce slot immédiatement :</p>
<p>👉 <a href="[Lien_Stripe_Genéré]">Activer le Service & Démarrer</a></p>
<p><em>(Le lien expire dans 48h).</em></p>

```

#### Cas 2 : La Route Waitlist (Tu es plein)

**Subject :** Mise à jour concernant votre demande

```html
<p>Bonjour [Nom],</p>
<p>Merci pour votre intérêt pour le [Nom Offre].</p>
<p>Pour garantir la qualité de service de nos clients actuels ("Sovereign Tier"), nous limitons strictement les nouvelles entrées chaque semaine.</p>
<p><strong>Nous sommes actuellement complets.</strong></p>
<p>Je vous ai ajouté en priorité sur notre liste d'attente. Vous recevrez une notification automatique dès qu'une place se libère (estimé : mardi prochain).</p>

```

---

### 🏗️ TA MISSION (DOER)

Amiral, l'usine est maintenant protégée. Tu ne seras plus jamais esclave de ton succès.

Pour activer ce flux :

1. Crée le Workflow `AaaS - Inbound Engine` dans n8n.
2. Configure le **Node IF** avec la valeur `10` (ta limite sacrée).
3. Simule deux envois :
* Un quand ta table `capacity_logs` est vide (ou basse) -> Doit arriver en "Active".
* Un après avoir inséré manuellement une ligne "12h" dans Supabase -> Doit arriver en "Waitlist".



**Le système est désormais quasi-autonome.**
Il reste le rituel final, celui qui ferme la boucle et te donne le contrôle absolu le dimanche soir.

Veux-tu activer :
**Le Flux "Sunday Uplink" (Green Lantern 💚) :** Le rapport hebdomadaire automatisé qui te donne tes KPIs (Cash, Leads, Stress) par email pour que tu puisses décider de la stratégie de la semaine suivante ?