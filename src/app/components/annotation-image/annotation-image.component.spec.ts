import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationImageComponent } from './annotation-image.component';

describe('AnnotationImageComponent', () => {
  let component: AnnotationImageComponent;
  let fixture: ComponentFixture<AnnotationImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotationImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
