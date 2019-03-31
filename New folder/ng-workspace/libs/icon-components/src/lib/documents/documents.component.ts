import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Document } from '@icon/icon-models';

@Component({
    selector: 'icon-documents',
    template: `
    <button style="line-height:48px;" mat-icon-button color="primary" matBadge="{{documentsTotal()}}" 
        matBadgeColor="{{edited ? 'accent': 'primary'}}" (click)="openDialog()">
            <mat-icon>attach_file</mat-icon>
    </button>
    `,
    styles: [`
        .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {
            right: -6px!important;
        }
        .mat-badge-medium.mat-badge-after .mat-badge-content {
            right: -6px!important;
        }
        .mat-badge-medium.mat-badge-above .mat-badge-content {
            top: 0px!important;
        }
        .mat-badge-content {
            font-weight: unset!important;
        }    
    `]
})
export class DocumentsComponent implements OnInit {

    @Input() documents: Array<Document> = []
    @Output() documentsEdited = new EventEmitter<Array<Document>>();
    edited = false;

    constructor(public dialog: MatDialog) { }

    ngOnInit() {

    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DocumentsDialog, {
            width: '450px',
            height: '450px',
            data: this.documents
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.edited = result.edited;
            if (this.edited) {
                this.documentsEdited.emit(result.documents)
            }
        });
    }

    documentsTotal() {
        return this.documents.filter(d => d.IsActive).length
    }
}

@Component({
    selector: 'icon-documents-dialog',
    template: `
        <h1 mat-dialog-title>Deal Documents:</h1>
        <div mat-dialog-content style="height: 78%;">
            <mat-list>
                <mat-list-item *ngFor="let doc of documents">                    
                    <mat-icon mat-list-icon color="primary" 
                        [style.color]="doc.IsActive ? '' : '#e0e0e0'">
                            insert_drive_file
                    </mat-icon>                    
                    <h4 mat-line [style.color]="doc.IsActive ? '' : '#e0e0e0'"> {{doc.Name}} </h4>
                    <p mat-line [style.color]="doc.IsActive ? '' : '#e0e0e0'"> {{doc.DateModified | date}} </p>                    
                    <a *ngIf="doc.DocumentId" mat-mini-fab 
                        [disabled]="!doc.IsActive"
                        [href]="doc.DocumentUrl" color="primary">
                        <mat-icon>cloud_download</mat-icon>
                    </a>
                    &nbsp;
                    <button mat-mini-fab 
                        (click)="onBtnDeleteDocumentClick(doc)" color="accent">
                        <mat-icon *ngIf="doc.IsActive">delete_forever</mat-icon>
                        <mat-icon *ngIf="!doc.IsActive">restore_from_trash</mat-icon>
                    </button>
                </mat-list-item>
            </mat-list>            
        </div>
        <div mat-dialog-actions>
            <button mat-button type="button" color="accent">
                <label for="fileToUpload" style="margin-bottom: unset; font-weight: unset; margin-top: 2px;">Add</label>
                <input id="fileToUpload" type="file" style="display:none;" (change)="onFileChange($event)">        
            </button>            
            <button mat-button [mat-dialog-close]="getResult()" cdkFocusInitial color="primary">Close</button> 
            <!--button mat-button (click)="onBtnCancelClick()">Cancel</button-->            
        </div>    
    `,
})
export class DocumentsDialog {

    edited = false;
    constructor(
        public dialogRef: MatDialogRef<DocumentsDialog>,
        @Inject(MAT_DIALOG_DATA) public documents: Array<Document>) { }

    onFileChange(event) {
        this.documents = this.documents || [];

        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (!this.documents.find(d => d.Name === file.name)) {
                    this.documents.push({
                        Name: file.name,
                        Type: file.type,
                        Value: reader.result,
                        DocumentId: '',
                        DocumentUrl: '',
                        DateModified: (new Date()).toString(),
                        IsActive: true
                    });
                    this.edited = true;
                }
            };
        }
    }

    onBtnDeleteDocumentClick(doc: Document) {
        if (doc.DocumentId.length === 36) {
            doc.IsActive = !doc.IsActive;
        }
        else {
            this.documents.splice(this.documents.indexOf(doc), 1);
        }
        this.edited = true;
    }

    getResult() {
        return {
            documents: this.documents,
            edited: this.edited
        }
    }
}
