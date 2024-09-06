import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss',
})
export class CreateInvoiceComponent {

  invoiceForm: FormGroup;

  constructor() {
    this.invoiceForm = new FormGroup({
      companyName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      clientName: new FormControl('', Validators.required),
      clientAddress: new FormControl('', Validators.required),
      items: new FormArray([this.createItem()])
    });
  }

  ngOnInit(): void {

  }

  createItem(): FormGroup {
    return new FormGroup({
      description: new FormControl('', Validators.required),
      quantity: new FormControl(1, Validators.required),
      price: new FormControl(0, Validators.required)
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
    // Add logic to save the invoice or generate PDF here
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
              'გამყიდველი:' +
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
              'მყიდველი:' +
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

    autoTable(doc, {
      body: [
        [
          {
            content: 'Terms & notes',
            styles: {
              halign: 'left',
              fontSize: 14,
            },
          },
        ],
        [
          {
            content:
              'orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia' +
              'molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum' +
              'numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium',
            styles: {
              halign: 'left',
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
            content: 'This is a centered footer',
            styles: {
              halign: 'center',
            },
          },
        ],
      ],
      theme: 'plain',
    });

    return doc.save('invoice');
  }
}
