
import {
  Component,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IListResponse } from '../../interfaces/list.interface';
import { ViewerComponent } from "../viewer/viewer.component";
import { IPage } from '../../interfaces/page.interface';

@Component({
  selector: 'app-multiple-page-viewer',
  standalone: true,
  imports: [
    ViewerComponent
  ],
  templateUrl: './multiple-page-viewer.component.html',
  styleUrl: './multiple-page-viewer.component.scss'
})
export class MultiplePageViewerComponent {

  isLoading = true;

  pages?: IPage[];

  constructor(
    private readonly http: HttpClient,
  ) {
    this.http.get<IListResponse>('list')
      .subscribe(data => {
        this.pages = data.pages;
        this.isLoading = false;
      });
  }

}
