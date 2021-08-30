import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

 //load all the cateogries
 public categories() {
  return this._http.get(`${baseUrl}/category/`);
}

public addCategory(category: any){
  return this._http.post(`${baseUrl}/category/`,category)
}


public deleteCategory(id:any){
  return this._http.delete(`${baseUrl}/category/${id}`)

}

public updateCategory(category:any){
  return this._http.put(`${baseUrl}/category/`,category);
}
}
