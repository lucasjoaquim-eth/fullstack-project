import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EventService {
  readonly endpoint = environment.urlEvent + "event";
  readonly httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  constructor(private http: HttpClient) {}

  getById(Id: number): Observable<Event> {
    return this.http.get<Event>(`${this.endpoint}/${Id}`);
  }

  get(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.endpoint}`);
  }
}
