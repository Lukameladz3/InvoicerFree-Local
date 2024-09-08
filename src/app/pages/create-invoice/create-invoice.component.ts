import { Component, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormItemComponent } from '../../components/form-item/form-item.component';

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormItemComponent],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss',
})
export class CreateInvoiceComponent {
  invoiceForm: FormGroup;

  

  constructor() {
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

      // / Items
      items: new FormArray([this.createItem()]),
    });
  }

  ngOnInit(): void {}

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
    console.log('hello world');
    this.downloadInvoice();
  }

  public downloadInvoice() {
    const doc = new jsPDF({});

    autoTable(doc, {
      body: [
        [
          {
            content: 'Company brand',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff',
            },
          },
          {
            content: 'Invoice',
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#ffffff',
            },
          },
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#3366ff',
      },
    });

    autoTable(doc, {
      body: [
        [
          {
            content:
              'Reference: #INV0001' +
              '\nDate: 2022-01-27' +
              '\nInvoice number: 123456',
            styles: {
              halign: 'right',
            },
          },
        ],
      ],
      theme: 'plain',
    });

    autoTable(doc, {
      body: [
        [
          {
            content:
              'Seller:' +
              '\nJohn Doe' +
              '\nBilling Address line 1' +
              '\nBilling Address line 2' +
              '\nZip code - City' +
              '\nCountry',
            styles: {
              halign: 'left',
            },
          },

          {
            content:
              'Buyer:' +
              '\nCompany name' +
              '\nShipping Address line 1' +
              '\nShipping Address line 2' +
              '\nZip code - City' +
              '\nCountry',
            styles: {
              halign: 'right',
            },
          },
        ],
      ],
      theme: 'plain',
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Amount due:',
            styles: {
              halign: 'right',
              fontSize: 14,
            },
          },
        ],
        [
          {
            content: '$4000',
            styles: {
              halign: 'right',
              fontSize: 20,
              textColor: '#3366ff',
            },
          },
        ],
        [
          {
            content: 'Due date: 2022-02-01',
            styles: {
              halign: 'right',
            },
          },
        ],
      ],
      theme: 'plain',
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Products & Services',
            styles: {
              halign: 'left',
              fontSize: 14,
            },
          },
        ],
      ],
      theme: 'plain',
    });

    autoTable(doc, {
      head: [['Items', 'Category', 'Quantity', 'Price', 'Tax', 'Amount']],
      body: [
        ['Product or service name', 'Category', '2', '$450', '$50', '$1000'],
        ['Product or service name', 'Category', '2', '$450', '$50', '$1000'],
        ['Product or service name', 'Category', '2', '$450', '$50', '$1000'],
        ['Product or service name', 'Category', '2', '$450', '$50', '$1000'],
      ],
      theme: 'striped',
      headStyles: {
        fillColor: '#343a40',
      },
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Subtotal:',
            styles: {
              halign: 'right',
            },
          },
          {
            content: '$3600',
            styles: {
              halign: 'right',
            },
          },
        ],
        [
          {
            content: 'Total tax:',
            styles: {
              halign: 'right',
            },
          },
          {
            content: '$400',
            styles: {
              halign: 'right',
            },
          },
        ],
        [
          {
            content: 'Total amount:',
            styles: {
              halign: 'right',
            },
          },
          {
            content: '$4000',
            styles: {
              halign: 'right',
            },
          },
        ],
      ],
      theme: 'plain',
    });

    return doc.save('invoice');
  }
}
