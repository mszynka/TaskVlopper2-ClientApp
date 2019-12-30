import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export abstract class CrudService<TModel> {

  private readonly myAppUrl: string;
  private readonly myApiUrl: string;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient, entityName: string) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = `api/${entityName}/`;
  }

  public query(): Observable<TModel[]> {
    return this.http.get<TModel[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  public get(id: number): Observable<TModel> {
    return this.http.get<TModel>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  public add(model: TModel): Observable<TModel> {
    return this.http.post<TModel>(this.myAppUrl + this.myApiUrl, JSON.stringify(model), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  public update(id: number, model: TModel): Observable<TModel> {
    return this.http.put<TModel>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(model), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  public delete(id: number): Observable<TModel> {
    return this.http.delete<TModel>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  private errorHandler(error: { error: { errorMessage: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.errorMessage;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
