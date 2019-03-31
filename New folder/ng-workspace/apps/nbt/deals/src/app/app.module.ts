import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule, MatSortModule, MatPaginatorModule, MatSelectModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

import { RateCardFilterPipe } from './pipes.pipe';
import { WithCredentialsInterceptor } from './api.service';
import { IconPipesModule } from '@icon/icon-pipes'
import { IconServiceModule } from '@icon/icon-service'
import { IconComponentsModule, MessageBoxComponent, DocumentsDialog } from "@icon/icon-components"
import { DealsGridComponent } from './deals-grid/deals-grid.component';
import { StateService } from 'libs/icon-service/src/lib/state.service';

@NgModule({
    declarations: [
        AppComponent,
        DealsGridComponent,
        RateCardFilterPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,

        BrowserAnimationsModule,
        FormsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDividerModule,
        MatTableModule,
        CdkTableModule,
        MatInputModule,
        MatSortModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatBadgeModule,
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule,
        MatMenuModule,
        MatTabsModule,
        MatTooltipModule,
        MatDialogModule,
        MatListModule,

        IconPipesModule,
        IconServiceModule,
        IconComponentsModule
    ],
    providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: WithCredentialsInterceptor,
            multi: true
        },
        StateService
    ],
    entryComponents: [MessageBoxComponent, DocumentsDialog],
    bootstrap: [AppComponent]
})
export class AppModule { }