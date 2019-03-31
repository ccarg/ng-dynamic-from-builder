import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Network, RateCard, DealGrowRow } from '@icon/icon-models';

@Injectable({providedIn: 'root'})
export class ApiService {

    headers = new HttpHeaders({ 'Content-Type': 'application/json' }); 

    constructor(private http: HttpClient) { }
    
    networksList = (): Observable<Array<Network>> => this.http.get<Array<Network>>("/National/Deal/NetworksList")

    rateCardsList = (): Observable<Array<RateCard>> => this.http.get<Array<RateCard>>("/National/Deal/RateCardsList")
    
    networkDayparts = (networkId): Observable<Array<RateCard>> => this.http.get<Array<RateCard>>(`/National/Deal/NetworkDayparts?networkId=${networkId}`)

    rateBasis = (): Observable<Array<RateCard>> => this.http.get<Array<RateCard>>("/National/Deal/RateBasis")

    valueTypes = (): Observable<Array<RateCard>> => this.http.get<Array<RateCard>>("/National/Deal/ValueTypes")

    getYears = (): Observable<Array<number>> => this.http.get<Array<number>>("/National/Deal/GetYears")

    getDeals = (): Observable<Array<DealGrowRow>> => this.http.get<Array<DealGrowRow>>("/National/Deal/GetDeals")

    saveDeals = (dealGrowRows: Array<DealGrowRow>): Observable<Array<DealGrowRow>> => this.http.post<Array<DealGrowRow>>("/National/Deal/SaveDeals", JSON.stringify(dealGrowRows), { headers: this.headers })
}

@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            withCredentials: true
        });

        return next.handle(request);
    }
}
