import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
  apiKey: "AIzaSyDLWeYweJTtyHTb8a-YYY-g3vXC6peF_Zk",
  authDomain: "invoicer-free.firebaseapp.com",
  projectId: "invoicer-free",
  storageBucket: "invoicer-free.appspot.com",
  messagingSenderId: "589800675269",
  appId: "1:589800675269:web:5f6f01b81d40ae4da75dac",
  measurementId: "G-PBHYSDBTKJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()]
};
