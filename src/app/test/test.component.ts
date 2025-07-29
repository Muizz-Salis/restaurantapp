import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject} from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  // styleUrl: './test.component.css'
})
export class TestComponent {

  // Sample data to search from
  data = [
    'Apple', 'Banana', 'Orange', 'Pineapple', 'Mango', 'Strawberry',
    'Grapes', 'Blueberry', 'Watermelon', 'Lemon', 'Cherry', 'Peach'
  ];
  
  // Filtered results that will be displayed
  filteredResults: string[] = [];

  // Observable for search terms
  private searchTerms = new Subject<string>();

  constructor() {}

  ngOnInit() {
    // Initially show all items in the filteredResults
    this.filteredResults = [...this.data];

    // Set up a debounced search term handler
    this.searchTerms.pipe(
      debounceTime(300)  // Wait 300ms after each keystroke
    ).subscribe(term => this.filterResults(term));
  }

  // This method is called on every keystroke in the input
  onSearch(term: string): void {
    this.searchTerms.next(term);
  }

  // Filter the data based on the search term
  filterResults(term: string) {
    if (!term.trim()) {
      // If no search term, show all data
      this.filteredResults = [...this.data];
    } else {
      // Filter out items that do not match the term
      this.filteredResults = this.data.filter(item =>
        item.toLowerCase().includes(term.toLowerCase())
      );
    }
  }
}
