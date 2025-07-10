import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  //atributos
  //baseUri: string = 'http://localhost:5000/api';
  baseUri: string = 'https://backend-peliculas-zoa9.onrender.com/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }

  //metodo para agregar una pelicula
  agregarPelicula(data: any):Observable<any> {
    let url = `${this.baseUri}/agregar`;
    console.log('Enviando datos a:', url);
    console.log('Datos:', data);
    return this.http.post(url, data, {headers: this.headers})
    .pipe(
      map((res: any) => {
        console.log('Respuesta del servidor:', res);
        return res;
      }),
      catchError(this.errorManager)
    );
  }

  //metodo para obtener todas las peliculas
  getPeliculas() {
    let url = `${this.baseUri}/peliculas`;
    return this.http.get(url);
  }

  //metodo para obtener una pelicula por id
  getPelicula(id:any): Observable<any> {
    let url = `${this.baseUri}/pelicula/${id}`;
    return this.http.get(url, {headers: this.headers})
                .pipe(map((res:any) => {
                  return res || {};
                }),
                catchError(this.errorManager)
              );
  }

  //metodo para actualizar una pelicula
  actualizarPelicula(id:any,data:any): Observable<any> {
    let url = `${this.baseUri}/actualizar/${id}`;
    return this.http.put(url, data, {headers: this.headers})
            .pipe(catchError(this.errorManager));
  }

  //metodo para eliminar una pelicula
  eliminarPelicula(id:any): Observable<any> {
    let url = `${this.baseUri}/eliminar/${id}`;
    return this.http.delete(url, {headers: this.headers})
            .pipe(catchError(this.errorManager));
  }

  //manejador de errores
  errorManager(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //obtenemos el error del lado del cliente
      errorMessage = error.error.message;
    } else {
      //obtenemos el error del lado del servidor
      errorMessage = `Error: ${error.status} /n Mensaje: ${error.message}`;
    }
    console.error('Error en la petición HTTP:', errorMessage);
    console.error('Error completo:', error);
    return throwError(() => {
      return errorMessage;
    })
  }
}
