


import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyA0ME71GK2taGTTJ-xE4DNgPFsAHuh7rrw",
  authDomain: "ram-dairy-farm.firebaseapp.com",
  projectId: "ram-dairy-farm",
  storageBucket: "ram-dairy-farm.firebasestorage.app",
  messagingSenderId: "492263140628",
  appId: "1:492263140628:web:2fa4d68517b532978fe601",
  measurementId: "G-DFGPH69YSX",
};


const app = initializeApp(firebaseConfig);


let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };
