import { Component,
  AfterViewInit,
  OnDestroy,
  OnInit,
  trigger,
  state,
  style,
  transition,
  keyframes,
  animate} from '@angular/core';

import { Router,
        ActivatedRoute,
         NavigationExtras } from '@angular/router';
import * as _ from 'lodash';
import {CategoriesService} from '../common/categories/categories.service';
import {SessionService} from '../common/users/session.service';
import {ModalService, ModalView} from '../common/widgets/modal/modal.service';
import {RecipesService} from '../common/recipes/recipes.service';
import {DeviceService} from '../common/device.service';

import {User} from '../common/users/user';
import {Category} from '../common/categories/category';
import {Modal} from '../common/widgets/modal/modal.component';
import {Recipe} from '../common/recipes/recipe';
import {MyCategoryModalComponent} from './my-category-modal.component';
import {RecipeModalComponent} from '../common/recipes/recipe-modal.component';
import {MyCategoryDeleteModalComponent} from './my-category-delete-modal.component';

@Component({
  selector:'my-categories',
  templateUrl: './my-categories.html',
  styleUrls: ['./my-categories.scss'],
  animations: [
    trigger('categoriesState', [
      state('in', style({transform: 'translateX(0)', display: 'inline-block'})),
      state('out', style({transform: 'translateX(-100%)', display:'none'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(300)
      ]),
      transition('in => out', [
        style({transform: 'translateX(0)'}),
        animate(300)
      ]),
      transition('out => in', [
        style({transform: 'translateX(-100%)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])

    ])
  ]
})
export class MyCategoriesComponent {
  private user:User;
  private STATE_OUT:string = "out";
  private STATE_IN:string = "in";
  public state:string = this.STATE_IN;
  public defaultCategories:Category[];
  public myCategories: Category[];
  public totalRecipes: number;
  public error:string;

  private categoriesSubscribe:any;
  private recipesSubscribe:any;
  private querySubscribe:any;
  constructor(private categoriesService: CategoriesService,
              private recipesService: RecipesService,
              private deviceService: DeviceService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: ModalService) {
    console.log("CategoriesComponent");

   }
   onAddClicked(){
    let addView:ModalView = this.modalService.create(MyCategoryModalComponent, null, [{provide: "CATEGORY_ACTION", useValue: "new"},
                                                       {provide: "Category", useValue: null}]);
    this.modalService.open(addView.id);
   }
   onRenameClicked(c:Category){
     console.log("onRenameClicked()");
     console.log(c);
     let renameView:ModalView = this.modalService.create(MyCategoryModalComponent, null, [{provide: "CATEGORY_ACTION", useValue: "edit"},
                                                       {provide: "Category", useValue: c}]);
    this.modalService.open(renameView.id);
   }
   onDeleteClicked(c:Category){
     console.log("onDeleteClicked()")
     let deleteView:ModalView = this.modalService.create(MyCategoryDeleteModalComponent, null, [{provide: "Category", useValue: c}]);
     this.modalService.open(deleteView.id);
   }
   partitionCategories(c:Category[]){
      let catsParted:Category[][]= _.partition(c, (c:Category)=>{
        return c.isDefault;
      });
      this.myCategories = catsParted[1];
      this.defaultCategories = catsParted[0];

      if(!this.deviceService.isMobile()){
        this.defaultCategories[0].selected =true;
        this.router.navigate(["/my-recipes"],
          {queryParams: {category: this.defaultCategories[0].id}})
      }
   }
   updateTotalRecipes(r:Recipe[]){
     if(!r.length){
       this.totalRecipes = 0;
     }else{
       this.totalRecipes = r[0].total;
     }
   }
   onDefaultCategoryClicked(c:Category){
     c.selected = true;
     this.defaultCategories.forEach((v:Category)=>{
       if(v.id == c.id){
         return;
       }
       v.selected = false;
     })
     this.myCategories.forEach((v:Category)=>{
       v.selected = false;
     })
     if(this.deviceService.isMobile()){
       this.state=this.STATE_OUT;
     }
     this.router.navigate(["/my-recipes"], {queryParams: {category: c.id}})

   }
   onCategoryClicked(c:Category){
     c.selected = true;
     this.myCategories.forEach((v:Category)=>{
       if(v.id == c.id){
         return;
       }
       v.selected = false;
     })
     this.defaultCategories.forEach((v:Category)=>{
       v.selected = false;
     })
     let params:any = {category:c.id}

     if(this.deviceService.isMobile()){
       this.state=this.STATE_OUT;
     }
     this.router.navigate(["/my-recipes"], {queryParams: {category: c.id}})
   }
   ngOnInit(){
     console.log("MyCategoriesComponent.ngOnInit()")
     this.partitionCategories(this.route.snapshot.data['categories']);
     this.updateTotalRecipes(this.route.snapshot.data['recipes']);

     this.categoriesSubscribe = this.categoriesService.categoriesView.subscribe((data)=>{
       this.error = null;
       console.log("refreshing categories");
        this.partitionCategories(data);
     }, (error)=>{
       this.error = error;
     })

     this.recipesSubscribe = this.recipesService.recipeEventView.subscribe((data:any)=>{
       console.log("recipe event view called. Refreshing categories");
       this.categoriesService.fetchMine().subscribe((data:any)=>{

       });
     }, (error)=>{
       console.log("error getting recipe event")
     });

     this.querySubscribe = this.route.queryParams.subscribe(params => {
           console.log("parameter changed in recipe list");
           console.log(params);
           let c:number = params['category'];
           if(!c){
             this.state=this.STATE_IN;
           }
     });
   }
   ngOnDestroy(){
     this.querySubscribe.unsubscribe();
     this.recipesSubscribe.unsubscribe();
     this.categoriesSubscribe.unsubscribe();
   }
   ngAfterViewInit(){
   }
}
