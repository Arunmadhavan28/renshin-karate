/**
 * RENSHIN KARATE INTERNATIONAL — 100% APPLE-NATIVE INTERACTIVE RUNTIME
 * Cupertino Grade Interactivity, Micro-animations, Real-time Status & Instant Flow Speed
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveStatus();
  initProgramSegments();
  initAEOAccordion();
  initBookingModal();
  initSmoothScroll();
  initScrollSpy();
  initQuickCopy();
});

/* --------------------------------------------------------------------------
   1. LIVE DOJO OPERATIONAL STATUS (IST TIMEZONE)
   -------------------------------------------------------------------------- */
function initLiveStatus() {
  const statusContainer = document.getElementById('liveDojoStatus');
  if (!statusContainer) return;

  const updateStatus = () => {
    const now = new Date();
    // Convert current UTC time to IST (UTC +5:30)
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istDate = new Date(utc + (3600000 * 5.5));
    const hour = istDate.getHours();
    const day = istDate.getDay(); // 0 is Sunday

    // Dojo open: Mon-Sat 6:00 AM to 9:00 PM IST
    const isOpen = (day !== 0) && (hour >= 6 && hour < 21);

    if (isOpen) {
      statusContainer.innerHTML = `
        <span class="apple-pill-tag green" style="cursor: default;" title="Dojo is currently active on Ellaithottam Road">
          ● DOJO ACTIVE NOW
        </span>
      `;
    } else {
      statusContainer.innerHTML = `
        <span class="apple-pill-tag" style="cursor: default;" title="Next training batch opens at 6:00 AM IST">
          ○ NEXT BATCH AT 6:00 AM
        </span>
      `;
    }
  };

  updateStatus();
  setInterval(updateStatus, 60000); // Check every minute
}

/* --------------------------------------------------------------------------
   2. APPLE SEGMENTED CONTROLLER (PROGRAMS - INSTANT 0ms FLOW SPEED)
   -------------------------------------------------------------------------- */
const PROGRAMS_DATA = {
  kids: {
    badge: "FOUNDATIONAL FOCUS & MOTOR AGILITY",
    title: "Kids Karate & Discipline (Ages 4–12)",
    desc: "Nurturing confidence, deep focus, and respectful manners in children ages 4 to 12. Our proven methodology channels youthful energy into sharp coordination, anti-bullying reflexes, and academic concentration.",
    features: [
      "Dojo manners, seiza meditation, and emotional self-regulation",
      "Motor coordination, stance stability, and core postural alignment",
      "Anti-bullying situational awareness and defensive vocal assertiveness",
      "Gradual belt progression under international federation standards"
    ],
    buttonText: "Enroll in Kids Program",
    specs: {
      target: "Children Ages 4–12",
      ratio: "1:12 Capped Maximum",
      duration: "60–75 Minutes / Class",
      standard: "World Karate Federation (WKF)",
      grading: "Quarterly Kyu Evaluation",
      frequency: "Mon–Sat (Flexible Options)"
    }
  },
  wkf: {
    badge: "INTERNATIONAL TOURNAMENT PODIUM TRAINING",
    title: "WKF Kumite & Championship Kata",
    desc: "Elite tactical competition conditioning for aspiring state, national, and international medalists. Mentored directly by International Medalist Sensei Arunmadhavan E.V.R. using high-velocity sports biomechanics.",
    features: [
      "Electronic WKF scoring simulation and blitz attack combinations",
      "Kizami-Zuki and Gyaku-Zuki kinetic snap velocity conditioning",
      "Deep kata bunkai analysis (Shotokan & Shito-Ryu master forms)",
      "Dedicated psychological composure and tournament stress inoculation"
    ],
    buttonText: "Join WKF Tournament Squad",
    specs: {
      target: "Teens & Competitive Athletes",
      ratio: "1:8 High-Performance Ratio",
      duration: "75–90 Minutes / Class",
      standard: "Olympic / WKF Tournament Rules",
      grading: "Pre-Dan & Dan Accreditation",
      frequency: "5–6 Days / Week Conditioning"
    }
  },
  selfdefense: {
    badge: "EMPOWERING SITUATIONAL REFLEXES",
    title: "Adults & Women's Practical Self-Defense",
    desc: "Functional self-defense, combat conditioning, and stress relief for working professionals, collegiate students, and women. Learn high-leverage evasion and rapid disruption in an inclusive, respectful dojo atmosphere.",
    features: [
      "Instinctive defense against grabs, chokes, and confined-space attacks",
      "Biomechanical leverage requiring minimal physical mass or brute force",
      "Situational awareness, threat de-escalation, and confident boundary setting",
      "Full-body cardiovascular conditioning and posture rejuvenation"
    ],
    buttonText: "Join Adults & Self-Defense",
    specs: {
      target: "Adults, College Students & Women",
      ratio: "Personalized Coaching Groups",
      duration: "60 Minutes / Class",
      standard: "Practical Real-World Defense",
      grading: "Optional Rank Examination",
      frequency: "Evening & Weekend Batches"
    }
  },
  vip: {
    badge: "PERSONALIZED 1-ON-1 MASTER MENTORSHIP",
    title: "Private 1-on-1 VIP Mentorship",
    desc: "Exclusive private training slots with Founder Sensei Arunmadhavan E.V.R. Custom-tailored to your exact biometric capabilities, whether preparing for international black belt grading or high-pressure executive fitness.",
    features: [
      "High-speed video kinematic breakdown of kicking and striking arcs",
      "Personalized training volume synchronized with executive schedules",
      "Direct 1-on-1 mentorship under Founder Sensei Arunmadhavan E.V.R.",
      "Accelerated belt progression with rigorous quality verification"
    ],
    buttonText: "Inquire for VIP Mentorship",
    specs: {
      target: "Executives & Elite Medalists",
      ratio: "Strict 1-on-1 Private Floor",
      duration: "Custom Executive Slots",
      standard: "Bespoke Biomechanical Plan",
      grading: "Accelerated Master Dan Track",
      frequency: "By Appointment Only"
    }
  }
};

function initProgramSegments() {
  const buttons = document.querySelectorAll('.segment-btn');
  const badgeEl = document.getElementById('programBadge');
  const titleEl = document.getElementById('programTitle');
  const descEl = document.getElementById('programDesc');
  const featuresEl = document.getElementById('programFeatures');
  const specTarget = document.getElementById('specTarget');
  const specRatio = document.getElementById('specRatio');
  const specDuration = document.getElementById('specDuration');
  const specStandard = document.getElementById('specStandard');
  const specGrading = document.getElementById('specGrading');
  const specFrequency = document.getElementById('specFrequency');
  const panel = document.getElementById('programPanel');

  if (!buttons.length || !titleEl) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;

      // Instant physical response
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const programKey = btn.getAttribute('data-program');
      const data = PROGRAMS_DATA[programKey] || PROGRAMS_DATA.kids;

      // 0ms Hardware-accelerated flow update
      requestAnimationFrame(() => {
        badgeEl.textContent = data.badge;
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;

        if (specTarget && data.specs) {
          specTarget.textContent = data.specs.target;
          specRatio.textContent = data.specs.ratio;
          specDuration.textContent = data.specs.duration;
          specStandard.textContent = data.specs.standard;
          specGrading.textContent = data.specs.grading;
          specFrequency.textContent = data.specs.frequency;
        }

        featuresEl.innerHTML = data.features.map(f => `
          <li>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            <span>${f}</span>
          </li>
        `).join('');

        if (panel) {
          panel.animate([
            { opacity: 0.85, transform: 'translateY(2px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], {
            duration: 180,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
          });
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. AEO & GEO ACCORDION (ANSWER ENGINE AGENT MINING)
   -------------------------------------------------------------------------- */
function initAEOAccordion() {
  const items = document.querySelectorAll('.aeo-item');
  if (!items.length) return;

  items.forEach(item => {
    const questionBtn = item.querySelector('.aeo-question');
    const answer = item.querySelector('.aeo-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all items with native physics
      items.forEach(otherItem => {
        otherItem.classList.remove('open');
        const otherBtn = otherItem.querySelector('.aeo-question');
        const otherAnswer = otherItem.querySelector('.aeo-answer');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherAnswer) otherAnswer.style.maxHeight = '0px';
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. APPLE DYNAMIC ISLAND TOAST HUD
   -------------------------------------------------------------------------- */
function showAppleToast(message, icon = '✓') {
  const toast = document.getElementById('appleToast');
  const messageEl = document.getElementById('toastMessage');
  if (!toast || !messageEl) return;

  messageEl.textContent = message;
  const iconEl = toast.querySelector('.toast-icon');
  if (iconEl) iconEl.textContent = icon;

  toast.classList.add('visible');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

/* --------------------------------------------------------------------------
   5. APPLE NATIVE TRIAL BOOKING MODAL & WHATSAPP INTEGRATION
   -------------------------------------------------------------------------- */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const form = document.getElementById('trialBookingForm');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
    const firstInput = document.getElementById('applicantName');
    if (firstInput) setTimeout(() => firstInput.focus(), 80);
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (window.location.hash === '#trial') {
      history.replaceState(null, null, ' ');
    }
  };

  // Robust Event Delegation for any trial trigger
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.trigger-booking-modal, a[href="#trial"], a[href$="#trial"]');
    if (trigger) {
      e.preventDefault();
      openModal();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close when clicking outside dialog window
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Check initial hash and hash changes
  if (window.location.hash === '#trial') {
    setTimeout(openModal, 100);
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#trial') {
      openModal();
    }
  });

  // Form submission -> Instant structured WhatsApp direct link + Toast feedback
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('applicantName')?.value.trim() || 'Prospective Student';
      const phone = document.getElementById('applicantPhone')?.value.trim() || '';
      const program = document.getElementById('applicantProgram')?.value || 'Kids Karate & Discipline';
      const slot = document.getElementById('applicantSlot')?.value || 'Morning Batch';

      const whatsappText = `🥋 *Trial Class Inscription — Renshin Karate International*\n\n` +
                           `• *Applicant Name:* ${name}\n` +
                           `• *Phone / WhatsApp:* ${phone}\n` +
                           `• *Selected Program:* ${program}\n` +
                           `• *Preferred Batch:* ${slot}\n` +
                           `• *Dojo:* 7th Cross St, Ellaithottam Rd, Peelamedu, Coimbatore\n\n` +
                           `Hello Sensei Arunmadhavan E.V.R., I would like to book my free orientation and trial session. Thank you!`;

      const encoded = encodeURIComponent(whatsappText);
      const whatsappUrl = `https://wa.me/919360325750?text=${encoded}`;

      showAppleToast('Connecting with Sensei Arunmadhavan via WhatsApp...', '🥋');

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      closeModal();
    });
  }
}

/* --------------------------------------------------------------------------
   6. SMOOTH SCROLL WITH PRECISE OFFSET
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId.startsWith('#trial')) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. SCROLL SPY ACTIVE NAV HIGHLIGHT
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   8. QUICK COPY HELPLINE FEEDBACK
   -------------------------------------------------------------------------- */
function initQuickCopy() {
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      navigator.clipboard?.writeText('+919360325750');
      showAppleToast('Helpline +91 93603 25750 copied to clipboard', '📞');
    });
  });
}
