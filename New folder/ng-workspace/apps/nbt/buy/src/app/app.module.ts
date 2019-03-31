import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { AppComponent } from './app.component';
import { BuyGridComponent } from './buy-grid/buy-grid.component';
import { WithCredentialsInterceptor } from './api.service';
import { BuyEditComponent } from './buy-edit/buy-edit.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule, MatAutocompleteModule, MatSnackBarModule, MatProgressSpinnerModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule, MatSortModule, MatPaginatorModule, MatSelectModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import { IconComponentsModule } from '@icon/icon-components';
import { IconPipesModule } from '@icon/icon-pipes';
import { BuyNetworkGridComponent } from './buy-network-grid/buy-network-grid.component';
import { DialogBuyNetworkDetailsComponent } from './dialog-buy-network-details/dialog-buy-network-details.component';
import {MatDialogModule} from '@angular/material';
import { ServerSideGridComponent } from './server-side-grid/server-side-grid.component';
import { DynamicFormExampleComponent } from './dynamic-form-example/dynamic-form-example.component';


@NgModule({
    declarations: [AppComponent, BuyGridComponent, BuyEditComponent, BuyNetworkGridComponent, DialogBuyNetworkDetailsComponent, ServerSideGridComponent, DynamicFormExampleComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatTooltipModule,
        MatIconModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        CdkTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule,
        MatProgressBarModule,
        MatButtonModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatGridListModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        IconComponentsModule,
        IconPipesModule                
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: WithCredentialsInterceptor,
            multi: true
        },
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [ENTER, COMMA]
            }
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [DialogBuyNetworkDetailsComponent]
})
export class AppModule { }
