import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';


@Component({
  templateUrl: './shoppingcart.html'
})
export class ShoppingCartComponent {
  message: string;

  constructor(public router: Router) {

   }
}
