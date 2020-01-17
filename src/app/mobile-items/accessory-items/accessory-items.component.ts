import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {FormGroup , FormBuilder, Validators, AbstractControl, FormControl,FormArray } from '@angular/forms';
import { MobileItems } from '../mobile-model/mobile-items.model';

@Component({
  selector: 'app-accessory-items',
  templateUrl: './accessory-items.component.html',
  styleUrls: ['./accessory-items.component.css']
})
export class AccessoryItemsComponent implements OnInit {
  @Input() accform: FormGroup;
  // @Input() accarray: FormArray;

//   get accessories(): FormArray{
//     return this.accform.get('accarray') as FormArray;
//  }
  constructor(private fm: FormBuilder) { }


 ngOnInit(){
  //  this.accform=this.fm.group({
  //   accessoryName:'',
  //   accessoryPrice:''
  //  });
   
 }


//  addAcc(): void{
//   this.accessories.push(this.addAdd());
// }

//  addAdd(): FormGroup{
//   return this.fm.group({
//     accessoryName:'',
//     accessoryPrice:''
// })
// }

// deleteButton(index:number):void{
//   this.accessories.removeAt(index);
// } 

}
