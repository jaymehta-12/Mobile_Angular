import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryItemsComponent } from './accessory-items.component';

describe('AccessoryItemsComponent', () => {
  let component: AccessoryItemsComponent;
  let fixture: ComponentFixture<AccessoryItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoryItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
