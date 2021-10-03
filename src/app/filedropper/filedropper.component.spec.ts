import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FiledropperComponent} from './filedropper.component';

describe('FiledropperComponent', () => {
  let component: FiledropperComponent;
  let fixture: ComponentFixture<FiledropperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiledropperComponent]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
