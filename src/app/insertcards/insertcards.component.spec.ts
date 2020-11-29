import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertcardsComponent } from './insertcards.component';

describe('InsertcardsComponent', () => {
  let component: InsertcardsComponent;
  let fixture: ComponentFixture<InsertcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertcardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
