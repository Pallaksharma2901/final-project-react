import { initializeApp } from "firebase/app";

const firebaseConfig = {
 apiKey: "AIzaSyBvv0ay4RWxvpcs-VKabt35aAMj78nHH9Q",
  authDomain: "palak-c820e.firebaseapp.com",
  projectId: "palak-c820e",
  storageBucket: "palak-c820e.appspot.com",
  messagingSenderId: "878371324977",
  appId: "1:878371324977:web:c74413ef3df2d64c860110",
  measurementId: "G-5CH9P3MKZC",
  
  //REALTIME DATABASE URL
  databaseURL: "https://palak-c820e-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;