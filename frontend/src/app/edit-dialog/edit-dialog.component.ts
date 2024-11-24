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

    this.myform=this.buildr.group({
      id:this.buildr.control(''),
      firstname:this.buildr.control(''),
      surname:this.buildr.control(''),
      dateOfBirth:this.buildr.control(''),
      phone:this.buildr.control(''),
      street:this.buildr.control(''),
      number:this.buildr.control(''),
      postalCode:this.buildr.control(''),
      city:this.buildr.control(''),
      iban:this.buildr.control('')
    })
  }

  onSave(): void {
    this.dialogRef.close('Save Button');
  }

  SaveUser() {
    this.ApiService.createCustomer(this.myform.value).subscribe(response=>{
      this.onSave();

    });
  }
}