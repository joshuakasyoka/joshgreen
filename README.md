# Josh Green Portfolio

A React application for displaying design projects with an interactive sidebar navigation and full-screen project viewing experience.

## Features

- Interactive sidebar navigation with project categories
- Full-screen project image display with overlay information
- Smooth hover animations and blur effects  
- Responsive design with minimalist aesthetic
- Color scheme: #81FF03 (highlight), clean typography with Inter font
- Custom scrollbar styling and smooth transitions

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
josh-green-portfolio/
├── public/
│   ├── images/           # Project images go here
│   └── index.html        # HTML template
├── src/
│   ├── components/       # React components
│   │   └── Portfolio.js  # Main portfolio component
│   ├── data/             # Project data files
│   │   └── projects.js   # Project data structure
│   ├── hooks/            # Custom React hooks
│   │   └── useLocalStorage.js
│   ├── styles/           # CSS modules (optional)
│   │   └── Portfolio.module.css
│   ├── utils/            # Utility functions
│   │   └── searchAndFilter.js
│   ├── App.js            # Main App component
│   └── index.css         # Global styles with Tailwind
└── README.md
```

## Design System

- **Font**: Inter from Google Fonts
- **Highlight Color**: #81FF03
- **Border Width**: 0.5px for dashed separators
- **Spacing**: Consistent padding and margins
- **Transitions**: 300ms ease for smooth interactions
- **Typography**: Clean hierarchy with proper font weights

## Customization

### Adding Projects

Edit `src/data/projects.js` or modify the state in `src/components/Portfolio.js`:

```javascript
{
  id: 1,
  name: 'Project Name',
  date: 'Month Year',
  description: 'Brief project description',
  category: 'Web Development',
  materials: ['React', 'Node.js'],
  themes: ['AI', 'Democracy'],
  techniques: ['User Research', 'Interface Design'],
  images: ['/images/project1.jpg', '/images/project2.jpg']
}
```

### Adding Images

1. Place images in the `public/images` folder
2. Reference them as `/images/image-name.jpg` in your project data
3. Optimize images for web (recommend < 1MB each)

### Styling

- **Tailwind Classes**: Used throughout for consistent spacing and colors
- **Custom CSS**: Additional styles in `src/index.css`
- **CSS Modules**: Optional component-specific styles in `src/styles/`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)  
- Safari (last 2 versions)
- Edge (last 2 versions)

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push to main

### Netlify
1. Run `npm run build`
2. Upload `build` folder to Netlify
3. Configure redirects for SPA routing

### GitHub Pages
1. Install: `npm install --save-dev gh-pages`
2. Add to package.json: `"homepage": "https://yourusername.github.io/repository-name"`
3. Add scripts: `"predeploy": "npm run build", "deploy": "gh-pages -d build"`
4. Run: `npm run deploy`

## Performance Tips

- Optimize images before adding to `public/images`
- Use WebP format for better compression
- Implement lazy loading for large image galleries
- Consider using a CDN for image hosting

## Future Enhancements

- Add search and filter functionality
- Implement project detail pages
- Add smooth page transitions
- Include project galleries with multiple images
- Add contact form integration
- Implement dark/light mode toggle

Built with React, Tailwind CSS, and modern web standards.
