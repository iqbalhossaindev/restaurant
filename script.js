
const items = [
  {
    "slug": "mushroom-stir-fry",
    "title": "Mushroom Stir Fry",
    "subtitle": "Chef Special",
    "desc": "Savory mushrooms, chicken bites, carrots, and spring onion in a rich glossy sauce.",
    "price": "$16",
    "tag": "Popular"
  },
  {
    "slug": "sweet-potato-spirals",
    "title": "Sweet Potato Spirals",
    "subtitle": "Fresh Pack",
    "desc": "Bright spiral cut sweet potato, packed fresh and ready to cook.",
    "price": "$8",
    "tag": "Fresh"
  },
  {
    "slug": "chicken-biryani",
    "title": "Chicken Biryani",
    "subtitle": "Signature Bowl",
    "desc": "Fragrant basmati rice, roasted chicken, toasted spices, and herbs.",
    "price": "$18",
    "tag": "Best Seller"
  },
  {
    "slug": "beef-bowl",
    "title": "Beef Bowl",
    "subtitle": "House Favorite",
    "desc": "Tender beef strips, sesame seeds, greens, and pickled vegetables.",
    "price": "$17",
    "tag": "Hot"
  },
  {
    "slug": "garden-noodles",
    "title": "Garden Noodles",
    "subtitle": "Light Plate",
    "desc": "Soft noodles with crisp green lettuce, simple and fresh.",
    "price": "$12",
    "tag": "New"
  }
];

const heroTitle = document.getElementById('heroTitle');
const heroSubtitle = document.getElementById('heroSubtitle');
const heroDescription = document.getElementById('heroDescription');
const heroPrice = document.getElementById('heroPrice');
const heroTag = document.getElementById('heroTag');
const heroImage = document.getElementById('heroImage');
const heroStage = document.getElementById('heroStage');
const thumbs = document.getElementById('thumbs');
const menuGrid = document.getElementById('menuGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let isAnimating = false;

function renderThumbs() {
  thumbs.innerHTML = items.map((item, index) => `
    <button class="thumb ${index === currentIndex ? 'active' : ''}" data-index="${index}" aria-label="Show ${item.title}">
      <div class="thumb-image-wrap">
        <img src="assets/menu/${item.slug}.png" alt="${item.title}" loading="lazy" />
      </div>
      <div class="thumb-title">${item.title}</div>
    </button>
  `).join('');

  thumbs.querySelectorAll('.thumb').forEach(btn => {
    btn.addEventListener('click', () => changeDish(Number(btn.dataset.index)));
  });
}

function renderMenuGrid() {
  menuGrid.innerHTML = items.map(item => `
    <article class="menu-card">
      <div class="menu-card-image">
        <img src="assets/menu/${item.slug}.png" alt="${item.title}" loading="lazy" />
      </div>
      <div class="menu-card-body">
        <div class="menu-topline">
          <h3 class="menu-title">${item.title}</h3>
          <div class="menu-price">${item.price}</div>
        </div>
        <span class="menu-tag">${item.tag}</span>
        <p class="menu-desc">${item.desc}</p>
      </div>
    </article>
  `).join('');
}

function setTextContent(item) {
  heroTitle.textContent = item.title;
  heroSubtitle.textContent = item.subtitle;
  heroDescription.textContent = item.desc;
  heroPrice.textContent = item.price;
  heroTag.textContent = item.tag;
}

function animateToImage(item) {
  const oldImg = heroImage.cloneNode(true);
  oldImg.className = 'hero-image-clone exit-left';
  heroStage.querySelector('.image-frame').appendChild(oldImg);

  heroImage.classList.remove('enter-from-top');
  heroImage.src = `assets/menu/${item.slug}.png`;
  heroImage.alt = item.title;

  void heroImage.offsetWidth;
  heroImage.classList.add('enter-from-top');

  oldImg.addEventListener('animationend', () => oldImg.remove(), { once: true });
}

function changeDish(nextIndex) {
  if (isAnimating || nextIndex === currentIndex) return;
  isAnimating = true;
  currentIndex = (nextIndex + items.length) % items.length;
  const item = items[currentIndex];

  setTextContent(item);
  animateToImage(item);
  renderThumbs();

  window.clearTimeout(changeDish._timer);
  changeDish._timer = window.setTimeout(() => {
    isAnimating = false;
  }, 720);
}

function nextDish() {
  changeDish(currentIndex + 1);
}

function prevDish() {
  changeDish(currentIndex - 1);
}

function handleSwipe() {
  const delta = touchEndX - touchStartX;
  if (Math.abs(delta) < 40) return;
  if (delta < 0) nextDish();
  else prevDish();
}

heroStage.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

heroStage.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
}, { passive: true });

let mouseDownX = null;
heroStage.addEventListener('pointerdown', e => {
  mouseDownX = e.clientX;
});
heroStage.addEventListener('pointerup', e => {
  if (mouseDownX === null) return;
  touchStartX = mouseDownX;
  touchEndX = e.clientX;
  mouseDownX = null;
  handleSwipe();
});

prevBtn.addEventListener('click', prevDish);
nextBtn.addEventListener('click', nextDish);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') prevDish();
  if (e.key === 'ArrowRight') nextDish();
});

(function init() {
  renderMenuGrid();
  renderThumbs();
  setTextContent(items[currentIndex]);
  heroImage.src = `assets/menu/${items[currentIndex].slug}.png`;
  heroImage.alt = items[currentIndex].title;
  heroImage.classList.add('enter-from-top');
})();
