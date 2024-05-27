import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  id: number = 0;
  editMode = false;
  recipeForm!: FormGroup;

  constructor( private route: ActivatedRoute, private recipeService: RecipeService){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';


    if(this.editMode){
      const recipe = this.recipeService.getRecipeById(this.id)
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imgPath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),

    })
  }

  onSubmit(){
    console.log(this.recipeForm)
  }

}