import { Component,
  OnDestroy,
  OnInit,
  trigger,
  state,
  style,
  transition,
  keyframes,
  animate}  from '@angular/core';
import { Router,
          ActivatedRoute,
         NavigationExtras } from '@angular/router';
import * as _ from 'lodash';
import {DeviceService} from '../common/device.service';
import {RecipesService} from '../common/recipes/recipes.service';
import {Recipe} from '../common/recipes/recipe';

@Component({
  selector:'my-recipes-list',
  templateUrl: './my-recipes-list.html',
  styleUrls: ['./my-recipes-list.scss'],
  animations: [
    trigger('recipesListState', [
      state('in', style({transform: 'translateX(0)', display:'inline-block'})),
      state('out', style({transform: 'translateX(-200%)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(200)
      ]),
      transition('in => out', [
        style({transform: 'translateX(0%)', 'z-index': 1}),
        animate(200)
      ]),
      transition('out => in', [
        style({transform: 'translateX(-100%)'}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'translateX(-100%)'}))
      ])

    ]),
    trigger('recipeState', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class MyRecipesListComponent {
  message: string;
  private categoryId:number;
  private OFFSET_INCR:number = 10;
  private offset:number = 0;

  private STATE_IN:string = "in";
  private STATE_OUT:string = "out";

  public error:string;
  public state:string = this.STATE_IN;
  public recipes:Recipe[] = [];
  public staggeringRecipes:Recipe[] = [];
  public next:number = 0;
  public search:string;
  public debounce:any = null;
  public scrollPercentage:number = 0.7;
  public fetchingMore:boolean = false;

  public onSearchChanged:any = _.debounce(this.onSearch, 300);
  public onFetchMore:any = _.debounce(this.onFetchMoreRecipes, 600);

  private querySubscribe:any;
  private recipesSubscribe:any;

  constructor(private router: Router,
            private activeRoute: ActivatedRoute,
            private deviceService: DeviceService,
            private recipesService: RecipesService) {
              this.doNext();
   }

   ngOnInit(){
     this.recipes = this.activeRoute.snapshot.data['recipes'];
     console.log(this.recipes);
     this.recipesSubscribe = this.recipesService.recipesView.subscribe((recipes:Recipe[])=>{
       this.error=null;
       console.log("reached recipes view subscribe");
       if(this.offset === 0){
         this.next = 0;
         this.staggeringRecipes = [];
         this.recipes = recipes;
         this.recipes.forEach((r:Recipe)=>{
           r.state = this.STATE_IN;
         });
       }else{
         console.log("offset is not zero")
         let addMore:Recipe[] = recipes;
         addMore.forEach((r:Recipe)=>{
           r.state = this.STATE_IN;
         });
         this.recipes = this.recipes.concat(addMore);
         console.log('recipes');
         console.log(this.recipes);
       }
       this.doNext();
     }, (error:string)=>{
       this.error=error;
     })

      this.querySubscribe = this.activeRoute.queryParams.subscribe(params => {
            console.log("parameter changed in recipe list");
            console.log(params);
            let c:number = params['category'];
            if(!c){
              this.state=this.STATE_OUT;

            }
            else if(c){
              this.search = null;
              this.state = this.STATE_OUT;
              setTimeout(()=>{
                this.state = this.STATE_IN;
              }, 300)

              this.offset=0;
              this.categoryId = c;
              this.recipesService.fetchMine(null, 10, null, null, null, c).subscribe(()=>{
              })
            }
      });
   }
   private onFetchMoreRecipes(scrollPct:number):void{
     this.fetchingMore=true;
     console.log("onFetchMoreRecipes");
     this.offset += this.OFFSET_INCR;
     this.recipesService.fetchMine(this.offset, 10, this.search, null, null, this.categoryId).subscribe(()=>{
       this.fetchingMore=false;
     }, ()=>{
       this.fetchingMore=false;
     });

   }
   ngOnDestroy(){
     this.querySubscribe.unsubscribe();
     this.recipesSubscribe.unsubscribe();
   }
   isMobile(){
     return this.deviceService.isMobile();
   }
   onBackClicked(){
     this.state = this.STATE_OUT;
     this.router.navigate(["/my-recipes"], {queryParams: {}})
   }
   private onSearch(){
     console.log("onSearch()");
     this.offset=0;
      this.recipesService.fetchMine(null, 10, this.search, null, null, this.categoryId).subscribe(()=>{
      });
   }
   onEditClicked(r:Recipe){

   }
   onDeleteClicked(r:Recipe){

   }
  doNext() {
    console.log("doNext()");
    if(this.next < this.recipes.length) {
      console.log("pushing recipe to staggering")
      this.staggeringRecipes.push(this.recipes[this.next++]);
    }
  }
}
