import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MkFieldComponent } from './mk-field.component';

describe('MkFieldComponent', () => {
  let component: MkFieldComponent;
  let fixture: ComponentFixture<MkFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MkFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MkFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
