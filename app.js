/**
 * RENSHIN KARATE INTERNATIONAL — 100% APPLE-NATIVE INTERACTIVE RUNTIME
 * Cupertino Grade Interactivity, Micro-animations, and Real-time Status
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveStatus();
  initProgramSegments();
  initAEOAccordion();
  initBookingModal();
  initSmoothScroll();
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
   2. APPLE SEGMENTED CONTROLLER (PROGRAMS)
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
    imgSrc: "assets/sensei_arunmadhavan_ceremony_clean.jpg",
    imgAlt: "Kids Karate & Discipline belt award ceremony with Sensei Arunmadhavan E.V.R."
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
    imgSrc: "assets/kct_stage_kata_clean.jpg",
    imgAlt: "WKF Kumite & Kata martial demonstration at KCT Yugam stage"
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
    imgSrc: "assets/dojo_tatami_clean.jpg",
    imgAlt: "Impact-absorbent tatami flooring and training gear at Renshin Karate School"
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
    imgSrc: "assets/hero_master_ceremony.jpg",
    imgAlt: "Master Arunmadhavan E.V.R. in personal ceremony presentation"
  }
};

function initProgramSegments() {
  const buttons = document.querySelectorAll('.segment-btn');
  const badgeEl = document.getElementById('programBadge');
  const titleEl = document.getElementById('programTitle');
  const descEl = document.getElementById('programDesc');
  const featuresEl = document.getElementById('programFeatures');
  const mediaImg = document.getElementById('programMediaImg');

  if (!buttons.length || !titleEl) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button states
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const programKey = btn.getAttribute('data-program');
      const data = PROGRAMS_DATA[programKey] || PROGRAMS_DATA.kids;

      // Animate transition smoothly
      const panel = document.getElementById('programPanel');
      if (panel) {
        panel.style.opacity = '0.75';
        panel.style.transform = 'scale(0.995)';
        setTimeout(() => {
          badgeEl.textContent = data.badge;
          titleEl.textContent = data.title;
          descEl.textContent = data.desc;
          mediaImg.src = data.imgSrc;
          mediaImg.alt = data.imgAlt;

          featuresEl.innerHTML = data.features.map(f => `
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              <span>${f}</span>
            </li>
          `).join('');

          panel.style.opacity = '1';
          panel.style.transform = 'scale(1)';
        }, 150);
      }
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

      // Close all items
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
   4. APPLE NATIVE TRIAL BOOKING MODAL & WHATSAPP INTEGRATION
   -------------------------------------------------------------------------- */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const triggerBtns = document.querySelectorAll('.trigger-booking-modal');
  const closeBtn = document.getElementById('closeModalBtn');
  const form = document.getElementById('trialBookingForm');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  triggerBtns.forEach(btn => btn.addEventListener('click', openModal));
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

  // Form submission -> Instant structured WhatsApp direct link
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

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      closeModal();
    });
  }
}

/* --------------------------------------------------------------------------
   5. SMOOTH SCROLL FOR IN-PAGE ANCHORS
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId.startsWith('#trial')) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 64;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
