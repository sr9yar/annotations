import { AsyncPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { ISize } from '../../interfaces/size.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-annotation-textarea',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './annotation-textarea.component.html',
  styleUrl: './annotation-textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationTextareaComponent implements OnInit {

  @Input() width: number = 0;

  @Input() height: number = 0;

  @Input() text: string = '';

  @Output() focusout: EventEmitter<Event> = new EventEmitter<Event>();

  @Output() resize: EventEmitter<ISize> = new EventEmitter<ISize>();

  @Output() update: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('textarea') textarea?: ElementRef<HTMLTextAreaElement>;

  textareaObserver?: ResizeObserver;

  value?: BehaviorSubject<string>;

  /**
   * onFocusOut
   * @param event 
   */
  onFocusOut(event: Event) {
    this.focusout.emit(event);
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {

    this.value = new BehaviorSubject<string>(this.text);

    this.value?.subscribe((newValue: string) => {
      this.update.emit(newValue);
    });
  }

  /**
   * ngAfterViewInit
   */
  ngAfterViewInit(): void {
    this.textarea!.nativeElement.style.width = `${this.width}px`;
    this.textarea!.nativeElement.style.height = `${this.height}px`;

    this.textarea?.nativeElement.focus();

    if (this.textarea) {
      new ResizeObserver(this.textareaResizeHandler.bind(this)).observe(this.textarea.nativeElement);
    }

  }


  /**
   * textareaResizeHandler
   * @param entries 
   */
  private textareaResizeHandler(entries: ResizeObserverEntry[]) {

    const w = entries[0].contentRect.width;
    const h = entries[0].contentRect.height;

    this.resize.emit({ w, h });

  }

}
