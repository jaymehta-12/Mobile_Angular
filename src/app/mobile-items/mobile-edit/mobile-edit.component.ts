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




}
