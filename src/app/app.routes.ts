import { Routes } from '@angular/router';
import { MultiplePageViewerComponent } from './components/multiple-page-viewer/multiple-page-viewer.component';
import { SinglePageViewerComponent } from './components/single-page-viewer/single-page-viewer.component';

export const routes: Routes = [
  { path: 'viewer/all', component: MultiplePageViewerComponent },
  { path: 'viewer/view/:id', component: SinglePageViewerComponent },
  { path: '**', component: MultiplePageViewerComponent },
];
