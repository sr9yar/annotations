
import {
  Component,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IListResponse } from '../../interfaces/list.interface';
import { ViewerComponent } from "../viewer/viewer.component";
import { IPage } from '../../interfaces/page.interface';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-single-page-viewer',
  standalone: true,
  imports: [
    ViewerComponent
  ],
  templateUrl: './single-page-viewer.component.html',
  styleUrl: './single-page-viewer.component.scss'
})
export class SinglePageViewerComponent {

  isLoading = true;

  pages?: IPage[];

  constructor(
    private readonly http: HttpClient,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    this.activatedRoute.params.subscribe((params: Params) => {
      const { id } = params;

      this.http.get<IListResponse>('list')
        .pipe(
          map((data: IListResponse) => data.pages.filter((page: IPage) => {
            return page.number === +id;
          })
          ))
        .subscribe((pages: IPage[]) => {
          this.pages = pages;
          this.isLoading = false;
        });
    });

  }

}
