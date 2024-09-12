import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { invoiceData } from '../Interfaces/invoiceData';
import { itemData } from '../Interfaces/itemData';
@Injectable({
  providedIn: 'root',
})
export class InvoicerService {
  constructor() {}

  downloadInvoice(invoiceData: invoiceData) {
    const doc = new jsPDF({});

    autoTable(doc, {
      body: [
        [
          // {
          //   content: `${invoiceData.SellerCompanyName}`,
          //   styles: {
          //     halign: 'left',
          //     fontSize: 20,
          //     textColor: '#ffffff',
          //   },
          // },
          {
            content: 'Invoice',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#293961',
            },
          },
        ],
      ],
      theme: 'plain',
      styles: {
        // fillColor: '#3366ff',
      },
    });

    autoTable(doc, {
      body: [
        [
          {
            content:
              'Reference: #INV0001' +
              '\nDate: 2022-01-27' +
              '\nInvoice number: 123456' +
              '\nPayment Terms: Bank Transfer',

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
            content:
              `\nSeller : ${invoiceData.SellerCompanyName}` +
              `\nTaxID : ${invoiceData.SellerTaxID}` +
              `\nCity : ${invoiceData.SellerCity}` +
              `\nAddress : ${invoiceData.SellerAddress}` +
              `\nEmail : ${invoiceData.SellerEmail}` +
              `\nPhone : ${invoiceData.SellerPhone}`,
            styles: {
              halign: 'left',
            },
          },

          {
            content:
              `\n Buyer : ${invoiceData.BuyerName}` +
              `\n TaxID : ${invoiceData.BuyerTaxID}` +
              `\n Email : ${invoiceData.BuyerEmail}` +
              `\n Country : ${invoiceData.BuyerCountry}` +
              `\n City : ${invoiceData.BuyerCity}` +
              `\n Address : ${invoiceData.BuyerAddress}` +
              `\n Phone : ${invoiceData.BuyerPhone}`,
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
      head: [['Items', 'Quantity', 'Unit', 'Unity Price', 'VAT', 'Net Amount']],
      body: [
        ...invoiceData.items.map((item) => [
          item.Item,
          item.Unit,
          item.Quantity,
          `$${item['Unity Price']}`,
          `$${item.VAT}`,
          `$${item['Net Amount']}`,
        ]),
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

    return doc.save('invoice');
  }

  saveInvoice(invoiceData: invoiceData) {
    const randomId = Math.random().toString(36).substr(2, 9);

    // Get existing invoices object from localStorage
    let invoices = JSON.parse(localStorage.getItem('invoices') || '{}');
  
    // Add new invoice to the object
    invoices[randomId] = invoiceData;
    // Save updated invoices object back to localStorage
    localStorage.setItem('invoices', JSON.stringify(invoices));
  
  
    return randomId;
    
  }

  getInvoice(id: string): invoiceData {
    const invoices = JSON.parse(localStorage.getItem('invoices') || '{}');
    console.log('invocies from get invoice with id : ', invoices);
    console.log('invocie with id : ', invoices[id]);

    console.log("type of ivoice with id : ",typeof(invoices[id]));
    
    // return invoices[id] || [];
    return invoices[id] as invoiceData || {};

  }




  getAllInvoices() {
    const invoices = JSON.parse(localStorage.getItem('invoices') || '{}');
    console.log("Raw invoices from localStorage:", invoices);
    
    const result = Object.values(invoices).filter(item => item !== null && typeof item === 'object');
    console.log("Filtered invoices:", result);
    
    // return result;
  }

  getAllInvoiceIds(): string[] {
    const invoices = JSON.parse(localStorage.getItem('invoices') || '{}');
    return Object.keys(invoices).filter(key => invoices[key] !== null && typeof invoices[key] === 'object');
  }


  saveItem(itemData: itemData) {
    const randomId = Math.random().toString(36).substr(2, 9);

    // Get existing invoices object from localStorage
    let invoices = JSON.parse(localStorage.getItem('items') || '{}');
  
    // Add new invoice to the object
    invoices[randomId] = itemData;
    // Save updated invoices object back to localStorage
    localStorage.setItem('items', JSON.stringify(invoices));
  
    return randomId;
    
  }

  getItem(id: string): itemData {
    const invoices = JSON.parse(localStorage.getItem('items') || '{}');
    console.log('items from get invoice with id : ', invoices);
    console.log('item with id : ', invoices[id]);

    return invoices[id] as itemData || {};

  }

  getAllitemeIds(): string[] {
    const items = JSON.parse(localStorage.getItem('items') || '{}');
    return Object.keys(items).filter(key => items[key] !== null && typeof items[key] === 'object');
  }

  getAllItems(){
    const items = JSON.parse(localStorage.getItem('items') || '{}');
    console.log("Raw items from localStorage:", items);
    
    const result = Object.values(items).filter(item => item !== null && typeof item === 'object');
    console.log("Filtered items:", result);
    
    return result as itemData[]
  }

}
