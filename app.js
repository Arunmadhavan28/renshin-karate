/**
 * RENSHIN KARATE INTERNATIONAL — CORE INTERACTIVE RUNTIME
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveStatus();
  initBeltSystem();
  initScheduleTabs();
  initBookingModal();
  initSmoothScroll();
});

/* ---------------------------------------------------------
   1. LIVE DOJO OPERATIONAL STATUS
   --------------------------------------------------------- */
function initLiveStatus() {
  const statusEl = document.getElementById('liveDojoStatus');
  if (!statusEl) return;

  const now = new Date();
  // Format current hour in IST (UTC+5:30)
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istDate = new Date(utc + (3600000 * 5.5));
  const hour = istDate.getHours();
  const day = istDate.getDay(); // 0 is Sunday

  // Dojo open: Mon-Sat 6:00 AM to 9:00 PM (with morning/evening peak)
  const isOpen = (day !== 0) && (hour >= 6 && hour < 21);

  if (isOpen) {
    statusEl.innerHTML = `<span class="live-badge" style="background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.4); color: #10b981;">● DOJO ACTIVE & OPEN NOW</span>`;
  } else {
    statusEl.innerHTML = `<span class="live-badge" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #f59e0b;">○ NEXT BATCH AT 6:00 AM</span>`;
  }
}

/* ---------------------------------------------------------
   2. INTERACTIVE BELT PROGRESSION DATA & HANDLER
   --------------------------------------------------------- */
const BELT_DATA = {
  white: {
    title: "Mukyu / 10th Kyu (White Belt) — Foundation",
    time: "Duration: 3 Months • Orientation & Stance Architecture",
    curriculum: [
      "Seiza & Dojo Etiquette: Rei, respect, and mental quietude",
      "Stance Geometry: Zenkutsu-Dachi (front stance), Musubi-Dachi, Kiba-Dachi",
      "Linear Striking: Chudan Oi-Zuki, Seiken Tsuki, Gyaku-Zuki",
      "Primary Kinetic Blocking: Age-Uke (rising block), Gedan-Barai (down block)",
      "First Kata: Taikyoku Shodan — precision direction and symmetry"
    ]
  },
  yellow: {
    title: "8th Kyu (Yellow Belt) — Core Dynamic Balance",
    time: "Duration: 3–4 Months • Kinetic Power Flow",
    curriculum: [
      "Heian Shodan Mastery: Multi-angle transitions and hip rotation",
      "Kicking Mechanics: Mae-Geri Keage (front snap kick), Yoko-Geri Keage",
      "Defense: Soto-Uke (outside block) & Uchi-Uke (inside block)",
      "Controlled Sparring Intro: Gohon Kumite (5-step distance drill)",
      "Flexibility & Stance Conditioning: Core stability and reaction drills"
    ]
  },
  orange: {
    title: "7th Kyu (Orange Belt) — Acceleration & Rhythm",
    time: "Duration: 3–4 Months • Explosive Snap & Deflection",
    curriculum: [
      "Heian Nidan Kata: Synchronized knife-hand blocks and high kicks",
      "Dynamic Stance: Kokutsu-Dachi (back stance) transition fluency",
      "Impact Training: Focus mitt striking, speed combinations",
      "Sanbon Kumite: Three-attack defensive timing and rapid counters",
      "Self-Defense Module: Wrist release, lapel escapes, and voice command"
    ]
  },
  green: {
    title: "6th Kyu (Green Belt) — Flow & Biomechanical Velocity",
    time: "Duration: 4–6 Months • Intermediate Martial Power",
    curriculum: [
      "Heian Sandan Kata: Simultaneous block-and-strike, stomping kicks",
      "Mawashi-Geri: Roundhouse kick kinetic chain from hip to ball of foot",
      "Ippon Kumite: One-step real-time counter-strikes and slip maneuvers",
      "Close-Quarter Defense: Choke escapes and tactical redirection",
      "Tournament Rules: WKF point-scoring fundamentals & penalty awareness"
    ]
  },
  blue: {
    title: "4th Kyu (Blue Belt) — Tactical Mastery & Reflexes",
    time: "Duration: 6 Months • High-Intensity Competition Preparation",
    curriculum: [
      "Heian Yondan & Godan Kata: Jump kicks, crescent blocks, and pivots",
      "Spinning Kicks: Ushiro-Geri (back kick) and Ura-Mawashi-Geri (hook kick)",
      "Free Sparring (Jiyu Kumite): Decisive distance management, footwork",
      "High-pressure situational defense against multiple attackers",
      "Sports Biomechanics: Video-assisted reaction velocity auditing"
    ]
  },
  brown: {
    title: "1st–3rd Kyu (Brown Belt) — Advanced Pre-Dan Mastery",
    time: "Duration: 12 Months • Refinement, Leadership & Advanced Kata",
    curriculum: [
      "Bassai Dai & Kanku Dai: Ancient Okinawan master katas",
      "High-Level Tournament Kumite: Feints, blitz entries, Kizami-Zuki combinations",
      "Instructional Mentorship: Leading junior warm-ups and belt reviews",
      "Stress Inoculation Drills: Continuous combat stamina conditioning",
      "Mental Conditioning: Bushido code, composure under adversity"
    ]
  },
  black: {
    title: "Shodan (1st Dan Black Belt) — Master of Fundamentals",
    time: "Lifelong Discipline • Certified WKF International Lineage",
    curriculum: [
      "Complete Shotokan / Shito-Ryu / Goju master kata syllabus",
      "Elite WKF Kumite Championship Tactics: International podium standards",
      "Advanced Self-Defense, Joint Manipulation & Pressure Point Disruption",
      "Official Dan Certification recognized by International Federation",
      "Instructor & Sensei Authorization under Master Arunmadhavan E.V.R."
    ]
  }
};

function initBeltSystem() {
  const buttons = document.querySelectorAll('.belt-btn');
  const titleEl = document.getElementById('beltDetailTitle');
  const timeEl = document.getElementById('beltDetailTime');
  const listEl = document.getElementById('beltDetailCurriculum');

  if (!buttons.length || !titleEl) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const beltKey = btn.getAttribute('data-belt');
      const data = BELT_DATA[beltKey] || BELT_DATA.white;

      titleEl.textContent = data.title;
      timeEl.textContent = data.time;
      listEl.innerHTML = data.curriculum.map(item => `<li>${item}</li>`).join('');
    });
  });
}

/* ---------------------------------------------------------
   3. SCHEDULE TIMETABLE FILTERING
   --------------------------------------------------------- */
const SCHEDULES = {
  morning: [
    { time: "06:00 AM – 07:15 AM", title: "Sunrise Martial Conditioning & Kumite", desc: "Adults & Competitive Athletes • High-energy conditioning, footwork biomechanics, and technical sparring." },
    { time: "07:15 AM – 08:30 AM", title: "Kids Early Discipline & Agility", desc: "Ages 5–12 • Focus training, basic kihon, anti-bullying reflexes, and coordination." },
    { time: "08:30 AM – 09:30 AM", title: "1-on-1 VIP Elite Athlete Mentorship", desc: "Private slots with Sensei Arunmadhavan E.V.R. • Video analysis & tournament prep." }
  ],
  evening: [
    { time: "05:00 PM – 06:15 PM", title: "Junior Dragons (Kids Karate & Focus)", desc: "Ages 4–10 • Character building, motor skills, self-respect, and belt curriculum." },
    { time: "06:15 PM – 07:30 PM", title: "Teens & WKF Championship Squad", desc: "Ages 11–18 • High-speed kumite, competition kata, and championship sparring." },
    { time: "07:30 PM – 08:45 PM", title: "Adults, Executives & Women Self-Defense", desc: "All skill levels • Real-world situational awareness, stress relief, and functional combat strength." }
  ],
  weekend: [
    { time: "SAT 04:00 PM – 06:00 PM", title: "WKF Kumite Tactics & Referee Mock Tournaments", desc: "State & National level players • Electronic scoring simulation, blitz speed drills." },
    { time: "SUN 07:00 AM – 09:00 AM", title: "Master Kata & Kobudo Weapons Workshop", desc: "Intermediate & Advanced • Deep kata bunkai, bo staff, sai, and breathing katas." },
    { time: "SUN 10:00 AM – 11:30 AM", title: "Family & Beginners Community Trial Sessions", desc: "Free trial onboarding, posture evaluation, and parent orientation." }
  ]
};

function initScheduleTabs() {
  const tabs = document.querySelectorAll('.schedule-tab');
  const container = document.getElementById('scheduleGrid');
  if (!tabs.length || !container) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-schedule') || 'morning';
      const slots = SCHEDULES[filter] || SCHEDULES.morning;

      container.innerHTML = slots.map(s => `
        <div class="slot-card">
          <div class="slot-time">${s.time}</div>
          <h4 class="slot-title">${s.title}</h4>
          <p class="slot-desc">${s.desc}</p>
        </div>
      `).join('');
    });
  });
}

/* ---------------------------------------------------------
   4. TRIAL BOOKING MODAL & DIRECT WHATSAPP DISPATCH
   --------------------------------------------------------- */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const openBtns = document.querySelectorAll('.trigger-booking-modal');
  const closeBtn = document.getElementById('closeModalBtn');
  const form = document.getElementById('trialBookingForm');

  if (!modal) return;

  const openModal = () => modal.classList.add('active');
  const closeModal = () => modal.classList.remove('active');

  openBtns.forEach(b => b.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('applicantName')?.value || 'Prospective Student';
      const phone = document.getElementById('applicantPhone')?.value || '';
      const program = document.getElementById('applicantProgram')?.value || 'General Martial Arts';
      const slot = document.getElementById('applicantSlot')?.value || 'Morning';

      const text = `🥋 *Trial Session Request — Renshin Karate School International*\n\n` +
                   `• *Name:* ${name}\n` +
                   `• *Phone:* ${phone}\n` +
                   `• *Target Program:* ${program}\n` +
                   `• *Preferred Timing:* ${slot}\n` +
                   `• *Location:* Dojo, 7th Cross St, Peelamedu, Coimbatore\n\n` +
                   `Please confirm my free orientation session with Sensei Arunmadhavan E.V.R. Thank you!`;

      const encoded = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/919360325750?text=${encoded}`;

      // Open WhatsApp directly
      window.open(whatsappUrl, '_blank');
      closeModal();
      alert(`Thank you, ${name}! Your trial request has been generated. WhatsApp will open directly to connect with Master Arunmadhavan E.V.R.`);
    });
  }
}

/* ---------------------------------------------------------
   5. SMOOTH SCROLL FOR NAV LINKS
   --------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
