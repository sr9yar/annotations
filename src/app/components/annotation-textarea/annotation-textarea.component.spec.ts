import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationTextareaComponent } from './annotation-textarea.component';

describe('AnnotationTextareaComponent', () => {
  let component: AnnotationTextareaComponent;
  let fixture: ComponentFixture<AnnotationTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotationTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
