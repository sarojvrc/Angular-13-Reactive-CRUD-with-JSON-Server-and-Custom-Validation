import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forbiddenNameValidator } from '../custom_validation/name.validator';
import { dateCanNotBeSame } from '../custom_validation/date.validator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})

export class CustomerComponent implements OnInit {
  //create a form
  customerForm!: FormGroup;

  actionBtn: string = 'Save';

  today: Date = new Date();

  //we need to inject the APIService
  constructor(
    private FormBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any, //inject the data into the edit form
    private dialogRef: MatDialogRef<CustomerComponent>
  ) {}

  ngOnInit(): void {

    this.customerForm = this.FormBuilder.group({
      firstName: new FormControl(null, [Validators.required, this.noSpaceAllowed, forbiddenNameValidator(/firstname/)]),
      lastName: new FormControl(null, [Validators.required, this.noSpaceAllowed, forbiddenNameValidator(/lastname/)]),
      dob: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, this.noSpaceAllowed, Validators.email]),
      gender: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
      country: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
      state: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
      city: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
      address: new FormControl(null, [Validators.required]),
      pincode: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
    },{ validators: dateCanNotBeSame('startDate','endDate')});


    if (this.editData) {
      this.actionBtn = 'Update';
      this.customerForm.controls['firstName'].setValue(this.editData.firstName);
      this.customerForm.controls['lastName'].setValue(this.editData.lastName);
      this.customerForm.controls['dob'].setValue(this.editData.dob);
      this.customerForm.controls['email'].setValue(this.editData.email);
      this.customerForm.controls['gender'].setValue(this.editData.gender);
      this.customerForm.controls['country'].setValue(this.editData.country);
      this.customerForm.controls['state'].setValue(this.editData.state);
      this.customerForm.controls['city'].setValue(this.editData.city);
      this.customerForm.controls['address'].setValue(this.editData.address);
      this.customerForm.controls['pincode'].setValue(this.editData.pincode);
      this.customerForm.controls['startDate'].setValue(this.editData.startDate);
      this.customerForm.controls['endDate'].setValue(this.editData.endDate);
    }
  }

  //custom validation for no space
  noSpaceAllowed(control: FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1){
      return {noSpaceAllowed: true}
    }
    return null;
  }

  //Create method for Add Customer
  addCustomer() {
    console.log(this.editData);
    //if the customer form is valid, then we will make a post call
    if (!this.editData) {
      if (this.customerForm.valid) {
        this.api.postCustomer(this.customerForm.value).subscribe({
          next: (res) => {
            alert('Customer Details added successfully!');
            this.customerForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error while adding customer details');
          },
        });
      }
    } else {
      this.updateCustomer();
    }
  }

  //Update Method for Customer
  updateCustomer() {
    this.api.putCustomer(this.customerForm.value, this.editData.id).subscribe({
      next: (res) => {
        console.log(res);
        alert('Customer details updated successfully');
        this.customerForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Error while updating the customer');
      },
    });
  }
}
