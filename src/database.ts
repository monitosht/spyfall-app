
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD87A4j786njTRP4CZkHRkXxd1wldENy18",
  authDomain: "spyfall-app.firebaseapp.com",
  databaseURL: "https://spyfall-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "spyfall-app",
  storageBucket: "spyfall-app.firebasestorage.app",
  messagingSenderId: "426704270669",
  appId: "1:426704270669:web:2e813d715aa0c8f75af304"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };