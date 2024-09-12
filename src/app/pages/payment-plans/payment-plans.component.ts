import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: number;
  perMonth: number;
  isActive?: boolean;
  features: PlanFeature[];
}

@Component({
  selector: 'app-payment-plans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-plans.component.html',
  styleUrl: './payment-plans.component.scss',
})
export class PaymentPlansComponent {
  plans: Plan[] = [
    {
      name: 'Annual',
      price: 96,
      perMonth: 8,
      isActive: true,
      features: [
        { name: 'Batch Invoices', included: true },
        { name: 'Customer Import', included: true },
        { name: 'Unlimited Customers', included: true },
        { name: 'Unlimited E-Way Bills', included: true },
        { name: 'Email Integration', included: true },
        { name: 'Unlimited Expenses', included: true },
        { name: 'Unlimited Invoices', included: true },
        { name: '3 Companies', included: true },
        { name: 'Multi-Currency', included: true },
        { name: '3 Users', included: true },
        { name: 'Payment Reminders', included: true },
        { name: 'Product Import', included: true },
        { name: 'Unlimited Products', included: true },
        { name: 'Unlimited Purchases', included: true },
        { name: 'Recurring Invoices', included: true },
        { name: 'Reports', included: true },
        { name: 'Stock Management', included: true },
        { name: 'Template Customization', included: true },
      ],
    },
    {
      name: '3 Years',
      price: 180,
      perMonth: 5,
      features: [
        { name: 'Customer Import', included: true },
        { name: 'Unlimited Customers', included: true },
        { name: 'Unlimited E-Way Bills', included: true },
        { name: 'Email Integration', included: true },
        { name: 'Unlimited Expenses', included: true },
        { name: 'Unlimited Invoices', included: true },
        { name: '5 Companies', included: true },
        { name: 'Multi-Currency', included: true },
        { name: '5 Users', included: true },
        { name: 'Payment Reminders', included: true },
        { name: 'Product Import', included: true },
        { name: 'Unlimited Products', included: true },
        { name: 'Unlimited Purchases', included: true },
        { name: 'Recurring Invoices', included: true },
        { name: 'Reports', included: true },
        { name: 'Stock Management', included: true },
        { name: 'Template Customization', included: true },
      ],
    },
  ];

  promoCode: string = '';

  selectPlan(plan: Plan): void {
    console.log(`Selected plan: ${plan.name}`);
    // Implement plan selection logic here
  }

  applyPromoCode(): void {
    console.log(`Applying promo code: ${this.promoCode}`);
    // Implement promo code logic here
  }
}
