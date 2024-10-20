import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationTextComponent } from './annotation-text.component';

describe('AnnotationTextComponent', () => {
  let component: AnnotationTextComponent;
  let fixture: ComponentFixture<AnnotationTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotationTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
