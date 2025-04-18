# 🎡 Spin & Win Game

A beautiful and interactive spinning wheel game built with React, TypeScript, and Framer Motion. Try your luck and see how much you can win!

[Live Demo](https://spinning-wheel-game.ayamash.tech/) | [Report Bug](https://github.com/aya-mash/spinning-wheel-game/issues)

## ✨ Features

- 🎨 Beautiful UI with smooth animations
- 🌓 Dark/Light theme support
- 🎵 Sound effects for enhanced user experience
- 🎉 Celebratory confetti animations
- 📱 Fully responsive design
- 🎮 Two spinning modes:
  - Random spin
  - Pre-determined spin
- 📊 Spin history tracking
- ♿ Accessibility features
- 🔄 Error boundary protection

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build Tool
- [React Router](https://reactrouter.com/) - Navigation
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) - Confetti Effects
- [use-sound](https://www.npmjs.com/package/use-sound) - Audio Management
- [Lucide React](https://lucide.dev/) - Icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/aya-mash/spinning-wheel-game.git
```

2. Install dependencies

```bash
cd spinning-wheel-game
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🎮 How to Play

1. Click "Get Started" on the welcome page
2. Choose your spin method:
   - **Random Spin**: Let fate decide your prize
   - **Pre-Determined Spin**: Select a specific segment using the slider
3. Watch the wheel spin and see what you win!
4. View your spin history by clicking the history icon

## 🧪 Running Tests

```bash
# Run tests
npm run test

# Run tests with coverage
npm run coverage
```

## 📦 Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🎨 Customization

### Wheel Segments

You can customize the wheel segments by modifying the `WHEEL_SEGMENTS` array in `src/pages/game/GamePage.tsx`:

```typescript
const WHEEL_SEGMENTS: WheelSegment[] = [
  { id: 0, label: "R100", color: "#FF6B6B" },
  { id: 1, label: "R200 Points", color: "#6B8E23" },
  // Add more segments as needed
];
```

### Theme Colors

Theme colors can be modified in `src/context/ThemeContext.tsx`.

## 📱 Progressive Web App

This application is PWA-ready and can be installed on mobile devices for a native app-like experience.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Sound effects from [Mixkit](https://mixkit.co/)
- Icons from [Lucide](https://lucide.dev/)
- Color inspiration from [Tailwind CSS](https://tailwindcss.com/)

Project Link: [https://github.com/aya-mash/spinning-wheel-game](https://github.com/aya-mash/spinning-wheel-game)
