import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProccessDetailComponent } from './proccess-detail.component';

describe('ProccessDetailComponent', () => {
  let component: ProccessDetailComponent;
  let fixture: ComponentFixture<ProccessDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProccessDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProccessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
