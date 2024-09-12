import { Component, ViewChild, ElementRef } from '@angular/core';

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormItemComponent } from '../../components/form-item/form-item.component';
import { invoiceData } from '../../Interfaces/invoiceData';
import { InvoicerService } from '../../services/invoicer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormItemComponent, FormsModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss',
})
export class CreateInvoiceComponent {
  invoiceForm: FormGroup;

  invoiceData: invoiceData | undefined;

  changed!: Date;


  constructor(private invoiceService: InvoicerService) {
    this.invoiceForm = new FormGroup({
      // / Seller Details
      SellerCompanyName: new FormControl('', Validators.required),
      SellerTaxID: new FormControl('', Validators.required),
      SellerCity: new FormControl('', Validators.required),
      SellerAddress: new FormControl('', Validators.required),
      SellerEmail: new FormControl('', Validators.required),
      SellerPhone: new FormControl('', Validators.required),

      // / Buyer Details
      BuyerName: new FormControl('', Validators.required),
      BuyerTaxID: new FormControl('', Validators.required),
      BuyerEmail: new FormControl('', Validators.required),
      BuyerCountry: new FormControl('', Validators.required),
      BuyerCity: new FormControl('', Validators.required),
      BuyerAddress: new FormControl('', Validators.required),
      BuyerPhone: new FormControl('', Validators.required),

      date: new FormControl(Date, Validators.required),
      dueDate: new FormControl(Date, Validators.required),
      paymentMethod: new FormControl('', Validators.required),

      // / Items
      items: new FormArray([this.createItem()]),
    });
  }

  ngOnInit(): void {}

  SendDataonChange(event: any) {
    console.log(event.target.value);
  }

  onClick() {
    console.log(this.changed);
    }

  createItem(): FormGroup {
    return new FormGroup({
      Item: new FormControl('', Validators.required),
      Quantity: new FormControl(1, Validators.required),
      Unit: new FormControl('', Validators.required),
      'Unity Price': new FormControl(0, Validators.required),
      VAT: new FormControl(0, Validators.required),
      'Net Amount': new FormControl(0, Validators.required),
    });
  }

  addItem(): void {
    (this.invoiceForm.get('items') as FormArray).push(this.createItem());
  }

  removeItem(index: number): void {
    (this.invoiceForm.get('items') as FormArray).removeAt(index);
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  calculateTotal(item: FormGroup): number {
    const quantity = item.get('quantity')!.value || 0;
    const price = item.get('price')!.value || 0;
    return quantity * price;
  }

  onSubmit(): void {
    console.log(this.invoiceForm.value);
    this.invoiceData = this.invoiceForm.value;
    console.log(this.invoiceData);

    // this.invoiceForm.reset();
    if (this.invoiceData) {
      // this.invoiceService.saveInvoice(this.invoiceData);
      // this.invoiceService.downloadInvoice(this.invoiceData);

      // console.log(this.invoiceService.getAllInvoices());
    }
  }
}
