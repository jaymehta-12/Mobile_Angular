import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {FormGroup , FormBuilder, Validators, AbstractControl, FormControl,FormArray } from '@angular/forms';
import { MobileItems } from '../mobile-model/mobile-items.model';
import { MobileItemsService } from '../mobile-items.service';

import {Directive, HostListener} from '@angular/core';


@Component({
  selector: 'app-add-mobile',
  templateUrl: './add-mobile.component.html',
  styleUrls: ['./add-mobile.component.css']
})

@Directive({
  selector:'[appBlockCopyPaste]'
})
export class AddMobileComponent implements OnInit {
  
  
  
  mobileaddForm: FormGroup;

  MobileItems = new MobileItems();

  get buttons (): FormArray {
    return this.mobileaddForm.get('buttons') as FormArray;
  }

   get accessories(): FormArray{
     return this.mobileaddForm.get('accessories') as FormArray;
  }
  constructor(private fm: FormBuilder) { }

  ngOnInit() {
    this.mobileaddForm=this.fm.group({
      mobileName:['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.minLength(3)]],
      mobilePrice:[''],
      buttons: this.fm.array([]),
      accessories: this.fm.array([this.addAdd()])
    });



  
  } 


  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }


  numberOnly(event): boolean
  {
    console.log(event.keyCode);
    //const charCode = (event.which) ? event.which : event.keyCode;
    const charCode = event.keyCode;
    if(charCode > 64 && charCode < 123)
    {
      return true;
    }
    return false;
  }

 addAcc(): void{
   this.accessories.push(this.addAdd());
  }

  // addAdd(): FormGroup{
  //   return this.fm.group({
  //     accessoryName:'',
  //     accessoryPrice:''
  // })
  // }


  addAdd(): FormGroup{
  return this.fm.group({
    accessoryName:'',
    accessoryPrice:''
})
}
  addButton(): void{
    this.buttons.push(new FormControl());
    
  }

   deleteButton(index:number):void{
    this.accessories.removeAt(index);
   } 



  save() {
          console.log(this.mobileaddForm);
          
          console.log('Saved: ' + JSON.stringify(this.mobileaddForm.value));  
      }
  

}
