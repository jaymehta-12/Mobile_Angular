import { Component, OnInit, Input } from '@angular/core';
import {FormGroup , FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MobileItems } from '../mobile-model/mobile-items.model';

@Component({
  selector: 'app-accessory-items',
  templateUrl: './accessory-items.component.html',
  styleUrls: ['./accessory-items.component.css']
})
export class AccessoryItemsComponent implements OnInit {
  @Input() accform: FormGroup;

  constructor(private fm: FormBuilder) { }


 ngOnInit() {
 }


}
