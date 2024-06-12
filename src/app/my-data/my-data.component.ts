import { UserModel } from '../models/user.model';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { EmployeeModel } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrl: './my-data.component.css'
})
export class MyDataComponent {
  userForm: FormGroup;
  error: string | null = null;
  id: string = '';
  restaurants: any;

  constructor(
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private _http: HttpClient,
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

  ngOnInit(): void 
  {
    if (this.data && this.data["id"]) {
      this.id = this.data["id"];
      this.loadUserData();
    }

    if (this.data.employee) {
      this.loadRestaurants();
    }
  }

  loadUserData(): void 
  {
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

  loadRestaurants() 
  {
    const subscription = this._http.get<any>('assets/json/provinces.json').subscribe({
      next: (data) => {
        this.restaurants = Object.values(data.provinces).flat();
      }, complete: () => {
        subscription.unsubscribe();
      }, error: console.log
    });
  }

  submitForm()
  {
    this.error = null;

    if (this.userForm.valid) {
      if (this.data && this.data.id) {
        this.updateUser();
      } else {
        this.createUser();
      }
    } else {
      console.log('Formulario no válido');
    }
    
  }

  updateUser() 
  {
    const userData = this.userForm.value;
    
    const subscription = this._userService.updateUser(this.id, userData).subscribe({
      next: (data) => {
        console.log('Usuario actualizado');
        this._dialogRef.close(true);
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openPwd() 
  {
    let dialogRef;
    dialogRef = this._dialog.open(ChangePasswordComponent);
    
  }

  createUser() 
  {
    if (this.data.employee) {
      this.createEmployee()
    } else {
      this.createClient()
    }    
  }

  createEmployee() 
  {
    const restaurant = (document.getElementById("restaurant") as HTMLSelectElement).value;

    if (restaurant == 'no') {
      this.error = "Debe seleccionar un restaurante"
      return
    }

    let data = {
      "email": this.userForm.value.email,
      "name": this.userForm.value.name,
      "phone": this.userForm.value.phone,
      "restaurant": restaurant,
      "password": '@Password1!',
      "password2": '@Password1!',
    }
  
    const subscription = this._userService.createEmployee(data).subscribe({
      next: (data) => {
        console.log('Usuario creado');
        this._dialogRef.close(true);
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: (error) => {
        this.error = "El email ya está en uso"
      }
    });
  }

  createClient() 
  {
    const userData = this.userForm.value;

    const subscription = this._userService.createUser(userData).subscribe({
      next: (data) => {
        console.log('Usuario creado');
        this._dialogRef.close(true);
      },
      complete: () => {
        subscription.unsubscribe();
      },
      error: (error) => {
        this.error = "El email ya está en uso"
      }
    });
  }
}
