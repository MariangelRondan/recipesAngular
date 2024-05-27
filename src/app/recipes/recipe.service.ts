import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
 

   private recipes: Recipe[] = [
        new Recipe("Potato soup", "the best tomato soup ever", "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/tomato-soup-723x1024.jpg", [new Ingredient('meat', 1), new Ingredient('tomato', 6)]),
        new Recipe("Lopeees soup", "the best novio ever", "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/tomato-soup-723x1024.jpg", [new Ingredient('Potato', 5), new Ingredient('Onion', 2)]),
        ];

    constructor(private shoppService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice(); //make a copy
    }

    addIngToShoppList(ingredients: Ingredient[]) {
        ingredients.forEach(ingredient => this.shoppService.addIngredient(ingredient));
      }

    getRecipeById(index: number){
        return this.recipes[index]
    }
    
}