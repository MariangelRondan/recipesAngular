import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id: number = 0;
  editMode = false;
  recipeForm!: FormGroup;

  constructor( private route: ActivatedRoute, private recipeService: RecipeService, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeIngredients = new FormArray<FormGroup>([]);
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl<string | null>(ingredient.name, Validators.required),
              'amount': new FormControl<number | null>(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9][0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl<string | null>(recipeName, Validators.required),
      'imagePath': new FormControl<string | null>(recipeImagePath, Validators.required),
      'description': new FormControl<string | null>(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit(){
    // const newRecipe= new Recipe(
    // this.recipeForm.value['name'], 
    // this.recipeForm.value['description'], 
    // this.recipeForm.value['imgPath'], 
    // this.recipeForm.value['ingredients'] );

    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
   (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])//null is the default value
    }) )
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

}
