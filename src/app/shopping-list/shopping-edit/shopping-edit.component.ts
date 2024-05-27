import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) shopListForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem! : Ingredient;

  constructor(private shoppService: ShoppingListService){

  }
  ngOnInit(): void {
    this.subscription = this.shoppService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppService.getIngredient(index);
        this.shopListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }
  
  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name ,value.amount )
    if(this.editMode){
      this.shoppService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {

      this.shoppService.addIngredient(newIngredient)
    }
    this.editMode = false;
    form.reset()

  }
  

  onClear(){
    this.shopListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppService.deleteIngredient(this.editedItemIndex)
    this.onClear();

  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe()
  }
}
