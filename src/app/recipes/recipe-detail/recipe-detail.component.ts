import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'] // Debe ser `styleUrls` en lugar de `styleUrl`
})
export class RecipeDetailComponent implements OnInit {
   recipe: Recipe | undefined;
   id: number = 0;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; //+ para pasar el params a id
      this.recipe = this.recipeService.getRecipeById(this.id); 
       })
  }

  onAddToShoppingList(){
    if (this.recipe && this.recipe.ingredients) {
      this.recipeService.addIngToShoppList(this.recipe.ingredients);
    }
  }

  onEditRecipe(){
     this.router.navigate(['edit'], {relativeTo: this.route})
    //another way to do this
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo:this.route })
  }
}
