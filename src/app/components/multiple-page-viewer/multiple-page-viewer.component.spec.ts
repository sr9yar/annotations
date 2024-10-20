import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplePageViewerComponent } from './multiple-page-viewer.component';

describe('MultiplePageViewerComponent', () => {
  let component: MultiplePageViewerComponent;
  let fixture: ComponentFixture<MultiplePageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiplePageViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplePageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
