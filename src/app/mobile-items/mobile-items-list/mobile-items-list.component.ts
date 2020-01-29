import { Component, OnInit } from '@angular/core';
import { MobileItemsService } from '../mobile-items.service';
import { MobileItems } from '../mobile-model/mobile-items.model';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-mobile-items-list',
  templateUrl: './mobile-items-list.component.html',
  styles: []
})
export class MobileItemsListComponent implements OnInit {
  mobileitem : MobileItems[];
  accitem: MobileItems[];
  searchForm: FormGroup;
  notfoundmsg: string=null;
  allitems: MobileItems[];

  constructor(private fm: FormBuilder,private mobileservice:MobileItemsService,private router: Router) { }

  ngOnInit() {
    this.getMobileItems();
    this.searchForm = this.fm.group({
      searchstring: ['']
    })
    // this.getMobileItemsbySearch();

  }

  getMobileItems(): void{
    this.mobileservice.getMobileItems().subscribe(mi => {
      this.mobileitem = mi;
      this.allitems=mi;
      console.log(mi);
    });
  }
  // getAccItemsbyID():void{

  //   this.mobileservice.getAccItemsbyID().subscribe(mi => {
  //     this.accitem = mi;
  //     console.log(mi);
    
    
  //   });

  // }

  // changes(id: number): void {
  //   debugger;
  //   this.router.navigate(['acc-list', id]);
  // }

  changes(value: any, id: number) {

    if (!isNullOrUndefined(id) && value === 'view') {
      this.router.navigate(['acc-list', id]);
    } 
    else if(value==='add'){
      this.router.navigate(['add-mobile']);
    }
    else if(value==='edit'){
      this.router.navigate(['add-mobile',id,'edit']);
    }
    else{
      this.router.navigate(['add-mobile',id,'delete']);
      }
    }
    getMobileItemsbySearch(search: string): void{
      if(search !== null){
      this.mobileservice.getMobileItemsbySearch(this.searchForm.controls.searchstring.value).subscribe({
        next: mobile => {
          this.mobileitem = mobile
          
          
        },
        error: err => this.notfoundmsg = err
      });
    }
      else{
        this.notfoundmsg = null;

      }
    }
    getMobileItemsbySort(value:any){
      if(value!==null)
      {

       
      this.mobileservice.getMobileItemsbySort(value).subscribe(mi => {
        this.mobileitem = mi;
        console.log(mi);
      });


    }
  }
  }



  


