const dishes = [
  {
    "id": "mushroom-garden",
    "titleTop": "Mushroom Garden",
    "titleBottom": "Plate",
    "image": "assets/mushroom-garden-plate.png",
    "rating": "4.8",
    "chef": "Chef Special",
    "description": "Savory mushrooms, soft bites, and fresh green garnish with a calm plated finish.",
    "tags": [
      "Signature plate",
      "Fresh garnish",
      "Chef favourite"
    ],
    "style": "Modern",
    "course": "Main",
    "texture": "Tender",
    "serving": "Hot"
  },
  {
    "id": "chicken-pasta",
    "titleTop": "Chicken Pasta",
    "titleBottom": "Bowl",
    "image": "assets/chicken-pasta-bowl.png",
    "rating": "4.7",
    "chef": "Chef Classic",
    "description": "Creamy pasta with seasoned bites, mushrooms, and a warm comfort-food feel.",
    "tags": [
      "Pasta bowl",
      "Creamy",
      "Popular choice"
    ],
    "style": "Classic",
    "course": "Pasta",
    "texture": "Creamy",
    "serving": "Hot"
  },
  {
    "id": "sweet-potato",
    "titleTop": "Sweet Potato",
    "titleBottom": "Spirals",
    "image": "assets/sweet-potato-spirals.png",
    "rating": "4.5",
    "chef": "Fresh Prep",
    "description": "Fresh-cut sweet potato spirals with bright color and a clean ready-to-cook presentation.",
    "tags": [
      "Fresh prep",
      "Bright colour",
      "Ready to cook"
    ],
    "style": "Fresh",
    "course": "Prep",
    "texture": "Crisp",
    "serving": "Cold"
  },
  {
    "id": "royal-biryani",
    "titleTop": "Royal Biryani",
    "titleBottom": "Bowl",
    "image": "assets/royal-biryani-bowl.png",
    "rating": "4.9",
    "chef": "Chef House",
    "description": "Fragrant rice, warm spices, and roasted chicken served in a rich family-style bowl.",
    "tags": [
      "House special",
      "Fragrant rice",
      "Rich spices"
    ],
    "style": "Rich",
    "course": "Rice",
    "texture": "Fluffy",
    "serving": "Hot"
  },
  {
    "id": "shrimp-noodles",
    "titleTop": "Shrimp Noodles",
    "titleBottom": "Bowl",
    "image": "assets/shrimp-noodles-bowl.png",
    "rating": "4.8",
    "chef": "Chef Wok",
    "description": "Wok-style noodles with shrimp, vegetables, and a glossy savory finish.",
    "tags": [
      "Wok toss",
      "Seafood",
      "Best seller"
    ],
    "style": "Wok",
    "course": "Noodles",
    "texture": "Springy",
    "serving": "Hot"
  },
  {
    "id": "low-carb-tofu",
    "titleTop": "Low Carb",
    "titleBottom": "Tofu Box",
    "image": "assets/low-carb-tofu-box.png",
    "rating": "4.6",
    "chef": "Healthy Pick",
    "description": "Grilled tofu, greens, and noodles in a balanced low-carb box with clean presentation.",
    "tags": [
      "Healthy pick",
      "Protein rich",
      "Balanced meal"
    ],
    "style": "Healthy",
    "course": "Box",
    "texture": "Light",
    "serving": "Warm"
  },
  {
    "id": "sesame-beef",
    "titleTop": "Sesame Beef",
    "titleBottom": "Bowl",
    "image": "assets/sesame-beef-bowl.png",
    "rating": "4.9",
    "chef": "Chef Grill",
    "description": "Tender beef, sesame, and fresh onions over rice with a bold savory flavor.",
    "tags": [
      "Bold flavour",
      "Tender beef",
      "Rice bowl"
    ],
    "style": "Bold",
    "course": "Bowl",
    "texture": "Juicy",
    "serving": "Hot"
  },
  {
    "id": "classic-noodles",
    "titleTop": "Classic Noodles",
    "titleBottom": "Plate",
    "image": "assets/classic-noodles-plate.png",
    "rating": "4.4",
    "chef": "Simple Fresh",
    "description": "A light noodle plate with crisp greens and a clean minimal look.",
    "tags": [
      "Simple",
      "Light meal",
      "Fresh greens"
    ],
    "style": "Minimal",
    "course": "Noodles",
    "texture": "Soft",
    "serving": "Warm"
  }
];

let activeIndex = 0;
let isAnimating = false;
let activeTab = 0;
let startX = 0;
let startY = 0;
let startTime = 0;

const plateStage = document.getElementById('plate-stage');
const currentPlate = document.getElementById('plate-current');
const incomingPlate = document.getElementById('plate-incoming');
const rankNumber = document.getElementById('rank-number');
const titleTop = document.getElementById('title-top');
const titleBottom = document.getElementById('title-bottom');
const dishDescription = document.getElementById('dish-description');
const tagRow = document.getElementById('tag-row');
const rating = document.getElementById('dish-rating');
const chefName = document.getElementById('chef-name');
const chefText = document.getElementById('chef-text');
const thumbStrip = document.getElementById('thumb-strip');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const statBoxes = Array.from(document.querySelectorAll('.stat-box strong'));
const tabs = Array.from(document.querySelectorAll('.tab'));

function buildThumbs() {
  thumbStrip.innerHTML = '';

  dishes.forEach((dish, index) => {
    const button = document.createElement('button');
    button.className = 'thumb-card';
    if (index === activeIndex) button.classList.add('active');
    button.setAttribute('aria-label', `${dish.titleTop} ${dish.titleBottom}`);
    button.innerHTML = `
      <img src="${dish.image}" alt="${dish.titleTop} ${dish.titleBottom}" />
      <span>${dish.titleTop}</span>
      <strong>${dish.titleBottom}</strong>
    `;
    button.addEventListener('click', () => switchDish(index, index > activeIndex ? 1 : -1));
    thumbStrip.appendChild(button);
  });
}

function getIngredientCopy(dish) {
  return `${dish.tags[0]}, ${dish.tags[1].toLowerCase()}, and ${dish.tags[2].toLowerCase()} with a polished studio presentation.`;
}

function updateInfoText(dish) {
  chefText.textContent = activeTab === 0 ? dish.description : getIngredientCopy(dish);
  chefText.classList.remove('fade-swap');
  void chefText.offsetWidth;
  chefText.classList.add('fade-swap');
}

function renderText(dish) {
  rankNumber.textContent = `#${activeIndex + 1}`;
  titleTop.textContent = dish.titleTop;
  titleBottom.textContent = dish.titleBottom;
  dishDescription.textContent = dish.description;
  rating.textContent = dish.rating;
  chefName.textContent = dish.chef;
  statBoxes[0].textContent = dish.style;
  statBoxes[1].textContent = dish.course;
  statBoxes[2].textContent = dish.texture;
  statBoxes[3].textContent = dish.serving;

  [titleTop, titleBottom, dishDescription, rating, chefName].forEach((node) => {
    node.classList.remove('fade-swap');
    void node.offsetWidth;
    node.classList.add('fade-swap');
  });

  tagRow.innerHTML = '';
  dish.tags.forEach((tag) => {
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.textContent = tag;
    tagRow.appendChild(pill);
  });

  Array.from(thumbStrip.children).forEach((thumb, index) => {
    thumb.classList.toggle('active', index === activeIndex);
  });

  updateInfoText(dish);

  const activeThumb = thumbStrip.children[activeIndex];
  if (activeThumb) {
    activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
}

function mountPlate(element, src, alt) {
  element.innerHTML = '';
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.draggable = false;
  element.appendChild(img);
}

function switchDish(nextIndex, direction = 1) {
  if (isAnimating || nextIndex === activeIndex) return;
  isAnimating = true;

  const nextDish = dishes[nextIndex];
  const outClass = direction >= 0 ? 'animate-out-left' : 'animate-out-right';

  mountPlate(incomingPlate, nextDish.image, `${nextDish.titleTop} ${nextDish.titleBottom}`);
  incomingPlate.className = 'plate-layer incoming';
  currentPlate.classList.remove('animate-out-left', 'animate-out-right');
  incomingPlate.classList.remove('animate-in');

  void incomingPlate.offsetWidth;
  currentPlate.classList.add(outClass);
  incomingPlate.classList.add('animate-in');

  activeIndex = nextIndex;
  renderText(nextDish);

  setTimeout(() => {
    mountPlate(currentPlate, nextDish.image, `${nextDish.titleTop} ${nextDish.titleBottom}`);
    currentPlate.className = 'plate-layer current';
    incomingPlate.className = 'plate-layer incoming';
    incomingPlate.innerHTML = '';
    isAnimating = false;
  }, 720);
}

function goPrev() {
  const nextIndex = (activeIndex - 1 + dishes.length) % dishes.length;
  switchDish(nextIndex, -1);
}

function goNext() {
  const nextIndex = (activeIndex + 1) % dishes.length;
  switchDish(nextIndex, 1);
}

prevBtn.addEventListener('click', goPrev);
nextBtn.addEventListener('click', goNext);

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    activeTab = index;
    updateInfoText(dishes[activeIndex]);
  });
});

function onStart(clientX, clientY) {
  startX = clientX;
  startY = clientY;
  startTime = Date.now();
}

function onEnd(clientX, clientY) {
  const dx = clientX - startX;
  const dy = clientY - startY;
  const dt = Date.now() - startTime;

  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) && dt < 800) {
    if (dx < 0) goNext();
    else goPrev();
  }
}

plateStage.addEventListener('touchstart', (event) => {
  const touch = event.changedTouches[0];
  onStart(touch.clientX, touch.clientY);
}, { passive: true });

plateStage.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  onEnd(touch.clientX, touch.clientY);
}, { passive: true });

plateStage.addEventListener('pointerdown', (event) => {
  if (event.pointerType === 'mouse' || event.pointerType === 'touch' || event.pointerType === 'pen') {
    onStart(event.clientX, event.clientY);
  }
});

plateStage.addEventListener('pointerup', (event) => {
  onEnd(event.clientX, event.clientY);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') goPrev();
  if (event.key === 'ArrowRight') goNext();
});

mountPlate(currentPlate, dishes[0].image, `${dishes[0].titleTop} ${dishes[0].titleBottom}`);
buildThumbs();
renderText(dishes[0]);
