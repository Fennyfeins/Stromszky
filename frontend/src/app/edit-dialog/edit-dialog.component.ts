import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss'
})
export class EditDialogComponent implements OnInit{
  inputdata:any;
  myform:any;

  constructor(
    private buildr: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ApiService: ApiService,
  ) {}


  ngOnInit(): void {
    this.inputdata = this.data;

    this.myform = this.buildr.group({
      //id: [this.data.id || ''],
      firstname: [this.data.firstname || ''],
      surname: [this.data.surname || ''],
      dateOfBirth: [this.data.dateOfBirth || ''],
      phone: [this.data.phone || ''],
      street: [this.data.street || ''],
      number: [this.data.number || ''],
      postalCode: [this.data.postalCode || ''],
      city: [this.data.city || ''],
      iban: [this.data.iban || '']
    });
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  saveUser() {
    this.ApiService.createCustomer(this.myform.value).subscribe(response=>{
      this.onSave();
    });
  }

  editUser() {
    this.ApiService.updateCustomer(this.myform.value.id, this.myform.value).subscribe(response=>{
      this.onSave();
    });
  }

  onSubmit(): void {
    if (this.data?.title === 'Edit Customer') {
      console.log('editUser');
      this.editUser();
    } else {
      console.log('addUser');
      this.saveUser();
    }
  }
}