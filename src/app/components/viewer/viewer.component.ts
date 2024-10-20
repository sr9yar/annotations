import { Component, Input } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { IPage } from '../../interfaces/page.interface';
import { ScaleService } from '../../services/scale/scale.service';
import {
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [
    PageComponent,
  ],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss'
})
export class ViewerComponent {
  @Input() pages?: IPage[];

  private readonly componentDestroyed$: Subject<boolean> = new Subject();

  scaleFactor: number = 1;

  constructor(
    private readonly scale: ScaleService,
  ) {

    this.scale.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(value => this.scaleFactor = value);

  }

  /**
   * ngOnDestroy
   */
  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }


}
