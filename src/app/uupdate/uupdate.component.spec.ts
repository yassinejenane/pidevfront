import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UupdateComponent } from './uupdate.component';

describe('UupdateComponent', () => {
  let component: UupdateComponent;
  let fixture: ComponentFixture<UupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
