import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators'

import { CakeOrder } from '../models/cake.order.interface';
import { InitialData } from '../models/initial.data.interface';
import { CakeOrderService } from '../services/cake-order.service';

@Component({
  selector: 'app-cake-order',
  templateUrl: './cake-order.component.html',
  styleUrls: ['./cake-order.component.css']
})
export class CakeOrderComponent implements OnInit {
  errors: string;  
  success :string;
  isRequesting: boolean;
  submitted: boolean = false;
  toppingList = [];
  shapeList = [];
  sizeList = [];
  selectedToppings = [];
  toppingDropdownSettings = {};
  shapeDropdownSettings = {};
  sizeDropdownSettings = {};
  initialData: InitialData;
  message="";
  price = 0;
  selectedShape = null;
  selectedSize = null;

  constructor(private cakeOrderService: CakeOrderService,private router: Router) { }

  ngOnInit() {
    this.price = 0;
    this.cakeOrderService.getInitialData()
    .subscribe((initialData: InitialData) => {
      this.initialData = initialData;
      this.toppingList = initialData.toppings;
      this.shapeList = initialData.cakeShapes;
    },
    error => {
      //this.notificationService.printErrorMessage(error);
    });

    this.toppingDropdownSettings = {
      singleSelection: false,
      idField: 'code',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      disabled:true
    };

    this.shapeDropdownSettings = {

      singleSelection: true,
      idField: 'code',
      textField: 'description',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.sizeDropdownSettings = {

      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

    this.sizeList = [
      { item_id: 500, item_text: '500 g' },
      { item_id: 1000, item_text: '1 kg' },
      { item_id: 1500, item_text: '1.5 kg' },
      { item_id: 2000, item_text: '2 kg' },
      { item_id: 2500, item_text: '2.5 kg' }
    ];
    
  }

  onToppingSelect (item:any) {
    this.calculatePrice();
  }
  onToppingSelectAll (items: any) {
    this.selectedToppings = items;
    this.calculatePrice();
  }

  onShapeSelect(item:any) {
    if(this.selectedShape && this.selectedShape!=''){
      this.calculatePrice();
    }
    else{

      this.selectedSize = null;
      this.selectedToppings = null;
      this.message = "";
      this.price = 0;
    }
  }

  onSizeSelect(item:any) {
    this.calculatePrice();
  }
  onMessageChange(message : string ) {  
    this.calculatePrice();
  }

  calculatePrice(){
    var shape = "";
    if(this.selectedShape && this.selectedShape !='')
    {
      shape = this.selectedShape[0].code;
    }
    var toppings = "";
    if(this.selectedToppings)
    {
      toppings = Array.prototype.map.call(this.selectedToppings, s => s.code).toString();
    }
    
    var size = 0;
    if(this.selectedSize && this.selectedSize !='')
    {
      size = this.selectedSize[0].item_id;
    }
    
    this.cakeOrderService.calculateTotalPrice(shape,toppings,size,this.message)
      .subscribe((cakeOrder: CakeOrder) => {
       this.price = cakeOrder.totalPrice;
      },
      error => {
        //this.notificationService.printErrorMessage(error);
      });
  }

  createOrder({ value, valid }: { value: CakeOrder, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    var shape = "";
    if(this.selectedShape && this.selectedShape !='')
    {
      shape = this.selectedShape[0].code;
    }
    var toppings = "";
    if(this.selectedToppings)
    {
      toppings = Array.prototype.map.call(this.selectedToppings, s => s.code).toString();
    }
    
    var size = 0;
    if(this.selectedSize && this.selectedSize !='')
    {
      size = this.selectedSize[0].item_id;
    }
    if(valid)
    {
        this.cakeOrderService.createCakeOrder(shape,toppings,size,this.message)
        .subscribe(
                    result  => {
                      var res = result;
                      this.success = "Cake Order completed !";
                     this.clearAll();
                  },
                    errors =>  this.errors = errors
                  );
                  
                  this.isRequesting = false
    }      
 }
 
 clearAll(){

  this.message = "";
  this.selectedToppings = null;
  this.selectedShape = null;
  this.selectedSize = null;
  this.price = 0;
 }

}
