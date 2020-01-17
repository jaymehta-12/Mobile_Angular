import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryItemsListComponent } from './accessory-items-list.component';

describe('AccessoryItemsListComponent', () => {
  let component: AccessoryItemsListComponent;
  let fixture: ComponentFixture<AccessoryItemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoryItemsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
