# 🛡️ react-anti-ads

React component & hook to detect if the user is using AdBlock.  
Automatically shows a fallback UI when AdBlock is detected, **without requiring a page refresh**.

> 🔍 Support for Next.js (App Router or Pages Router), React, and any framework using React.

---

## ✨ Features

- ✅ Detects AdBlock using DOM & script tricks
- 🚫 Works even if AdBlock is turned on/off without refresh
- 💡 Customizable fallback UI
- 🔁 Auto re-checks periodically
- ⚡ Lightweight & no dependencies
- 🧩 Works out-of-the-box with `Next.js` (both app and pages directory)

---

## 📦 Installation

```bash
npm install react-anti-ads
# or
yarn add react-anti-ads
```

## 🚀 Usage

In Next.js (App Router)
```tsx
"use client";

import AntiAds from "react-anti-ads";

export default function Page() {
  return (
    <AntiAds fallback={<div>🚫 AdBlock terdeteksi! Mohon nonaktifkan untuk melanjutkan.</div>}>
      <main>
        <h1>Selamat datang!</h1>
        <p>Terima kasih telah mendukung tanpa AdBlock 🙏</p>
      </main>
    </AntiAds>
  );
}
```

In React
```tsx
import React from "react";
import AntiAds from "react-anti-ads";

function App() {
  return (
    <AntiAds>
      <h1>Selamat datang!</h1>
    </AntiAds>
  );
}
```

⚡ Imperative Usage with isAdBlockOn()

```tsx
import { useEffect } from "react";
import { isAdBlockOn } from "react-anti-ads";

export default function MyComponent() {
  useEffect(() => {
    isAdBlockOn().then((detected) => {
      if (detected) {
        console.log("AdBlock is active!");
        // You can show a modal, redirect, etc.
      }
    });
  }, []);

  return <div>My page content</div>;
}
```

## 🧠 How It Works
Internally, this package uses:
- A hidden ```<div>``` bait with class names like adsbox, banner-ad, etc.
- A fake script request to /ads.js that usually gets blocked
- Regular polling every 1s to re-check dynamically
- Returns a fallback UI immediately when AdBlock is detected
- No actual network is required.

## 📚 API Reference

API | Type | Description |
--- | --- | --- |
AntiAds | Component | Wrap your UI and show fallback if blocked |
useAdBlock() | Hook | Returns { isAdBlockActive, isChecking } |
isAdBlockOn() | Function | Returns Promise<boolean> for detection |


## Authors

- [Satria Aprilian](https://www.github.com/rpnjul)

## 📝 License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)
[![npm version](https://img.shields.io/npm/v/react-anti-ads.svg)](https://www.npmjs.com/package/react-anti-ads)
[![downloads](https://img.shields.io/npm/dm/react-anti-ads.svg)](https://www.npmjs.com/package/react-anti-ads)
