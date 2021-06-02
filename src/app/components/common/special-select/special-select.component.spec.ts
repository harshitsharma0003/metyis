import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialSelectComponent } from './special-select.component';

describe('SpecialSelectComponent', () => {
  let component: SpecialSelectComponent;
  let fixture: ComponentFixture<SpecialSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
