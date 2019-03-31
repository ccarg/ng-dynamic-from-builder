import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent, DocumentsDialog } from './documents/documents.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
    imports: [
        CommonModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatBadgeModule
    ],
    declarations: [DocumentsComponent, DocumentsDialog],
    exports: [DocumentsComponent, DocumentsDialog]
})
export class IconDocumentsModule { }



