import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { CustomerComponent } from './customer/customer.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'angularCRUD';


  //add the table display columns names id
  displayedColumns: string[] = ['firstName', 'lastName', 'dob', 'email', 'gender', 'country', 'state', 'city', 'address', 'pincode', 'startDate', 'endDate', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;  //used for pagination
  @ViewChild(MatSort) sort!: MatSort;  //used for sorting the customer data


  //create a constructor a API service
  constructor(private api: ApiService, private dialog : MatDialog) {}

  ngOnInit(): void {
    this.getAllCustomer();
  }

  //GET Method
  getAllCustomer() {
    this.api.getCustomer().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);  //insert all the data inside the mat table datasource
        this.dataSource.paginator  = this.paginator;  //creating pagination
        this.dataSource.sort = this.sort; //to sort the customer data
      },
      error: (err) => {
        alert('Error while fetching the customer details');
      },
    });
  }

  //Fitler the Customer table data
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Open dialog for Customer Component
  openDialog() {
    this.dialog.open(CustomerComponent, {
     width:'50%%',
     height:'80%'
    }).afterClosed().subscribe(val => {
      if(val === "save"){
        this.getAllCustomer();
      } //after closing the modal, we are refreshing the tables data by fetching getAllCustomer method
    })
  }

  //PUT Method for editing customer data
  editCustomer(row : any){
    this.dialog.open(CustomerComponent,{
      width:'50%',
      height:'80%',
      data:row
    }).afterClosed().subscribe(val => {
      if(val == "update"){
        this.getAllCustomer();
      }  //if the data is updated, then refresh the getAllCustomer method
    })
  }

  //DELETE Method for Customer
  deleteCustomer(id:number){
    this.api.deleteCustomer(id)
    .subscribe({
      next:(res) =>{
        alert("Customer Details Deleted Successfully");
        this.getAllCustomer(); //after successfully deleting, we are fetching the data using getAllCustomer
      },
      error:()=>{
        alert("Error while deleting the record");
      }
    })
  }
}
