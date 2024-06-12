import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  //función que abre un snackbar con el mensaje pasado por parámetros
  openSnackBar(message:string){
    this._snackBar.open(message, '', {
      duration:2000, 
      verticalPosition: 'top'
    });
  }
}
