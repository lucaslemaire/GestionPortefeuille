import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HandleError, HttpErrorHandlerService} from '../shared/http-error-handler.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Depense} from './depense';
import {Observable} from 'rxjs';
import {catchError, map,  tap} from 'rxjs/operators';
import {Membre} from '../membres/membre';
import {AuthGuard} from '../auth/auth-guard';
import {User} from '../auth/user.model';
import {AuthService} from '../auth/auth.service';
import {Participant} from './participant';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class DepenseService {

  private readonly apiUrl = environment.apiUrl;
  private membre: Membre;
  private depensesUrl = this.apiUrl + 'depenses';
  private participantsUrl = this.depensesUrl + '/participant';
  private handleError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandlerService, private auth: AuthService) {
    this.handleError =
      httpErrorHandler.createHandleError('DepenseService');
  }

  getDepenses(): Observable<Depense[]>{
    return this.http.get<any>(this.depensesUrl)
      .pipe(
        tap(result => console.log(result)),
        map(result => result.data),
        catchError(this.handleError('getDepenses', []))
      );
  }

  getDepenseDetail(id: number): Observable<Depense> {
    return this.http.get<any>(this.depensesUrl + `/${id}`)
      .pipe(
        catchError(this.handleError('getDepenseDetail', {}))
      );
  }

  addDepense(depense: Depense): Observable<{} | Depense > {
    const request = JSON.stringify({
        date_depense: depense.date_depense,
        membre_id: this.auth.currentUser.id,
        montant: depense.montant,
        description: depense.description
      }
    );
    return this.http.post(this.depensesUrl, request, httpOptions)
      .pipe(
        map((response: Depense) => {
          return response;
        }),
        catchError(this.handleError('onAddDepense', {}))
      );
  }

  editDepense(depense: Depense, id: number): Observable<{} | Depense > {
    const request = JSON.stringify({
      date_depense: depense.date_depense,
      membre_id: depense.acheteur,
      montant: depense.montant,
      description: depense.description
    });
    return this.http.put(this.depensesUrl + `/${id}`, request, httpOptions).pipe(
      map((response: Depense) => {
        return response;
        }),
      catchError(this.handleError('onEditDepense', {}))
    );
  }

  deleteDepense(depense: Depense): Observable <{} | Depense > {
    return this.http.delete(this.depensesUrl + '/' + depense.id, httpOptions).pipe(
      map((response: Depense) => {
        return response;
      }),
      catchError(this.handleError('onDeleteDepense', {}))
    );
  }

  addParticipant(participant: Participant, id: number): Observable<{} | Participant > {
    const request = JSON.stringify({
      membre_id: participant.membre_id,
      depense_id: id,
      quote_part: participant.quote_part
    });
    return this.http.post(this.participantsUrl, request, httpOptions).pipe(
      map((response: Participant) => {
        return response;
        }),
      catchError(this.handleError('onAddParticipant', {}))
    );
  }

  deleteParticipant(participant: Participant, idDepense: number): Observable<{} | Participant > {
    return this.http.delete(this.participantsUrl + '/' + participant.membre_id + '/' + idDepense, httpOptions).pipe(
      map((response: Participant) => {
        return response;
      }),
      catchError(this.handleError('onDeleteParticipant', {}))
    );
  }

}
