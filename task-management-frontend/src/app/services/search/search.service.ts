import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  private searchTermSubject = new BehaviorSubject<{ prefix: string, term: string }>({ prefix: '', term: '' });
  searchTerm$ = this.searchTermSubject.asObservable();

  setSearchTerm(prefix: string, term: string) {
    this.searchTermSubject.next({ prefix, term });
  }
}
