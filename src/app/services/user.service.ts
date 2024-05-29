import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8001/user';

    constructor(
        private _http: HttpClient
    ) { }

    getUsers(): Observable<UserModel[]> {
        return this._http.get<UserModel[]>(`${this.apiUrl}/`);
    }

    getClients(): Observable<UserModel[]> {
        return this._http.get<UserModel[]>(`${this.apiUrl}/clients`);
    }

    getEmployees(): Observable<EmployeeModel[]> {
        return this._http.get<EmployeeModel[]>(`${this.apiUrl}/employees`);
    }

    createUser(data: UserModel): Observable<any> {
        return this._http.post(`${this.apiUrl}/new`, data);
    }

    getUser(id: string): Observable<UserModel> {
        return this._http.get<UserModel>(`${this.apiUrl}/${id}`);
    }

    updateUser(id: string, data: UserModel): Observable<any> {
        return this._http.put(`${this.apiUrl}/${id}/edit`, data);
    }

    updatePassword(id: string, data: any): Observable<any> {
        return this._http.put(`${this.apiUrl}/${id}/editPwd`, data);
    }

    deleteUser(id: string): Observable<any> {
        return this._http.delete(`${this.apiUrl}/${id}`);
    }

    login(data: any): Observable<any> {
        return this._http.post(`${this.apiUrl}/login`, data);
    }

    checkPassword(id: string, data: any): Observable<any> {
        return this._http.post(`${this.apiUrl}/${id}/checkPwd`, data);
    }
}