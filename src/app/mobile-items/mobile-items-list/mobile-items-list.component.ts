import { Component, OnInit } from '@angular/core';
import { MobileItemsService } from '../mobile-items.service';
import { MobileItems } from '../mobile-model/mobile-items.model';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Observable , of} from 'rxjs';

import { isNullOrUndefined } from 'util';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-mobile-items-list',
  templateUrl: './mobile-items-list.component.html',
  styles: []
})
export class MobileItemsListComponent implements OnInit {
  mobileitem: MobileItems[];
  accitem: MobileItems[];
  searchForm: FormGroup;
  notfoundmsg: string = null;
  allitems: MobileItems[];

  constructor(private fm: FormBuilder, private mobileservice: MobileItemsService, private router: Router) { }

  ngOnInit() {
    this.getMobileItems();
    this.searchForm = this.fm.group({
      searchstring: ['']
    // tslint:disable-next-line:semicolon
    })
    // this.getMobileItemsbySearch();

  }

  getMobileItems(): void {
    this.mobileservice.getMobileItems().subscribe(mi => {
      this.mobileitem = mi;
      this.allitems = mi;
      console.log(mi);
    });
  }

  changes(value: any, id: number) {

    if (!isNullOrUndefined(id) && value === 'view') {
      this.router.navigate(['acc-list', id]);
    } else if (value === 'add') {
      this.router.navigate(['add-mobile']);
    } else if (value === 'edit') {
      this.router.navigate(['add-mobile', id, 'edit']);
    } else {
      this.router.navigate(['add-mobile', id, 'delete']);
    }
  }
  getMobileItemsbySearch(search: string) {
    if (search !== null) {
      console.log(search);
      this.mobileservice.getMobileItemsbySearch(this.searchForm.controls.searchstring.value).subscribe({
        next: mobile => {
          this.mobileitem = mobile;

        },

      });

    } else {
    }

  }
  getMobileItemsbySort(value: any) {
    if (value !== null) {


      this.mobileservice.getMobileItemsbySort(value).subscribe(mi => {
        this.mobileitem = mi;

        console.log(this.mobileitem);
        console.log(mi);
      });


    } else {


    }
  }
}






