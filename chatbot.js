(function () {
  const FAQ = [
    {
      id: 'dosage',
      label: 'Comment calculer un dosage ?',
      keywords: ['dosage', 'dose', 'combien', 'ui', 'seringue', 'reconstitution', 'calcul'],
      answer: "Chaque fiche produit a un bouton \"Calculer ma dose\" et \"Voir le tuto reconstitution\" qui expliquent pas à pas comment reconstituer et doser ton produit. Tu trouveras aussi le guide complet sur la page <a href=\"ressources.html\">Ressources</a>."
    },
    {
      id: 'conservation',
      label: 'Comment conserver mes produits ?',
      keywords: ['conserv', 'frigo', 'réfrigér', 'temperature', 'température', 'congel'],
      answer: "Une fois reconstitués, les peptides se conservent au réfrigérateur (entre 2 et 8°C) et doivent être utilisés dans les délais indiqués sur la fiche du produit. Avant reconstitution, garde le flacon au frais et à l'abri de la lumière."
    },
    {
      id: 'livraison',
      label: 'Quels sont les délais de livraison ?',
      keywords: ['livraison', 'délai', 'delai', 'expédi', 'expedi', 'reçois', 'recois', 'combien de temps'],
      answer: "Les commandes sont expédiées sous 24 à 48h après validation du paiement. Tu peux suivre l'avancement de ta commande à tout moment sur la page <a href=\"suivi.html\">Suivre ma commande</a>."
    },
    {
      id: 'paiement',
      label: 'Quels moyens de paiement acceptez-vous ?',
      keywords: ['paiement', 'payer', 'paypal', 'revolut', 'virement', 'carte', 'régler', 'regler'],
      answer: "Le paiement se fait par PayPal, Revolut ou virement bancaire. Les instructions précises (avec le montant déjà rempli quand c'est possible) s'affichent une fois ta commande passée."
    },
    {
      id: 'purete',
      label: 'Les produits sont-ils testés ?',
      keywords: ['pureté', 'purete', 'test', 'janoshik', 'qualité', 'qualite', 'analyse'],
      answer: "Oui, tous nos produits sont testés en laboratoire indépendant (Janoshik) avec une pureté supérieure à 99%. Tu peux retrouver tous les tests de pureté sur la page <a href=\"ressources.html#tests-purete\">Ressources</a>, ou directement depuis la fiche de chaque produit via le bouton \"Test de pureté\"."
    },
    {
      id: 'parrainage',
      label: 'Comment fonctionne le parrainage ?',
      keywords: ['parrain', 'parrainage', 'cashback', 'code promo', 'filleul'],
      answer: "En partageant ton code, la personne que tu parraines économise 5€ sur sa commande, et toi tu gagnes du cashback à chaque commande passée avec ton code. Retrouve tout le détail sur la page <a href=\"parrainage.html\">Parrainage</a> ou dans ton <a href=\"compte.html\">espace compte</a>."
    },
    {
      id: 'commande',
      label: 'Comment suivre ma commande ?',
      keywords: ['suivre', 'suivi', 'statut', 'ou en est', 'où en est', 'colis'],
      answer: "Rends-toi sur la page <a href=\"suivi.html\">Suivre ma commande</a> et entre ton email et ton numéro de commande (indiqué sur ta facture) pour voir son statut en direct."
    },
    {
      id: 'retour',
      label: 'Puis-je retourner ou annuler une commande ?',
      keywords: ['retour', 'rembours', 'annul', 'échange', 'echange'],
      answer: "Pour toute question sur un retour, un remboursement ou une annulation, contacte-nous directement par email ou Telegram, on regarde ça au cas par cas."
    }
  ];

  const CONTACT_HTML = `
    <div class="kta-chat-contact">
      <span>Pas trouvé ta réponse ?</span>
      <div class="kta-chat-contact-links">
        <a href="https://discord.gg/dTJmAeesFq" target="_blank" rel="noopener">Discord</a>
        <a href="https://t.me/ktalabsbylau" target="_blank" rel="noopener">Telegram</a>
        <a href="mailto:ktalabs.contact@gmail.com">Email</a>
      </div>
    </div>
  `;

  function normalize(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  }

  function findAnswer(text) {
    const n = normalize(text);
    if (!n) return null;
    let best = null;
    let bestScore = 0;
    FAQ.forEach(item => {
      let score = 0;
      item.keywords.forEach(k => {
        if (n.includes(normalize(k))) score++;
      });
      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    });
    return best;
  }

  const style = document.createElement('style');
  style.textContent = `
    .kta-chat-btn {
      position: fixed; bottom: 20px; right: 20px; z-index: 500;
      background: #16204a; color: #fff; border: none; border-radius: 999px;
      padding: 14px 20px; font-size: 14px; font-weight: 600; cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.18);
      display: flex; align-items: center; gap: 8px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .kta-chat-btn:hover { background: #0e1730; }
    .kta-chat-panel {
      position: fixed; bottom: 88px; right: 20px; z-index: 500;
      width: 320px; max-width: calc(100vw - 32px);
      max-height: 70vh; overflow-y: auto;
      background: #fff; border: 1px solid #e8eaf1; border-radius: 16px;
      box-shadow: 0 8px 28px rgba(0,0,0,0.18);
      display: none; flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .kta-chat-panel.visible { display: flex; }
    .kta-chat-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px; border-bottom: 1px solid #e8eaf1;
    }
    .kta-chat-header strong { font-size: 14px; color: #16204a; }
    .kta-chat-close {
      background: none; border: none; font-size: 16px; cursor: pointer; color: #6b7280;
    }
    .kta-chat-body { padding: 14px 16px; font-size: 13.5px; color: #16204a; line-height: 1.6; }
    .kta-chat-intro { color: #6b7280; font-size: 12.5px; margin: 0 0 12px; }
    .kta-chat-questions { display: flex; flex-direction: column; gap: 8px; margin-bottom: 4px; }
    .kta-chat-q-btn {
      text-align: left; background: #f8f9fc; border: 1px solid #e8eaf1; border-radius: 10px;
      padding: 9px 12px; font-size: 12.5px; font-weight: 600; color: #16204a; cursor: pointer;
    }
    .kta-chat-q-btn:hover { background: #eef0f7; }
    .kta-chat-answer {
      background: #f8f9fc; border: 1px solid #e8eaf1; border-radius: 10px;
      padding: 12px; margin-bottom: 12px; font-size: 13px; line-height: 1.6;
    }
    .kta-chat-answer a { color: #4d6fb8; font-weight: 600; }
    .kta-chat-back {
      background: none; border: none; color: #6b7280; font-size: 12px; cursor: pointer;
      padding: 0; margin-bottom: 12px; text-decoration: underline;
    }
    .kta-chat-form { display: flex; gap: 6px; margin-top: 4px; }
    .kta-chat-form input {
      flex: 1; padding: 9px 10px; border: 1px solid #e8eaf1; border-radius: 8px;
      font-size: 13px; font-family: inherit;
    }
    .kta-chat-form button {
      background: #16204a; color: #fff; border: none; border-radius: 8px;
      padding: 0 14px; font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .kta-chat-contact {
      margin-top: 14px; padding-top: 12px; border-top: 1px solid #e8eaf1;
      font-size: 12px; color: #6b7280;
    }
    .kta-chat-contact-links { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
    .kta-chat-contact-links a {
      border: 1px solid #e8eaf1; background: #fff; padding: 5px 12px; border-radius: 999px;
      font-size: 11.5px; font-weight: 600; color: #16204a; text-decoration: none;
    }
    .kta-chat-contact-links a:hover { background: #16204a; color: #fff; }
    @media (max-width: 480px) {
      .kta-chat-panel { right: 12px; left: 12px; width: auto; }
      .kta-chat-btn { right: 12px; }
    }
  `;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.className = 'kta-chat-btn';
  btn.innerHTML = '💬 Besoin d\'aide ?';
  document.body.appendChild(btn);

  const panel = document.createElement('div');
  panel.className = 'kta-chat-panel';
  panel.innerHTML = `
    <div class="kta-chat-header">
      <strong>Une question ?</strong>
      <button class="kta-chat-close" aria-label="Fermer">✕</button>
    </div>
    <div class="kta-chat-body" id="ktaChatBody"></div>
  `;
  document.body.appendChild(panel);

  const bodyEl = panel.querySelector('#ktaChatBody');

  function renderHome() {
    let html = `<p class="kta-chat-intro">Choisis une question ou écris la tienne :</p>`;
    html += `<div class="kta-chat-questions">`;
    FAQ.forEach(item => {
      html += `<button type="button" class="kta-chat-q-btn" data-id="${item.id}">${item.label}</button>`;
    });
    html += `</div>`;
    html += `
      <form class="kta-chat-form" id="ktaChatForm">
        <input type="text" id="ktaChatInput" placeholder="Écris ta question…">
        <button type="submit">→</button>
      </form>
    `;
    html += CONTACT_HTML;
    bodyEl.innerHTML = html;

    bodyEl.querySelectorAll('.kta-chat-q-btn').forEach(b => {
      b.addEventListener('click', () => {
        const item = FAQ.find(f => f.id === b.dataset.id);
        renderAnswer(item.answer);
      });
    });
    bodyEl.querySelector('#ktaChatForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = bodyEl.querySelector('#ktaChatInput');
      const match = findAnswer(input.value);
      if (match) {
        renderAnswer(match.answer);
      } else {
        renderAnswer("Je n'ai pas de réponse toute prête pour cette question. Contacte-nous directement, on te répond rapidement :", true);
      }
    });
  }

  function renderAnswer(text, forceContact) {
    let html = `<button type="button" class="kta-chat-back">← Retour aux questions</button>`;
    html += `<div class="kta-chat-answer">${text}</div>`;
    if (forceContact) html += CONTACT_HTML;
    bodyEl.innerHTML = html;
    bodyEl.querySelector('.kta-chat-back').addEventListener('click', renderHome);
  }

  renderHome();

  btn.addEventListener('click', () => panel.classList.add('visible'));
  panel.querySelector('.kta-chat-close').addEventListener('click', () => panel.classList.remove('visible'));
})();
