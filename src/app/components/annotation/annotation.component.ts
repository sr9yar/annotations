import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IAnnotation } from '../../interfaces/annotation.interface';
import { AnnotationService } from '../../services/annotation/annotation.service';
import { AnnotationTextComponent } from '../annotation-text/annotation-text.component';
import { AnnotationImageComponent } from '../annotation-image/annotation-image.component';
import { AnnotationTextareaComponent } from "../annotation-textarea/annotation-textarea.component";
import { ISize } from '../../interfaces/size.interface';


enum Mode {
  Text = 'text',
  Image = 'image',
  Edit = 'edit',
}

@Component({
  selector: 'app-annotation',
  standalone: true,
  imports: [
    AnnotationTextComponent,
    AnnotationImageComponent,
    AnnotationTextComponent,
    AnnotationTextareaComponent
  ],
  templateUrl: './annotation.component.html',
  styleUrl: './annotation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationComponent implements AfterViewInit, OnInit {

  @Input({ required: true }) annotation!: IAnnotation;

  @ViewChild('wrapper') wrapper?: ElementRef<HTMLElement>;

  mode: string = Mode.Text;

  text: string = '';

  imageSrc?: string;

  // Starting position X on drag
  private clientX: number = 0;
  // Starting position Y on drag
  private clientY: number = 0;

  private x: number = 0;

  private y: number = 0;

  width: number = 0;

  height: number = 0;

  constructor(
    private readonly annotationService: AnnotationService,
  ) {

  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    this.x = this.annotation?.x || 0;
    this.y = this.annotation?.y || 0;
    this.width = this.annotation?.w || 0;
    this.height = this.annotation?.h || 0;
    this.text = this.annotation?.text || '';
  }

  /**
   * ngAfterViewInit
   */
  ngAfterViewInit() {
    this.wrapper!.nativeElement.style.top = `${this.y}px`;
    this.wrapper!.nativeElement.style.left = `${this.x}px`;
  }

  /**
   * Detect image / text mode
   */
  getMode(): string {
    if (this.imageSrc) {
      return Mode.Image;
    }
    return Mode.Text;
  }

  /**
   * Set mode
   * @param mode 
   */
  setMode(mode: Mode): void {
    if (this.mode === Mode.Image) {
      // Don't edit an image
      return;
    }
    this.mode = mode;
  }

  /**
   * onTextClick
   */
  onTextClick() {
    this.setMode(Mode.Edit);
  }

  remove() {
    this.annotationService.delete(this.annotation!.id);
  }

  onMouseUp(event: MouseEvent): void {
    this.wrapper?.nativeElement.setAttribute('draggable', 'false');
    this.mode = Mode.Edit;
  }

  onMouseDown(): void {
    this.wrapper?.nativeElement.setAttribute('draggable', 'true');
  }

  onMouseOver(): void {
    this.wrapper?.nativeElement.setAttribute('draggable', 'true');
  }

  onMouseLeave(): void {
    this.wrapper?.nativeElement.setAttribute('draggable', 'false');
  }

  onDragStart(event: DragEvent): void {
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }

  onDragEnd(event: DragEvent): void {
    this.updatePosition(event);
    this.clientX = 0;
    this.clientY = 0;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();

    const files = event.dataTransfer?.files;

    if (!files?.length) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event!.target!.result;
      this.imageSrc = result?.toString();
      this.mode = this.getMode();

      this.annotationService.update({
        ...this.annotation,
        image: this.imageSrc,
      })
    };
    reader.readAsDataURL(files![0]);

  }

  /**
   * onFocusOut
   */
  onFocusOut(): void {
    this.mode = this.getMode();
  }

  /**
   * textareaResize
   * @param size 
   */
  textareaResize(size: ISize) {
    const {
      w,
      h,
    } = size;

    this.width = w;
    this.height = h;

    this.annotationService.update({
      ...this.annotation,
      w,
      h,
    })
  }

  /**
   * updateText
   * @param text 
   */
  updateText(text: string) {
    this.text = text;
    this.annotationService.update({
      ...this.annotation,
      text,
    })
  }

  /**
   * updatePosition
   * @param event 
   */
  private updatePosition(event: DragEvent) {
    const offsetX = event.clientX - this.clientX;
    const offsetY = event.clientY - this.clientY;

    this.x += offsetX;
    this.y += offsetY;

    this.wrapper!.nativeElement.style.top = `${this.y}px`;
    this.wrapper!.nativeElement.style.left = `${this.x}px`;

  }

}
