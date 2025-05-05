import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XpGainedComponent } from './xp-gained.component';

describe('XpGainedComponent', () => {
  let component: XpGainedComponent;
  let fixture: ComponentFixture<XpGainedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XpGainedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XpGainedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
