import { CustomerInterface } from '../Interface/customerInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  //for creating a api, we need httpClient
  constructor(private http: HttpClient) {}

  //POST Method
  postCustomer(data: CustomerInterface) {
    return this.http.post<CustomerInterface>('http://localhost:3000/customers/', data);
  }

  //GET Method
  getCustomer(): Observable<CustomerInterface[]>{
    return this.http.get<CustomerInterface[]>("http://localhost:3000/customers/");
  }

  //PUT Method
  putCustomer(data:CustomerInterface,id:number){
    return this.http.put<CustomerInterface>(`http://localhost:3000/customers/`+id, data);
  }

  //Delete Method
  deleteCustomer(id:number){
    return this.http.delete<CustomerInterface>("http://localhost:3000/customers/"+id);
  }
}
