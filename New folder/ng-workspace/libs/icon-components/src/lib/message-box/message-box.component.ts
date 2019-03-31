import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
    selector: 'icon-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent {

    constructor(
        public snackRef: MatSnackBarRef<MessageBoxComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    }

    close() {
        this.snackRef.dismiss()
    }

}
