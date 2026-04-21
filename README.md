# Dish Studio Website

A complete ready-to-run food landing page inspired by your reference.

## What is included

1. Full responsive website
2. Curved plate slide animation when switching dishes
3. Local dish artwork in `assets/`
4. No build step required

## How to run

### Option 1

Open `index.html` in your browser.

### Option 2

Run a simple local server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`

## How to change dishes

Edit the `dishes` array inside `script.js`.

You can change:

1. Title
2. Rating
3. Chef name
4. Description
5. Tags
6. Image path

Example:

```js
{
  id: 'new-dish',
  titleTop: 'Grilled',
  titleBottom: 'Salmon',
  image: 'assets/my-dish.png',
  rating: '4.9',
  chef: 'Chef Name',
  description: 'Your text here',
  tags: ['Fresh', 'Popular', 'Signature'],
  style: 'Modern',
  course: 'Main',
  texture: 'Soft',
  serving: 'Hot',
}
```

## Files

1. `index.html`
2. `styles.css`
3. `script.js`
4. `assets/`

