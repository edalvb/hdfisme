import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienFormComponent } from './bien-form.component';

describe('BienFormComponent', () => {
  let component: BienFormComponent;
  let fixture: ComponentFixture<BienFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
