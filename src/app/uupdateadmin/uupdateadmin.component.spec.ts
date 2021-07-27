import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UupdateadminComponent } from './uupdateadmin.component';

describe('UupdateadminComponent', () => {
  let component: UupdateadminComponent;
  let fixture: ComponentFixture<UupdateadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UupdateadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UupdateadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
