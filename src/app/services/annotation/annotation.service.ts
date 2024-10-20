import { Injectable } from '@angular/core';
import { IAnnotation } from '../../interfaces/annotation.interface';
import { v4 } from 'uuid';
import { IAnnotationCreateArguments } from '../../interfaces/annotation-create-arguments.interface';
import { IAnnotationUpdateArguments } from '../../interfaces/annotation-update-arguments.interface';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  private subject = new Subject<IAnnotation[]>();

  readonly annotations: IAnnotation[] = [];

  constructor() { }

  /**
   * create
   * @param args 
   * @returns 
   */
  create(args: IAnnotationCreateArguments): IAnnotation {
    const {
      text,
      image,
      pageNumber,
      x,
      y,
      w,
      h,
    } = args;

    const id: string = v4();

    const newAnnotation: IAnnotation = {
      id,
      pageNumber: pageNumber || 1,
      text: text || id,
      image: image || '',
      x: x || 0,
      y: y || 0,
      h: h || 40,
      w: w || 150,
    };

    this.annotations.push(newAnnotation);
    this.subject.next(this.annotations);

    return newAnnotation;
  }

  /**
   * delete
   * @param id 
   */
  delete(id: string): IAnnotation {
    const index = this.annotations.findIndex((a: IAnnotation) => a.id === id);
    const deleted = this.annotations.splice(index, 1);

    this.subject.next(this.annotations);

    return deleted[0];
  }

  /**
   * update
   */
  update(args: IAnnotationUpdateArguments): IAnnotation {

    const {
      id,
      text,
      image,
      pageNumber,
      x,
      y,
      w,
      h,
    } = args;

    const index = this.annotations.findIndex((a: IAnnotation) => a.id === id);

    const newAnnotation: IAnnotation = {
      id,
      pageNumber: pageNumber || this.annotations[index].pageNumber,
      text: text || this.annotations[index].text,
      image: image || this.annotations[index].image,
      x: x || this.annotations[index].x,
      y: y || this.annotations[index].y,
      w: w || this.annotations[index].w,
      h: h || this.annotations[index].h,
    };

    this.annotations.splice(index, 1, newAnnotation);

    this.subject.next(this.annotations);

    return newAnnotation;
  }

  get valueChanges(): Observable<IAnnotation[]> {
    return this.subject.asObservable();
  }

}
