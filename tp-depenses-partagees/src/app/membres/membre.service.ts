import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {Membre} from './membre';
import {MEMBRES} from './membres-mock';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {HandleError, HttpErrorHandlerService} from '../shared/http-error-handler.service';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MembreService {
  private readonly apiUrl = environment.apiUrl;
  private membresUrl = this.apiUrl + 'membres';
  private handleError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandlerService) {
    this.handleError =
      httpErrorHandler.createHandleError('MembreService');
  }

  getMembres(): Observable<Membre[]> {
    return this.http.get<any>(this.membresUrl)
      .pipe(
        tap(result => console.log(result)),
        map(result => result.data),
        catchError(this.handleError('getMembres', []))
      );
  }

  getMembreDetail(id: number): Observable<Membre> {
    return this.http.get<any>(this.membresUrl + `/${id}`)
      .pipe(
        catchError(this.handleError('getMembreDetail', {}))
      );
  }
}
