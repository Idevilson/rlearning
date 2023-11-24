import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDc82xNG59KJ5Fo8RFRG4_GLL-eVy8ZjqQ",
    authDomain: "rlearnig.firebaseapp.com",
    projectId: "rlearnig",
    storageBucket: "rlearnig.appspot.com",
    messagingSenderId: "385932480773",
    appId: "1:385932480773:web:e9fb6f2e502d53c43c276c",
    measurementId: "G-DYSSM83NQ2"
  };

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});