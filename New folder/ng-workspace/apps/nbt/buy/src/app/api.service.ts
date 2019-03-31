import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
  HttpHeaders,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Network,
  RateCard,
  DealGrowRow,
  TextValue,
  NationalBuy,
  Deal,
  NetworkDemo
} from '@icon/icon-models';
import { IGridDataRequest, IGridDataResponse } from './server-side-grid/server-side-grid.component';

@Injectable({ providedIn: 'root' })
export class ApiService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  clientList = (): Observable<Array<TextValue>> =>
    this.http.get<Array<TextValue>>('/National/NationalBuy/ClientList');

  brandList = (): Observable<Array<TextValue>> =>
    this.http.get<Array<TextValue>>('/National/NationalBuy/BrandList');

  orderBudgetList = (): Observable<Array<TextValue>> =>
    this.http.get<Array<TextValue>>('/National/NationalBuy/OrderBudgetList');

  buyerList = (): Observable<Array<TextValue>> =>
    this.http.get<Array<TextValue>>('/National/NationalBuy/BuyerList');

  agencyList = (): Observable<Array<TextValue>> =>
    this.http.get<Array<TextValue>>('/National/NationalBuy/AgencyList');

  demoList = (): Observable<Array<TextValue>> =>
    this.http.get<Array<TextValue>>('/National/NationalBuy/DemoList');

  buyList = (): Observable<Array<NationalBuy>> =>
    this.http.get<Array<NationalBuy>>('/National/NationalBuy/BuyList');

  networkList = (): Observable<Array<TextValue>> =>
    this.http.get<Array<TextValue>>('/National/NationalBuy/NetworkList');

  dealList = (): Observable<Array<Deal>> =>
    this.http.get<Array<Deal>>('/National/NationalBuy/DealList');

  networkDemoList = (): Observable<Array<NetworkDemo>> =>
    this.http.get<Array<NetworkDemo>>('/National/NationalBuy/NetworkDemoList');

  yearsList = (): Observable<Array<number>> =>
    this.http.get<Array<number>>('/National/NationalBuy/YearsList');

  buyNetworkDetailList = (): Observable<Array<any>> =>
    this.http.get<Array<any>>(
      '/National/NationalBuy/BuyNetworkDetailList'
    );

  networkByNationalQuarterList = (year: number | string, quarter: number | string, nationalBuyId: number | string): Observable<Array<any>> =>
    this.http.get<Array<any>>(
      `/National/NationalBuy/NetworkByNationalQuarterList?year=${year}&quarter=${quarter}&nationalBuyId=${nationalBuyId}`
    );

  buyNetworkDetailDaypartList = (year: number | string, quarter: number | string, networkId: number | string, buyNetworkId: number | string, demoId: number | string, dealId: number | string): Observable<Array<any>> =>
    this.http.get<Array<any>>(
      `/National/NationalBuy/BuyNetworkDetailDaypartList?year=${year}&quarter=${quarter}&networkId=${networkId}&buyNetworkId=${buyNetworkId}&demoId=${demoId}&dealId=${dealId}`
    );

  save = (
    nationalBuyRows: Array<NationalBuy>
  ): Observable<Array<NationalBuy>> =>
    this.http.post<Array<NationalBuy>>(
      '/National/NationalBuy/Save',
      JSON.stringify(nationalBuyRows),
      { headers: this.headers }
    );


    findLessons = (req: IGridDataRequest): Observable<IGridDataResponse<any>> => {
        return <any>this.http.get('/National/NationalBuy/ClientListTest', {
            params: new HttpParams()
                .set('page', req.page.toString())
                .set('pageSize', req.pageSize.toString())                
                .set('filterField', req.filterField)
                .set('filterValue', req.filterValue)
                .set('sortField', req.sortField)
                .set('sortDirection', req.sortDirection)                
        });
    }    
}

@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true
    });

    return next.handle(request);
  }
}
