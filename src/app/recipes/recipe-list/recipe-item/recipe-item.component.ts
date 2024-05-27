import { Component,  Input } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
 @Input() recipe : Recipe = { imagePath: '',  name: '', description: '', ingredients: []};
 @Input() index: number = 0;

  constructor(){}



}
