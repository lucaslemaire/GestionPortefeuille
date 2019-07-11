import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';

export  type  HandleError = <T> (operation?: string, result?: T)
  => (error: HttpErrorResponse) => Observable<T>;

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor() {
  }

  createHandleError = (serviceName = '') => <T>
  (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result);

  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {

    return (response: HttpErrorResponse): Observable<T> => {
      // Trace de l'erreur dans la console du navigateur
      console.error(response);

      // Affiche une popup à l'écran
      const message = (response.error instanceof ErrorEvent) ?
        response.error.message :
        `server returned code ${response.status} with body "${response.error.error}"`;

      // Il faudrait plutôt ajouter un message dans un fichier log
      alert(message);

      // Renvoie une réponse qui permet à l'application de continuer à fonctionner.
      return of(result);
    };
  }
}
