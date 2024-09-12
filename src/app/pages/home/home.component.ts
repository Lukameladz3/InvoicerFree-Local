import { Component } from '@angular/core';
import { InvoicerService } from '../../services/invoicer.service';
import { InvoiceCardComponent } from '../../components/invoice-card/invoice-card.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InvoiceCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  inviceIds:string[] = ['']

  constructor(
    private invoiceService:InvoicerService
  ){
    this.inviceIds = this.invoiceService.getAllInvoiceIds()
    console.log(this.inviceIds);
    
  }



}
