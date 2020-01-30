import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { MobileItems } from '../mobile-model/mobile-items.model';
import { MobileItemsService } from '../mobile-items.service';
import { Router } from '@angular/router';

import { Directive, HostListener } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-add-mobile',
  templateUrl: './add-mobile.component.html',
  styleUrls: ['./add-mobile.component.css']
})

@Directive({
  selector: '[appBlockCopyPaste]'
})
// tslint:disable-next-line:directive-class-suffix
export class AddMobileComponent implements OnInit {



  mobileaddForm: FormGroup;
  mobile: MobileItems;
  MobileItems = new MobileItems();
  errorMessage: string;
  pageTitle = 'Item Edit';
  private sub: Subscription;
  file: any;

  get accessoryItems(): FormArray {
    return this.mobileaddForm.get('accessoryItems') as FormArray;
  }
  constructor(private fm: FormBuilder, private mobileservice: MobileItemsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.mobileaddForm = this.fm.group({
      mobileName: ['', [Validators.required, Validators.minLength(3)]],
      mobilePrice: ['', [Validators.pattern('^[0-9]*$')]],
      accessoryItems: this.fm.array([this.addAdd()]),
    });

    this.sub = this.route.paramMap.subscribe(
      params => {

        const id = +params.get('id');

        if (id >= 1) {
          this.getMobileItemsbyId(id);
        }
      }
    );
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

    const charCode = event.keyCode;
    if (charCode > 48 && charCode < 123) {
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
  display(mobile: MobileItems): void {
    this.mobile = mobile;
    if (this.mobile.mobileItemsId === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.mobile.mobileName}`;
    }

    this.mobileaddForm.patchValue({
      mobileName: this.mobile.mobileName,
      mobilePrice: this.mobile.mobilePrice

    });

    this.mobile.accessoryItems.forEach(accessoryItems => {
      (this.mobileaddForm.controls.accessoryItems as FormArray).push(
        this.fm.group({
          accessoryItemsId: [accessoryItems.accessoryItemsId],
          accessoryName: [accessoryItems.accessoryName],
          accessoryPrice: [accessoryItems.accessoryPrice],
          mobileItemsId: [accessoryItems.mobileItemsId],

        })
      );
    });
  }



  deleteMobile(): void {

    if (this.mobile.mobileItemsId === 0) {
      this.onSave();
    } else {
      if (confirm(`Really you wanna delete this item: ${this.mobile.mobileName}?`)) {
        this.mobileservice.deleteMobile(this.mobile.mobileItemsId).subscribe({
          next: () => this.onSave()
        });
      }
    }

  }
  onSave(): void {
    this.router.navigate(['/list-mobile']);
  }

  save() {

    this.mobileaddForm.value.Image = this.file;
    // console.log(this.mobileaddForm.value.imageup);
    if (this.mobileaddForm.valid) {
      const m = { ...this.mobile, ...this.mobileaddForm.value };
      if (m.mobileItemsId === 0) {
        this.mobileservice.save(this.mobileaddForm.value).subscribe();
      } else {
        const id = +this.route.snapshot.paramMap.get('id');
        this.mobileservice.update(id, m).subscribe();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  fileUpload(event: any) {
    if (event.target.files[0]) {
      this.file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = this.fileLoad.bind(this);
      fileReader.readAsBinaryString(this.file);
      // console.log(this.file);
    }
  }

  fileLoad(Efile) {
    const binaryString = Efile.target.result;
    this.file = btoa(binaryString);
    // console.log(btoa(binaryString));
  }


}
