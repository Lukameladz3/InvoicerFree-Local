import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes), provideAnimationsAsync()]
};
