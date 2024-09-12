import { Component, Input, Output, EventEmitter, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DialogRef } from '@ngneat/dialog';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InvoicerService } from '../../services/invoicer.service';
import { itemData } from '../../Interfaces/itemData';

interface Data {
  title: string;
}

@Component({
  selector: 'app-add-item-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-item-modal.component.html',
  styleUrl: './add-item-modal.component.scss'
})
export class AddItemModalComponent {
  ref: DialogRef<Data, boolean> = inject(DialogRef);
  itemForm: FormGroup;
  itemData: itemData | undefined;

  constructor(
    private invoiceService:InvoicerService
  ){
    this.itemForm = new FormGroup({
      Item: new FormControl('', Validators.required),
      Quantity: new FormControl(1, Validators.required),
      Unit: new FormControl('', Validators.required),
      'Unity Price': new FormControl(0, Validators.required),
      type: new FormControl(0, Validators.required),
      'Net Amount': new FormControl(0, Validators.required),
    });
  }

  onSubmit(): void {
    console.log(this.itemForm.value);
    this.itemData = this.itemForm.value;
    console.log(this.itemForm);

    // this.invoiceForm.reset();
    if (this.itemData) {
      this.invoiceService.saveItem(this.itemData);
      this.ref.close(true)
      // this.invoiceService.downloadInvoice(this.invoiceData);

      // console.log(this.invoiceService.getAllInvoices());
    }
  }


  get title() {
    if (!this.ref.data) return 'Hello world';
      return this.ref.data.title;
  }
}
