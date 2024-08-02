import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Product {
  product_uin: string;
  product_name: string;
}

interface ModelDetails {
  parent_model: string;
  format: string;
  family: string;
  families: string[];
  parameter_size: string;
  quantization_level: string;
}

export interface Model {
  name: string;
  model: string;
  modified_at: string;
  size: number;
  digest: string;
  details: ModelDetails;
}

interface ModelsResponse {
  models: Model[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private uniqueProductUrl = 'http://192.168.6.161:5000/unique-products';
  private displayProductDetailsUrl = 'http://192.168.6.161:5000/product-details';
  private processQueryUrl = 'http://192.168.6.161:5000/process-query';
  private processSQLQueryUrl = 'http://192.168.6.161:5000/sql-query';
  private processFineTunedUrl = 'http://192.168.6.161:11434/api/generate';
  private ratingQueryUrl = 'http://192.168.6.161:5000/rate-answer';
  private getModelsUrl = 'http://192.168.6.161:11434/api/tags';
  private getTablesUrl = 'http://192.168.6.161:5000/get-sql-tables';

  constructor(private http: HttpClient) { }

  getModels(): Observable<ModelsResponse> {
    return this.http.get<ModelsResponse>(this.getModelsUrl);
  }

  getTables(): Observable<any> {
    return this.http.get<any>(this.getTablesUrl);
  }
  
  getUniqueProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.uniqueProductUrl).pipe(
      catchError(this.handleError)
    );
  }

  getProductDetails(uin: string): Observable<string[]> {
    const url = `${this.displayProductDetailsUrl}/${uin}`;
    return this.http.get<string[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  processQuery(queryData: { query: string; product_uin: string; product_details: string[]; product_count: number }): Observable<any> {
    return this.http.post<any>(this.processQueryUrl, queryData).pipe(
      catchError(this.handleError)
    );
  }
  
  processSQLQuery(queryData: { question: string; tables: string[] }): Observable<any> {
    return this.http.post<any>(this.processSQLQueryUrl, queryData).pipe(
      catchError(this.handleError)
    );
  }

  processFineTunedQuery(queryData: { prompt: string; model: string; stream: boolean, temperature: number }): Observable<any> {
    return this.http.post<any>(this.processFineTunedUrl, queryData).pipe(
      catchError(this.handleError)
    );
  }

  rateAnswer(ratingData: { context: string; query: string; answer: string; rating: number; product_name: string; product_uin: string; product_details: string[] }): Observable<any> {
    return this.http.post<any>(this.ratingQueryUrl, ratingData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}
