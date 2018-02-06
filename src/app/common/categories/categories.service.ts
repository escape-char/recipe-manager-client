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
import { Category, CategoryBrief } from './category';
@Injectable()
export class CategoriesService {
  private categoryTimeout:number;
  private _categoriesSource = new Subject<Category[]>();
  public categoriesView = this._categoriesSource.asObservable();
  private _myCategories:Category[] = [];

  constructor(private http:AuthHttp){

  }
  get myCategories():Category[]{
    return this._myCategories;
  }
  fetchMine(name:string=null,
        catId:number=null,
      ): Observable<Category[]> {

    console.log("calling fetchMine in categoriesService");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params:URLSearchParams = new URLSearchParams();
    if(name){
      params.set("name", name);
    }else if(catId){
      params.set("categoryId",  String(catId));
    }
    let options = new RequestOptions({ headers: headers, search: params});
    return this.http.get(EndPoint.MY_CATEGORIES, options)
                    .map((data:any) => {
                      let json = Utils.extractJson(data);
                      let categories:Category[] = json.categories.map((c:any)=>{
                        return Category.fromJsonObj(c);
                      })
                      this._categoriesSource.next(categories);
                      this._myCategories = categories;
                      return categories;
                    })
                    .catch(Utils.handleError);
  }
  checkTaken(name:string=null,
        catId:number=null,
      ): Observable<Category[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let params:URLSearchParams = new URLSearchParams();
    if(name){
      params.set("name", name);
    }else if(catId){
      params.set("categoryId",  String(catId));
    }
    let options = new RequestOptions({ headers: headers, search: params});
    return this.http.get(EndPoint.MY_CATEGORIES, options)
                    .map((data:any) => {
                      let json = Utils.extractJson(data);
                      let categories:Category[] = json.categories.map((c:any)=>{
                        return Category.fromJsonObj(c);
                      })
                      return categories.length > 0;
                    })
                    .catch(Utils.handleError);
  }
  create(name:string=null): Observable<Category[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(EndPoint.MY_CATEGORIES, JSON.stringify({'name': name}), options)
                    .map((data:any) => {
                      let json = Utils.extractJson(data);
                      return json.category
                    })
                    .catch(Utils.handleError);
  }
  update(category:CategoryBrief): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.put(EndPoint.MY_CATEGORIES + "/" + category.id, JSON.stringify(category.toJson()), options)
                    .map((data:any) => {
                      let json = Utils.extractJson(data);
                      return json
                    })
                    .catch(Utils.handleError);
  }
  delete(categoryId:number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.delete(EndPoint.MY_CATEGORIES + "/" + categoryId,  options)
                    .map((data:any) => {
                      let json = Utils.extractJson(data);
                      return json
                    })
                    .catch(Utils.handleError);
  }

  validateCategoryTaken(control: FormControl){
    window.clearTimeout(this.categoryTimeout);
    let name:string = control.value;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return new Promise((resolve, reject) => {
      if(!name.length){
        resolve(null)
        return
      }
      this.categoryTimeout = window.setTimeout(()=>{
         this.checkTaken(name).subscribe(
                      (data:any) =>{
                        console.log(data);
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
