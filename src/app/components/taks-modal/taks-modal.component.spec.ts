import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaksModalComponent } from './taks-modal.component';

describe('TaksModalComponent', () => {
  let component: TaksModalComponent;
  let fixture: ComponentFixture<TaksModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaksModalComponent]
    });
    fixture = TestBed.createComponent(TaksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
