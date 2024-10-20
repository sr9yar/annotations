import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePageViewerComponent } from './single-page-viewer.component';

describe('SinglePageViewerComponent', () => {
  let component: SinglePageViewerComponent;
  let fixture: ComponentFixture<SinglePageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePageViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
