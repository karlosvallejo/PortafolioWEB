import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeComponentComponent } from './three-component.component';

describe('ThreeComponentComponent', () => {
  let component: ThreeComponentComponent;
  let fixture: ComponentFixture<ThreeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
