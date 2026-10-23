# ✨ Quartly — Personal Finance, Reimagined 💸

> **Your money, made clearer.** A cloud-synced personal finance dashboard built to make everyday spending easier to understand.

🌐 **Live app:** https://quartly.onrender.com

Quartly brings transactions, spending analytics, budget goals, and financial visualizations into one polished interface. Built with React, TypeScript, Firebase, and a carefully crafted glass-inspired UI, it keeps your financial picture organized across sessions and devices.

---

## 🚀 What You Can Do

### 💳 Track Your Money
- ➕ Add and manage transactions
- 🏷️ Organize expenses by category
- 🔎 Search and filter transaction history
- 🧾 Review your financial activity in one place

### 📊 Understand Your Spending
- 📈 Explore spending trends and monthly comparisons
- 🥧 Break down expenses by category
- 🗓️ Review weekly activity and spending patterns
- 🧭 Dive into interactive charts and visual analytics

### 🎯 Set Budget Goals
- 💰 Set a total budget
- 🧮 Compare spending against your budget
- 🚦 See remaining budget and key spending indicators

### ☁️ Your Account, Synced
- 🔐 Firebase Authentication
- 🔥 Cloud Firestore persistence
- 🔄 User-specific financial data
- 🌗 Persistent light and dark themes

### ✨ Made to Feel Good to Use
- 🧊 Glass-inspired surfaces and subtle depth
- 🎞️ Smooth transitions and tactile hover states
- 📱 Responsive layouts
- 🖨️ PDF report export
- ♿ Reduced-motion-aware animation behavior

---

## 🧰 Tech Stack

| Area | Tools |
|---|---|
| UI | ⚛️ React, TypeScript |
| Build tooling | ⚡ Vite |
| Styling | 🎨 Tailwind CSS |
| Motion | 🎞️ Framer Motion |
| Charts | 📊 Recharts |
| Authentication & database | 🔥 Firebase Authentication, Cloud Firestore |
| Icons | 🧩 Lucide React |
| Export | 📄 jsPDF |
| Progressive web app | 📲 Vite PWA plugin |

---

## 📸 Screenshots

Take a look at Quartly in both themes. The screenshots below are stored in the repository, so they render directly on GitHub.

### ☀️ Light Mode

#### 🔐 Login
![Quartly login — light mode](screenshots/quartly-login-light.png)

#### 🏠 Dashboard
![Quartly dashboard — light mode](screenshots/quartly-dashboard-light.jpeg)

#### 📊 Charts
![Quartly charts — light mode](screenshots/quartly-charts-light.jpeg)

#### 🎯 Budget Goals
![Quartly budget goals — light mode](screenshots/quartly-budgetgoals-light.png)

### 🌙 Dark Mode

#### 🔐 Login
![Quartly login — dark mode](screenshots/quartly-login-dark.png)

#### 🏠 Dashboard
![Quartly dashboard — dark mode](screenshots/quartly-dashboard-dark.jpeg)

#### 📊 Charts
![Quartly charts — dark mode](screenshots/quartly-charts-dark.jpeg)

#### 🎯 Budget Goals
![Quartly budget goals — dark mode](screenshots/quartly-budgetgoals-dark.png)

---

## 🏁 Run It Locally

### 📋 Prerequisites
- 🟢 Node.js (current LTS recommended)
- 📦 npm
- 🔥 A Firebase project with Authentication and Cloud Firestore enabled

### 1️⃣ Clone the repository

```bash
git clone <your-repository-url>
cd Quartly-Finance-Tracker-main
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure Firebase

Create a `.env` file in the project root and add your Firebase web-app configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

🔒 **Keep credentials and private configuration out of version control.** The app reads these values through Vite's `import.meta.env` support. Firebase web configuration values are used by the client, so configure Firebase Authentication, Firestore Security Rules, and authorized domains correctly. Never put service-account private keys in frontend environment variables.

### 4️⃣ Start the development server

```bash
npm run dev
```

Vite prints the local URL in your terminal, usually `http://localhost:5173`.

### 🧪 Check the production build

```bash
npm run build
```

### 👀 Preview the production build

```bash
npm run preview
```

### 🧹 Run lint checks

```bash
npm run lint
```

---

## 🗂️ Project Structure

```text
src/
├── assets/                 # Background artwork and visual assets
├── components/
│   ├── charts/             # Reusable data visualizations
│   ├── transactions/       # Transaction forms, lists, and modals
│   └── ui/                 # Shared UI components
├── context/                # Finance state and data operations
├── firebase/               # Firebase setup, auth, and Firestore access
├── pages/                  # Dashboard, charts, budget goals, and login
├── styles/                 # Global styling and themes
├── types/                  # Shared TypeScript types
├── App.tsx                 # App shell and page/theme coordination
└── main.tsx                # Frontend entry point
```

---

## 🔐 Security Notes

- 🔑 Store configuration in environment variables where appropriate.
- 🧱 Set restrictive Firestore Security Rules so users can only access their own data.
- 🌍 Add production and local development domains to Firebase Authentication's authorized domains.
- 🚫 Never commit `.env` files, service-account credentials, or private keys.
- 🧪 Test authentication and data access rules before deploying changes.

---

## 🧭 Project Focus

Quartly was built as a hands-on project in:

- 🧠 Financial data visualization
- ⚛️ Modern React and TypeScript development
- 🔐 Authentication and user-specific cloud data
- 🧩 Reusable component architecture
- 🎨 Interface design and responsive UI
- 🚀 Build tooling and deployment

---

## 👨‍💻 Creator

**Kenny Richardson Kodipally**  
🐙 GitHub: [@kennykrichardson](https://github.com/kennykrichardson)

---

## 📜 License

Quartly is distributed under the terms described in [`LICENSE`](./LICENSE).

Please read the license before reusing, modifying, redistributing, or commercializing the project.

---

<div align="center">

### 💸 Make every number tell a story.

**Quartly** · Spend consciously. See clearly. Plan confidently. ✨

</div>
