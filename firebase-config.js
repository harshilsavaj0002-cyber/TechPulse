// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVrIS3sP0FJoUY2Ci_DA9KPbjE3p4TqZM",
  authDomain: "tech-pulse-e5f87.firebaseapp.com",
  projectId: "tech-pulse-e5f87",
  storageBucket: "tech-pulse-e5f87.firebasestorage.app",
  messagingSenderId: "168725306636",
  appId: "1:168725306636:web:a44b288d188309a9927d29",
  measurementId: "G-0FVC6L2Y5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export analytics for use in other files
export { analytics };
