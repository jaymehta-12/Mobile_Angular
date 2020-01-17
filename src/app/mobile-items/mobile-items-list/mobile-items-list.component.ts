import { Component, OnInit } from '@angular/core';
import { MobileItemsService } from '../mobile-items.service';
import { MobileItems } from '../mobile-model/mobile-items.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-items-list',
  templateUrl: './mobile-items-list.component.html',
  styles: []
})
export class MobileItemsListComponent implements OnInit {
  mobileitem : MobileItems[];
  accitem: MobileItems[];

  constructor(private mobileservice:MobileItemsService,private router: Router) { }

  ngOnInit() {
    this.getMobileItems();
  }

  getMobileItems(): void{
    this.mobileservice.getMobileItems().subscribe(mi => {
      this.mobileitem = mi;
      console.log(mi);
    });
  }
  // getAccItemsbyID():void{

  //   this.mobileservice.getAccItemsbyID().subscribe(mi => {
  //     this.accitem = mi;
  //     console.log(mi);
    
    
  //   });

  // }

  changes(id:number): void{
    this.router.navigate(['acc-list',id]);
  }
  changee():void{
    this.router.navigate([''])
  }

}
