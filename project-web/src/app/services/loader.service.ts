import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: Subject<boolean> = new Subject<boolean>();
  isLoading: Observable<boolean> = this.loading.asObservable();

  constructor() { }

  show(): void {
    this.loading.next(true);
  }

  hide(): void {
    this.loading.next(false);
  }
}
