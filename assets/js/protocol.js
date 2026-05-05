
(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('protocol.theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (systemDark ? 'dark' : 'light');
  root.dataset.theme = initial;

  function syncThemeButtons() {
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const dark = root.dataset.theme === 'dark';
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.textContent = dark ? '☾' : '☼';
    });
  }

  document.addEventListener('click', (event) => {
    const themeButton = event.target.closest('[data-theme-toggle]');
    if (themeButton) {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      localStorage.setItem('protocol.theme', next);
      syncThemeButtons();
    }

    const quickCopyProxy = event.target.closest('[data-trigger-copy-quick]');
    if (quickCopyProxy) {
      const sourceButton = document.querySelector('#copyQuickStart');
      if (sourceButton) sourceButton.click();
    }

    const menuButton = event.target.closest('[data-mobile-menu-toggle]');
    if (menuButton) {
      const menu = document.querySelector('[data-mobile-nav]');
      if (!menu) return;
      const isOpen = menu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    }
  });

  syncThemeButtons();
})();



    const levelLinks = [...document.querySelectorAll('.level-jump')];
    const chambers = [...document.querySelectorAll('.level-chamber')];

    levelLinks.forEach(link => {
      link.addEventListener('click', event => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        target.open = true;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActive(link.getAttribute('href'));
      });
    });

    function setActive(hash) {
      levelLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === hash));
    }

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive('#' + visible.target.id);
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, .25, .5, .75] });

    chambers.forEach(chamber => observer.observe(chamber));

    // Level 01 — Installation functionality
    const level01 = document.querySelector('#level-01');
    const level01State = document.querySelector('#level01State');
    const level01Output = document.querySelector('#level01ActionOutput');
    const installSequence = document.querySelector('#level01InstallSequence');
    const copyLevel01 = document.querySelector('#copyLevel01');
    const markLevel01 = document.querySelector('#markLevel01');
    const receiptInput = document.querySelector('#level01ReceiptInput');
    const saveReceipt = document.querySelector('#saveLevel01Receipt');
    const receiptsList = document.querySelector('#level01Receipts');

    const level01InstalledKey = 'the-protocol.level01.installed';
    const level01ReceiptsKey = 'the-protocol.level01.receipts';

    function setLevel01Message(message) {
      if (!level01Output) return;
      level01Output.textContent = message;
      window.clearTimeout(setLevel01Message.timer);
      setLevel01Message.timer = window.setTimeout(() => {
        level01Output.textContent = '';
      }, 2600);
    }

    function applyLevel01InstalledState() {
      const installed = localStorage.getItem(level01InstalledKey) === 'true';
      if (level01) level01.dataset.installed = installed ? 'true' : 'false';
      if (level01State) level01State.textContent = installed ? 'Level 01 Active' : 'Ready';
    }

    async function copyText(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {
        const helper = document.createElement('textarea');
        helper.value = text;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        document.body.removeChild(helper);
      }
    }

    copyLevel01?.addEventListener('click', async () => {
      await copyText((installSequence?.textContent || '').trim());
      setLevel01Message('Install sequence copied.');
    });

    markLevel01?.addEventListener('click', () => {
      localStorage.setItem(level01InstalledKey, 'true');
      applyLevel01InstalledState();
      setLevel01Message('Install complete. Level 01 active.');
    });

    function getReceipts() {
      try {
        return JSON.parse(localStorage.getItem(level01ReceiptsKey) || '[]');
      } catch {
        return [];
      }
    }

    function saveReceipts(receipts) {
      localStorage.setItem(level01ReceiptsKey, JSON.stringify(receipts));
    }

    function renderReceipts() {
      if (!receiptsList) return;
      const receipts = getReceipts();
      receiptsList.innerHTML = '';
      receipts.forEach((receipt) => {
        const item = document.createElement('div');
        item.className = 'l1-receipt';
        const time = document.createElement('time');
        time.dateTime = receipt.iso;
        time.textContent = receipt.label;
        const body = document.createElement('div');
        body.textContent = receipt.text;
        item.append(time, body);
        receiptsList.append(item);
      });
    }

    saveReceipt?.addEventListener('click', () => {
      const text = receiptInput?.value?.trim();
      if (!text) {
        setLevel01Message('Add a receipt first.');
        return;
      }
      const now = new Date();
      const receipts = getReceipts();
      receipts.unshift({
        text,
        iso: now.toISOString(),
        label: now.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
      });
      saveReceipts(receipts);
      receiptInput.value = '';
      renderReceipts();
      setLevel01Message('Receipt saved inside Level 01.');
    });


    // Level 01 — selectable cells light up when selected
    const level01Selectable = [...document.querySelectorAll('#level-01 .l1-strip, #level-01 .l1-lead, #level-01 .l1-block')];

    function setLevel01Selected(cell) {
      level01Selectable.forEach(item => item.classList.toggle('is-selected', item === cell));
    }

    level01Selectable.forEach((cell) => {
      cell.addEventListener('click', (event) => {
        const ignore = event.target.closest('button, a, textarea, input, select, option, label');
        if (ignore && !event.target.closest('.l1-receipt-input')) {
          setLevel01Selected(cell);
          return;
        }
        setLevel01Selected(cell);
      });

      cell.addEventListener('focusin', () => setLevel01Selected(cell));
    });

    // Default selected cell
    if (level01Selectable[0]) setLevel01Selected(level01Selectable[0]);

    applyLevel01InstalledState();
    renderReceipts();

    // Level 04 — Switchboard add-more functionality
    const level04SwitchGrid = document.querySelector('#level04SwitchGrid');
    const level04SwitchInput = document.querySelector('#level04SwitchInput');
    const addLevel04Switch = document.querySelector('#addLevel04Switch');
    const level04SwitchesKey = 'the-protocol.level04.extraSwitches';

    function getLevel04Switches() {
      try {
        const switches = JSON.parse(localStorage.getItem(level04SwitchesKey) || '[]');
        const filtered = switches.filter(name => name.trim().toLowerCase() !== 'a face that ages backwards');
        if (filtered.length !== switches.length) saveLevel04Switches(filtered);
        return filtered;
      } catch {
        return [];
      }
    }

    function saveLevel04Switches(switches) {
      localStorage.setItem(level04SwitchesKey, JSON.stringify(switches));
    }

    function createSwitchRow(name) {
      const row = document.createElement('div');
      row.className = 'switch-row';
      const label = document.createElement('span');
      label.className = 'switch-row__name';
      label.textContent = name;
      const state = document.createElement('span');
      state.className = 'switch-row__state';
      state.textContent = 'ON';
      row.append(label, state);
      return row;
    }

    function renderLevel04Switches() {
      if (!level04SwitchGrid) return;
      level04SwitchGrid.querySelectorAll('[data-added-switch="true"]').forEach(node => node.remove());
      getLevel04Switches().forEach(name => {
        const row = createSwitchRow(name);
        row.dataset.addedSwitch = 'true';
        level04SwitchGrid.append(row);
      });
    }

    addLevel04Switch?.addEventListener('click', () => {
      const name = level04SwitchInput?.value?.trim();
      if (!name) return;
      const switches = getLevel04Switches();
      switches.push(name);
      saveLevel04Switches(switches);
      level04SwitchInput.value = '';
      renderLevel04Switches();
    });

    level04SwitchInput?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addLevel04Switch?.click();
      }
    });

    renderLevel04Switches();

    // Level 05 — Command Line functionality
    const level05CommandInput = document.querySelector('#level05CommandInput');
    const runLevel05Command = document.querySelector('#runLevel05Command');
    const level05CommandMessage = document.querySelector('#level05CommandMessage');
    const level05CommandLog = document.querySelector('#level05CommandLog');
    const level05CommandChips = [...document.querySelectorAll('#level-05 .command-chip')];
    const level05CommandsKey = 'the-protocol.level05.commands';
    const requestLanguagePattern = /\b(i want|i hope|please|i(?:'|’)m trying to|i am trying to|if it(?:'|’)s meant to be|would like|maybe|can i)\b/i;

    function setLevel05Message(text, tone = 'idle') {
      if (!level05CommandMessage) return;
      level05CommandMessage.textContent = text;
      level05CommandMessage.classList.toggle('is-active', tone === 'active');
      level05CommandMessage.classList.toggle('is-warning', tone === 'warning');
    }

    function getLevel05Commands() {
      try {
        return JSON.parse(localStorage.getItem(level05CommandsKey) || '[]');
      } catch {
        return [];
      }
    }

    function saveLevel05Commands(commands) {
      localStorage.setItem(level05CommandsKey, JSON.stringify(commands));
    }

    function normalizeLevel05Outcome(value) {
      return value.replace(/^\s*EXECUTE\s*:\s*/i, '').trim();
    }

    function renderLevel05Commands() {
      if (!level05CommandLog) return;
      const commands = getLevel05Commands();
      level05CommandLog.innerHTML = '';

      if (!commands.length) {
        const empty = document.createElement('p');
        empty.className = 'command-log__empty';
        empty.textContent = '// no commands issued yet.';
        level05CommandLog.append(empty);
        return;
      }

      commands.forEach((command, index) => {
        const item = document.createElement('div');
        item.className = 'command-log__item';

        const time = document.createElement('time');
        time.className = 'command-log__time';
        time.dateTime = command.iso;
        time.textContent = command.label;

        const text = document.createElement('div');
        text.className = 'command-log__text';
        text.innerHTML = `<b>EXECUTE:</b> ${command.outcome}`;

        const actions = document.createElement('div');
        actions.className = 'command-log__actions';

        const copy = document.createElement('button');
        copy.type = 'button';
        copy.textContent = 'Copy';
        copy.addEventListener('click', async () => {
          await navigator.clipboard?.writeText(`EXECUTE: ${command.outcome}`);
          setLevel05Message('COMMAND COPIED. THE FIELD EXECUTES SYNTAX.', 'active');
        });

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'Delete';
        remove.addEventListener('click', () => {
          const next = getLevel05Commands();
          next.splice(index, 1);
          saveLevel05Commands(next);
      
    // Level 05 — command cockpit cells light up on hover/focus/click
    const level05Selectable = [...document.querySelectorAll('#level-05 .level05-card')];

    function setLevel05Selected(cell) {
      level05Selectable.forEach(item => item.classList.toggle('is-selected', item === cell));
    }

    level05Selectable.forEach((cell) => {
      cell.addEventListener('click', (event) => {
        const ignore = event.target.closest('button, a, textarea, input, select, option, label');
        if (ignore) {
          setLevel05Selected(cell);
          return;
        }
        setLevel05Selected(cell);
      });

      cell.addEventListener('focusin', () => setLevel05Selected(cell));
    });

    if (level05Selectable[3]) setLevel05Selected(level05Selectable[3]);

    renderLevel05Commands();
          setLevel05Message('COMMAND REMOVED FROM LEVEL 05 LOG.', 'active');
        });

        actions.append(copy, remove);
        item.append(time, text, actions);
        level05CommandLog.append(item);
      });
    }

    function issueLevel05Command() {
      const outcome = normalizeLevel05Outcome(level05CommandInput?.value || '');
      if (!outcome) {
        setLevel05Message('SYNTAX REQUIRED: EXECUTE: [OUTCOME]', 'warning');
        return;
      }

      if (requestLanguagePattern.test(outcome)) {
        setLevel05Message('SYNTAX WARNING: request language detected. State the command as already done.', 'warning');
        return;
      }

      const now = new Date();
      const commands = getLevel05Commands();
      commands.unshift({
        outcome,
        iso: now.toISOString(),
        label: now.toLocaleString([], { hour: 'numeric', minute: '2-digit' })
      });
      saveLevel05Commands(commands.slice(0, 24));
      level05CommandInput.value = '';
      renderLevel05Commands();
      setLevel05Message('COMMAND ISSUED. THE FIELD EXECUTES SYNTAX.', 'active');
    }

    runLevel05Command?.addEventListener('click', issueLevel05Command);

    level05CommandInput?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        issueLevel05Command();
      }
    });

    level05CommandChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        if (!level05CommandInput) return;
        level05CommandInput.value = chip.dataset.command || '';
        level05CommandInput.focus();
        setLevel05Message('COMMAND LOADED. RUN WHEN READY.', 'active');
      });
    });

    renderLevel05Commands();

    // Level 05 — ensure command cockpit cells select on click/focus from initial load
    const level05SelectableCards = [...document.querySelectorAll('#level-05 .level05-card')];

    function setLevel05SelectedCard(cell) {
      level05SelectableCards.forEach(item => item.classList.toggle('is-selected', item === cell));
    }

    level05SelectableCards.forEach((cell) => {
      cell.addEventListener('click', () => setLevel05SelectedCard(cell));
      cell.addEventListener('focusin', () => setLevel05SelectedCard(cell));
    });

    if (level05SelectableCards[3]) setLevel05SelectedCard(level05SelectableCards[3]);

    // Level 06 — Save Protocol functionality
    const level06See = document.querySelector('#level06See');
    const level06Body = document.querySelector('#level06Body');
    const level06Hear = document.querySelector('#level06Hear');
    const saveLevel06Peak = document.querySelector('#saveLevel06Peak');
    const level06SaveMessage = document.querySelector('#level06SaveMessage');
    const level06PeakLog = document.querySelector('#level06PeakLog');
    const level06SavesKey = 'the-protocol.level06.peaks';

    function setLevel06Message(text, tone = 'idle') {
      if (!level06SaveMessage) return;
      level06SaveMessage.textContent = text;
      level06SaveMessage.classList.toggle('is-active', tone === 'active');
      level06SaveMessage.classList.toggle('is-warning', tone === 'warning');
    }

    function getLevel06Peaks() {
      try {
        return JSON.parse(localStorage.getItem(level06SavesKey) || '[]');
      } catch {
        return [];
      }
    }

    function saveLevel06Peaks(peaks) {
      localStorage.setItem(level06SavesKey, JSON.stringify(peaks));
    }

    function renderLevel06Peaks() {
      if (!level06PeakLog) return;
      const peaks = getLevel06Peaks();
      level06PeakLog.innerHTML = '';

      if (!peaks.length) {
        const empty = document.createElement('p');
        empty.className = 'level06-log__empty';
        empty.textContent = '// no peak states saved yet.';
        level06PeakLog.append(empty);
        return;
      }

      peaks.forEach((peak, index) => {
        const item = document.createElement('div');
        item.className = 'level06-log__item';

        const time = document.createElement('time');
        time.className = 'level06-log__time';
        time.dateTime = peak.iso;
        time.textContent = peak.label;

        const text = document.createElement('div');
        text.className = 'level06-log__text';
        const see = peak.see || '—';
        const body = peak.body || '—';
        const hear = peak.hear || '—';
        const label = document.createElement('b');
        label.textContent = 'SAVE STATE:';
        text.append(label, document.createTextNode(` SEE ${see} / BODY ${body} / HEAR ${hear}`));

        const actions = document.createElement('div');
        actions.className = 'level06-log__actions';

        const copy = document.createElement('button');
        copy.type = 'button';
        copy.textContent = 'Copy';
        copy.addEventListener('click', async () => {
          await navigator.clipboard?.writeText(`SAVE STATE: This is a peak. See: ${see}. Body: ${body}. Hear: ${hear}. Save state. This is the new baseline. Restore here on drift. Save complete. Anchor locked.`);
          setLevel06Message('SAVE STATE COPIED. RETURN POINT: NEW BASELINE.', 'active');
        });

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'Delete';
        remove.addEventListener('click', () => {
          const next = getLevel06Peaks();
          next.splice(index, 1);
          saveLevel06Peaks(next);
          renderLevel06Peaks();
          setLevel06Message('SAVE STATE REMOVED FROM LEVEL 06 LOG.', 'active');
        });

        actions.append(copy, remove);
        item.append(time, text, actions);
        level06PeakLog.append(item);
      });
    }

    function issueLevel06Save() {
      const see = level06See?.value?.trim() || '';
      const body = level06Body?.value?.trim() || '';
      const hear = level06Hear?.value?.trim() || '';

      if (!see && !body && !hear) {
        setLevel06Message('ANCHOR REQUIRED: ADD AT LEAST ONE SENSORY DETAIL.', 'warning');
        return;
      }

      const now = new Date();
      const peaks = getLevel06Peaks();
      peaks.unshift({
        see,
        body,
        hear,
        iso: now.toISOString(),
        label: now.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
      });
      saveLevel06Peaks(peaks.slice(0, 24));
      if (level06See) level06See.value = '';
      if (level06Body) level06Body.value = '';
      if (level06Hear) level06Hear.value = '';
      renderLevel06Peaks();
      setLevel06Message('SYSTEM UPDATED. RETURN POINT: NEW BASELINE.', 'active');
    }

    saveLevel06Peak?.addEventListener('click', issueLevel06Save);

    [level06See, level06Body, level06Hear].forEach((input) => {
      input?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          issueLevel06Save();
        }
      });
    });

    const level06SelectableCards = [...document.querySelectorAll('#level-06 .level06-card')];

    function setLevel06SelectedCard(cell) {
      level06SelectableCards.forEach(item => item.classList.toggle('is-selected', item === cell));
    }

    level06SelectableCards.forEach((cell) => {
      cell.addEventListener('click', () => setLevel06SelectedCard(cell));
      cell.addEventListener('focusin', () => setLevel06SelectedCard(cell));
    });

    if (level06SelectableCards[3]) setLevel06SelectedCard(level06SelectableCards[3]);
    renderLevel06Peaks();


    // Level 07 — Location Protocol functionality
    const startLevel07Location = document.querySelector('#startLevel07Location');
    const level07Timer = document.querySelector('#level07Timer');
    const level07Message = document.querySelector('#level07Message');
    let level07TimerHandle = null;

    function setLevel07Message(text, tone = 'idle') {
      if (!level07Message) return;
      level07Message.textContent = text;
      level07Message.classList.toggle('is-active', tone === 'active');
      level07Message.classList.toggle('is-warning', tone === 'warning');
    }

    function startLevel07Timer() {
      if (!level07Timer) return;
      window.clearInterval(level07TimerHandle);
      let remaining = 60;
      level07Timer.textContent = '60';
      setLevel07Message('OPERATOR STOPPED. NOTICE WHO IS WATCHING.', 'active');
      level07TimerHandle = window.setInterval(() => {
        remaining -= 1;
        level07Timer.textContent = String(remaining).padStart(2, '0');
        if (remaining <= 0) {
          window.clearInterval(level07TimerHandle);
          level07Timer.textContent = 'LOCATED';
          setLevel07Message('THE SEAT ABOVE THE SEAT: LOCATED. LABOR REMOVED. EXECUTION REMAINS.', 'active');
        }
      }, 1000);
    }

    startLevel07Location?.addEventListener('click', startLevel07Timer);

    const level07SelectableCards = [...document.querySelectorAll('#level-07 .level07-card')];

    function setLevel07SelectedCard(cell) {
      level07SelectableCards.forEach(item => item.classList.toggle('is-selected', item === cell));
    }

    level07SelectableCards.forEach((cell) => {
      cell.addEventListener('click', () => setLevel07SelectedCard(cell));
      cell.addEventListener('focusin', () => setLevel07SelectedCard(cell));
    });

    if (level07SelectableCards[3]) setLevel07SelectedCard(level07SelectableCards[3]);


    // Level 08 — Sovereign Codex functionality
    const level08LawInput = document.querySelector('#level08LawInput');
    const addLevel08Law = document.querySelector('#addLevel08Law');
    const copyLevel08Codex = document.querySelector('#copyLevel08Codex');
    const level08LawList = document.querySelector('#level08LawList');
    const level08Message = document.querySelector('#level08Message');
    const level08Chips = [...document.querySelectorAll('#level-08 .level08-chip')];
    const level08LawsKey = 'the-protocol.level08.laws';

    function setLevel08Message(text, tone = 'idle') {
      if (!level08Message) return;
      level08Message.textContent = text;
      level08Message.classList.toggle('is-active', tone === 'active');
      level08Message.classList.toggle('is-warning', tone === 'warning');
    }

    function getLevel08Laws() {
      try {
        return JSON.parse(localStorage.getItem(level08LawsKey) || '[]');
      } catch {
        return [];
      }
    }

    function saveLevel08Laws(laws) {
      localStorage.setItem(level08LawsKey, JSON.stringify(laws));
    }

    function renderLevel08Laws() {
      if (!level08LawList) return;
      const laws = getLevel08Laws();
      level08LawList.innerHTML = '';

      if (!laws.length) {
        const empty = document.createElement('div');
        empty.className = 'level08-saved-empty';
        empty.textContent = '// no laws written yet. write five.';
        level08LawList.append(empty);
        return;
      }

      laws.forEach((law, index) => {
        const item = document.createElement('div');
        item.className = 'level08-saved-item';

        const mark = document.createElement('span');
        mark.className = 'level08-law-mark';
        mark.textContent = '§';

        const text = document.createElement('span');
        text.textContent = law.text;

        const actions = document.createElement('div');
        actions.className = 'level08-saved-actions';

        const copy = document.createElement('button');
        copy.type = 'button';
        copy.textContent = 'Copy';
        copy.addEventListener('click', async () => {
          await navigator.clipboard?.writeText(law.text);
          setLevel08Message('LAW COPIED. DECREES HOLD.', 'active');
        });

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'Delete';
        remove.addEventListener('click', () => {
          const next = getLevel08Laws();
          next.splice(index, 1);
          saveLevel08Laws(next);
          renderLevel08Laws();
          setLevel08Message('LAW REMOVED FROM THE CODEX.', 'active');
        });

        actions.append(copy, remove);
        item.append(mark, text, actions);
        level08LawList.append(item);
      });
    }

    function addLevel08LawFromInput() {
      const text = level08LawInput?.value?.trim();
      if (!text) {
        setLevel08Message('LAW REQUIRED: WRITE A DECREE FIRST.', 'warning');
        return;
      }

      const laws = getLevel08Laws();
      laws.unshift({ text, iso: new Date().toISOString() });
      saveLevel08Laws(laws.slice(0, 24));
      if (level08LawInput) level08LawInput.value = '';
      renderLevel08Laws();
      const count = getLevel08Laws().length;
      setLevel08Message(count >= 5 ? 'FIVE LAWS WRITTEN. COPY TO A PHYSICAL OBJECT.' : `LAW SAVED. ${Math.max(0, 5 - count)} MORE TO COMPLETE FIVE.`, 'active');
    }

    addLevel08Law?.addEventListener('click', addLevel08LawFromInput);

    level08LawInput?.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault();
        addLevel08LawFromInput();
      }
    });

    level08Chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        if (!level08LawInput) return;
        level08LawInput.value = chip.dataset.law || '';
        level08LawInput.focus();
        setLevel08Message('LAW LOADED. ADD TO CODEX WHEN READY.', 'active');
      });
    });

    copyLevel08Codex?.addEventListener('click', async () => {
      const laws = getLevel08Laws();
      if (!laws.length) {
        setLevel08Message('NO LAWS TO COPY YET.', 'warning');
        return;
      }
      const codex = laws.map((law, index) => `${index + 1}. ${law.text}`).join('\n');
      await navigator.clipboard?.writeText(codex);
      setLevel08Message('SOVEREIGN CODEX COPIED. WRITE IT ON A PHYSICAL OBJECT.', 'active');
    });

    const level08SelectableCards = [...document.querySelectorAll('#level-08 .level08-card')];

    function setLevel08SelectedCard(cell) {
      level08SelectableCards.forEach(item => item.classList.toggle('is-selected', item === cell));
    }

    level08SelectableCards.forEach((cell) => {
      cell.addEventListener('click', () => setLevel08SelectedCard(cell));
      cell.addEventListener('focusin', () => setLevel08SelectedCard(cell));
    });

    if (level08SelectableCards[3]) setLevel08SelectedCard(level08SelectableCards[3]);
    renderLevel08Laws();



  
    // Level 09 — Render Confirmation functionality
    const level09ConfirmationInput = document.querySelector('#level09ConfirmationInput');
    const saveLevel09Confirmation = document.querySelector('#saveLevel09Confirmation');
    const level09Message = document.querySelector('#level09Message');
    const level09ConfirmationLog = document.querySelector('#level09ConfirmationLog');
    const level09ConfirmationsKey = 'the-protocol.level09.confirmations';

    function setLevel09Message(text, tone = 'idle') {
      if (!level09Message) return;
      level09Message.textContent = text;
      level09Message.classList.toggle('is-active', tone === 'active');
    }

    function getLevel09Confirmations() {
      try {
        return JSON.parse(localStorage.getItem(level09ConfirmationsKey) || '[]');
      } catch {
        return [];
      }
    }

    function saveLevel09Confirmations(confirmations) {
      localStorage.setItem(level09ConfirmationsKey, JSON.stringify(confirmations));
    }

    function renderLevel09Confirmations() {
      if (!level09ConfirmationLog) return;
      const confirmations = getLevel09Confirmations();
      level09ConfirmationLog.innerHTML = '';

      if (!confirmations.length) {
        const empty = document.createElement('div');
        empty.className = 'level09-log__empty';
        empty.textContent = '// no confirmations logged yet.';
        level09ConfirmationLog.append(empty);
        return;
      }

      confirmations.forEach((confirmation, index) => {
        const item = document.createElement('div');
        item.className = 'level09-log__item';

        const time = document.createElement('time');
        time.className = 'level09-log__time';
        time.dateTime = confirmation.iso;
        time.textContent = confirmation.label;

        const receipt = document.createElement('div');
        receipt.className = 'level09-log__text';
        const label = document.createElement('b');
        label.textContent = 'RECEIVED: ';
        const body = document.createElement('span');
        body.textContent = confirmation.text;
        receipt.append(label, body);

        const actions = document.createElement('div');
        actions.className = 'level09-log__actions';

        const copy = document.createElement('button');
        copy.type = 'button';
        copy.textContent = 'Copy';
        copy.addEventListener('click', async () => {
          await navigator.clipboard?.writeText(`CONFIRMATION RECEIVED: ${confirmation.text}`);
          setLevel09Message('CONFIRMATION COPIED. LOOP CLOSED.', 'active');
        });

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'Delete';
        remove.addEventListener('click', () => {
          const next = getLevel09Confirmations();
          next.splice(index, 1);
          saveLevel09Confirmations(next);
          renderLevel09Confirmations();
          setLevel09Message('CONFIRMATION REMOVED FROM LEVEL 09 LOG.', 'active');
        });

        actions.append(copy, remove);
        item.append(time, receipt, actions);
        level09ConfirmationLog.append(item);
      });
    }

    function saveLevel09Receipt() {
      const text = level09ConfirmationInput?.value?.trim();
      if (!text) {
        setLevel09Message('RECEIPT REQUIRED: LOG THE CONFIRMATION FIRST.', 'active');
        return;
      }

      const now = new Date();
      const confirmations = getLevel09Confirmations();
      confirmations.unshift({
        text,
        iso: now.toISOString(),
        label: now.toLocaleString([], { hour: 'numeric', minute: '2-digit' })
      });

      saveLevel09Confirmations(confirmations.slice(0, 36));
      if (level09ConfirmationInput) level09ConfirmationInput.value = '';
      renderLevel09Confirmations();
      setLevel09Message('CONFIRMATION RECEIVED. LOOP CLOSED. CONTINUE.', 'active');
    }

    saveLevel09Confirmation?.addEventListener('click', saveLevel09Receipt);

    level09ConfirmationInput?.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault();
        saveLevel09Receipt();
      }
    });

    const level09SelectableCards = [...document.querySelectorAll('#level-09 .level09-card')];

    function setLevel09SelectedCard(cell) {
      level09SelectableCards.forEach(item => item.classList.toggle('is-selected', item === cell));
    }

    level09SelectableCards.forEach((cell) => {
      cell.addEventListener('click', () => setLevel09SelectedCard(cell));
      cell.addEventListener('focusin', () => setLevel09SelectedCard(cell));
    });

    if (level09SelectableCards[4]) setLevel09SelectedCard(level09SelectableCards[4]);
    renderLevel09Confirmations();


    // Level 10 — The Seal functionality
    const sealLevel10Install = document.querySelector('#sealLevel10Install');
    const copyLevel10Seal = document.querySelector('#copyLevel10Seal');
    const level10SealMessage = document.querySelector('#level10SealMessage');
    const level10SealKey = 'the-protocol.level10.sealed';
    const level10SealText = `THE INSTALLATION: COMPLETE
LEVEL 10 OF 10: SEALED
OPERATOR STATUS: ACTIVE
THE PROTOCOL: LIVE INDEFINITELY
THE FIELD AWAITS YOUR EXECUTION.

PORTAL UNLOCKED: THE WORMHOLE IS NOW OPEN TO ENTER
A STRUCTURE BUILT TO BEND TIME AROUND YOU`;

    function setLevel10Message(text, tone = 'idle') {
      if (!level10SealMessage) return;
      level10SealMessage.textContent = text;
      level10SealMessage.classList.toggle('is-active', tone === 'active');
    }

    function applyLevel10SealState() {
      const sealed = localStorage.getItem(level10SealKey) === 'true';
      setLevel10Message(sealed ? 'INSTALLATION SEALED. THE PROTOCOL IS LIVE INDEFINITELY.' : '// installation ready to seal.', sealed ? 'active' : 'idle');
    }

    sealLevel10Install?.addEventListener('click', () => {
      localStorage.setItem(level10SealKey, 'true');
      applyLevel10SealState();
    });

    copyLevel10Seal?.addEventListener('click', async () => {
      await copyText(level10SealText);
      setLevel10Message('SEAL COPIED. THE FIELD AWAITS YOUR EXECUTION.', 'active');
    });

    const level10SelectableCards = [...document.querySelectorAll('#level-10 .level10-card')];

    function setLevel10SelectedCard(cell) {
      level10SelectableCards.forEach(item => item.classList.toggle('is-selected', item === cell));
    }

    level10SelectableCards.forEach((cell) => {
      cell.addEventListener('click', () => setLevel10SelectedCard(cell));
      cell.addEventListener('focusin', () => setLevel10SelectedCard(cell));
    });

    if (level10SelectableCards[0]) setLevel10SelectedCard(level10SelectableCards[0]);
    applyLevel10SealState();




    // Quick Start + Custom Daily Defaults functionality
    const quickStartText = `QUICK START / DAILY RUN

01 / DECLARE THE SEAT
I am the operator.

02 / RUN DEFAULTS
My default is overflow.
My default is magnetism.
My default is sovereign pace.

04 / SET SWITCHES
Abundance: ON
Magnetism: ON
Overflow: ON
Recognition: ON
Love: ON
Creative Flow: ON

05 / ISSUE ONE COMMAND
EXECUTE: [specific outcome as already done]

09 / LOG CONFIRMATION
Confirmation received.
Notice. Acknowledge. Continue.

IF BREACHED
Access denied. This is not authorized code.
I am the operator. The Protocol holds.
Breach sealed. Render protected.`;

    const copyQuickStart = document.querySelector('#copyQuickStart');
    const quickStartStatus = document.querySelector('#quickStartStatus');

    async function copyUtilityText(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {
        const helper = document.createElement('textarea');
        helper.value = text;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        document.body.removeChild(helper);
      }
    }

    copyQuickStart?.addEventListener('click', async () => {
      await copyUtilityText(quickStartText);
      if (quickStartStatus) quickStartStatus.textContent = 'DAILY RUN COPIED. OPERATOR ONLINE.';
    });

    const customDefaultsRoot = document.querySelector('#custom-defaults');

    if (customDefaultsRoot) {
      const customKeys = {
        switches: 'the-protocol.custom.switches',
        commands: 'the-protocol.custom.commands',
        laws: 'the-protocol.custom.laws',
        confirmations: 'the-protocol.custom.confirmations'
      };

      const customGroups = ['Money', 'Body', 'Love', 'Work', 'Creative Output', 'Home', 'Visibility', 'Peace'];

      const customEls = {
        switchGroup: document.querySelector('#customSwitchGroup'),
        switchName: document.querySelector('#customSwitchName'),
        addSwitch: document.querySelector('#addCustomSwitch'),
        switchGroups: document.querySelector('#customSwitchGroups'),
        commandInput: document.querySelector('#customCommandInput'),
        addCommand: document.querySelector('#addCustomCommand'),
        commandList: document.querySelector('#customCommandList'),
        lawInput: document.querySelector('#customLawInput'),
        addLaw: document.querySelector('#addCustomLaw'),
        lawList: document.querySelector('#customLawList'),
        confirmationInput: document.querySelector('#customConfirmationInput'),
        addConfirmation: document.querySelector('#addCustomConfirmation'),
        confirmationList: document.querySelector('#customConfirmationList'),
        copyAll: document.querySelector('#copyCustomDefaults'),
        status: document.querySelector('#customDefaultsStatus')
      };

      function readCustom(key, fallback = []) {
        try {
          const value = JSON.parse(localStorage.getItem(key));
          return Array.isArray(value) ? value : fallback;
        } catch (error) {
          return fallback;
        }
      }

      function writeCustom(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
      }

      function customId() {
        return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      }

      function escapeCustomHTML(value) {
        return String(value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }

      function setCustomStatus(message) {
        if (!customEls.status) return;
        customEls.status.textContent = message;
      }

      function formatCustomTime(value) {
        return new Intl.DateTimeFormat(undefined, {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit'
        }).format(new Date(value));
      }

      function renderCustomSwitches() {
        const switches = readCustom(customKeys.switches);
        if (!customEls.switchGroups) return;

        const groups = customGroups
          .map(group => ({ group, items: switches.filter(item => item.group === group) }))
          .filter(section => section.items.length);

        if (!groups.length) {
          customEls.switchGroups.innerHTML = '<p class="custom-empty">No custom switches saved yet.</p>';
          return;
        }

        customEls.switchGroups.innerHTML = groups.map(({ group, items }) => `
          <section class="custom-switch-group">
            <div class="custom-switch-group__title"><span>${escapeCustomHTML(group)}</span><span>${items.length} switch${items.length === 1 ? '' : 'es'}</span></div>
            ${items.map(item => `
              <div class="custom-switch-row">
                <span class="custom-switch-row__name">${escapeCustomHTML(item.name)}</span>
                <button class="custom-pill ${item.on ? 'is-on' : ''}" type="button" data-custom-toggle-switch="${item.id}">${item.on ? 'ON' : 'OFF'}</button>
                <button class="custom-delete" type="button" data-custom-delete-switch="${item.id}">Delete</button>
              </div>
            `).join('')}
          </section>
        `).join('');
      }

      function renderCustomList(container, items, type, emptyText) {
        if (!container) return;
        if (!items.length) {
          container.innerHTML = `<p class="custom-empty">${emptyText}</p>`;
          return;
        }

        container.innerHTML = items.map(item => `
          <div class="custom-saved-item">
            <span class="custom-saved-item__text">${item.createdAt ? `<time>${formatCustomTime(item.createdAt)}</time>` : ''}${escapeCustomHTML(item.text)}</span>
            <span>
              <button class="custom-copy" type="button" data-custom-copy-${type}="${item.id}">Copy</button>
              <button class="custom-delete" type="button" data-custom-delete-${type}="${item.id}">Delete</button>
            </span>
          </div>
        `).join('');
      }

      function renderCustomCommands() {
        renderCustomList(customEls.commandList, readCustom(customKeys.commands), 'command', 'No saved commands yet.');
      }

      function renderCustomLaws() {
        renderCustomList(customEls.lawList, readCustom(customKeys.laws), 'law', 'No custom laws saved yet.');
      }

      function renderCustomConfirmations() {
        renderCustomList(customEls.confirmationList, readCustom(customKeys.confirmations), 'confirmation', 'No confirmations logged yet.');
      }

      function addCustomItem(key, input, prefix = '') {
        const raw = input?.value.trim();
        if (!raw) return false;
        const items = readCustom(key);
        const text = prefix && !raw.toUpperCase().startsWith(prefix) ? `${prefix} ${raw}` : raw;
        items.unshift({ id: customId(), text, createdAt: new Date().toISOString() });
        writeCustom(key, items);
        input.value = '';
        return true;
      }

      customEls.addSwitch?.addEventListener('click', () => {
        const name = customEls.switchName?.value.trim();
        const group = customEls.switchGroup?.value || 'Money';
        if (!name) return;
        const switches = readCustom(customKeys.switches);
        switches.unshift({ id: customId(), group, name, on: true, createdAt: new Date().toISOString() });
        writeCustom(customKeys.switches, switches);
        customEls.switchName.value = '';
        renderCustomSwitches();
        setCustomStatus('SWITCH SAVED. POSITION: ON.');
      });

      customEls.switchName?.addEventListener('keydown', event => {
        if (event.key === 'Enter') customEls.addSwitch?.click();
      });

      customEls.addCommand?.addEventListener('click', () => {
        if (!addCustomItem(customKeys.commands, customEls.commandInput, 'EXECUTE:')) return;
        renderCustomCommands();
        setCustomStatus('COMMAND SAVED.');
      });

      customEls.commandInput?.addEventListener('keydown', event => {
        if (event.key === 'Enter') customEls.addCommand?.click();
      });

      customEls.addLaw?.addEventListener('click', () => {
        if (!addCustomItem(customKeys.laws, customEls.lawInput)) return;
        renderCustomLaws();
        setCustomStatus('LAW SAVED.');
      });

      customEls.addConfirmation?.addEventListener('click', () => {
        if (!addCustomItem(customKeys.confirmations, customEls.confirmationInput)) return;
        renderCustomConfirmations();
        setCustomStatus('CONFIRMATION LOGGED.');
      });

      customDefaultsRoot.addEventListener('click', async event => {
        const target = event.target.closest('button');
        if (!target) return;

        const switchToggle = target.dataset.customToggleSwitch;
        const switchDelete = target.dataset.customDeleteSwitch;
        const deleteCommand = target.dataset.customDeleteCommand;
        const deleteLaw = target.dataset.customDeleteLaw;
        const deleteConfirmation = target.dataset.customDeleteConfirmation;
        const copyCommand = target.dataset.customCopyCommand;
        const copyLaw = target.dataset.customCopyLaw;
        const copyConfirmation = target.dataset.customCopyConfirmation;

        if (switchToggle) {
          const switches = readCustom(customKeys.switches).map(item => item.id === switchToggle ? { ...item, on: !item.on } : item);
          writeCustom(customKeys.switches, switches);
          renderCustomSwitches();
          setCustomStatus('SWITCH POSITION UPDATED.');
        }

        if (switchDelete) {
          writeCustom(customKeys.switches, readCustom(customKeys.switches).filter(item => item.id !== switchDelete));
          renderCustomSwitches();
          setCustomStatus('SWITCH DELETED.');
        }

        const deleteMap = [
          [deleteCommand, customKeys.commands, renderCustomCommands, 'COMMAND DELETED.'],
          [deleteLaw, customKeys.laws, renderCustomLaws, 'LAW DELETED.'],
          [deleteConfirmation, customKeys.confirmations, renderCustomConfirmations, 'CONFIRMATION DELETED.']
        ];

        deleteMap.forEach(([id, key, render, message]) => {
          if (!id) return;
          writeCustom(key, readCustom(key).filter(item => item.id !== id));
          render();
          setCustomStatus(message);
        });

        const copyMap = [
          [copyCommand, customKeys.commands, 'COMMAND COPIED.'],
          [copyLaw, customKeys.laws, 'LAW COPIED.'],
          [copyConfirmation, customKeys.confirmations, 'CONFIRMATION COPIED.']
        ];

        for (const [id, key, message] of copyMap) {
          if (!id) continue;
          const item = readCustom(key).find(entry => entry.id === id);
          if (!item) continue;
          await copyUtilityText(item.text);
          setCustomStatus(message);
        }
      });

      customEls.copyAll?.addEventListener('click', async () => {
        const switches = readCustom(customKeys.switches);
        const commands = readCustom(customKeys.commands);
        const laws = readCustom(customKeys.laws);
        const confirmations = readCustom(customKeys.confirmations);

        const switchLines = switches.length
          ? switches.map(item => `${item.group}: ${item.name} ${item.on ? 'ON' : 'OFF'}`).join('\n')
          : 'No custom switches saved.';
        const commandLines = commands.length ? commands.map(item => item.text).join('\n') : 'No commands saved.';
        const lawLines = laws.length ? laws.map(item => item.text).join('\n') : 'No laws saved.';
        const confirmationLines = confirmations.length ? confirmations.map(item => `- ${item.text}`).join('\n') : 'No confirmations logged.';

        await copyUtilityText(`CUSTOM DAILY DEFAULTS\n\nSWITCHBOARD\n${switchLines}\n\nCOMMAND LINE\n${commandLines}\n\nLAWS\n${lawLines}\n\nRENDER CONFIRMATIONS\n${confirmationLines}`);
        setCustomStatus('CUSTOM DEFAULTS COPIED.');
      });

      renderCustomSwitches();
      renderCustomCommands();
      renderCustomLaws();
      renderCustomConfirmations();
    }

