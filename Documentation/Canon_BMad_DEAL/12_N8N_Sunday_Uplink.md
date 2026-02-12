C'est **Green Lantern** pour le dernier kilomètre. 💚

C'est le rituel sacré. Le **Sunday Uplink** n'est pas un simple email de reporting. C'est le moment où le Système rend des comptes à son Architecte.

C'est la boucle de rétroaction qui te permet de piloter un empire en 30 minutes le dimanche soir, plutôt que de micro-manager 40 heures par semaine.

Voici le **Blueprint N8N "SUNDAY UPLINK"**.
Il scanne les 3 organes vitaux (Finance, Growth, Ops) et te présente le diagnostic pour la semaine à venir.

---

### 🔌 LE PRÉ-REQUIS TECHNIQUE

Aucun. Toutes les données sont déjà dans Supabase grâce à Wonder Woman, Superman et Batman.

---

### 💚 N8N BLUEPRINT : THE RITUAL FLOW

#### 1. Le Trigger : Schedule (Cron)

* **Settings :** Every Week / Sunday / 20:00 (8 PM).
* **Pourquoi :** Juste avant ta soirée, pour que tu puisses dormir l'esprit libre ou ajuster le tir pour lundi matin.

#### 2. Node A : Supabase (The Full Scan)

Tu vas exécuter 4 requêtes SQL parallèles (ou une grosse requête) pour prendre le pouls :

* **Query 1 (Finance) :** `SELECT SUM(amount) FROM invoices WHERE status = 'paid' AND issued_at > NOW() - INTERVAL '7 days';`
* *Metric :* Cashflow Hebdo.


* **Query 2 (Growth) :** `SELECT COUNT(*) FROM leads WHERE status = 'won' AND created_at > NOW() - INTERVAL '7 days';`
* *Metric :* Nouveaux Clients.


* **Query 3 (Ops) :** `SELECT COUNT(*) FROM tasks WHERE status = 'done' AND created_at > NOW() - INTERVAL '7 days';`
* *Metric :* Vélocité de Production.


* **Query 4 (Energy) :** `SELECT hours_logged, stress_level FROM capacity_logs ORDER BY week_start DESC LIMIT 1;`
* *Metric :* Santé du Fondateur.



#### 3. Node B : AI Analysis (The Insight)

* **Input :** Les résultats du Node A.
* **Prompt System :** "Tu es Jerry, le CEO IA. Analyse ces métriques. Si le Cashflow est bas et le Stress est haut, recommande une semaine 'Focus Sales'. Si le Cashflow est haut et le Stress est haut, recommande une semaine 'Focus Ops/Recrutement'. Sois concis."

#### 4. Node C : Gmail (The Commander Brief)

* **To :** Amadeus.
* **Subject :** 📡 Sunday Uplink : [Status: GREEN/AMBER/RED]
* **Body (HTML) :** (Voir template ci-dessous).

---

### 📧 LE RAPPORT "UPLINK" (Ce que tu reçois)

Ce rapport est conçu pour être lu en 30 secondes. Il utilise un code couleur simple.

```html
<div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
  
  <div style="background-color: #10b981; padding: 20px; color: white; text-align: center;">
    <h2 style="margin: 0;">🟢 SYSTEM STATUS : NOMINAL</h2>
    <p style="margin: 5px 0 0 0;">Semaine 42 • Rapport de Situation</p>
  </div>

  <div style="padding: 24px;">
    
    <table style="width: 100%; text-align: center; margin-bottom: 24px;">
      <tr>
        <td>
          <h3 style="margin: 0; color: #10b981;">+[Cashflow]€</h3>
          <small style="color: #6b7280;">Cash In</small>
        </td>
        <td>
          <h3 style="margin: 0; color: #3b82f6;">+[NewClients]</h3>
          <small style="color: #6b7280;">New Clients</small>
        </td>
        <td>
          <h3 style="margin: 0; color: #f59e0b;">[FounderHours]h</h3>
          <small style="color: #6b7280;">Ta Charge</small>
        </td>
      </tr>
    </table>

    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;">

    <h4 style="margin-top: 0;">🧠 Analyse Stratégique</h4>
    <p style="color: #374151; line-height: 1.6;">
      [Sortie du Node AI : "Excellent travail sur le closing cette semaine. Cependant, ta charge horaire frôle la zone rouge. Recommandation : Ne prends aucun call mardi matin, bloque-le pour du Deep Work Ops."]
    </p>

    <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 12px; margin-top: 24px;">
      <strong>⚠️ Points de Friction :</strong>
      <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #991b1b;">
        <li>2 Factures en retard (Total: 950€)</li>
        <li>SOP "Onboarding" signalée comme obsolète.</li>
      </ul>
    </div>

    <div style="text-align: center; margin-top: 32px;">
      <a href="https://app.aspace.os/dashboard" style="background-color: #1f2937; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Ouvrir le Cockpit</a>
    </div>

  </div>
</div>

```

---

### 🏁 MISSION ACCOMPLIE : LE SYSTÈME EST VIVANT

Amiral Picard, le chantier **"Project Genesis"** est terminé.

Regarde ce que nous avons bâti ensemble :

1. **Define :** Une offre AaaS claire (Tier 1/2/3) et épurée (DEAL).
2. **Architecting :** Une base de données Supabase Multi-Tenant blindée.
3. **Seeding :** Des procédures, des produits et des contrats injectés dans le code.
4. **Doer (Automation) :**
* L'argent rentre tout seul (Wonder Woman).
* Les leads sont filtrés par ta capacité (Superman).
* Le système te fait un rapport le dimanche (Green Lantern).



**Ton A'Space OS est passé du stade de "Concept" au stade de "Muse Opérationnelle".**

Quelle est ta toute dernière volonté avant que je ne laisse le système tourner en autonomie ?

1. **Générer le "Pack Technique Final" :** Un ZIP contenant tous les JSONs N8N et les SQLs que nous avons créés, pour archivage ?
2. **Lancer une simulation de crise :** On imagine un scénario catastrophe (ex: 50 leads d'un coup) et on voit si le système tient ?
3. **Fermer la session :** Tu retournes sur le pont, tu regardes les étoiles, et tu laisses l'IA gérer.