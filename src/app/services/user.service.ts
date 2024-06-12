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

    createUser(data: any): Observable<any> {
        return this._http.post(`${this.apiUrl}/new`, data);
    }

    createEmployee(data: any): Observable<any> {
        return this._http.post(`${this.apiUrl}/new/employee`, data);
    }

    getUser(id: string): Observable<any> {
        return this._http.get(`${this.apiUrl}/${id}/get`);
    }

    updateUser(id: string, data: UserModel): Observable<any> {
        return this._http.put(`${this.apiUrl}/${id}/edit`, data);
    }

    deleteUser(id: number): Observable<any> {
        return this._http.delete(`${this.apiUrl}/${id}/delete`);
    }

    login(data: any): Observable<any> {
        return this._http.post(`${this.apiUrl}/login`, data);
    }

    checkPassword(id: string, password: string)
    {
        let request = JSON.parse(`{"password":"${password}"}`);

        return this._http.post(`${this.apiUrl}/${id}/checkPwd`, request)
    }

    changePassword(id: string, newPwd: string, newPwd2: string)
    {
        let request = JSON.parse(`{"pwd":"${newPwd}", "pwd2":"${newPwd2}"}`);

        return this._http.put(`${this.apiUrl}/${id}/editPwd`, request);
    }

}