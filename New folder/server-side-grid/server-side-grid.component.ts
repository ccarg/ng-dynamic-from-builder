import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, Injectable, Input} from '@angular/core';
import {MatPaginator, MatSort} from "@angular/material";
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {catchError, finalize} from "rxjs/operators";
import { fromEvent, merge, BehaviorSubject, of, Observable } from 'rxjs';

export interface IGridDataRequest{
    page: number; 
    pageSize: number; 
    filterValue: string; 
    filterField: string; 
    sortField: string; 
    sortDirection: 'asc' | 'desc' | any
}

export interface IGridDataResponse<T> {
    data: Array<T>;
    rows: number;
}

export interface IGridDataRequestCallback<T> {
    ( request: IGridDataRequest ) : Observable<IGridDataResponse<T>>;
}

export class GridDataSource<T> implements DataSource<T> {

    private dataSubject = new BehaviorSubject<T[]>([]);
    private rowsSubject = new BehaviorSubject<number>(0);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public rows$ = this.rowsSubject.asObservable();

    constructor() {}

    loadData(request: IGridDataRequest, serviceCallback: IGridDataRequestCallback<T>) {

        this.loadingSubject.next(true);

        serviceCallback(request)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((res:IGridDataResponse<T>) => {
                this.dataSubject.next(res.data)
                this.rowsSubject.next(res.rows)
            });
    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
        this.rowsSubject.complete();
    }

}

@Component({
    selector: 'server-side-grid',
    templateUrl: './server-side-grid.component.html',
    styleUrls: ['./server-side-grid.component.scss']
})
export class ServerSideGridComponent implements OnInit, AfterViewInit {

    dataSource: GridDataSource<any>;
    @Input() columns= [];
    @Input() pageSize= [5 , 10, 25];
    @Input() loadDataCallback : IGridDataRequestCallback<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('input') input: ElementRef;

    constructor() {}

    ngOnInit() {
        this.dataSource = new GridDataSource<any>();
        let req : IGridDataRequest = {
            page: 1, 
            pageSize: 5, 
            filterField: '', 
            filterValue: '',             
            sortField: '',
            sortDirection: 'asc' 
        }
        this.loadDataCallback && this.dataSource.loadData(req, this.loadDataCallback);
    }

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadPage();
                })
            )
            .subscribe();

        merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadPage())
        )
        .subscribe();
    }

    loadPage() {
        this.loadDataCallback && this.dataSource.loadData({
           page: this.paginator.pageIndex,
           pageSize: this.paginator.pageSize,
           filterField: 'name',
           filterValue: this.input.nativeElement.value,
           sortField: 'DateCreated',
           sortDirection: this.sort.direction           
        }, this.loadDataCallback);
    }
}