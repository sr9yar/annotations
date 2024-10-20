import {
  Component,
} from '@angular/core';
import { ScaleService } from '../../services/scale/scale.service';
import { AnnotationService } from '../../services/annotation/annotation.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private readonly scale: ScaleService,
    private readonly annotationService: AnnotationService,
  ) { }

  increase() {
    this.scale.increase();
  }

  decrease() {
    this.scale.decrease();
  }

  reset() {
    this.scale.reset();
  }

  save() {
    console.dir(this.annotationService.annotations);
  }

}
