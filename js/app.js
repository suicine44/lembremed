// ==========================================================================
// BOTTOM NAVIGATION ROUTING & DYNAMIC RENDERING (GLOBAL CONTAINER)
// ==========================================================================

const globalNavContainer = document.getElementById('global-nav-container');

if (globalNavContainer) {
  globalNavContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.nav-tab');
    if (!tab) return;
    
    const targetNav = tab.getAttribute('data-nav');
    
    // Caregiver routing
    if (targetNav === 'pacientes') {
      showScreen('screen-7');
    } else if (targetNav === 'agenda') {
      prepareScreen8ForPatient(activePatientId);
      showScreen('screen-8');
    } else if (targetNav === 'alertas') {
      showScreen('screen-9');
    } else if (targetNav === 'config') {
      showScreen('screen-10');
    }
    // Patient routing
    else if (targetNav === 'patient-home') {
      showScreen('screen-patient-home');
    } else if (targetNav === 'patient-agenda') {
      showScreen('screen-6');
    } else if (targetNav === 'patient-meds') {
      showScreen('screen-patient-meds');
    } else if (targetNav === 'patient-alerts') {
      showScreen('screen-patient-alerts');
    } else if (targetNav === 'patient-settings') {
      showScreen('screen-patient-settings');
    }
  });
}

function updateActiveTabsForScreen(screenId) {
  if (!globalNavContainer || !window.Components) return;
  
  // Determine active tab and role based on screenId
  let activeTab = '';
  let role = appState.user.role; // Default to current role
  
  // CAREGIVER SCREENS (require bottom nav)
  if (screenId === 'screen-7' || screenId === 'screen-11') {
    activeTab = 'pacientes';
    role = 'caregiver';
  } else if (screenId === 'screen-8') {
    activeTab = 'agenda';
    role = 'caregiver';
  } else if (screenId === 'screen-9') {
    activeTab = 'alertas';
    role = 'caregiver';
  } else if (screenId === 'screen-10') {
    activeTab = 'config';
    role = 'caregiver';
  }
  
  // PATIENT SCREENS (require bottom nav)
  else if (screenId === 'screen-patient-home') {
    activeTab = 'patient-home';
    role = 'patient';
  } else if (screenId === 'screen-6') {
    activeTab = 'patient-agenda';
    role = 'patient';
  } else if (screenId === 'screen-patient-meds') {
    activeTab = 'patient-meds';
    role = 'patient';
  } else if (screenId === 'screen-patient-alerts') {
    activeTab = 'patient-alerts';
    role = 'patient';
  } else if (screenId === 'screen-patient-settings') {
    activeTab = 'patient-settings';
    role = 'patient';
  }
  
  // If the screen corresponds to a nav tab, render the navigation
  if (activeTab) {
    globalNavContainer.innerHTML = Components.getBottomNav(role, activeTab);
    globalNavContainer.style.display = 'block';
    
    // Update app content padding to account for fixed global nav
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
       // Apply bottom padding dynamically so scroll is not cut off by the fixed nav
       const content = activeScreen.querySelector('.screen-content');
       if (content) {
          content.style.paddingBottom = '80px';
       }
    }
  } else {
    // Screens like onboarding, welcome, add-patient don't have bottom navs
    globalNavContainer.innerHTML = '';
    globalNavContainer.style.display = 'none';
  }
}

// 8. Reset Simulator Function
const btnResetSimulator = document.getElementById('btn-reset-simulator');
if (btnResetSimulator) {
  btnResetSimulator.addEventListener('click', () => {
  // Reset forms
  document.getElementById('reg-name').value = '';
  document.getElementById('reg-gender').value = '';
  document.getElementById('reg-phone').value = '';
  
  const searchInputReset = document.getElementById('search-med-input');
  if (searchInputReset) searchInputReset.value = '';
  const dropdownResultsReset = document.querySelector('.dropdown-results');
  if (dropdownResultsReset) dropdownResultsReset.style.display = 'none';
  
  // Reset search and times states
  addedTimes = [];
  const searchPhase = document.getElementById('med-search-phase');
  const timesPhase = document.getElementById('med-times-phase');
  if (searchPhase && timesPhase) {
    timesPhase.style.display = 'none';
    searchPhase.style.display = 'flex';
  }
  
  // Reset selected roles
  roleCards.forEach(c => c.classList.remove('selected'));
  document.getElementById('role-patient').classList.add('selected');
  document.getElementById('btn-flow-3').removeAttribute('data-next-flow');
  
  // Reset medicine search selections
  searchDropdownItems.forEach(i => i.classList.remove('selected'));
  searchDropdownItems[0].classList.add('selected');
  
  // Reset active switcher role back to "all" (Geral)
  setSidebarSwitcherRole('all', true);

  // Reset med checklist items to Figma default states
  medRows.forEach(row => {
    const medId = row.getAttribute('data-med-id');
    const statusText = row.querySelector('.med-status-indicator');
    if (medId === 'losartana') {
      row.classList.add('taken');
      if (statusText) {
        statusText.textContent = 'Tomado';
        statusText.className = 'med-status-indicator taken';
      }
    } else {
      row.classList.remove('taken');
      if (statusText) {
        statusText.textContent = medId === 'insulina' ? 'Pendente' : 'Agendado';
        statusText.className = 'med-status-indicator pending';
      }
    }
  });

  // Reset patient data cleanly
  activePatientId = null;
  
  // Clear sync data from localStorage
  localStorage.removeItem('lembremed_patient_code');
  localStorage.removeItem('lembremed_sync_patients');

  // Hide patient code card
  const codeCard = document.getElementById('patient-sync-code-card');
  if (codeCard) codeCard.style.display = 'none';
  
  initAgendaData();
  selectedDate = '2026-05-21';
  renderAgenda();
  renderPatientHomeChecklist();
  renderPatientMedsList();
  
  // Disable high contrast and reset font size on phone container
  const phoneContainer = document.getElementById('phone-container');
  if (phoneContainer) phoneContainer.classList.remove('high-contrast');
  localStorage.removeItem('lembremed_patient_contrast');
  localStorage.removeItem('lembremed_caregiver_contrast');
  localStorage.removeItem('lembremed_patient_fontsize');
  localStorage.removeItem('lembremed_caregiver_fontsize');
  document.body.classList.remove('font-small', 'font-large', 'font-xlarge');
  // Reset patient toggle pill visually
  if (contrastToggle) {
    const pill = contrastToggle.querySelector('div[style*="position: relative"]');
    if (pill) {
      const thumb = pill.querySelector('div');
      pill.style.backgroundColor = 'var(--color-border)';
      if (thumb) thumb.style.left = '2px';
    }
  }
  // Reset caregiver toggle pill visually
  const cgPill = document.getElementById('cg-contrast-toggle-pill');
  const cgThumb = document.getElementById('cg-contrast-toggle-thumb');
  if (cgPill) cgPill.style.backgroundColor = 'var(--color-border)';
  if (cgThumb) cgThumb.style.left = '2px';
  // Reset font-size status displays
  const fsStatus = document.getElementById('font-size-status');
  if (fsStatus) fsStatus.textContent = 'Médio';
  const cgFsStatus = document.getElementById('cg-font-size-status');
  if (cgFsStatus) cgFsStatus.textContent = 'Médio';

  // Route back to Screen 1
  showScreen('screen-1');
});
}

// 9. Real-Time Status Bar Clock Ticker
function updatePhoneClock() {
  const timeDisplay = document.getElementById('phone-time');
  if (!timeDisplay) return;
  
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  
  // Zero padding
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  
  timeDisplay.textContent = `${hours}:${minutes}`;
  
  // Periodically check for active reminder on minute change
  const activeScreen = document.querySelector('.app-screen.active');
  if (activeScreen && activeScreen.id === 'screen-patient-home') {
    triggerSimulatedMedReminder();
  }
}

updatePhoneClock();
setInterval(updatePhoneClock, 60000); // Update every minute

// Initialize Upgraded Screen 6 Agenda logic
initAgendaData();
setupCalendarClickListeners();
renderAgenda();

// ==========================================================================
// NEW FEATURES IMPLEMENTATION
// ==========================================================================

// 1. ADD PATIENT ROUTING AND LOGIC
const btnAddPatientNav = document.getElementById('btn-add-patient-nav');
const btnAddPatientBack = document.getElementById('btn-add-patient-back');
const btnSavePatient = document.getElementById('btn-save-patient');

if (btnAddPatientNav) {
  btnAddPatientNav.addEventListener('click', () => showScreen('screen-add-patient'));
}
if (btnAddPatientBack) {
  btnAddPatientBack.addEventListener('click', () => showScreen('screen-7'));
}
if (btnSavePatient) {
  btnSavePatient.addEventListener('click', () => {
    const nameInput = document.getElementById('add-patient-name');
    const errorMsg = document.getElementById('add-patient-name-error');
    const nameVal = nameInput.value.trim();

    if (!nameVal) {
      nameInput.classList.add('error-state');
      errorMsg.style.display = 'block';
      return;
    }
    nameInput.classList.remove('error-state');
    errorMsg.style.display = 'none';

    const ageInput = document.getElementById('add-patient-age');
    const ageErrorMsg = document.getElementById('add-patient-age-error');
    const ageRawVal = ageInput.value.trim();
    
    let ageValText = 'Idade não informada';
    if (ageRawVal) {
      const cleanAgeStr = ageRawVal.replace(/\D/g, '');
      const parsedAge = cleanAgeStr ? parseInt(cleanAgeStr, 10) : NaN;
      
      if (isNaN(parsedAge) || parsedAge < 0 || parsedAge > 130) {
        ageInput.classList.add('error-state');
        if (ageErrorMsg) ageErrorMsg.style.display = 'block';
        ageInput.focus();
        return;
      }
      ageValText = `${parsedAge} anos`;
    }
    
    if (ageErrorMsg) ageErrorMsg.style.display = 'none';
    ageInput.classList.remove('error-state');

    const mockId = 'patient_' + Date.now();
    
    appState.patients[mockId] = {
      avatar: nameVal.substring(0, 2).toUpperCase(),
      name: nameVal,
      age: ageValText,
      status: 'Em Dia',
      statusClass: 'taken',
      adherence: 100,
      meds: [],
      alerts: [],
      notes: []
    };
    
    // Limpa os campos
    nameInput.value = '';
    document.getElementById('add-patient-age').value = '';
    document.getElementById('add-patient-phone').value = '';

    renderCaregiverDashboard();
    showScreen('screen-7');
  });
}

// 2. SETTINGS BUTTONS (CAREGIVER & PATIENT)
const cgAccountBtn = document.getElementById('btn-cg-account');
const cgNotifBtn = document.getElementById('btn-cg-notifications');
const cgAboutBtn = document.getElementById('btn-cg-about');
const cgLogoutBtn = document.getElementById('btn-cg-logout');

const patAboutBtn = document.getElementById('btn-patient-about');
const patLogoutBtn = document.getElementById('btn-patient-logout');
const aboutModal = document.getElementById('about-modal');
const btnAboutClose = document.getElementById('btn-about-close');

if (cgNotifBtn) {
  cgNotifBtn.addEventListener('click', () => {
    const statusText = document.getElementById('cg-notif-status');
    if (statusText.textContent === 'Ativadas') {
      statusText.textContent = 'Desativadas';
      statusText.style.color = 'var(--color-text-muted)';
    } else {
      statusText.textContent = 'Ativadas';
      statusText.style.color = 'var(--color-success-text)';
    }
  });
}

const openAbout = () => { if(aboutModal) aboutModal.classList.add('active'); };
const closeAbout = () => { if(aboutModal) aboutModal.classList.remove('active'); };

if (cgAboutBtn) cgAboutBtn.addEventListener('click', openAbout);
if (patAboutBtn) patAboutBtn.addEventListener('click', openAbout);
if (btnAboutClose) btnAboutClose.addEventListener('click', closeAbout);

const performLogout = () => {
  // Reset to screen-1
  const btnResetSimulator = document.getElementById('btn-reset-simulator');
  if (btnResetSimulator) btnResetSimulator.click(); 
  else showScreen('screen-1');
};

if (cgLogoutBtn) cgLogoutBtn.addEventListener('click', performLogout);
if (patLogoutBtn) patLogoutBtn.addEventListener('click', performLogout);


// 3. ONBOARDING CAROUSEL (Handled dynamically inside initOnboardingCarousel)


// 4. PATIENT ALERTS DYNAMIC RENDERING
// [AVISO DE ALTERAÇÃO - UX & FEEDBACK EM TEMPO REAL]
// - Previous state: Static useless success alert display and alerts only for pending medications.
// - What changed: Removed the static useless success alert. Added full support for displaying dynamic alerts from 'patient.alerts' list (like caregiver link alert).
// - What was added: Touch 'x' dismiss button next to each dynamic alert to allow patient to discard unwanted notifications instantly.
function renderPatientAlerts() {
  const feed = document.getElementById('patient-alerts-feed');
  if (!feed) return;
  
  const pk = activePatientId || Object.keys(appState.patients).find(k => k !== '__sync');
  const patient = pk ? (appState.patients[pk] || patientsProfileData[pk]) : null;
  feed.innerHTML = '';
  
  if (!patient) {
    feed.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 32px 16px; color: var(--color-text-light);">
        <p>Você não tem alertas pendentes.</p>
      </div>
    `;
    return;
  }

  let hasAlerts = false;
  
  // 1. Pending Medications Alerts (Critical/System)
  const pendingMeds = patient.meds.filter(m => m.status === 'pendente' || m.status === 'atrasado');
  if (pendingMeds.length > 0) {
    hasAlerts = true;
    const item = document.createElement('div');
    item.className = 'alert-item danger';
    item.style.cursor = 'default';
    item.style.transform = 'none';
    item.style.boxShadow = 'none';
    item.innerHTML = `
      <div class="alert-item-content">
        <svg class="alert-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <octagon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <div class="alert-item-text">
          <strong>Atenção:</strong> Você tem ${pendingMeds.length} medicamento(s) pendente(s) hoje.
        </div>
      </div>
    `;
    feed.appendChild(item);
  }

  // 2. Dynamic Alerts (Dismissable Notifications with 'x' button)
  if (patient.alerts && patient.alerts.length > 0) {
    patient.alerts.forEach(alert => {
      hasAlerts = true;
      const item = document.createElement('div');
      item.className = `alert-item ${alert.class || 'info'}`;
      item.style.position = 'relative';
      item.style.display = 'flex';
      item.style.justifyContent = 'space-between';
      item.style.alignItems = 'center';
      
      let iconHtml = `
        <svg class="alert-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      `;
      if (alert.class === 'success') {
        iconHtml = `
          <svg class="alert-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        `;
      }

      item.innerHTML = `
        <div class="alert-item-content" style="flex: 1; display: flex; align-items: center;">
          ${iconHtml}
          <div class="alert-item-text" style="font-size: 13px; line-height: 1.4; color: var(--color-text-dark);">
            <strong>${alert.title}:</strong> ${alert.text}
            <span style="display: block; font-size: 10px; opacity: 0.5; margin-top: 3px;">${alert.time || ''}</span>
          </div>
        </div>
        <button class="dismiss-patient-alert-btn" data-id="${alert.id}" aria-label="Remover notificação" style="background: none; border: none; color: var(--color-text-muted); cursor: pointer; font-size: 18px; font-weight: 700; padding: 4px 8px; line-height: 1; transition: color 0.2s ease;">&times;</button>
      `;
      
      const btnDismiss = item.querySelector('.dismiss-patient-alert-btn');
      if (btnDismiss) {
        btnDismiss.addEventListener('click', (e) => {
          e.stopPropagation();
          patient.alerts = patient.alerts.filter(a => a.id !== alert.id);
          renderPatientAlerts();
        });
      }
      
      feed.appendChild(item);
    });
  }
  
  if (!hasAlerts) {
    feed.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 32px 16px; color: var(--color-text-light);">
        <p>Você não tem alertas no momento.</p>
      </div>
    `;
  }
}

let onboardingInterval = null;
function initOnboardingCarousel(role) {
  const carousel = document.getElementById('onboarding-carousel');
  const dotsContainer = document.getElementById('onboarding-dots');
  const btnFlow3 = document.getElementById('btn-flow-3');
  if (!carousel || !dotsContainer) return;
  
  if (btnFlow3) {
    btnFlow3.textContent = "Próximo";
  }
  
  // Clear any previous interval
  if (onboardingInterval) {
    clearInterval(onboardingInterval);
    onboardingInterval = null;
  }
  
  const slidesData = onboardingSlides[role] || onboardingSlides.patient;
  
  // Generate slides HTML
  let slidesHtml = '';
  slidesData.forEach((slide, idx) => {
    const activeClass = idx === 0 ? 'active' : '';
    const styleBg = slide.bg.startsWith('var') ? `background-color: ${slide.bg};` : `background: ${slide.bg};`;
    slidesHtml += `
      <div class="onboarding-slide ${activeClass}" data-slide="${idx}">
        <div class="heart-badge-circle" style="${styleBg}">
          ${slide.icon}
        </div>
        <p class="onboarding-text">${slide.text}</p>
      </div>
    `;
  });
  carousel.innerHTML = slidesHtml;
  
  // Generate dots HTML
  let dotsHtml = '';
  slidesData.forEach((_, idx) => {
    const activeClass = idx === 0 ? 'active' : '';
    dotsHtml += `<span class="dot ${activeClass}" data-index="${idx}" role="button" aria-label="Ver slide ${idx + 1}" style="cursor: pointer;"></span>`;
  });
  dotsContainer.innerHTML = dotsHtml;
  
  let currentSlide = 0;
  const slides = carousel.querySelectorAll('.onboarding-slide');
  const dots = dotsContainer.querySelectorAll('.dot');
  
  function goToSlide(idx) {
    if (idx < 0 || idx >= slides.length) return;
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = idx;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    if (btnFlow3) {
      if (currentSlide === slides.length - 1) {
        btnFlow3.textContent = "Começar";
      } else {
        btnFlow3.textContent = "Próximo";
      }
    }
  }
  
  // Setup dot click listeners
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'));
      goToSlide(idx);
      resetInterval();
    });
  });
  
  // Setup clean click listener for the flow button using live DOM elements
  if (btnFlow3) {
    const newBtn = btnFlow3.cloneNode(true);
    btnFlow3.parentNode.replaceChild(newBtn, btnFlow3);
    
    newBtn.addEventListener('click', () => {
      if (currentSlide < slides.length - 1) {
        goToSlide(currentSlide + 1);
        resetInterval();
      } else {
        if (role === 'caregiver') {
          showScreen('screen-7');
        } else {
          showScreen('screen-patient-home');
        }
      }
    });
  }
  
  function resetInterval() {
    if (onboardingInterval) clearInterval(onboardingInterval);
    onboardingInterval = setInterval(() => {
      let next = (currentSlide + 1) % slides.length;
      goToSlide(next);
    }, 4000);
  }
  
  resetInterval();
}

// Intercept showScreen to trigger logic
const originalShowScreen = window.showScreen || showScreen;
window.showScreen = showScreen = function(id) {
  originalShowScreen(id);
  if (id === 'screen-patient-alerts') {
    renderPatientAlerts();
  }
  if (id === 'screen-patient-home') {
    triggerSimulatedMedReminder();
  }
  if (id === 'screen-3') {
    initOnboardingCarousel(appState.user.role || 'patient');
  }
};


// 5. MEDICATION REMINDER TOAST
let lastTriggeredTime = '';
function triggerSimulatedMedReminder() {
  const toast = document.getElementById('med-reminder-toast');
  if (!toast) return;
  
  // Only show if there is a pending med
  const pk = activePatientId || Object.keys(appState.patients).find(k => k !== '__sync');
  const patient = pk ? appState.patients[pk] : null;
  if (!patient || !patient.meds) return;
  
  // Pega a hora atual do sistema em formato HH:MM
  const now = new Date();
  let hh = now.getHours();
  let mm = now.getMinutes();
  hh = hh < 10 ? '0' + hh : '' + hh;
  mm = mm < 10 ? '0' + mm : '' + mm;
  const currentTimeStr = `${hh}:${mm}`;
  
  // Avoid firing again in the same minute
  if (lastTriggeredTime === currentTimeStr) return;
  
  // Find a registered medication whose time matches the current time and hasn't been taken
  const matchingMed = patient.meds.find(m => m.time === currentTimeStr && m.status !== 'tomado');
  if (matchingMed) {
    document.getElementById('med-reminder-body').textContent = `${matchingMed.name} — ${matchingMed.dose}`;
    
    setTimeout(() => {
      toast.classList.add('active');
      if (typeof announceToScreenReader === 'function') {
          announceToScreenReader("Aviso: Hora do medicamento " + matchingMed.name);
      }
    }, 500);
    
    lastTriggeredTime = currentTimeStr;
  }
}

const btnDismissReminder = document.getElementById('btn-dismiss-reminder');
if (btnDismissReminder) {
  btnDismissReminder.addEventListener('click', () => {
    document.getElementById('med-reminder-toast').classList.remove('active');
  });
}


// 6. BOTTOM SHEET - EDIT/REMOVE MEDICATION
const medBottomSheet = document.getElementById('med-bottom-sheet');
const btnCloseBottomSheet = document.getElementById('btn-close-bottom-sheet');
const btnRemoveMed = document.getElementById('btn-remove-med');
let selectedMedForEdit = null;

function attachMedClickListener() {
  const patientMedsContainer = document.getElementById('patient-meds-list-container');
  if (!patientMedsContainer) return;
  
  // Override render function
  const originalRenderPatientMedsList = window.renderPatientMedsList || renderPatientMedsList;
  window.renderPatientMedsList = renderPatientMedsList = function() {
    originalRenderPatientMedsList(); 
    
    const cards = patientMedsContainer.querySelectorAll('.profile-med-item');
    cards.forEach((card, index) => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const pk = activePatientId || Object.keys(appState.patients).find(k => k !== '__sync');
        const patient = pk ? patientsProfileData[pk] : null;
        if (patient && patient.meds[index]) {
          selectedMedForEdit = { index, med: patient.meds[index] };
          document.getElementById('bottom-sheet-med-name').textContent = patient.meds[index].name;
          document.getElementById('bottom-sheet-med-dose').textContent = `${patient.meds[index].dose} • ${patient.meds[index].time}`;
          if (medBottomSheet) medBottomSheet.classList.add('active');
        }
      });
    });
  };
  renderPatientMedsList();
}

if (btnCloseBottomSheet) {
  btnCloseBottomSheet.addEventListener('click', () => {
    if (medBottomSheet) medBottomSheet.classList.remove('active');
  });
}

if (btnRemoveMed) {
  btnRemoveMed.addEventListener('click', () => {
    if (selectedMedForEdit !== null) {
      const pk = activePatientId || Object.keys(appState.patients).find(k => k !== '__sync');
      const patient = pk ? patientsProfileData[pk] : null;
      if (!patient) return;
      patient.meds.splice(selectedMedForEdit.index, 1);
      
      if (pk && appState.patients[pk] && appState.patients[pk].meds) {
        appState.patients[pk].meds.splice(selectedMedForEdit.index, 1);
      }
      
      const todayDate = selectedDate || '2026-05-21';
      if (agendaData[todayDate] && agendaData[todayDate].meds) {
        const nameToRem = selectedMedForEdit.med.name;
        agendaData[todayDate].meds = agendaData[todayDate].meds.filter(m => m.name !== nameToRem);
      }

      renderPatientMedsList();
      renderPatientHomeChecklist();
      renderAgenda();
      if (medBottomSheet) medBottomSheet.classList.remove('active');
      
      if (typeof announceToScreenReader === 'function') {
          announceToScreenReader("Medicamento removido com sucesso.");
      }
    }
  });
}

// 7. CAREGIVER ALERTS - SWIPE TO DISMISS
const caregiverAlerts = document.querySelectorAll('#screen-9 .alert-item');
caregiverAlerts.forEach(alert => {
  const chevronDiv = alert.querySelector('.alert-item-chevron');
  if (chevronDiv) {
    chevronDiv.innerHTML = `
      <button class="dismiss-alert-btn" aria-label="Descartar alerta" style="background:none; border:none; color: var(--color-text-light); cursor:pointer; padding:4px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;
    
    const btn = chevronDiv.querySelector('.dismiss-alert-btn');
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      alert.style.opacity = '0';
      alert.style.transform = 'translateX(20px)';
      setTimeout(() => alert.style.display = 'none', 300);
    });
  }
});

setTimeout(attachMedClickListener, 500);

// ==========================================================================
// TASK 4: REAL-TIME CROSS-TAB SYNC VIA LOCALSTORAGE
// ==========================================================================

const SYNC_KEY = 'lembremed_sync_patients';

// Publish current patient data to localStorage so other tabs can read it
function publishPatientSyncData() {
  const patientKey = activePatientId || Object.keys(appState.patients).find(k => k !== '__sync');
  if (!patientKey || !appState.patients[patientKey]) return;
  const patient = appState.patients[patientKey];
  if (!patient.lmCode) return;
  
  let syncData = {};
  try {
    syncData = JSON.parse(localStorage.getItem(SYNC_KEY) || '{}');
  } catch (e) {
    console.warn('Recovered from malformed sync data in localStorage');
  }
  syncData[patient.lmCode] = {
    lmCode: patient.lmCode,
    name: patient.name,
    avatar: patient.avatar,
    age: patient.age,
    meds: patient.meds,
    alerts: patient.alerts,
    notes: patient.notes,
    adherence: patient.adherence,
    status: patient.status,
    statusClass: patient.statusClass,
    updatedAt: Date.now()
  };
  localStorage.setItem(SYNC_KEY, JSON.stringify(syncData));
}

// [AVISO DE ALTERAÇÃO - SINCRONIZAÇÃO E MÁSCARAS DE VÍNCULO]
// - Previous state: The 'storage' event on patient side only showed the empty emergency card, and the code input used a simple regex requiring manual dash typing.
// - What changed: Now the caregiver saves their name in localStorage and the patient reads this name in real time, updating the card and adding a warm link notification to the alerts feed.
// - What was added: A smart typing mask on the code input, formatting entries like '4526' or 'lm4526' automatically to 'LM-4526'.
window.addEventListener('storage', (e) => {
  if (e.key === SYNC_KEY && e.newValue && appState.user.role === 'caregiver') {
    const syncData = JSON.parse(e.newValue || '{}');
    let updated = false;
    
    Object.entries(syncData).forEach(([lmCode, patientData]) => {
      const matchKey = Object.keys(appState.patients).find(k => appState.patients[k].lmCode === lmCode);
      if (!matchKey) return;
      
      appState.patients[matchKey] = { ...appState.patients[matchKey], ...patientData };
      patientsProfileData[matchKey] = appState.patients[matchKey];
      updated = true;
    });
    
    if (updated) {
      renderCaregiverDashboard();
      const screen11 = document.getElementById('screen-11');
      if (screen11 && screen11.classList.contains('active') && activePatientId) {
        renderPatientProfile(activePatientId);
      }
    }
  }

  if (appState.user.role === 'patient') {
    const patientKey = Object.keys(appState.patients).find(k => k !== '__sync');
    if (patientKey) {
      const patientLmCode = appState.patients[patientKey].lmCode;
      if (patientLmCode && e.key === 'lembremed_linked_' + patientLmCode) {
        const caregiverContactCard = document.getElementById('caregiver-contact-card');
        if (caregiverContactCard) {
          caregiverContactCard.style.display = 'block';
        }
        
        const cgName = e.newValue || 'Contato de Emergência';
        const cgNameEl = document.getElementById('caregiver-contact-name');
        if (cgNameEl) {
          cgNameEl.textContent = cgName;
        }
        
        appState.patients[patientKey].caregiverName = cgName;
        
        // Add real-time link notification in the feed
        if (!appState.patients[patientKey].alerts) {
          appState.patients[patientKey].alerts = [];
        }
        
        const alertExists = appState.patients[patientKey].alerts.some(a => a.type === 'caregiver_linked');
        if (!alertExists) {
          appState.patients[patientKey].alerts.push({
            id: 'cg_link_' + Date.now(),
            type: 'caregiver_linked',
            title: 'Novo Cuidador Vinculado',
            text: `O cuidador <strong>${cgName}</strong> vinculou você ao perfil dele. Agora vocês compartilham o histórico em tempo real para um cuidado mais seguro!`,
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            class: 'success'
          });
          
          const activeScreen = document.querySelector('.app-screen.active');
          if (activeScreen && activeScreen.id === 'screen-patient-alerts') {
            renderPatientAlerts();
          }
        }
      }
    }
  }
});

// Link patient by LM code (Caregiver side)
const btnLinkByCode = document.getElementById('btn-link-patient-by-code');
const linkCodeInput = document.getElementById('link-patient-code');
const linkErrorEl = document.getElementById('link-patient-error');
const linkSuccessEl = document.getElementById('link-patient-success');

if (btnLinkByCode && linkCodeInput) {
  // Smart Mask for code input (format LM-XXXX)
  linkCodeInput.addEventListener('input', () => {
    let val = linkCodeInput.value.toUpperCase();
    let digits = val.replace(/[^A-Z0-9]/g, '');
    if (digits.startsWith('LM')) {
      digits = digits.substring(2);
    }
    digits = digits.replace(/[^0-9]/g, '').substring(0, 4);
    
    if (digits.length > 0) {
      linkCodeInput.value = 'LM-' + digits;
    } else {
      linkCodeInput.value = '';
    }
  });
  
  btnLinkByCode.addEventListener('click', () => {
    const code = linkCodeInput.value.trim().toUpperCase();
    if (linkErrorEl) linkErrorEl.style.display = 'none';
    if (linkSuccessEl) linkSuccessEl.style.display = 'none';
    
    if (!code.match(/^LM-\d{4}$/)) {
      if (linkErrorEl) {
        linkErrorEl.textContent = 'Formato inválido. Use: LM-1234';
        linkErrorEl.style.display = 'block';
      }
      return;
    }
    
    let syncData = {};
    try {
      syncData = JSON.parse(localStorage.getItem(SYNC_KEY) || '{}');
    } catch (e) {
      console.warn('Recovered from malformed sync data in localStorage');
    }
    const patientData = syncData[code];
    
    if (!patientData) {
      if (linkErrorEl) {
        linkErrorEl.textContent = 'Código não encontrado. O paciente precisa estar conectado no outro dispositivo/aba.';
        linkErrorEl.style.display = 'block';
      }
      return;
    }
    
    const alreadyLinked = Object.values(appState.patients).some(p => p.lmCode === code);
    if (alreadyLinked) {
      if (linkSuccessEl) {
        linkSuccessEl.textContent = `${patientData.name} já está vinculado!`;
        linkSuccessEl.style.display = 'block';
      }
      return;
    }
    
    const newKey = 'linked_' + code.replace('LM-', '');
    appState.patients[newKey] = {
      ...patientData,
      lmCode: code
    };
    patientsProfileData = appState.patients;
    
    // Notifica o paciente salvando o nome real do cuidador no localStorage em vez de apenas um timestamp
    localStorage.setItem('lembremed_linked_' + code, appState.user.name || 'Cuidador');
    
    if (linkCodeInput) linkCodeInput.value = '';
    if (linkSuccessEl) {
      linkSuccessEl.textContent = `✓ ${patientData.name} vinculado com sucesso em tempo real!`;
      linkSuccessEl.style.display = 'block';
    }
    
    renderCaregiverDashboard();
    
    // Navigate to caregiver dashboard after a short delay
    setTimeout(() => showScreen('screen-7'), 1500);
  });
}

// Expose publishPatientSyncData globally for use in other handlers
window.publishPatientSyncData = publishPatientSyncData;

// Default initialization in Pitch Mode (Moved here to avoid Temporal Dead Zone errors)
clearPitchData();

// ==========================================================================
// DEMO PITCH MODE SHORTCUTS (SECRETS)
// ==========================================================================
document.addEventListener('keydown', (e) => {
  // Block execution if focus is in an input (prevents firing while typing)
  const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName);
  if (isInput) return;

  // ALT + R: Total Reset (Uses the existing global reset button)
  if (e.altKey && e.key.toLowerCase() === 'r') {
    e.preventDefault();
    const resetBtn = document.getElementById('btn-reset-simulator');
    if (resetBtn) resetBtn.click();
    console.log('Atalho ativado: Reset Total');
  }

  // ALT + C: Clear Role (Volta para a tela de escolha de perfil e limpa a role atual)
  if (e.altKey && e.key.toLowerCase() === 'c') {
    e.preventDefault();
    appState.user.role = ''; 
    showScreen('screen-2');
    console.log('Atalho ativado: Limpeza de Perfil');
  }

  // ALT + M: Mock Data (Fills magical registration and advances)
  if (e.altKey && e.key.toLowerCase() === 'm') {
    e.preventDefault();
    const nameInput = document.getElementById('reg-name');
    const genderSelect = document.getElementById('reg-gender');
    const ageInput = document.getElementById('reg-age');
    const btnFlow1 = document.getElementById('btn-flow-1');

    if (nameInput) nameInput.value = 'Dona Maria da Silva';
    if (genderSelect) genderSelect.value = 'feminino';
    if (ageInput) ageInput.value = '72';
    
    if (btnFlow1) {
      // Clear error states, if any, before advancing
      nameInput.classList.remove('error-state');
      ageInput.classList.remove('error-state');
      const nameErr = document.getElementById('name-error-msg');
      const ageErr = document.getElementById('age-error-msg');
      if (nameErr) nameErr.classList.add('d-none');
      if (ageErr) ageErr.classList.add('d-none');
      
      btnFlow1.click();
    }
    console.log('Atalho ativado: Mock de Cadastro');
  }
});
