# 🏴‍☠️ The Grand Line Portfolio

> "I'm going to be the King of the Developers!"

![One Piece Portfolio Banner]((https://i.ibb.co/h37STGP/Screenshot-2025-12-26-230343.png))

## ⚓ About The Project

This is not just a portfolio; it's an adventure. Built with **React** and **Three.js**, this website transforms the standard developer portfolio into a One Piece-themed experience. 

It features a **3D interactive Devil Fruit** particle system that reacts to **AI Hand Tracking (Haki)** via your webcam, a "Wanted Poster" project gallery, and a "Den Den Mushi" contact system that acts as a personal bot.

### 🌟 Key Features (The Treasure)

* **3D Particle System:** A custom Three.js simulation of the *Gomu Gomu no Mi* (Straw Hat).
* **Observation Haki (AI):** Uses **MediaPipe** to track hand gestures via webcam. Pinch your fingers to snap the particles!
* **Wanted Posters:** Projects displayed as official Marine bounties.
* **Map Route Timeline:** Experience history displayed as an island-hopping voyage.
* **Den Den Mushi Contact:** A dual-notification email system (using EmailJS) that replies to visitors automatically.
* **Legacy Log:** A "Flashback" window that renders my previous portfolio inside a wooden frame.
* **Theme Engine:** Toggle between **Parchment Mode** (Light) and **Deep Sea Mode** (Dark).

## 🛠️ Tech Stack ( The Ship's Arsenal)

* **Framework:** React + Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Shadcn UI
* **Animations:** Framer Motion + GSAP
* **3D & Physics:** Three.js + React Three Fiber
* **AI/Computer Vision:** Google MediaPipe (Hand Landmarker)
* **Communication:** EmailJS
* **Deployment:** Vercel / Netlify / Render

## 🧭 Getting Started

To board this ship and run it locally, follow these commands:

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/RahulSonawane-rgb/One-Piece-Portfolio.git](https://github.com/RahulSonawane-rgb/One-Piece-Portfolio.git)
    cd One-Piece-Portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the ship (Development Server)**
    ```bash
    npm run dev
    ```

4.  Open `http://localhost:5173` in your browser.

## 📧 Configuration (EmailJS)

To make the Den Den Mushi work, you need your own EmailJS keys.
1.  Create an account at [EmailJS](https://www.emailjs.com/).
2.  Update the constants in `src/api/contact.ts` with your **Service ID**, **Template IDs**, and **Public Key**.

## 🗺️ Roadmap

- [x] Integrate 3D Particle System
- [x] Add Hand Tracking (Haki)
- [x] Design Wanted Posters
- [ ] Add Conqueror's Haki Effect (Screen Shake)
- [ ] Add Secret "Poneglyph" Easter Eggs

## 🤝 Contributing

Nakama (comrades) are always welcome! If you have ideas to make this ship faster or cooler:
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ and Haki by <a href="https://github.com/RahulSonawane-rgb">Rahul Sonawane</a>
</p>
