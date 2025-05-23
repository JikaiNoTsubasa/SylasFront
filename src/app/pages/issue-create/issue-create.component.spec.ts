import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCreateComponent } from './issue-create.component';

describe('IssueCreateComponent', () => {
  let component: IssueCreateComponent;
  let fixture: ComponentFixture<IssueCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
