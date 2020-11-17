import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DixitmainpageComponent } from './dixitmainpage.component';

describe('DiximainpageComponent', () => {
  let component: DixitmainpageComponent;
  let fixture: ComponentFixture<DixitmainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DixitmainpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DixitmainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
