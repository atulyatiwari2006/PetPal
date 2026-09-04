/**
 * ==========================================================================
 * PetPal — Modern Premium Pet-Care Web Application Engine
 * Pure Vanilla JavaScript (Zero External Libraries / Frameworks)
 * Handles LocalStorage CRUD, 3D Tilt, Live Search/Filter, Lightbox,
 * Daily Care Trackers, Audio Synthesis, and Confetti Engine.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. DEFAULT SEED DATA & CONSTANTS
     -------------------------------------------------------------------------- */
  const STORAGE_KEY = 'petpal_app_state_v2';

  const DEFAULT_PETS = [
    {
      id: 1,
      name: 'Bruno',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      gender: 'Male',
      weight: 28,
      dob: '2023-04-12',
      image: 'assets/images/bruno-dog.svg',
      description: 'Friendly, loyal and energetic companion who loves long park strolls, lake swimming, and fetching yellow tennis balls.',
      status: 'Active & Playful 🎾',
      microchip: '#985141002',
      favoriteToy: 'Tennis Ball 🎾'
    },
    {
      id: 2,
      name: 'Luna',
      species: 'Cat',
      breed: 'British Shorthair',
      age: 2,
      gender: 'Female',
      weight: 4.5,
      dob: '2024-02-18',
      image: 'assets/images/luna-cat.svg',
      description: 'Affectionate and serene kitty who loves warm afternoon sunbeams, cozy blankets, and playful feather wand chase sessions.',
      status: 'Purring Softly 🌿',
      microchip: '#874229101',
      favoriteToy: 'Feather Wand 🪶'
    },
    {
      id: 3,
      name: 'Oliver',
      species: 'Dog',
      breed: 'Beagle',
      age: 1,
      gender: 'Male',
      weight: 12,
      dob: '2025-05-10',
      image: 'assets/images/oliver-beagle.svg',
      description: 'Curious scent hound with big floppy ears, cheerful wagging tail, and an unshakeable appetite for tasty dog biscuits.',
      status: 'Exploring Outdoors 🐾',
      microchip: '#741005829',
      favoriteToy: 'Squeaky Bone 🦴'
    },
    {
      id: 4,
      name: 'Bella',
      species: 'Cat',
      breed: 'Persian Cat',
      age: 4,
      gender: 'Female',
      weight: 3.8,
      dob: '2022-09-05',
      image: 'assets/images/bella-cat.svg',
      description: 'Fluffy and graceful white cat who enjoys daily grooming rituals, quiet afternoon naps, and looking majestic on cushions.',
      status: 'Relaxing in Luxury ✨',
      microchip: '#529184022',
      favoriteToy: 'Catnip Mouse 🐭'
    },
    {
      id: 5,
      name: 'Milo',
      species: 'Other',
      breed: 'Holland Lop',
      age: 1.5,
      gender: 'Male',
      weight: 2.1,
      dob: '2025-01-15',
      image: 'assets/images/milo-rabbit.svg',
      description: 'Bouncy Holland Lop bunny who loves fresh garden clover, sweet carrot nibbles, and hopping through obstacle tunnels.',
      status: 'Munching Greens 🥕',
      microchip: '#301847119',
      favoriteToy: 'Willow Ball 🌾'
    }
  ];

  const DEFAULT_GALLERY = [
    {
      id: 1,
      title: 'Sunny Afternoon Walk',
      petName: 'Bruno',
      species: 'Dogs',
      image: 'assets/images/gallery-1.svg',
      caption: 'Bruno exploring the fragrant grass trails in the city park.',
      date: 'Aug 2026'
    },
    {
      id: 2,
      title: 'Cozy Window Nap',
      petName: 'Luna',
      species: 'Cats',
      image: 'assets/images/gallery-2.svg',
      caption: 'Luna soaking up gentle afternoon sunshine on the sill.',
      date: 'Aug 2026'
    },
    {
      id: 3,
      title: 'Fetch Champion',
      petName: 'Oliver',
      species: 'Dogs',
      image: 'assets/images/gallery-3.svg',
      caption: 'Oliver sprinting after the bright red ball across the yard.',
      date: 'Aug 2026'
    },
    {
      id: 4,
      title: 'Garden Snacking',
      petName: 'Milo',
      species: 'Other',
      image: 'assets/images/gallery-4.svg',
      caption: 'Milo happily crunching fresh clover leaves and herbs.',
      date: 'Aug 2026'
    },
    {
      id: 5,
      title: 'Fluffy Elegance',
      petName: 'Bella',
      species: 'Cats',
      image: 'assets/images/gallery-5.svg',
      caption: 'Bella posing after an invigorating brushing and spa session.',
      date: 'Aug 2026'
    },
    {
      id: 6,
      title: 'Playdate Fun',
      petName: 'Bruno & Friends',
      species: 'Dogs',
      image: 'assets/images/gallery-6.svg',
      caption: 'Bruno playing an intense game of tug-of-war with furry pals.',
      date: 'Aug 2026'
    }
  ];

  /* --------------------------------------------------------------------------
     2. STATE MANAGEMENT (LOCAL STORAGE INTEGRATION)
     -------------------------------------------------------------------------- */
  let appState = {
    pets: DEFAULT_PETS,
    gallery: DEFAULT_GALLERY,
    selectedPetId: 1,
    meals: {
      breakfast: { completed: false, portion: 1.0, name: 'Breakfast', time: '7:30 AM' },
      lunch: { completed: false, portion: 1.0, name: 'Lunch', time: '1:00 PM' },
      dinner: { completed: false, portion: 1.5, name: 'Dinner', time: '7:00 PM' }
    },
    grooming: {
      coat: false,
      teeth: false,
      ears: false,
      nails: false
    },
    walking: {
      isActive: false,
      elapsedSeconds: 0,
      timerInterval: null,
      kmToday: 0.0,
      walksToday: 0,
      lastWalk: '—'
    },
    filterState: {
      searchQuery: '',
      species: 'all',
      gender: 'all',
      ageRange: 'all'
    },
    galleryFilter: 'all',
    soundEnabled: true,
    notifications: [
      { id: 1, icon: '🍖', text: "Time for Bruno's lunch! (1:00 PM)", time: 'Just now', unread: true },
      { id: 2, icon: '🦮', text: "Target: 2.5 km walk planned for today", time: '25m ago', unread: true },
      { id: 3, icon: '✨', text: "Streak alive: 5 consecutive daily care days!", time: '2h ago', unread: true }
    ]
  };

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        appState.pets = parsed.pets || DEFAULT_PETS;
        appState.gallery = parsed.gallery || DEFAULT_GALLERY;
        appState.meals = parsed.meals || appState.meals;
        appState.grooming = parsed.grooming || appState.grooming;
        if (parsed.walking) {
          appState.walking.kmToday = parsed.walking.kmToday || 0.0;
          appState.walking.walksToday = parsed.walking.walksToday || 0;
          appState.walking.lastWalk = parsed.walking.lastWalk || '—';
        }
        appState.selectedPetId = parsed.selectedPetId || 1;
        appState.soundEnabled = parsed.soundEnabled !== undefined ? parsed.soundEnabled : true;
      }
    } catch (e) {
      console.warn('Could not load stored PetPal state, using defaults.', e);
    }
  }

  function saveState() {
    try {
      const dataToSave = {
        pets: appState.pets,
        gallery: appState.gallery,
        meals: appState.meals,
        grooming: appState.grooming,
        walking: {
          kmToday: appState.walking.kmToday,
          walksToday: appState.walking.walksToday,
          lastWalk: appState.walking.lastWalk
        },
        selectedPetId: appState.selectedPetId,
        soundEnabled: appState.soundEnabled
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn('Could not save PetPal state to localStorage.', e);
    }
  }

  loadState();

  /* --------------------------------------------------------------------------
     3. AUDIO SYNTHESIZER (WEB AUDIO API CHIMES)
     -------------------------------------------------------------------------- */
  class SoundFX {
    constructor() {
      this.ctx = null;
    }
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    }
    playTone(freq, duration = 0.15, type = 'sine', gainVal = 0.08) {
      if (!appState.soundEnabled) return;
      try {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {}
    }
    click() { this.playTone(520, 0.08, 'sine', 0.04); }
    check() {
      this.playTone(650, 0.1, 'sine', 0.06);
      setTimeout(() => this.playTone(880, 0.15, 'sine', 0.06), 70);
    }
    pop() { this.playTone(420, 0.12, 'triangle', 0.05); }
    success() {
      this.playTone(523.25, 0.12, 'sine', 0.08); // C5
      setTimeout(() => this.playTone(659.25, 0.12, 'sine', 0.08), 100); // E5
      setTimeout(() => this.playTone(783.99, 0.22, 'sine', 0.09), 200); // G5
      setTimeout(() => this.playTone(1046.50, 0.35, 'sine', 0.1), 300); // C6
    }
    deleteSound() {
      this.playTone(400, 0.1, 'sawtooth', 0.05);
      setTimeout(() => this.playTone(280, 0.18, 'sawtooth', 0.05), 90);
    }
  }

  const sound = new SoundFX();

  /* --------------------------------------------------------------------------
     4. TOAST NOTIFICATION SYSTEM
     -------------------------------------------------------------------------- */
  function showToast(title, message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '🐾';
    if (type === 'success') icon = '✅';
    if (type === 'danger') icon = '🗑️';
    if (type === 'info') icon = 'ℹ️';

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-body">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;

    container.appendChild(toast);
    sound.pop();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 350);
    }, 3800);
  }

  /* --------------------------------------------------------------------------
     5. 3D TILT ENGINE (SMOOTH MOUSE MOVE DEPTH)
     -------------------------------------------------------------------------- */
  function init3DTilt() {
    const cards = document.querySelectorAll('.card-3d, .pet-card, .stat-card-3d');
    cards.forEach(card => {
      card.removeEventListener('mousemove', handleCardMouseMove);
      card.removeEventListener('mouseleave', handleCardMouseLeave);
      card.addEventListener('mousemove', handleCardMouseMove);
      card.addEventListener('mouseleave', handleCardMouseLeave);
    });
  }

  function handleCardMouseMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;  // Max 6 deg

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width * 100).toFixed(1)}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height * 100).toFixed(1)}%`);
  }

  function handleCardMouseLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  }

  /* --------------------------------------------------------------------------
     6. PET PROFILES CRUD & RENDERING
     -------------------------------------------------------------------------- */
  let petToDeleteId = null;

  function renderPets() {
    const petsGrid = document.getElementById('petsGrid');
    const dashboardRecentGrid = document.getElementById('dashboardRecentPetsGrid');

    const filteredPets = appState.pets.filter(pet => {
      // Search Query
      const q = appState.filterState.searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        pet.name.toLowerCase().includes(q) ||
        pet.breed.toLowerCase().includes(q) ||
        pet.species.toLowerCase().includes(q);

      // Species Filter
      const speciesFilter = appState.filterState.species.toLowerCase();
      let matchesSpecies = true;
      if (speciesFilter === 'dogs') matchesSpecies = pet.species.toLowerCase() === 'dog';
      else if (speciesFilter === 'cats') matchesSpecies = pet.species.toLowerCase() === 'cat';
      else if (speciesFilter === 'other') matchesSpecies = !['dog', 'cat'].includes(pet.species.toLowerCase());

      // Gender Filter
      const genderFilter = appState.filterState.gender.toLowerCase();
      let matchesGender = true;
      if (genderFilter !== 'all') matchesGender = pet.gender.toLowerCase() === genderFilter;

      // Age Range Filter
      const ageFilter = appState.filterState.ageRange;
      let matchesAge = true;
      if (ageFilter === 'young') matchesAge = pet.age < 1;
      else if (ageFilter === 'adult') matchesAge = pet.age >= 1 && pet.age <= 7;
      else if (ageFilter === 'senior') matchesAge = pet.age > 7;

      return matchesSearch && matchesSpecies && matchesGender && matchesAge;
    });

    // Render in main Pets Grid (if present)
    if (petsGrid) {
      if (filteredPets.length === 0) {
        petsGrid.innerHTML = `
          <div class="empty-pets-state">
            <div class="empty-icon">🔍</div>
            <h3>No pets found matching your criteria</h3>
            <p>Try clearing your search or switching filters to see all furry pals!</p>
            <button class="btn btn-gold" id="clearFiltersBtn">Clear All Filters</button>
          </div>
        `;
        const clearBtn = document.getElementById('clearFiltersBtn');
        if (clearBtn) {
          clearBtn.addEventListener('click', () => {
            resetFilters();
          });
        }
      } else {
        petsGrid.innerHTML = filteredPets.map(pet => createPetCardHTML(pet)).join('');
        bindPetCardEvents(petsGrid);
      }
    }

    // Render in Dashboard Recent Pets Grid (if present)
    if (dashboardRecentGrid) {
      const topPets = appState.pets.slice(0, 3);
      dashboardRecentGrid.innerHTML = topPets.map(pet => createPetCardHTML(pet)).join('');
      bindPetCardEvents(dashboardRecentGrid);
    }

    // Update Dashboard Metrics
    renderDashboardStats();
    init3DTilt();
  }

  function createPetCardHTML(pet) {
    const speciesEmoji = pet.species.toLowerCase() === 'dog' ? '🐶' : (pet.species.toLowerCase() === 'cat' ? '🐱' : '🐰');
    return `
      <div class="pet-card card-3d" data-pet-id="${pet.id}">
        <div class="pet-card-image-wrap">
          <img src="${pet.image}" alt="${pet.name}" class="pet-card-img" onerror="this.src='assets/images/bruno-dog.svg'">
          <div class="species-badge-overlay">
            <span>${speciesEmoji}</span>
            <span>${pet.species}</span>
          </div>
        </div>
        <div class="pet-card-body">
          <div class="pet-header-row">
            <h3 class="pet-title">${pet.name}</h3>
            <span class="meta-pill">${pet.gender === 'Male' ? '♂ Male' : '♀ Female'}</span>
          </div>
          <span class="pet-breed-label">${pet.breed}</span>
          
          <div class="pet-meta-pills">
            <span class="meta-pill">🎂 ${pet.age} ${pet.age === 1 ? 'year' : 'years'}</span>
            <span class="meta-pill">⚖️ ${pet.weight} kg</span>
            <span class="meta-pill">${pet.status || 'Happy & Well ✨'}</span>
          </div>

          <p class="pet-description">${pet.description || 'A cherished PetPal family member.'}</p>

          <div class="pet-card-actions">
            <button class="pet-action-btn btn-view" data-action="view" data-id="${pet.id}">
              <span>👁️</span> View
            </button>
            <button class="pet-action-btn btn-edit" data-action="edit" data-id="${pet.id}">
              <span>✏️</span> Edit
            </button>
            <button class="pet-action-btn btn-delete" data-action="delete" data-id="${pet.id}">
              <span>🗑️</span> Delete
            </button>
          </div>
        </div>
        <div class="card-glare"></div>
      </div>
    `;
  }

  function bindPetCardEvents(container) {
    container.querySelectorAll('.pet-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const petId = parseInt(btn.dataset.id, 10);
        
        if (action === 'view') {
          openViewPetModal(petId);
        } else if (action === 'edit') {
          openEditPetModal(petId);
        } else if (action === 'delete') {
          openDeletePetModal(petId);
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. ADD PET HANDLER
     -------------------------------------------------------------------------- */
  function initAddPetForm() {
    const addPetForm = document.getElementById('addPetForm');
    if (!addPetForm) return;

    // Preset Avatar selector buttons
    const avatarBtns = addPetForm.querySelectorAll('.avatar-preset-btn');
    const imageInput = document.getElementById('petImageInput');
    const previewImg = document.getElementById('addPetPreviewImg');

    avatarBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        avatarBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const imgSrc = btn.dataset.src;
        if (imageInput) imageInput.value = imgSrc;
        if (previewImg) previewImg.src = imgSrc;
        sound.click();
      });
    });

    if (imageInput) {
      imageInput.addEventListener('input', () => {
        if (previewImg && imageInput.value.trim()) {
          previewImg.src = imageInput.value.trim();
        }
      });
    }

    // Form Submission
    addPetForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('petName');
      const speciesSelect = document.getElementById('petSpecies');
      const breedInput = document.getElementById('petBreed');
      const ageInput = document.getElementById('petAge');
      const genderInput = document.querySelector('input[name="petGender"]:checked');
      const weightInput = document.getElementById('petWeight');
      const dobInput = document.getElementById('petDob');
      const aboutInput = document.getElementById('petAbout');

      // Validation
      const name = nameInput ? nameInput.value.trim() : '';
      const species = speciesSelect ? speciesSelect.value : 'Dog';
      const breed = breedInput ? breedInput.value.trim() : '';
      const age = ageInput ? parseFloat(ageInput.value) : 1;
      const gender = genderInput ? genderInput.value : 'Male';
      const weight = weightInput && weightInput.value ? parseFloat(weightInput.value) : 10;
      const dob = dobInput && dobInput.value ? dobInput.value : '2025-01-01';
      const description = aboutInput ? aboutInput.value.trim() : 'Loving and playful pet.';
      
      let image = imageInput && imageInput.value.trim() ? imageInput.value.trim() : 'assets/images/bruno-dog.svg';
      if (!imageInput || !imageInput.value.trim()) {
        if (species.toLowerCase() === 'dog') image = 'assets/images/bruno-dog.svg';
        else if (species.toLowerCase() === 'cat') image = 'assets/images/luna-cat.svg';
        else image = 'assets/images/milo-rabbit.svg';
      }

      if (!name) {
        showToast('Validation Error', 'Please enter a name for your pet!', 'danger');
        if (nameInput) nameInput.focus();
        return;
      }
      if (!breed) {
        showToast('Validation Error', 'Please specify your pet’s breed!', 'danger');
        if (breedInput) breedInput.focus();
        return;
      }

      const newPet = {
        id: Date.now(),
        name,
        species,
        breed,
        age: isNaN(age) ? 1 : age,
        gender,
        weight: isNaN(weight) ? 5 : weight,
        dob,
        image,
        description,
        status: 'Newly Joined 🌟',
        microchip: `#${Math.floor(100000000 + Math.random() * 900000000)}`,
        favoriteToy: 'Squeaky Toy 🎾'
      };

      appState.pets.unshift(newPet);
      saveState();
      sound.success();
      showToast('Pet Registered! 🎉', `${newPet.name} has been added to your PetPal family!`, 'success');

      // Reset form
      addPetForm.reset();
      if (previewImg) previewImg.src = 'assets/images/bruno-dog.svg';

      // Update UI
      renderPets();

      // If user is on standalone add-pet.html or SPA, navigate to pets
      const currentHash = window.location.hash;
      if (currentHash === '#addpet') {
        navigateToTab('mypets');
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. VIEW PET MODAL
     -------------------------------------------------------------------------- */
  function openViewPetModal(petId) {
    const pet = appState.pets.find(p => p.id === petId);
    if (!pet) return;

    const modal = document.getElementById('viewPetModal');
    if (!modal) return;

    const img = document.getElementById('viewPetImg');
    const name = document.getElementById('viewPetName');
    const breed = document.getElementById('viewPetBreed');
    const age = document.getElementById('viewPetAge');
    const gender = document.getElementById('viewPetGender');
    const weight = document.getElementById('viewPetWeight');
    const dob = document.getElementById('viewPetDob');
    const chip = document.getElementById('viewPetChip');
    const toy = document.getElementById('viewPetToy');
    const desc = document.getElementById('viewPetDesc');

    if (img) img.src = pet.image;
    if (name) name.textContent = pet.name;
    if (breed) breed.textContent = `${pet.species} • ${pet.breed}`;
    if (age) age.textContent = `${pet.age} ${pet.age === 1 ? 'year old' : 'years old'}`;
    if (gender) gender.textContent = pet.gender;
    if (weight) weight.textContent = `${pet.weight} kg`;
    if (dob) dob.textContent = pet.dob || '—';
    if (chip) chip.textContent = pet.microchip || '#985141002';
    if (toy) toy.textContent = pet.favoriteToy || 'Tennis Ball 🎾';
    if (desc) desc.textContent = pet.description;

    modal.classList.add('show');
    sound.pop();
  }

  /* --------------------------------------------------------------------------
     9. EDIT PET MODAL
     -------------------------------------------------------------------------- */
  function openEditPetModal(petId) {
    const pet = appState.pets.find(p => p.id === petId);
    if (!pet) return;

    const modal = document.getElementById('editPetModal');
    if (!modal) return;

    const idInput = document.getElementById('editPetId');
    const nameInput = document.getElementById('editPetName');
    const speciesSelect = document.getElementById('editPetSpecies');
    const breedInput = document.getElementById('editPetBreed');
    const ageInput = document.getElementById('editPetAge');
    const genderSelect = document.getElementById('editPetGender');
    const weightInput = document.getElementById('editPetWeight');
    const descInput = document.getElementById('editPetDesc');
    const previewImg = document.getElementById('editPetPreviewImg');

    if (idInput) idInput.value = pet.id;
    if (nameInput) nameInput.value = pet.name;
    if (speciesSelect) speciesSelect.value = pet.species;
    if (breedInput) breedInput.value = pet.breed;
    if (ageInput) ageInput.value = pet.age;
    if (genderSelect) genderSelect.value = pet.gender;
    if (weightInput) weightInput.value = pet.weight;
    if (descInput) descInput.value = pet.description;
    if (previewImg) previewImg.src = pet.image;

    modal.classList.add('show');
    sound.pop();
  }

  function initEditPetForm() {
    const editForm = document.getElementById('editPetForm');
    if (!editForm) return;

    editForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const id = parseInt(document.getElementById('editPetId').value, 10);
      const name = document.getElementById('editPetName').value.trim();
      const species = document.getElementById('editPetSpecies').value;
      const breed = document.getElementById('editPetBreed').value.trim();
      const age = parseFloat(document.getElementById('editPetAge').value);
      const gender = document.getElementById('editPetGender').value;
      const weight = parseFloat(document.getElementById('editPetWeight').value);
      const description = document.getElementById('editPetDesc').value.trim();

      if (!name || !breed) {
        showToast('Validation Error', 'Name and breed cannot be empty!', 'danger');
        return;
      }

      const petIndex = appState.pets.findIndex(p => p.id === id);
      if (petIndex !== -1) {
        appState.pets[petIndex] = {
          ...appState.pets[petIndex],
          name,
          species,
          breed,
          age: isNaN(age) ? 1 : age,
          gender,
          weight: isNaN(weight) ? 5 : weight,
          description
        };

        saveState();
        closeModal('editPetModal');
        sound.success();
        showToast('Changes Saved! ✨', `${name}'s profile has been updated.`, 'success');
        renderPets();

        // Animate card highlight
        const updatedCard = document.querySelector(`.pet-card[data-pet-id="${id}"]`);
        if (updatedCard) {
          updatedCard.style.transition = 'all 0.5s ease';
          updatedCard.style.boxShadow = '0 0 0 4px var(--accent-gold)';
          setTimeout(() => {
            updatedCard.style.boxShadow = '';
          }, 1500);
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     10. DELETE PET MODAL
     -------------------------------------------------------------------------- */
  function openDeletePetModal(petId) {
    const pet = appState.pets.find(p => p.id === petId);
    if (!pet) return;

    petToDeleteId = petId;
    const modal = document.getElementById('deletePetModal');
    const deletePetNameSpan = document.getElementById('deletePetNameSpan');

    if (deletePetNameSpan) deletePetNameSpan.textContent = pet.name;
    if (modal) {
      modal.classList.add('show');
      sound.pop();
    }
  }

  function initDeletePetModal() {
    const confirmDeleteBtn = document.getElementById('confirmDeletePetBtn');
    if (!confirmDeleteBtn) return;

    confirmDeleteBtn.addEventListener('click', () => {
      if (!petToDeleteId) return;

      const targetPet = appState.pets.find(p => p.id === petToDeleteId);
      const petName = targetPet ? targetPet.name : 'Pet';

      // Animate card removal in DOM
      const card = document.querySelector(`.pet-card[data-pet-id="${petToDeleteId}"]`);
      if (card) {
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8) translateY(20px)';
      }

      setTimeout(() => {
        appState.pets = appState.pets.filter(p => p.id !== petToDeleteId);
        petToDeleteId = null;
        saveState();
        closeModal('deletePetModal');
        sound.deleteSound();
        showToast('Pet Removed', `${petName} has been deleted.`, 'danger');
        renderPets();
      }, 350);
    });
  }

  /* --------------------------------------------------------------------------
     11. SEARCH & MULTI-FILTER CONTROLS
     -------------------------------------------------------------------------- */
  function initSearchAndFilters() {
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        appState.filterState.searchQuery = e.target.value;
        renderPets();
      });
    });

    // Species chips
    const speciesChips = document.querySelectorAll('.species-chip');
    speciesChips.forEach(chip => {
      chip.addEventListener('click', () => {
        speciesChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        appState.filterState.species = chip.dataset.species || 'all';
        sound.click();
        renderPets();
      });
    });

    // Gender filter select
    const genderSelect = document.getElementById('genderFilterSelect');
    if (genderSelect) {
      genderSelect.addEventListener('change', (e) => {
        appState.filterState.gender = e.target.value;
        sound.click();
        renderPets();
      });
    }

    // Age range filter select
    const ageSelect = document.getElementById('ageFilterSelect');
    if (ageSelect) {
      ageSelect.addEventListener('change', (e) => {
        appState.filterState.ageRange = e.target.value;
        sound.click();
        renderPets();
      });
    }
  }

  function resetFilters() {
    appState.filterState = {
      searchQuery: '',
      species: 'all',
      gender: 'all',
      ageRange: 'all'
    };

    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(i => i.value = '');

    const speciesChips = document.querySelectorAll('.species-chip');
    speciesChips.forEach(c => {
      if (c.dataset.species === 'all') c.classList.add('active');
      else c.classList.remove('active');
    });

    const genderSelect = document.getElementById('genderFilterSelect');
    if (genderSelect) genderSelect.value = 'all';

    const ageSelect = document.getElementById('ageFilterSelect');
    if (ageSelect) ageSelect.value = 'all';

    sound.click();
    renderPets();
  }

  /* --------------------------------------------------------------------------
     12. GALLERY & LIGHTBOX
     -------------------------------------------------------------------------- */
  let currentLightboxIndex = 0;
  let activeLightboxGallery = [];

  function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    activeLightboxGallery = appState.gallery.filter(item => {
      if (appState.galleryFilter === 'all') return true;
      return item.species.toLowerCase() === appState.galleryFilter.toLowerCase();
    });

    if (activeLightboxGallery.length === 0) {
      galleryGrid.innerHTML = `
        <div class="empty-pets-state" style="grid-column: 1/-1;">
          <div class="empty-icon">🖼️</div>
          <h3>No photos in this category yet</h3>
          <p>Switch to "All Photos" to see your adorable pets in action!</p>
        </div>
      `;
      return;
    }

    galleryGrid.innerHTML = activeLightboxGallery.map((item, idx) => `
      <div class="gallery-item" data-index="${idx}">
        <img src="${item.image}" alt="${item.title}" class="gallery-img">
        <div class="gallery-overlay">
          <span class="gallery-tag">${item.species}</span>
          <h4 class="gallery-title">${item.title}</h4>
          <p class="gallery-caption">${item.caption}</p>
        </div>
      </div>
    `).join('');

    galleryGrid.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.index, 10);
        openLightbox(idx);
      });
    });
  }

  function initGalleryFilters() {
    const filterTabs = document.querySelectorAll('.gallery-filter-tab');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        appState.galleryFilter = tab.dataset.filter || 'all';
        sound.click();
        renderGallery();
      });
    });
  }

  function openLightbox(index) {
    if (!activeLightboxGallery || activeLightboxGallery.length === 0) return;
    currentLightboxIndex = index;
    updateLightboxContent();

    const modal = document.getElementById('lightboxModal');
    if (modal) {
      modal.classList.add('show');
      sound.pop();
    }
  }

  function updateLightboxContent() {
    const item = activeLightboxGallery[currentLightboxIndex];
    if (!item) return;

    const img = document.getElementById('lightboxImg');
    const title = document.getElementById('lightboxTitle');
    const caption = document.getElementById('lightboxCaption');
    const tag = document.getElementById('lightboxTag');

    if (img) img.src = item.image;
    if (title) title.textContent = item.title;
    if (caption) caption.textContent = `${item.caption} • ${item.date}`;
    if (tag) tag.textContent = `${item.species} • ${item.petName}`;
  }

  function initLightboxEvents() {
    const modal = document.getElementById('lightboxModal');
    const prevBtn = document.getElementById('lightboxPrevBtn');
    const nextBtn = document.getElementById('lightboxNextBtn');
    const closeBtn = document.getElementById('lightboxCloseBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex - 1 + activeLightboxGallery.length) % activeLightboxGallery.length;
        updateLightboxContent();
        sound.click();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex + 1) % activeLightboxGallery.length;
        updateLightboxContent();
        sound.click();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal('lightboxModal'));
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal('lightboxModal');
      });
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (modal && modal.classList.contains('show')) {
        if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
        if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
        if (e.key === 'Escape') closeModal('lightboxModal');
      }
    });
  }

  /* --------------------------------------------------------------------------
     13. DASHBOARD METRICS & DAILY CARE TRACKERS
     -------------------------------------------------------------------------- */
  function renderDashboardStats() {
    // Total Pets
    const statTotalPets = document.getElementById('statTotalPets');
    if (statTotalPets) statTotalPets.textContent = appState.pets.length;

    // Total Care Activities Completed
    let completedActivities = 0;
    Object.values(appState.meals).forEach(m => { if (m.completed) completedActivities++; });
    Object.values(appState.grooming).forEach(val => { if (val) completedActivities++; });
    if (appState.walking.walksToday > 0) completedActivities++;

    const statActivities = document.getElementById('statActivities');
    if (statActivities) statActivities.textContent = completedActivities;

    // Gallery count
    const statGallery = document.getElementById('statGalleryCount');
    if (statGallery) statGallery.textContent = appState.gallery.length;

    // Paw trail calculations (Total goals = 8: 3 meals + 4 grooming + 1 walk)
    const totalGoals = 8;
    const pct = Math.round((completedActivities / totalGoals) * 100);

    const trailPercentage = document.getElementById('trailPercentage');
    const trailTrackFill = document.getElementById('trailTrackFill');
    const trailStatusText = document.getElementById('trailStatusText');
    const bottomProgressPct = document.getElementById('bottomProgressPct');
    const bottomProgressFill = document.getElementById('bottomProgressFill');

    if (trailPercentage) trailPercentage.textContent = `${pct}%`;
    if (trailTrackFill) trailTrackFill.style.width = `${pct}%`;
    if (bottomProgressPct) bottomProgressPct.textContent = `${pct}%`;
    if (bottomProgressFill) bottomProgressFill.style.width = `${pct}%`;

    if (trailStatusText) {
      trailStatusText.textContent = `${completedActivities} of ${totalGoals} daily goals completed. ${pct === 100 ? 'All tasks complete! 🏆' : 'Keep going! 🐾'}`;
    }

    // Update milestones
    const milestones = document.querySelectorAll('.milestone-node');
    milestones.forEach((node, idx) => {
      const stepPct = idx * 25;
      if (pct >= stepPct) node.classList.add('active');
      else node.classList.remove('active');
    });

    // Check for 100% Celebration
    if (pct === 100 && !appState.hasCelebrated) {
      appState.hasCelebrated = true;
      triggerCelebration();
    }
  }

  function initDailyCare() {
    // Feeding checkboxes
    const checkBreakfast = document.getElementById('checkBreakfast');
    const checkLunch = document.getElementById('checkLunch');
    const checkDinner = document.getElementById('checkDinner');

    if (checkBreakfast) {
      checkBreakfast.checked = appState.meals.breakfast.completed;
      checkBreakfast.addEventListener('change', (e) => {
        appState.meals.breakfast.completed = e.target.checked;
        saveState();
        sound.check();
        renderDashboardStats();
      });
    }

    if (checkLunch) {
      checkLunch.checked = appState.meals.lunch.completed;
      checkLunch.addEventListener('change', (e) => {
        appState.meals.lunch.completed = e.target.checked;
        saveState();
        sound.check();
        renderDashboardStats();
      });
    }

    if (checkDinner) {
      checkDinner.checked = appState.meals.dinner.completed;
      checkDinner.addEventListener('change', (e) => {
        appState.meals.dinner.completed = e.target.checked;
        saveState();
        sound.check();
        renderDashboardStats();
      });
    }

    // Portion steppers
    document.querySelectorAll('.step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const meal = btn.dataset.meal;
        const action = btn.dataset.action;
        if (!appState.meals[meal]) return;

        let portion = appState.meals[meal].portion;
        if (action === 'inc') portion = Math.min(4.0, portion + 0.5);
        if (action === 'dec') portion = Math.max(0.5, portion - 0.5);

        appState.meals[meal].portion = portion;
        const disp = document.getElementById(`disp${meal.charAt(0).toUpperCase() + meal.slice(1)}`);
        if (disp) disp.textContent = portion.toFixed(1);

        saveState();
        sound.click();
      });
    });

    // Grooming checkboxes
    ['coat', 'teeth', 'ears', 'nails'].forEach(item => {
      const checkbox = document.getElementById(`check${item.charAt(0).toUpperCase() + item.slice(1)}`);
      if (checkbox) {
        checkbox.checked = appState.grooming[item];
        checkbox.addEventListener('change', (e) => {
          appState.grooming[item] = e.target.checked;
          saveState();
          sound.check();
          renderDashboardStats();
        });
      }
    });

    // Live Walk Timer
    const walkToggleBtn = document.getElementById('walkToggleBtn');
    const walkTimerDisplay = document.getElementById('walkTimerDisplay');
    const recordingDot = document.getElementById('recordingDot');
    const walkBtnLabel = document.getElementById('walkBtnLabel');
    const kmTodayDisplay = document.getElementById('kmTodayDisplay');
    const walksCountDisplay = document.getElementById('walksCountDisplay');
    const lastWalkValue = document.getElementById('lastWalkValue');

    if (kmTodayDisplay) kmTodayDisplay.textContent = appState.walking.kmToday.toFixed(1);
    if (walksCountDisplay) walksCountDisplay.textContent = appState.walking.walksToday;
    if (lastWalkValue) lastWalkValue.textContent = appState.walking.lastWalk;

    if (walkToggleBtn) {
      walkToggleBtn.addEventListener('click', () => {
        if (!appState.walking.isActive) {
          // Start Walk
          appState.walking.isActive = true;
          if (walkBtnLabel) walkBtnLabel.textContent = 'End Walk';
          if (recordingDot) recordingDot.classList.add('pulsing');
          sound.click();

          appState.walking.timerInterval = setInterval(() => {
            appState.walking.elapsedSeconds++;
            const s = appState.walking.elapsedSeconds;
            const hrs = String(Math.floor(s / 3600)).padStart(2, '0');
            const mins = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
            const secs = String(s % 60).padStart(2, '0');
            if (walkTimerDisplay) walkTimerDisplay.textContent = `${hrs}:${mins}:${secs}`;
          }, 1000);
        } else {
          // End Walk
          appState.walking.isActive = false;
          clearInterval(appState.walking.timerInterval);
          if (recordingDot) recordingDot.classList.remove('pulsing');
          if (walkBtnLabel) walkBtnLabel.textContent = 'Start Walk';

          // Log walk
          const addedKm = Math.max(0.4, Number((appState.walking.elapsedSeconds * 0.0012).toFixed(1)));
          appState.walking.kmToday += addedKm;
          appState.walking.walksToday += 1;
          appState.walking.lastWalk = `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (${addedKm} km)`;
          appState.walking.elapsedSeconds = 0;

          if (walkTimerDisplay) walkTimerDisplay.textContent = '00:00:00';
          if (kmTodayDisplay) kmTodayDisplay.textContent = appState.walking.kmToday.toFixed(1);
          if (walksCountDisplay) walksCountDisplay.textContent = appState.walking.walksToday;
          if (lastWalkValue) lastWalkValue.textContent = appState.walking.lastWalk;

          saveState();
          sound.success();
          showToast('Walk Completed! 🦮', `Great job! You logged ${addedKm} km today.`, 'success');
          renderDashboardStats();
        }
      });
    }

    // Hero Action Buttons
    const markAllDoneBtn = document.getElementById('markAllDoneBtn');
    if (markAllDoneBtn) {
      markAllDoneBtn.addEventListener('click', () => {
        Object.keys(appState.meals).forEach(k => appState.meals[k].completed = true);
        Object.keys(appState.grooming).forEach(k => appState.grooming[k] = true);
        if (appState.walking.walksToday === 0) {
          appState.walking.walksToday = 1;
          appState.walking.kmToday = 2.4;
          appState.walking.lastWalk = 'Today, 8:00 AM (2.4 km)';
        }

        saveState();
        sound.success();
        showToast('All Tasks Completed! 🌟', "Bruno's day is 100% fulfilled!", 'success');

        // Check DOM elements
        ['checkBreakfast', 'checkLunch', 'checkDinner', 'checkCoat', 'checkTeeth', 'checkEars', 'checkNails'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.checked = true;
        });

        renderDashboardStats();
      });
    }

    const resetTodayBtn = document.getElementById('resetTodayBtn');
    if (resetTodayBtn) {
      resetTodayBtn.addEventListener('click', () => {
        Object.keys(appState.meals).forEach(k => appState.meals[k].completed = false);
        Object.keys(appState.grooming).forEach(k => appState.grooming[k] = false);
        appState.hasCelebrated = false;

        saveState();
        sound.click();
        showToast('Daily Reset', 'Today’s care tracker has been reset.', 'info');

        ['checkBreakfast', 'checkLunch', 'checkDinner', 'checkCoat', 'checkTeeth', 'checkEars', 'checkNails'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.checked = false;
        });

        renderDashboardStats();
      });
    }
  }

  /* --------------------------------------------------------------------------
     14. CONFETTI & CELEBRATION
     -------------------------------------------------------------------------- */
  function triggerCelebration() {
    const overlay = document.getElementById('celebrationOverlay');
    if (!overlay) return;

    overlay.classList.add('show');
    sound.success();

    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiParticles = [];
    const colors = ['#E5A93C', '#2E6549', '#F3BA2F', '#48BB78', '#ED64A6', '#3182CE', '#FAF7F2'];

    for (let i = 0; i < 120; i++) {
      confettiParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 4 + 3,
        speedX: (Math.random() - 0.5) * 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8
      });
    }

    let animId;
    function renderConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiParticles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(renderConfetti);
    }
    renderConfetti();

    const closeBtn = document.getElementById('closeCelebrationBtn');
    if (closeBtn) {
      closeBtn.onclick = () => {
        cancelAnimationFrame(animId);
        overlay.classList.remove('show');
      };
    }
  }

  /* --------------------------------------------------------------------------
     15. MODAL SYSTEM HELPERS
     -------------------------------------------------------------------------- */
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      sound.click();
    }
  }

  function initModals() {
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetModalId = btn.dataset.closeModal;
        closeModal(targetModalId);
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('show');
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.show, .lightbox-modal.show').forEach(m => {
          m.classList.remove('show');
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     16. NAVIGATION (SPA TAB SWITCHER & MOBILE DRAWER)
     -------------------------------------------------------------------------- */
  function navigateToTab(tabName) {
    // Check if this page has SPA views
    const viewSections = document.querySelectorAll('.spa-view-section');
    if (viewSections.length > 0) {
      viewSections.forEach(sec => {
        if (sec.dataset.view === tabName) {
          sec.style.display = 'block';
          sec.style.animation = 'fadeIn 0.3s ease';
        } else {
          sec.style.display = 'none';
        }
      });
    }

    // Update Top Tab buttons
    document.querySelectorAll('.top-tabs .tab-pill').forEach(pill => {
      if (pill.dataset.tab === tabName || pill.dataset.nav === tabName) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Update Sidebar items
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      if (item.dataset.nav === tabName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update URL hash
    window.location.hash = tabName;
  }

  function initNavigation() {
    // Sidebar nav links
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const nav = item.dataset.nav;
        const hasSpaSection = document.querySelector(`.spa-view-section[data-view="${nav}"]`);
        
        if (hasSpaSection) {
          e.preventDefault();
          navigateToTab(nav);
          sound.click();
          closeDrawer();
        }
      });
    });

    // Top Tabs
    document.querySelectorAll('.top-tabs .tab-pill').forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab || tab.dataset.nav;
        const hasSpaSection = document.querySelector(`.spa-view-section[data-view="${target}"]`);
        if (hasSpaSection) {
          navigateToTab(target);
          sound.click();
        }
      });
    });

    // Mobile Hamburger & Drawer
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const sidebar = document.getElementById('sidebar');
    const drawerOverlay = document.getElementById('drawerOverlay');

    function openDrawer() {
      if (sidebar) sidebar.classList.add('open');
      if (drawerOverlay) drawerOverlay.classList.add('active');
      sound.pop();
    }

    function closeDrawer() {
      if (sidebar) sidebar.classList.remove('open');
      if (drawerOverlay) drawerOverlay.classList.remove('active');
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // Initial hash routing
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const hasSpaSection = document.querySelector(`.spa-view-section[data-view="${hash}"]`);
      if (hasSpaSection) {
        navigateToTab(hash);
      }
    }

    // Notifications toggle
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    const notifBadge = document.getElementById('notifBadge');

    if (notificationBtn && notificationDropdown) {
      notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.toggle('show');
        sound.click();
      });

      document.addEventListener('click', (e) => {
        if (!notificationDropdown.contains(e.target) && e.target !== notificationBtn) {
          notificationDropdown.classList.remove('show');
        }
      });
    }

    if (markAllReadBtn) {
      markAllReadBtn.addEventListener('click', () => {
        const notifs = document.querySelectorAll('.notif-item');
        notifs.forEach(n => n.classList.remove('unread'));
        if (notifBadge) notifBadge.style.display = 'none';
        sound.click();
      });
    }

    // Sound toggle
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const soundIcon = document.getElementById('soundIcon');
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        appState.soundEnabled = !appState.soundEnabled;
        if (soundIcon) soundIcon.textContent = appState.soundEnabled ? '🔔' : '🔕';
        saveState();
        showToast('Sound Setting', appState.soundEnabled ? 'Sound effects enabled 🔔' : 'Sound effects muted 🔕', 'info');
      });
    }

    // Mini profile widget click in sidebar
    const viewProfileBtn = document.getElementById('viewProfileBtn');
    if (viewProfileBtn) {
      viewProfileBtn.addEventListener('click', () => {
        openViewPetModal(1); // Default to Bruno
      });
    }
  }

  /* --------------------------------------------------------------------------
     17. INITIALIZATION CALLS
     -------------------------------------------------------------------------- */
  renderPets();
  renderGallery();
  initAddPetForm();
  initEditPetForm();
  initDeletePetModal();
  initSearchAndFilters();
  initGalleryFilters();
  initLightboxEvents();
  initDailyCare();
  initModals();
  initNavigation();
  init3DTilt();

  console.log('🐾 PetPal application initialized successfully with vanilla JavaScript & 3D interactions!');
});
