# Video Game Discovery Directory (Frontend)

A responsive, React-based web app that helps users discover, explore, and save video games using data from three free APIs: RAWG, Find Similar Games, and YouTube. Built with performance, accessibility, and clean code in mind.

---

## Features

- **Search Games** by title using the RAWG API
- **Filter by Genre, Platform, Rating**
- **View Game Details** including screenshots, trailers, and similar games
- **Watch Gameplay Videos** via YouTube Data API
- **Save Favorites** and manage them locally
- **Responsive Design** for all screen sizes (≥320px, no horizontal scroll)

---

## Tech Stack

- **React + Vite** for fast development
- **React Router** for navigation
- **Tailwind CSS** for styling (or plain CSS modules)
- **Fetch API** for all requests (no third-party libraries)
- **LocalStorage** for favorites and watchlist
- **Semantic HTML + BEM CSS** for clean markup
- **@font-face** for custom fonts with system fallbacks

---

## APIs Used

| API                                                                          | Purpose         |
| ---------------------------------------------------------------------------- | --------------- |
| [RAWG API](https://rawg.io/apidocs)                                          | Game metadata   |
| [Find Similar Games API](https://apileague.com/apis/find-similar-games-api/) | Recommendations |
| [YouTube Data API v3](https://developers.google.com/youtube/v3)              | Gameplay videos |

---

## Project Structure

```

client/
├── components/
│ ├── SearchBar.jsx
│ ├── FilterSidebar.jsx
│ ├── GameCard.jsx
│ ├── GameModal.jsx
│ └── FavoritesPage.jsx
├── assets/
│ ├── images/
│ └── fonts/
├── api/
│ └── api.js
├── App.jsx
├── index.jsx
└── styles/
└── \*.css

```

---

## Performance Criteria Highlights

- Semantic HTML
- BEM naming convention
- Responsive layout with flex/grid
- Hooks used correctly
- API logic in `App.jsx`, with `.catch()` and `res.json()`
- Error messages shown to users
- No unused variables or redundant logic
- Clean, readable, commented code

---

## Contact

Built by Hassan
Feel free to reach out via [LinkedIn](https://www.linkedin.com/in/hassan-jamot-tothestars/) or [GitHub](https://github.com/LayZ092)

---
