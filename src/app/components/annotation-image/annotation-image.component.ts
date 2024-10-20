import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-annotation-image',
  standalone: true,
  imports: [],
  templateUrl: './annotation-image.component.html',
  styleUrl: './annotation-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationImageComponent implements AfterViewInit {

  @ViewChild('imageEl') imageEl?: ElementRef<HTMLElement>;

  @Input() imageSrc?: string;

  @Input() width: number = 80;

  @Input() height: number = 80;

  /**
   * ngAfterViewInit
   */
  ngAfterViewInit(): void {

    let width = this.width;
    if (width < 80) {
      width = 80;
    }
    let height = this.height
    if (width < height) {
      height = width;
    }

    this.imageEl!.nativeElement.style.width = `${width}px`;
    this.imageEl!.nativeElement.style.height = `${height}px`;
  }

}
