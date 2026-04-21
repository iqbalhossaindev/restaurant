const dishes = [
  {
    id: 'lamb',
    titleTop: 'Lamb Steak',
    titleBottom: 'Potato',
    image: 'assets/dish-lamb.svg',
    rating: '4.8',
    chef: 'Chef K. Semy',
    description: 'Tender cuts, creamy sides, and a rich finish styled for a warm premium table.',
    tags: ['Most loved dish', 'Creamy side', 'Premium cut'],
    style: 'Modern',
    course: 'Main',
    texture: 'Soft',
    serving: 'Hot',
  },
  {
    id: 'lotek',
    titleTop: 'Lotek',
    titleBottom: 'Perkedel',
    image: 'assets/dish-lotek.svg',
    rating: '4.9',
    chef: 'Chef Rina',
    description: 'Fresh greens, bright garnish, and crisp golden bites with a clean cheerful finish.',
    tags: ['Chef pick', 'Fresh daily', 'Bright flavour'],
    style: 'Fresh',
    course: 'Lunch',
    texture: 'Crisp',
    serving: 'Warm',
  },
  {
    id: 'martabak',
    titleTop: 'Martabak',
    titleBottom: 'Pakadin',
    image: 'assets/dish-martabak.svg',
    rating: '4.7',
    chef: 'Chef Arman',
    description: 'Golden layers, soft centres, and a rich finish styled with contrast and warmth.',
    tags: ['Street classic', 'Soft texture', 'Best seller'],
    style: 'Golden',
    course: 'Snack',
    texture: 'Layered',
    serving: 'Hot',
  },
  {
    id: 'sup',
    titleTop: 'Sup Asli',
    titleBottom: 'Wonogiri',
    image: 'assets/dish-soup.svg',
    rating: '4.6',
    chef: 'Chef Dimas',
    description: 'A comforting bowl with a smooth broth, light garnish, and a calm home style mood.',
    tags: ['Comfort food', 'Warm broth', 'Family recipe'],
    style: 'Classic',
    course: 'Soup',
    texture: 'Silky',
    serving: 'Hot',
  },
];

let activeIndex = 0;
let isAnimating = false;

const currentDish = document.getElementById('dish-current');
const incomingDish = document.getElementById('dish-incoming');
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
    button.addEventListener('click', () => switchDish(index));
    thumbStrip.appendChild(button);
  });
}

function renderText(dish) {
  rankNumber.textContent = `#${activeIndex + 1}`;
  titleTop.textContent = dish.titleTop;
  titleBottom.textContent = dish.titleBottom;
  dishDescription.textContent = dish.description;
  rating.textContent = dish.rating;
  chefName.textContent = dish.chef;
  chefText.textContent = dish.description;
  statBoxes[0].textContent = dish.style;
  statBoxes[1].textContent = dish.course;
  statBoxes[2].textContent = dish.texture;
  statBoxes[3].textContent = dish.serving;

  [titleTop, titleBottom, dishDescription, rating, chefName, chefText].forEach((node) => {
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
}

function mountDish(element, src, alt) {
  element.innerHTML = '';
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  element.appendChild(img);
}

function switchDish(nextIndex) {
  if (isAnimating || nextIndex === activeIndex) return;
  isAnimating = true;

  const nextDish = dishes[nextIndex];
  mountDish(incomingDish, nextDish.image, `${nextDish.titleTop} ${nextDish.titleBottom}`);

  currentDish.className = 'dish-layer current';
  incomingDish.className = 'dish-layer incoming';
  void incomingDish.offsetWidth;

  currentDish.classList.add('animate-out-left');
  incomingDish.classList.add('animate-in');

  activeIndex = nextIndex;
  renderText(nextDish);

  setTimeout(() => {
    mountDish(currentDish, nextDish.image, `${nextDish.titleTop} ${nextDish.titleBottom}`);
    currentDish.className = 'dish-layer current';
    incomingDish.className = 'dish-layer incoming';
    incomingDish.innerHTML = '';
    isAnimating = false;
  }, 820);
}

prevBtn.addEventListener('click', () => {
  const nextIndex = (activeIndex - 1 + dishes.length) % dishes.length;
  switchDish(nextIndex);
});

nextBtn.addEventListener('click', () => {
  const nextIndex = (activeIndex + 1) % dishes.length;
  switchDish(nextIndex);
});

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');

    const dish = dishes[activeIndex];
    if (index === 0) {
      chefText.textContent = dish.description;
    } else {
      chefText.textContent = `${dish.tags[0]}, ${dish.tags[1].toLowerCase()}, and ${dish.tags[2].toLowerCase()} with clean modern styling.`;
    }
    chefText.classList.remove('fade-swap');
    void chefText.offsetWidth;
    chefText.classList.add('fade-swap');
  });
});

mountDish(currentDish, dishes[0].image, `${dishes[0].titleTop} ${dishes[0].titleBottom}`);
buildThumbs();
renderText(dishes[0]);
