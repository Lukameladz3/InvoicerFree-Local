import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateInvoiceComponent } from './pages/create-invoice/create-invoice.component';
import { PaymentPlansComponent } from './pages/payment-plans/payment-plans.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create-invoice',
    component: CreateInvoiceComponent
  },
  {
    path: 'payment-plans',
    component: PaymentPlansComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
];

