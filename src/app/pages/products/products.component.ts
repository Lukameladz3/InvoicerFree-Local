import { Component, inject } from '@angular/core';
import { OpenModalService } from '../../services/open-modal.service';
import { AddItemModalComponent } from '../../components/add-item-modal/add-item-modal.component';
import { DialogService } from '@ngneat/dialog';
import { itemData } from '../../Interfaces/itemData';
import { InvoicerService } from '../../services/invoicer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AddItemModalComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private dialog = inject(DialogService);
  allItems:itemData[] = []

  constructor(
    private openModalService:OpenModalService,
    private invoiceService:InvoicerService
  ){

     this.allItems = this.invoiceService.getAllItems()
     console.log("all items in products page : ", this.allItems);
     
  }

  addItem(): void {
    const dialogRef = this.dialog.open(AddItemModalComponent, {
      // data is typed based on the passed generic
      data: {
        title: 'Product',
      },

      width: '50%',
    });

    dialogRef.afterClosed$.subscribe((result) => {
      console.log(`After dialog has been closed ${result}`);
    });
  }
}
