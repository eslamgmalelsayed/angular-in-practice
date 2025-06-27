# 🎬 Movie Search App

A modern Angular application for searching and exploring movies with a beautiful, responsive interface.

## 🚀 Demo https://movie-searchhh-app.netlify.app/

## ✨ Features

- **🔍 Movie Search**: Search for movies using a powerful API
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎨 Modern UI**: Clean Material Design interface with smooth animations
- **⚡ Performance**: Lazy loading, skeleton loaders, and optimized images
- **🔗 Navigation**: Detailed movie pages with routing
- **🛡️ Error Handling**: Comprehensive error management with user-friendly messages

## 🚀 Tech Stack

- **Framework**: Angular 17+
- **UI Library**: Angular Material
- **Styling**: SCSS with modern CSS features
- **HTTP Client**: Angular HttpClient with interceptors
- **Routing**: Angular Router with lazy loading
- **State Management**: Reactive forms and observables
- **Build Tool**: Angular CLI
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd search-movies
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── movie-card/      # Movie display card
│   │   └── search-bar/      # Search input component
│   │
│   ├── pages/               # Page components
│   │   ├── Home/            # Home page with search
│   │   └── MovieDetails/    # Single movie details
│   │
│   ├── services/            # Business logic services
│   │   ├── api.service.ts   # HTTP API calls
│   │   └── error-handler.service.ts # Error management
│   │
│   ├── models/              # TypeScript interfaces
│   │
│   ├── constants/           # API endpoints and constants
│   │
│   ├── directives/          # Custom directives
│   │
│   └── environments/        # Environment configuration
└── styles.scss              # Global styles
```

## 🎯 Key Components

### Search Bar

- Material Design input with validation
- Real-time search with debouncing
- Custom trim directive for input cleanup
- Error handling with snackbar notifications

### Movie Cards

- Responsive grid layout (3 columns on desktop)
- Lazy loading images with skeleton loaders
- Hover animations and visual effects
- Click navigation to details page

### Movie Details

- Full movie information display
- Responsive layout with poster and details
- Direct IMDB links
- Navigation state management

## 🔧 Services

### API Service

- Centralized HTTP client
- Response interceptors for data transformation
- Environment-based configuration
- Generic typing for type safety

### Error Handler Service

- Automatic error handling for all API calls
- User-friendly error messages
- Toast notifications for errors
- Logging for debugging

## 🎨 Styling Features

- **Material Design**: Consistent UI components
- **Responsive Grid**: CSS Grid with auto-fit columns
- **Smooth Animations**: CSS transitions and transforms
- **Loading States**: Skeleton loaders and spinners
- **Dark Theme Support**: Optimized for dark backgrounds
- **Mobile First**: Responsive design approach

## 🚀 Build & Deployment

### Development

```bash
ng serve                 # Start dev server
ng build                 # Build for production
ng test                  # Run unit tests
ng lint                  # Run linting
```

### Production

```bash
ng build --configuration production
```

### Netlify Deployment

The app is configured for Netlify deployment with:

- Automatic builds from Git
- Angular runtime optimizations
- Correct publish directory configuration

## 🌐 Environment Configuration

Update `src/environments/environment.ts` for development and `src/environments/environment.prod.ts` for production:

```typescript
export const environment = {
  production: false,
  apiBaseUrl: "https://your-api-endpoint.com",
};
```

## 📱 Responsive Breakpoints

- **Desktop**: 3 cards per row (1200px+)
- **Tablet**: 2 cards per row (768px - 1199px)
- **Mobile**: 1 card per row (<768px)

## 🛠️ Development Guidelines

### Code Style

- Use TypeScript strict mode
- Follow Angular style guide
- Implement proper error handling
- Use reactive forms and observables

### Component Structure

- Standalone components with imports
- Proper input/output decorators
- Lifecycle hooks implementation
- Responsive design considerations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Acknowledgments

- Angular team for the amazing framework
- Angular Material for the UI components
- Movie database API for the data
- Netlify for hosting and deployment
