import {
  Component,
  EventEmitter,
  Output,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-annotation-text',
  standalone: true,
  imports: [],
  templateUrl: './annotation-text.component.html',
  styleUrl: './annotation-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AnnotationTextComponent implements AfterViewInit {

  @Input() text: string = '';

  @Input() width: number = 0;

  @Input() height: number = 0;

  @Output() click: EventEmitter<Event> = new EventEmitter<Event>();

  @ViewChild('textEl') textEl?: ElementRef<HTMLElement>;

  /**
   * ngAfterViewInit
   */
  ngAfterViewInit(): void {
    this.textEl!.nativeElement.style.width = `${this.width}px`;
    this.textEl!.nativeElement.style.height = `${this.height}px`;
  }

  /**
   * onClick
   * @param $event 
   */
  onClick($event: Event) {
    this.click.emit($event);
  }
}
