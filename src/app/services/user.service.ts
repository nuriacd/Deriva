import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8000/user';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        return this.http.get(`${this.apiUrl}/`);
    }

    getClients(): Observable<any> {
        return this.http.get(`${this.apiUrl}/clients`);
    }

    getEmployees(): Observable<any> {
        return this.http.get(`${this.apiUrl}/employees`);
    }

    createUser(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/new`, data);
    }

    getUser(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    updateUser(id: string, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}/edit`, data);
    }

    updatePassword(id: string, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}/editPwd`, data);
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    login(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, data);
    }

    checkPassword(id: string, data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/${id}/checkPwd`, data);
    }
}