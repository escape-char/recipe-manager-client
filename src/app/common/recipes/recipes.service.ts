import { Injectable }     from '@angular/core';
import { Http, Response,Headers,
      URLSearchParams,
        RequestOptions} from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable }    from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import {Utils}  from '../utils.service';
import {EndPoint}   from '../constants';
import {AuthHttp} from '../security/auth-http';
import { Recipe } from './recipe';

@Injectable()
export class RecipesService {
  public static EVENT_CREATE:string = "recipe-create";
  public static EVENT_UPDATE:string = "recipe-update";
  public static EVENT_DELETE:string = "recipe-delete";
  private _recipesSource = new Subject<Recipe[]>();

  private _recipeEventSource = new Subject<string>();
  public recipeEventView = this._recipeEventSource.asObservable();

  private recipeTimeout:number;
  public recipesView = this._recipesSource.asObservable();

  constructor(private http:AuthHttp){

  }
  fetchMine(offset:number=0,
            limit:number=0,
            searchTerm:string="",
            title:string="",
            recipeId:number=0,
            categoryId:number=0
      ): Observable<Recipe[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params:URLSearchParams = new URLSearchParams();
    if(offset){params.set("offset", String(offset));}
    if(limit){params.set("limit",  String(limit));}
    if(searchTerm){params.set("searchTerm", searchTerm);}
    if(title){params.set("title", title);}
    if(recipeId){params.set("recipeId", String(recipeId));}
    if(categoryId){params.set("categoryId", String(categoryId));}

    let options = new RequestOptions({ headers: headers, search: params});
    return this.http.get(EndPoint.MY_RECIPES, options)
                    .map((data:any) => {
                      let json = Utils.extractJson(data);
                      let recipes:Recipe[] = json.recipes.map((r:any)=>Recipe.fromJsonObj(r))
                      this._recipesSource.next(recipes);
                      return recipes
                    })
                    .catch(Utils.handleError);
  }
  create(recipe:Recipe){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(EndPoint.MY_RECIPES, JSON.stringify(recipe.toJson()), options)
                    .map((data) =>{
                      console.log('calling event')
                      this._recipeEventSource.next(RecipesService.EVENT_CREATE);

                      return Utils.extractJson(data);
                    })
                    .catch(Utils.handleError);
  }
  checkTaken(name:string=null,
        recipeId:number=null,
      ): Observable<Recipe[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params:URLSearchParams = new URLSearchParams();
    if(name){
      params.set("title", name);
    }else if(recipeId){
      params.set("recipeId",  String(recipeId));
    }
    let options = new RequestOptions({ headers: headers, search: params});
    return this.http.get(EndPoint.MY_RECIPES, options)
                    .map((data:any) => {
                      let json = Utils.extractJson(data);
                      let recipes:Recipe[] = json.recipes.map((r:any)=>Recipe.fromJsonObj(r))
                      return recipes.length > 0;
                    })
                    .catch(Utils.handleError);
  }
  validateRecipeTaken(control: FormControl){
    window.clearTimeout(this.recipeTimeout);
    let title:string = control.value;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return new Promise((resolve, reject) => {
      if(!title.length){
        resolve(null)
        return
      }
      this.recipeTimeout = window.setTimeout(()=>{
         this.checkTaken(title).subscribe(
                      (data:any) =>{
                        resolve(data ? {available:true}: null)
                      },
                      (error:any) =>{
                        reject({available: true})
                      }
                    );
       }, 600);
     });
  }
}
