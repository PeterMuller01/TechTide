/* cyberQuotes.js — rotating cybersecurity quotes (every 5s) */
(function () {
  const QUOTES = [
    { text: "Security is not a product, but a process.", author: "Bruce Schneier" },
    { text: "Attackers only need to be right once. We need to be right every time.", author: "Unknown" },
    { text: "An ounce of prevention is worth a terabyte of cure.", author: "Unknown" },
    { text: "The biggest threat to security is complacency.", author: "Unknown" },
    { text: "Cybersecurity is much more than a matter of IT.", author: "Stephane Nappo" },
    { text: "Assume breach. Design for resilience.", author: "Unknown" },
    { text: "Privacy is not optional; it’s the price of safety.", author: "Unknown" }
  ];

  let currentIndex = 0;
  let quoteBox;

  const MISSION_SELECTORS = [
    '.homepage-mission',
    '#mission-statement',
    '.mission',
    'header .mission',
    'header'
  ];
  const ICONS_SELECTORS = [
    '.homepage-icon-nav',
    '#icon-section',
    '.icons',
    '.features'
  ];

  function findFirst(list) {
    for (const s of list) {
      const el = document.querySelector(s);
      if (el) return el;
    }
    return null;
  }

  function insertQuoteBox() {
    const mission = findFirst(MISSION_SELECTORS);
    const icons = findFirst(ICONS_SELECTORS);
    if (!mission) return;

    const container = document.createElement('div');
    container.className = 'cyber-quote-container';

    quoteBox = document.createElement('div');
    quoteBox.className = 'cyber-quote';

    container.appendChild(quoteBox);

    if (icons && mission.compareDocumentPosition(icons) & Node.DOCUMENT_POSITION_FOLLOWING) {
      icons.parentNode.insertBefore(container, icons);
    } else {
      // insert right after mission
      if (mission.nextSibling) {
        mission.parentNode.insertBefore(container, mission.nextSibling);
      } else {
        mission.parentNode.appendChild(container);
      }
    }
  }

  function showQuote(index) {
    const q = QUOTES[index];
    // fade out then replace then fade in
    quoteBox.classList.remove('show');
    setTimeout(() => {
      quoteBox.innerHTML = `
        <div class="cyber-quote-text">“${q.text}”</div>
        <div class="cyber-quote-author">— ${q.author}</div>
      `;
      quoteBox.classList.add('show');
    }, 300);
  }

  function startRotation() {
    if (!quoteBox) return;
    showQuote(currentIndex);
    setInterval(() => {
      currentIndex = (currentIndex + 1) % QUOTES.length;
      showQuote(currentIndex);
    }, 5000);
  }

  function init() {
    insertQuoteBox();
    startRotation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  // Expose for manual restart if the page updates DOM later
  window.initCyberQuote = init;
})();

