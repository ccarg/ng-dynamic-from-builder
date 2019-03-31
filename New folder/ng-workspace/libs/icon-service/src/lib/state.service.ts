import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MessageBoxComponent } from '@icon/icon-components';

@Injectable({
  providedIn: 'root'
})
export class StateService {
    constructor(public snackBar: MatSnackBar) { }

    set = (name: string, obj: any) => localStorage.setItem(name, JSON.stringify(obj));

    get = (name: string): any => JSON.parse(localStorage.getItem(name))

    clear = (name: string) => localStorage.removeItem(name);

    openCustomMessage = (message: string[]) => this.snackBar.openFromComponent(MessageBoxComponent, { data: { message: message }, duration: 10000 });

    showMessage = (message: string, action: string) => this.snackBar.open(message, action, { duration: 2000 });
}
