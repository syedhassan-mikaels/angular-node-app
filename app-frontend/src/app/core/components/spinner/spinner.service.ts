import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private loaderSubject = new BehaviorSubject({ show: false });
  loaderState$ = this.loaderSubject.asObservable();

  show() {
    this.loaderSubject.next({ show: true });
  }

  hide() {
    this.loaderSubject.next({ show: false });
  }

}
