import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule } from '@angular/material';
import { MessageBoxComponent } from './message-box/message-box.component';
import { ListSelectorComponent } from './list-selector/list-selector.component';
import { DocumentsComponent, DocumentsDialog } from './documents/documents.component';
import { MultiSelectorComponent } from './multi-selector/multi-selector.component';
import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { GridCellInputComponent } from './grid-cell-input/grid-cell-input.component';
import { GridCellSelectComponent } from './grid-cell-select/grid-cell-select.component';
import { IconPipesModule } from '@icon/icon-pipes';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatBadgeModule,
        MatDialogModule,
        MatChipsModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatGridListModule,
        ScrollDispatchModule,
        MatTableModule,
        CdkTableModule,
        IconPipesModule
    ],
    declarations: [
        MessageBoxComponent,
        DocumentsComponent,
        DocumentsDialog,
        MultiSelectorComponent,
        ListSelectorComponent,
        GridCellInputComponent,
        GridCellSelectComponent
    ],
    providers: [
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [ENTER, COMMA]
            }
        }
    ],
    exports: [
        MessageBoxComponent,
        DocumentsComponent,
        DocumentsDialog,
        MultiSelectorComponent,
        ListSelectorComponent,
        GridCellInputComponent,
        GridCellSelectComponent        
    ]
})
export class IconComponentsModule { }
