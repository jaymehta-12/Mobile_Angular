import { Component, OnInit } from '@angular/core';
import { MobileItemsService } from '../../../mobile-items/mobile-items.service';
 import { MobileItems } from '../../mobile-model/mobile-items.model';
 import { Route,Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-accessory-items-list',
  templateUrl: './accessory-items-list.component.html',
  styleUrls: ['./accessory-items-list.component.css']
})
export class AccessoryItemsListComponent implements OnInit {
  accitem: MobileItems;
  // id : MobileItems['mobileItemsId'];
  constructor(private mobileservice:MobileItemsService,private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.getAccItemsbyID(id);
  }
  getAccItemsbyID(id): void{

    this.mobileservice.getAccItemsbyID(id).subscribe(mi => {
      this.accitem = mi;
      console.log(this.accitem);
    
    
    });

  }

  // display(mobile: MobileItems):void{
  //   this.accitem=MobileItems;
  //   if(this.accitem.mobileItemsId === 0){
      
  //   }
  // }
}
