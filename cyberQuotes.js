/* cyberQuotes.js — minimal, non-destructive injector
   Picks a random cybersecurity quote per page load and inserts it
   between the mission section (.homepage-mission) and the icons (.homepage-icon-nav).
   Exposes window.initCyberQuote() if you need to re-run after dynamic DOM updates.
*/
(function () {
  const QUOTES = [
    '“Security is not a product, but a process.” — Bruce Schneier',
    '“Attackers only need to be right once. We need to be right every time.”',
    '“An ounce of prevention is worth a terabyte of cure.”',
    '“The biggest threat to security is complacency.”',
    '“Cybersecurity is much more than a matter of IT.” — Stephane Nappo',
    '“Assume breach. Design for resilience.”',
    '“Privacy is not optional; it’s the price of safety.”'
  ];

  const MISSION_SELECTORS = [
    '#mission-statement',
    '.homepage-mission',
    '.mission',
    'header .mission',
    'header'
  ];
  const ICONS_SELECTORS = [
    '#icon-section',
    '.homepage-icon-nav',
    '.icons',
    '.features',
    '.homepage-icon-card'
  ];

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function createQuoteElement(text) {
    const wrapper = document.createElement('div');
    wrapper.className = 'cyber-quote';
    wrapper.setAttribute('role', 'note');
    wrapper.setAttribute('aria-live', 'polite');

    const quoteText = document.createElement('div');
    quoteText.className = 'cyber-quote-text';
    quoteText.textContent = text;
    wrapper.appendChild(quoteText);

    const cite = document.createElement('div');
    cite.className = 'cyber-quote-cite';
    cite.textContent = ''; // author is typically included in the quote string
    wrapper.appendChild(cite);

    return wrapper;
  }

  function findFirst(selectorList) {
    for (const sel of selectorList) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return null;
  }

  function findIconsAfter(missionEl) {
    for (const sel of ICONS_SELECTORS) {
      const nodes = Array.from(document.querySelectorAll(sel));
      if (!nodes.length) continue;
      for (const node of nodes) {
        if (missionEl.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING) {
          return node;
        }
      }
    }
    return findFirst(ICONS_SELECTORS);
  }

  function insertQuote() {
    const missionEl = findFirst(MISSION_SELECTORS);
    if (!missionEl) return;

    const iconsEl = findIconsAfter(missionEl);
    const quoteEl = createQuoteElement(pickRandom(QUOTES));

    if (iconsEl && missionEl.compareDocumentPosition(iconsEl) & Node.DOCUMENT_POSITION_FOLLOWING) {
      iconsEl.parentNode.insertBefore(quoteEl, iconsEl);
    } else if (missionEl.nextSibling) {
      missionEl.parentNode.insertBefore(quoteEl, missionEl.nextSibling);
    } else {
      missionEl.parentNode.appendChild(quoteEl);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertQuote, { once: true });
  } else {
    insertQuote();
  }

  window.initCyberQuote = function () {
    const prev = document.querySelectorAll('.cyber-quote');
    prev.forEach(n => n.remove());
    insertQuote();
  };
})();
