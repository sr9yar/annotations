import { Injectable } from '@angular/core';
import { distinctUntilChanged } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ScaleService {

  private subject = new Subject<number>();

  private step: number = 0.2;

  private currentValue: number = 1;

  get valueChanges(): Observable<number> {
    return this.subject.asObservable().pipe(distinctUntilChanged());
  }

  /**
   * increase
   * @returns 
   */
  increase() {
    const newValue = this.currentValue + this.step;
    if (newValue >= 10) {
      return;
    }
    this.setNewValue(newValue);
  }

  /**
   * decrease
   * @returns 
   */
  decrease() {
    const newValue = this.currentValue - this.step;
    if (newValue <= 0) {
      return;
    }
    this.setNewValue(newValue);
  }

  /**
   * reset
   * @returns 
   */
  reset() {
    this.setNewValue(1);
  }

  /**
   * setNewValue
   * @param newValue number
   * @returns 
   */
  private setNewValue(newValue: number): void {
    this.currentValue = newValue;
    this.subject.next(this.currentValue);
  }
}
