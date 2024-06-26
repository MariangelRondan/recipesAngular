import { Ingredient } from "../models/ingredient.model";
import { Subject } from "rxjs";



export class ShoppingListService {

    ingredientsChange= new Subject<Ingredient[]>();
    startedEditing = new Subject<number>()

  private ingredients: Ingredient[] = [
    new Ingredient("Tomato", 10),
    new Ingredient("Onion", 2),
    new Ingredient("Potato", 1)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index]
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientsChange.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient)
        // }
        this.ingredients.push(...ingredients)
        this.ingredientsChange.next(this.ingredients.slice())
    }
    
    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChange.next(this.ingredients.slice())
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChange.next(this.ingredients.slice())
    }

}