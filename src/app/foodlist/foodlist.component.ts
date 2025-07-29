import { Component } from '@angular/core';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-foodlist',
  template: `
  <ul>
    <li *ngFor="let food of foodList">
      {{ food.strMeal }}
    </li>
  </ul>
`,
  standalone: true,
  imports: [],
  templateUrl: './foodlist.component.html',
  // styleUrl: './foodlist.component.css'
})
export class FoodlistComponent {
  public foodList: any =[];
  constructor ( public service: FoodService){}

  ngOnInit(): void {
    this.service.fetchFoodInfo('a').subscribe(response => {
      this.foodList = response;
      console.log(this.foodList);
      

      
    });
  }

}
