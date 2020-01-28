import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { MobileItems } from '../mobile-model/mobile-items.model';
import { MobileItemsService } from '../mobile-items.service';
import { Router } from '@angular/router';

import { Directive, HostListener } from '@angular/core';
import { Route ,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-add-mobile',
  templateUrl: './add-mobile.component.html',
  styleUrls: ['./add-mobile.component.css']
})

@Directive({
  selector: '[appBlockCopyPaste]'
})
export class AddMobileComponent implements OnInit {



  mobileaddForm: FormGroup;
  mobile: MobileItems;
  MobileItems = new MobileItems();
  errorMessage:string;
  pageTitle = 'Item Edit';

  get accessoryItems(): FormArray {
    return this.mobileaddForm.get('accessoryItems') as FormArray;
  }
  constructor(private fm: FormBuilder, private mobileservice: MobileItemsService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.mobileaddForm = this.fm.group({
      mobileName: ['', [Validators.required, Validators.minLength(3)]],
      mobilePrice: ['', [Validators.pattern("^[0-9]*$")]],
      accessoryItems: this.fm.array([this.addAdd()])
    });
    
    
    let id = +this.route.snapshot.paramMap.get('id');

    this.getMobileItemsbyId(id);


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


  numberOnly(event): boolean {
    console.log(event.keyCode);
    //const charCode = (event.which) ? event.which : event.keyCode;
    const charCode = event.keyCode;
    if (charCode > 64 && charCode < 123) {
      if (charCode > 48 && charCode < 58) {
        return true;
      }
      return true;
    }
    // else if(charCode>48 && charCode<58){
    //   return true;
    // }
    return false;
  }

  addAcc(): void {
    this.accessoryItems.push(this.addAdd());
  }

  // addAdd(): FormGroup{
  //   return this.fm.group({
  //     accessoryName:'',
  //     accessoryPrice:''
  // })
  // }


  addAdd(): FormGroup {
    return this.fm.group({
      accessoryName: [''],
      accessoryPrice: ''
    });
  }

  deleteButton(index: number): void {
    this.accessoryItems.removeAt(index);
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

  deleteMobile():void{
    if(this.mobile.mobileItemsId === 0){
        this.onSave();
    }
    else{
    if(confirm(`Really you wanna delete this item: ${this.mobile.mobileName}?`)){
      this.mobileservice.deleteMobile(this.mobile.mobileItemsId).subscribe({
        next: () => this.onSave()
      });
    }
  }
    
  }
  onSave():void{
    this.router.navigate(['/list-mobile']);
  }

   save() {
    if (this.mobileaddForm.valid) {
      const m = { ...this.mobile, ...this.mobileaddForm.value};
      if(m.mobileItemsId === 0){
      this.mobileservice.save(this.mobileaddForm.value).subscribe()
      }
      else{
        this.mobileservice.update(m).subscribe()
      }
    }

    else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
}
