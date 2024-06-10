import { UserModel } from '../models/user.model';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrl: './my-data.component.css'
})
export class MyDataComponent {
  userForm: FormGroup;
  
  id: string = '';

  constructor(
      private _userService: UserService,
      private formBuilder: FormBuilder,
      private _dialogRef: MatDialogRef<MyDataComponent>,
      private _dialog: MatDialog, 

      @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[9867][0-9]{8}$')]],
    }); 
  }

  ngOnInit(): void {
    if (this.data && this.data["id"]) {
      this.id = this.data["id"];
      this.loadUserData();
    }
  }

  loadUserData(): void {
    const subscripcion = this._userService.getUser(this.id).subscribe({
      next:(data: UserModel) =>{
        this.userForm.patchValue(data);
      },
      complete: () => {
        subscripcion.unsubscribe()
      },
      error: console.log
    })
  }

  submitForm()
  {
    if (this.userForm.valid) {
      this.updateUser();
    } else {
      console.log('Formulario no válido');
    }
    
    
  }

  updateUser() {
    const userData = this.userForm.value;
    
    const subscription = this._userService.updateUser(this.id, userData).subscribe({
      next: (data) => {
        console.log('Usuario actualizado');
        this._dialogRef.close();
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: (error) => {
        console.log(error);
        /*this._snackBar.open(error, '', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });*/
      }
    });
  }

  openPwd() {
    let dialogRef;
    dialogRef = this._dialog.open(ChangePasswordComponent);
    
  }

  
}
