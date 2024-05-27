import { Component, OnDestroy, OnInit } from '@angular/core';
import {Ingredient} from '../models/ingredient.model'
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private subscription! : Subscription ;

  constructor(private shoppService: ShoppingListService){}
 

  ngOnInit(): void {
   this.ingredients = this.shoppService.getIngredients();
   this.subscription = this.shoppService.ingredientsChange.subscribe((ingredients: Ingredient[]) => {
    this.ingredients = ingredients
   })
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe()
  }


  onEditItems(index: number){
    this.shoppService.startedEditing.next(index) //emit a new value so we can listen to it an subscribe in shopp edit
  }
 
}
