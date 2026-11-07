/**
 * UNDANGAN DIGITAL ULANG TAHUN - HAYYU GRILL
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial State & Configuration
  const defaultConfig = {
    childName: 'Keenan Althafandra',
    childNick: 'Keenan',
    age: 5,
    eventDate: '2026-11-29T15:00:00',
    displayDate: 'Minggu, 29 November 2026',
    displayTime: '15.00 - 18.00 WIB',
    venueName: 'Hayyu Grill Korean BBQ',
    venueDetail: 'Lantai 2, Mall Yogya Grand Karawang',
    venueAddress: 'Jl. Kertabumi No. 12, Karawang Kulon, Kec. Karawang Barat, Jawa Barat',
    googleMapsUrl: 'https://maps.google.com/?q=Yogya+Grand+Karawang',
    parents: 'Keluarga Bpk. Hendra & Ibu Maya',
    bcaAccount: '88301928374',
    bcaHolder: 'Hendra / Keenan',
    mandiriAccount: '132002938472',
    mandiriHolder: 'Hendra / Keenan',
    homeAddress: 'Perumahan Grand Galuh Residence Blok B4 No. 12, Telukjambe Timur, Karawang 41361',
    whatsappNumber: '6281234567890'
  };

  // Load saved state or default
  let config = JSON.parse(localStorage.getItem('hayyu_invitation_config')) || defaultConfig;

  // 2. Parse Dynamic Guest Name from URL (?to=Nama+Tamu)
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to') || urlParams.get('u') || 'Tamu Undangan & Keluarga';
  
  const coverGuestEl = document.getElementById('coverGuestName');
  if (coverGuestEl) {
    coverGuestEl.textContent = guestName;
  }
  const rsvpNameInput = document.getElementById('rsvpName');
  if (rsvpNameInput && guestName !== 'Tamu Undangan & Keluarga') {
    rsvpNameInput.value = guestName;
  }

  // 3. Audio Player with Web Audio API Fallback
  let isPlaying = false;
  const audioEl = document.getElementById('bgMusic');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  let audioContext = null;
  let synthLoopId = null;

  // Web Audio Synthesizer (Happy Birthday Tune)
  function playSynthHappyBirthday() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioContext) audioContext = new AudioCtx();
      if (audioContext.state === 'suspended') audioContext.resume();

      const bpm = 120;
      const beatDur = 60 / bpm;

      // Note frequencies
      const freqs = {
        'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25, 
        'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'REST': 0
      };

      const score = [
        ['G4', 0.75], ['G4', 0.25], ['A4', 1.0], ['G4', 1.0], ['C5', 1.0], ['B4', 2.0],
        ['G4', 0.75], ['G4', 0.25], ['A4', 1.0], ['G4', 1.0], ['D5', 1.0], ['C5', 2.0],
        ['G4', 0.75], ['G4', 0.25], ['G5', 1.0], ['E5', 1.0], ['C5', 1.0], ['B4', 1.0], ['A4', 1.5],
        ['F5', 0.75], ['F5', 0.25], ['E5', 1.0], ['C5', 1.0], ['D5', 1.0], ['C5', 2.5]
      ];

      function scheduleMelody() {
        if (!isPlaying) return;
        let curTime = audioContext.currentTime + 0.05;

        score.forEach(([note, beats]) => {
          const freq = freqs[note];
          const dur = beats * beatDur;
          if (freq > 0 && isPlaying) {
            // Music box chime timbre
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, curTime);

            // Pluck envelope
            gain.gain.setValueAtTime(0.001, curTime);
            gain.gain.exponentialRampToValueAtTime(0.25, curTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, curTime + dur * 1.2);

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.start(curTime);
            osc.stop(curTime + dur * 1.3);
          }
          curTime += dur;
        });

        // Loop after song finishes
        const songDuration = score.reduce((acc, curr) => acc + curr[1] * beatDur, 0);
        synthLoopId = setTimeout(scheduleMelody, (songDuration + 1.5) * 1000);
      }

      scheduleMelody();
    } catch (e) {
      console.log('Synth not supported:', e);
    }
  }

  function startMusic() {
    isPlaying = true;
    musicToggleBtn.classList.add('playing');

    if (audioEl) {
      audioEl.play().then(() => {
        // HTML5 Audio played successfully
      }).catch(err => {
        // Fallback to Web Audio Synth if file audio fails/blocked
        console.log('Audio file blocked, using Web Audio Synth:', err);
        playSynthHappyBirthday();
      });
    } else {
      playSynthHappyBirthday();
    }
  }

  function pauseMusic() {
    isPlaying = false;
    musicToggleBtn.classList.remove('playing');
    if (audioEl) audioEl.pause();
    if (synthLoopId) clearTimeout(synthLoopId);
    if (audioContext && audioContext.state === 'running') {
      audioContext.suspend();
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseMusic();
      } else {
        startMusic();
      }
    });
  }

  // 4. Opening Screen Handler
  const openInvitationBtn = document.getElementById('openInvitationBtn');
  const coverScreen = document.getElementById('coverScreen');
  const mainContent = document.getElementById('mainContent');

  // Check if opened=1 query parameter is set (useful for direct preview/screenshot)
  if (urlParams.get('opened') === '1' || urlParams.get('preview') === '1') {
    if (coverScreen) coverScreen.classList.add('opened');
    if (mainContent) mainContent.classList.add('visible');
  }

  if (openInvitationBtn) {
    openInvitationBtn.addEventListener('click', () => {
      // 1. Play music
      startMusic();

      // 2. Trigger Confetti
      triggerCelebrationConfetti();

      // 3. Open transition
      coverScreen.classList.add('opened');
      mainContent.classList.add('visible');

      // Scroll smoothly to main spotlight
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    });
  }

  // 5. Celebration Confetti Cannon (Self-contained Canvas Confetti)
  function triggerCelebrationConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#2554a5', '#e52e2e', '#ffb800', '#38bdf8', '#ff5252', '#ffffff'];
    const particles = [];
    const particleCount = 120;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.45,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 18,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        gravity: 0.35,
        drag: 0.98
      });
    }

    let frame = 0;
    function renderConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.007;

        if (p.opacity > 0 && p.y < canvas.height + 50) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (alive && frame < 200) {
        frame++;
        requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    renderConfetti();
  }

  // Confetti trigger button in floating controls
  const confettiBtn = document.getElementById('confettiBtn');
  if (confettiBtn) {
    confettiBtn.addEventListener('click', triggerCelebrationConfetti);
  }

  // 6. Countdown Timer
  function initCountdown() {
    const targetDate = new Date(config.eventDate).getTime();

    function update() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      const daysEl = document.getElementById('timerDays');
      const hoursEl = document.getElementById('timerHours');
      const minsEl = document.getElementById('timerMins');
      const secsEl = document.getElementById('timerSecs');

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        const label = document.getElementById('countdownLabel');
        if (label) label.textContent = '🎉 Acara Sedang / Telah Berlangsung!';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }
  initCountdown();

  // 7. Clipboard Copy & Toast Feedback
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  window.copyToClipboard = function(text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || 'Berhasil disalin ke clipboard! 📋');
      }).catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  };

  function fallbackCopy(text, successMsg) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(successMsg || 'Berhasil disalin ke clipboard! 📋');
  }

  // 8. Modals (QRIS & Physical Address)
  const qrisModal = document.getElementById('qrisModal');
  const addressModal = document.getElementById('addressModal');

  window.openQrisModal = function() {
    if (qrisModal) qrisModal.classList.add('active');
  };

  window.closeQrisModal = function() {
    if (qrisModal) qrisModal.classList.remove('active');
  };

  window.openAddressModal = function() {
    if (addressModal) addressModal.classList.add('active');
  };

  window.closeAddressModal = function() {
    if (addressModal) addressModal.classList.remove('active');
  };

  // Close modals on clicking overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // 9. RSVP & Wishes Wall Management
  const defaultWishes = [
    {
      name: 'Tante Sarah & Om Dito',
      status: 'hadir',
      pax: 2,
      time: '1 jam yang lalu',
      message: 'Selamat ulang tahun yang ke-5 Keenan ganteng! Semoga selalu sehat, pintar, sholeh, dan makin ceria. Ga sabar seru-seruan bareng di Hayyu Grill! 🎂🎉'
    },
    {
      name: 'Keluarga Bpk. Rahmat',
      status: 'hadir',
      pax: 3,
      time: '3 jam yang lalu',
      message: 'Barakallah fii umrik Keenan sayang. Semoga selalu dalam lindungan Allah SWT, menjadi kebanggaan Ayah dan Bunda. Aamiin ya rabbal alamin.'
    },
    {
      name: 'Om Kevin & Tante Vina',
      status: 'hadir',
      pax: 2,
      time: 'Kemarin',
      message: 'Happy 5th Birthday Keenan! Semoga tambah pintar dan banyak rezekinya. See you at Hayyu Grill party! 🎈🥩'
    }
  ];

  let storedWishes = JSON.parse(localStorage.getItem('hayyu_wishes_list')) || defaultWishes;

  function renderWishes() {
    const container = document.getElementById('wishesContainer');
    if (!container) return;
    container.innerHTML = '';

    storedWishes.forEach(wish => {
      const item = document.createElement('div');
      item.className = 'wish-item';

      const isHadir = wish.status === 'hadir';
      const badgeClass = isHadir ? 'hadir' : 'tidak-hadir';
      const badgeText = isHadir ? `Hadir (${wish.pax || 1} orang)` : 'Berhalangan';

      item.innerHTML = `
        <div class="wish-header">
          <span class="wish-sender">
            <span>👤</span> ${escapeHtml(wish.name)}
          </span>
          <span class="wish-badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="wish-time">${wish.time}</div>
        <div class="wish-text">${escapeHtml(wish.message)}</div>
      `;
      container.appendChild(item);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  renderWishes();

  // RSVP Form Submit
  const rsvpForm = document.getElementById('rsvpForm');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('rsvpName').value.trim();
      const status = document.getElementById('rsvpStatus').value;
      const pax = document.getElementById('rsvpPax').value;
      const message = document.getElementById('rsvpMessage').value.trim();

      if (!name) {
        showToast('Mohon masukkan nama Anda');
        return;
      }

      const newWish = {
        name: name,
        status: status,
        pax: pax,
        time: 'Baru saja',
        message: message || 'Selamat ulang tahun Keenan! Semoga panjang umur, sehat dan sukses selalu.'
      };

      storedWishes.unshift(newWish);
      localStorage.setItem('hayyu_wishes_list', JSON.stringify(storedWishes));
      renderWishes();

      // Trigger Confetti
      triggerCelebrationConfetti();
      showToast('Terima kasih atas konfirmasi & doanya! 🎉');

      // Clear message field
      document.getElementById('rsvpMessage').value = '';
    });
  }

  // WhatsApp RSVP link
  const btnWhatsapp = document.getElementById('btnWhatsappRsvp');
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('rsvpName').value.trim() || guestName;
      const status = document.getElementById('rsvpStatus').value;
      const pax = document.getElementById('rsvpPax').value;
      const message = document.getElementById('rsvpMessage').value.trim();

      const statusText = status === 'hadir' ? `Hadir (${pax} Orang)` : 'Maaf, berhalangan hadir';
      const text = `Halo Keluarga ${config.childNick},\n\nSaya *${name}* ingin mengonfirmasi kehadiran untuk acara ulang tahun ${config.childNick} di ${config.venueName}:\n- Status: *${statusText}*\n- Ucapan: "${message || 'Happy Birthday!'}"\n\nTerima kasih! 🎉`;

      const waUrl = `https://api.whatsapp.com/send?phone=${config.whatsappNumber}&text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    });
  }

  // 10. Admin Authentication & Panel Management (PIN Protected)
  let savedPin = localStorage.getItem('hayyu_admin_pin');
  let adminPin = (savedPin && savedPin !== '1234') ? savedPin : '2026';
  localStorage.setItem('hayyu_admin_pin', adminPin);
  let isAdminLoggedIn = sessionStorage.getItem('hayyu_admin_logged_in') === 'true';

  const pinModal = document.getElementById('pinModal');
  const editModal = document.getElementById('editModal');
  const btnLogAdmin = document.getElementById('btnLogAdmin');
  const pinForm = document.getElementById('pinForm');
  const adminPinInput = document.getElementById('adminPinInput');
  const pinErrorMessage = document.getElementById('pinErrorMessage');
  const btnTogglePinView = document.getElementById('btnTogglePinView');
  const btnAdminLogout = document.getElementById('btnAdminLogout');
  const btnResetPhoto = document.getElementById('btnResetPhoto');

  // Open & Close PIN Modal
  window.openPinModal = function() {
    if (pinModal) {
      if (adminPinInput) {
        adminPinInput.value = '';
        adminPinInput.type = 'password';
      }
      if (pinErrorMessage) pinErrorMessage.style.display = 'none';
      pinModal.classList.add('active');
      setTimeout(() => {
        if (adminPinInput) adminPinInput.focus();
      }, 200);
    }
  };

  window.closePinModal = function() {
    if (pinModal) pinModal.classList.remove('active');
  };

  // Open & Close Edit Modal (Admin Panel)
  window.openEditModal = function() {
    if (editModal) {
      // Pre-fill fields with current config
      document.getElementById('editChildName').value = config.childName || '';
      document.getElementById('editChildNick').value = config.childNick || '';
      document.getElementById('editChildAge').value = config.age || 5;
      document.getElementById('editParents').value = config.parents || '';
      document.getElementById('editEventDate').value = config.displayDate || '';
      document.getElementById('editEventTime').value = config.displayTime || '';
      document.getElementById('editVenue').value = config.venueName || '';
      document.getElementById('editVenueAddress').value = config.venueAddress || '';
      document.getElementById('editBcaAccount').value = config.bcaAccount || '';
      document.getElementById('editBcaHolder').value = config.bcaHolder || '';
      document.getElementById('editMandiriAccount').value = config.mandiriAccount || '';
      document.getElementById('editMandiriHolder').value = config.mandiriHolder || '';
      document.getElementById('editHomeAddress').value = config.homeAddress || '';
      document.getElementById('editWhatsappNumber').value = config.whatsappNumber || '';
      const pinField = document.getElementById('editAdminPin');
      if (pinField) pinField.value = '';

      updateAdminRsvpSummary();
      editModal.classList.add('active');
    }
  };

  // Admin RSVP Summary Calculator
  function updateAdminRsvpSummary() {
    let totalHadirPax = 0;
    let totalTidakHadir = 0;
    storedWishes.forEach(w => {
      if (w.status === 'hadir') {
        totalHadirPax += parseInt(w.pax) || 1;
      } else {
        totalTidakHadir++;
      }
    });

    const hadirEl = document.getElementById('adminSummaryHadir');
    const tidakHadirEl = document.getElementById('adminSummaryTidakHadir');
    if (hadirEl) hadirEl.textContent = `${totalHadirPax} Orang`;
    if (tidakHadirEl) tidakHadirEl.textContent = `${totalTidakHadir} Tamu`;
  }

  // Copy RSVP Summary for Hayyu Grill table reservation
  const btnCopyRsvpSummary = document.getElementById('btnCopyRsvpSummary');
  if (btnCopyRsvpSummary) {
    btnCopyRsvpSummary.addEventListener('click', () => {
      let totalHadirPax = 0;
      let hadirList = [];
      storedWishes.forEach(w => {
        if (w.status === 'hadir') {
          const pax = parseInt(w.pax) || 1;
          totalHadirPax += pax;
          hadirList.push(`• ${w.name} (${pax} pax)`);
        }
      });

      const summaryText = `*REKAP RESERVASI MEJA ULANG TAHUN ${config.childNick.toUpperCase()}*\n` +
        `Restoran: ${config.venueName}\n` +
        `Hari & Tanggal: ${config.displayDate}\n` +
        `Waktu Acara: ${config.displayTime}\n` +
        `----------------------------------------\n` +
        `*TOTAL PAX HADIR:* ${totalHadirPax} Orang\n\n` +
        `*DAFTAR TAMU KONFIRMASI:* \n${hadirList.length ? hadirList.join('\n') : '(Belum ada tamu konfirmasi)'}\n` +
        `----------------------------------------\n` +
        `Keluarga ${config.parents}`;

      copyToClipboard(summaryText, 'Format rekap reservasi berhasil disalin! 📋');
    });
  }

  // WhatsApp Link Generator for specific guests
  function getCustomGuestUrl(guestName) {
    const cleanUrl = window.location.href.split('?')[0].split('#')[0];
    return `${cleanUrl}?to=${encodeURIComponent(guestName)}`;
  }

  const btnShareWaGuest = document.getElementById('btnShareWaGuest');
  if (btnShareWaGuest) {
    btnShareWaGuest.addEventListener('click', () => {
      const guestInput = document.getElementById('guestNameGenerator');
      const name = guestInput ? guestInput.value.trim() : '';
      if (!name) {
        showToast('Mohon ketik nama tamu yang mau diundang');
        if (guestInput) guestInput.focus();
        return;
      }

      const guestLink = getCustomGuestUrl(name);
      const waMsg = `Halo *${name}*,\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda serta keluarga untuk hadir di acara perayaan ulang tahun *${config.childName}* ke-${config.age} yang akan diselenggarakan di:\n\n` +
        `🥩 *${config.venueName}*\n` +
        `📅 ${config.displayDate}\n` +
        `⏰ ${config.displayTime}\n\n` +
        `Info lengkap dan konfirmasi kehadiran dapat dilihat melalui tautan undangan berikut:\n${guestLink}\n\n` +
        `Merupakan suatu kebahagiaan bagi kami sekeluarga apabila Anda berkenan hadir dan memberikan doa restu. Terima kasih! 🙏✨\n\n` +
        `- Salam hangat, ${config.parents}`;

      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(waMsg)}`, '_blank');
    });
  }

  const btnCopyLinkGuest = document.getElementById('btnCopyLinkGuest');
  if (btnCopyLinkGuest) {
    btnCopyLinkGuest.addEventListener('click', () => {
      const guestInput = document.getElementById('guestNameGenerator');
      const name = guestInput ? guestInput.value.trim() : '';
      if (!name) {
        showToast('Mohon ketik nama tamu yang mau diundang');
        if (guestInput) guestInput.focus();
        return;
      }
      const guestLink = getCustomGuestUrl(name);
      copyToClipboard(guestLink, `Link undangan untuk ${name} berhasil disalin! 📋`);
    });
  }

  window.closeEditModal = function() {
    if (editModal) editModal.classList.remove('active');
  };

  // Toggle View PIN
  if (btnTogglePinView && adminPinInput) {
    btnTogglePinView.addEventListener('click', () => {
      if (adminPinInput.type === 'password') {
        adminPinInput.type = 'text';
        btnTogglePinView.textContent = '🙈';
      } else {
        adminPinInput.type = 'password';
        btnTogglePinView.textContent = '👁️';
      }
    });
  }

  // Handle "Log Admin" Button Click
  if (btnLogAdmin) {
    btnLogAdmin.addEventListener('click', () => {
      if (isAdminLoggedIn) {
        openEditModal();
      } else {
        openPinModal();
      }
    });
  }

  // Handle PIN Form Submission
  if (pinForm) {
    pinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPin = adminPinInput.value.trim();

      if (enteredPin === adminPin) {
        isAdminLoggedIn = true;
        sessionStorage.setItem('hayyu_admin_logged_in', 'true');
        closePinModal();
        openEditModal();
        showToast('Login admin berhasil! 🔓');
      } else {
        if (pinErrorMessage) pinErrorMessage.style.display = 'block';
        adminPinInput.classList.add('shake');
        setTimeout(() => {
          adminPinInput.classList.remove('shake');
        }, 400);
        adminPinInput.focus();
        adminPinInput.select();
      }
    });
  }

  // Handle Logout Button
  if (btnAdminLogout) {
    btnAdminLogout.addEventListener('click', () => {
      isAdminLoggedIn = false;
      sessionStorage.removeItem('hayyu_admin_logged_in');
      closeEditModal();
      showToast('Anda telah logout dari panel admin. 🔒');
    });
  }

  // Handle Photo Replacement from User's Device
  const photoInput = document.getElementById('editPhotoInput');
  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newPhotoUrl = event.target.result;
          document.querySelectorAll('.child-photo-main, .cover-photo-img').forEach(img => {
            img.src = newPhotoUrl;
          });
          localStorage.setItem('hayyu_custom_photo', newPhotoUrl);
          showToast('Foto anak berhasil diperbarui! 📸');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Handle Reset Photo Button
  if (btnResetPhoto) {
    btnResetPhoto.addEventListener('click', () => {
      localStorage.removeItem('hayyu_custom_photo');
      document.querySelectorAll('.child-photo-main, .cover-photo-img').forEach(img => {
        img.src = 'assets/child_photo.jpg';
      });
      if (photoInput) photoInput.value = '';
      showToast('Foto dikembalikan ke foto bawaan. 📸');
    });
  }

  // Restore custom photo if exists
  const savedPhoto = localStorage.getItem('hayyu_custom_photo');
  if (savedPhoto) {
    document.querySelectorAll('.child-photo-main, .cover-photo-img').forEach(img => {
      img.src = savedPhoto;
    });
  }

  // Save Config Changes
  const editForm = document.getElementById('editForm');
  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      config.childName = document.getElementById('editChildName').value.trim();
      config.childNick = document.getElementById('editChildNick').value.trim() || config.childName.split(' ')[0];
      config.age = parseInt(document.getElementById('editChildAge').value) || 5;
      config.parents = document.getElementById('editParents').value.trim();
      config.displayDate = document.getElementById('editEventDate').value.trim();
      config.displayTime = document.getElementById('editEventTime').value.trim();
      config.venueName = document.getElementById('editVenue').value.trim();
      config.venueAddress = document.getElementById('editVenueAddress').value.trim();
      config.bcaAccount = document.getElementById('editBcaAccount').value.trim();
      config.bcaHolder = document.getElementById('editBcaHolder').value.trim();
      config.mandiriAccount = document.getElementById('editMandiriAccount').value.trim();
      config.mandiriHolder = document.getElementById('editMandiriHolder').value.trim();
      config.homeAddress = document.getElementById('editHomeAddress').value.trim();
      config.whatsappNumber = document.getElementById('editWhatsappNumber').value.trim();

      // Check if Admin Changed PIN
      const newPin = document.getElementById('editAdminPin').value.trim();
      if (newPin) {
        adminPin = newPin;
        localStorage.setItem('hayyu_admin_pin', newPin);
        showToast('PIN admin berhasil diperbarui! 🔑');
      }

      localStorage.setItem('hayyu_invitation_config', JSON.stringify(config));
      applyConfigToDOM();
      closeEditModal();
      showToast('Pengaturan undangan berhasil disimpan! ✨');
    });
  }

  function applyConfigToDOM() {
    document.querySelectorAll('.dyn-child-name').forEach(el => el.textContent = config.childName);
    document.querySelectorAll('.dyn-child-age').forEach(el => el.textContent = `Ke-${config.age} Tahun 🎂`);
    document.querySelectorAll('.dyn-event-date').forEach(el => el.textContent = config.displayDate);
    document.querySelectorAll('.dyn-event-time').forEach(el => el.textContent = config.displayTime);
    document.querySelectorAll('.dyn-venue-name').forEach(el => el.textContent = config.venueName);
    document.querySelectorAll('.dyn-venue-address').forEach(el => {
      el.innerHTML = `${escapeHtml(config.venueName)}<br>${escapeHtml(config.venueAddress)}`;
    });
    document.querySelectorAll('.dyn-bca-number').forEach(el => el.textContent = config.bcaAccount);
    document.querySelectorAll('.dyn-bca-holder').forEach(el => el.textContent = `a.n ${config.bcaHolder}`);
    document.querySelectorAll('.dyn-home-address').forEach(el => el.textContent = config.homeAddress);

    // Update parent names
    const parentEls = document.querySelectorAll('.parent-names span');
    parentEls.forEach(el => {
      el.textContent = config.parents;
    });
  }

  applyConfigToDOM();
});

