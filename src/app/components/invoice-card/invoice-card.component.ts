import { Component, Input } from '@angular/core';
import { InvoicerService } from '../../services/invoicer.service';
import { invoiceData } from '../../Interfaces/invoiceData';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-invoice-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.scss'
})
export class InvoiceCardComponent {
  @Input() invoiceId!: string;
  invoiceData!:invoiceData

  constructor(
    private invoiceService:InvoicerService
  ){

    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.invoiceData);
    this.invoiceData = this.invoiceService.getInvoice(this.invoiceId)
  }
  
}
