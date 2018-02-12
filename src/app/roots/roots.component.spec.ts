import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootsComponent } from './roots.component';

describe('RootsComponent', () => {
  let component: RootsComponent;
  let fixture: ComponentFixture<RootsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
