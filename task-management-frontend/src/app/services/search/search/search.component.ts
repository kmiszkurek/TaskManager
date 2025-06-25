import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchPrefix: string = '#';  // Default to '#'
  searchTerm: string = '';
  placeholderText: string = 'Search for project';

  constructor(private searchService: SearchService) {}

  onSearch(term: string) {
    this.searchService.setSearchTerm(this.searchPrefix, term);  // Pass both prefix and term
  }

  setPrefix(prefix: string) {
    console.log(`Setting prefix: ${prefix}`);
    this.searchPrefix = prefix;
    switch (prefix) {
      case '#':
        this.placeholderText = 'Search for project';
        break;
      case '&':
        this.placeholderText = 'Search for task';
        break;
      default:
        this.placeholderText = 'Search...';
        break;
    }
  }

  performSearch() {
    console.log(`Performing search with prefix: ${this.searchPrefix}, term: ${this.searchTerm}`);
    this.onSearch(this.searchTerm);
  }

}
