# 📟 ASCII Terminal UI Kit for React Native

A high-performance, retro-futuristic UI Kit built with React Native and Expo.  
Perfect for hacker-themed apps, cyberpunk aesthetics, or specialized monitoring dashboards.

---

## 🚀 Features

- **Retro-Futuristic Design**: Full ASCII/Terminal aesthetic with glitch effects.
- **Performance First**: Optimized with `FlatList`, `React.memo`, and hardware-accelerated animations (60 FPS).
- **Adaptive Floating Nav**: Responsive navigation bar that collapses into a circle on scroll.
- **Sensory Feedback**: Integrated Haptics and Audio (beep sounds) for immersive interaction.
- **Reusable Components**: Cards, loaders, overlays, and glitch text ready to drop into any project.
- **Global Theming**: Centralized theme management via `src/utils/theme.js`.

---

## 📂 Project Structure

```text
/src
  /assets
    /sounds       # Audio files (beep.mp3, burbuja.mp3)
  /components     # Atomic ASCII components (Nav, Hero, Cards, Loaders, Overlay)
  /utils          # Global theme and helper functions
App.js            # Main demo app with navigation showcase
```
---
## Installation
Clone the repository or unzip the package.

Install dependencies:
```bash

npm install lucide-react-native expo-av expo-haptics @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler
```


Run the project:

npx expo start

---
## 💡 Note for Android: If you encounter gesture errors, add
import 'react-native-gesture-handler'; at the top of your App.js or index.js.

---
## Customizing the Theme
Edit src/utils/theme.js to globally change colors, fonts, and shadows:

```javascript
export const theme = {
  colors: {
    green: '#00FF00',   // Default Terminal
    amber: '#FFB000',   // Warning System
    alert: '#FF3131',   // Critical Error
    background: '#000000',
    text: '#FFFFFF',
  },
  fonts: {
    terminal: 'Courier New', // Recommended: JetBrains Mono
  }
}; 
```

## Components API

FloatingNav:

| Prop  | Type  | Description |
| ---   | ---   | ---         |
| items | Array | Required. Array of { name, icon } objects. |
| isScrolling | Boolean | Controls collapse (true) or expand (false). |

TerminalCard:
| Prop | Type | Description |
| --- | --- | --- |
| title | String | Header text in ASCII style. |
| variant | 'green'\\ | 'amber'\\ | 'alert' | Color scheme. |
| borderType | 'solid'\\ | 'hash'\\ | 'dots'\\ | 'glitch' | ASCII border style. |

GlitchText:
| Prop | Type | Description |
| --- | --- | --- |
| ``text`` | String | Content to display. |
| ``glitchChance`` | Number (0–1) | Probability of glitch effect. |

AsciiLoader:
| Prop | Type | Description |
| --- | --- | --- |
| type| 'classic'\\ | 'bullet'\\ | 'arrow'\\ | 'block' | Loader style. |
| label | String | Text label displayed. |
| color | String | Hex color for loader. |

TerminalOverlay:
| Prop | Type | Description |
| --- | --- | --- |
| ``visible`` | Boolean | Controls modal visibility. |
| ``title`` | String | Overlay header. |
| ``message`` | String | Overlay content. |
| ``variant`` | 'green'\\ | 'amber'\\ | 'alert' | Color scheme. |
| ``onConfirm`` | Function | Action when confirmed. |
| ``onCancel`` | Function | Action when canceled. |

## ⚡ Performance Optimization Tips
Virtualization: Use FlatList for long logs to keep memory usage low.

Memoization: Wrap custom items in React.memo to prevent unnecessary re-renders.

Animations: Use useNativeDriver where possible for smoother transitions.

## Demo Showcase

Dashboard → HeroAscii + infinite logs

Security → GlitchText + Overlay

Data → Loaders

UI Variants → Cards con distintos bordes

## 🏷 License & Pricing
Designed for commercial use in React Native apps.  
Suggested marketplace price: **$20 USD** (includes FloatingNav, HeroAscii, TerminalCards, Loaders, Overlay, and demo app, thanks for libraries <3).
