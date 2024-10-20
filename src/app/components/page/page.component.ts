import {
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { ImageUrlPipe } from '../../pipes/image-url.pipe';
import { IAnnotation } from '../../interfaces/annotation.interface';
import { AnnotationService } from '../../services/annotation/annotation.service';
import { IAnnotationCreateArguments } from '../../interfaces/annotation-create-arguments.interface';
import { AnnotationComponent } from '../annotation/annotation.component';
import { Subject } from 'rxjs';
import {
  takeUntil,
  map,
} from 'rxjs/operators';



@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    ImageUrlPipe,
    AnnotationComponent,
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnDestroy {

  @Input() src?: string;
  @Input({ required: true }) pageNumber!: number;

  annotations: IAnnotation[] = [];

  private readonly componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private readonly annotationService: AnnotationService,
  ) {

    this.annotationService.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .pipe(map((annotations: IAnnotation[]) => annotations.filter(a => a.pageNumber == this.pageNumber)))
      .subscribe(value => this.annotations = value);

  }

  /**
   * ngOnDestroy
   */
  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  /**
   * onClick
   * @param $event 
   */
  onClick($event: any): void {
    $event.preventDefault();

    const annotationCreateArgs: IAnnotationCreateArguments = {
      text: '',
      pageNumber: this.pageNumber || 1,
      x: $event.offsetX,
      y: $event.offsetY,
      w: 160,
      h: 60,
    };

    this.annotationService.create(annotationCreateArgs);
  }

  /**
   * onDragOver
   * @param event 
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}


