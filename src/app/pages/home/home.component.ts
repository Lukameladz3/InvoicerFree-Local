import { Component } from '@angular/core';
import { InvoicerService } from '../../services/invoicer.service';
import { InvoiceCardComponent } from '../../components/invoice-card/invoice-card.component';
import { CommonModule } from '@angular/common';
import { invoiceData } from '../../Interfaces/invoiceData';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InvoiceCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  inviceIds:string[] = ['']
  invoices:invoiceData[] = []

  constructor(
    private invoiceService:InvoicerService
  ){
    // this.inviceIds = this.invoiceService.getAllInvoiceIds()
    // console.log(this.inviceIds);
    this.invoices = this.invoiceService.getAllInvoices();
    
  }


  // toggleStatus(status: string): void {
  //   this.selectedStatus = status;

  //   // Update the UI
  //   const buttons = document.querySelectorAll('.status');
  //   buttons.forEach((btn) => {
  //     btn.classList.remove('active');
  //   });
  //   const activeButton = document.querySelector(`.status.${status}`);
  //   if (activeButton) {
  //     activeButton.classList.add('active');
  //   }

  //   // Filter invoices based on the selected status
  //   this.invoices = this.invoices.filter((invoice) =>
  //     invoice.status.toLowerCase().includes(this.selectedStatus.toLowerCase())
  //   );
  // }




}
