import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare var $: any;

@Injectable({
  providedIn: 'root'
})



export class ContactService {
    private URL_API = `https://localhost:8001/contact`

    constructor(
        private _http: HttpClient
    ) { }

    sendEmail(name: string, email: string, cv: File, issue: string): Observable<boolean>
    {
        let request = JSON.parse(`{"name":"${name}","email":"${email}","cv":"${cv}","issue":"${issue}"`);

        return this._http.post(this.URL_API, request).pipe(
            map(x => {
                return x == true ? true : false;
            })
          );

    }
}