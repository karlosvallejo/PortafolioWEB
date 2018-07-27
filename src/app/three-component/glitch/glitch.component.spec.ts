import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlitchComponent } from './glitch.component';

describe('GlitchComponent', () => {
  let component: GlitchComponent;
  let fixture: ComponentFixture<GlitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
