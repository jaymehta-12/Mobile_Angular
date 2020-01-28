import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MobileItems } from '../mobile-model/mobile-items.model';
import { MobileItemsService } from '../mobile-items.service';

@Component({
  selector: 'app-mobile-edit',
  templateUrl: './mobile-edit.component.html',
  styleUrls: ['./mobile-edit.component.css']
})
export class MobileEditComponent implements OnInit {
 
 
  mobileaddForm: FormGroup;

  mobile: MobileItems;
  MobileItems = new MobileItems();
  errorMessage:string;
  pageTitle = 'Item Edit';


  constructor( private mobileservice: MobileItemsService) { }

  ngOnInit() {

  }

  getMobileItemsbyId(id: number): void {
    this.mobileservice.getMobileItemsbyId(id)
      .subscribe({
        next: (mobile: MobileItems) => this.display(mobile),
      });
  }

  display(mobile:MobileItems):void{
    this.mobile=mobile;
    if (this.mobile.mobileItemsId === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.mobile.mobileName}`;
    }
    this.mobileaddForm.patchValue({
      mobileName: this.mobile.mobileName,
      mobilePrice: this.mobile.mobilePrice
    });
    // this.mobileaddForm.setControl('tags', this.fb.array(this.mobile.tags || []));
  }


}
