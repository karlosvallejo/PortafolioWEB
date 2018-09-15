import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenRequestComponent } from './full-screen-request.component';

describe('FullScreenRequestComponent', () => {
  let component: FullScreenRequestComponent;
  let fixture: ComponentFixture<FullScreenRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreenRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
