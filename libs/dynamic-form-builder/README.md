# DynamicFormBuilder

> This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

> https://github.com/ccarg/ng-dynamic-from-builder

## Using example

### app.component.ts

```
import { Component } from '@angular/core';
import { FormGroup, FormArray} from '@angular/forms';
import { DynamicFormBuilderService } from 'ng-dynamic-form-builder';

@Component({
  selector: 'ng-form-builder-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dfb: DynamicFormBuilderService) {}

  ngOnInit() {
      this.form = this.dfb.ccFormBuilder(this.model)
  }

  model = {
      firstName: 'John',
      lastName: 'Doe',
      address: {
          street:'Main St',
          city:'New York',
          state:'NY',
          zip:'012345',
      },
      aliases: [
          {name:'J', value:'John'},
          {name:'JD', value:'John Doe'}
      ]
  }

  form: FormGroup;

  get aliases(){
      return this.form.get('aliases') as FormArray
  }

  addAlias(){
    this.aliases.push(this.dfb.formBuilder.group({name:[''], value:['']}))
  }

  save(){
      console.warn(this.form.value)
  }  

  updateProfile() {
      this.form.patchValue({
              firstName: 'Nancy',
              address: {
              street: '123 Drew Street'
          }
      });
  }
}
```

### app.component.html

```
<form [formGroup]="form" (ngSubmit)="save()">

    <mat-form-field>
      <input matInput placeholder="firstName" formControlName="firstName" type="text" required>
      <mat-error>field required</mat-error>
    </mat-form-field>
    <mat-form-field>
      <input matInput placeholder="lastName" formControlName="lastName" type="text" required>
      <mat-error>field required</mat-error>
    </mat-form-field>

    <div formGroupName="address">
        <h3>Address</h3>
        <mat-form-field>
          <input matInput placeholder="street" formControlName="street" type="text" required>
          <mat-error>field required</mat-error>
        </mat-form-field>        
        <mat-form-field>
          <input matInput placeholder="city" formControlName="city" type="text" required>
          <mat-error>field required</mat-error>
        </mat-form-field>        
        <mat-form-field>
          <input matInput placeholder="state" formControlName="state" type="text" required>
          <mat-error>field required</mat-error>
        </mat-form-field>        
        <mat-form-field>
          <input matInput placeholder="zip" formControlName="zip" type="number" required>
          <mat-error>field required</mat-error>
        </mat-form-field>        
    </div>        

    <div formArrayName="aliases">
        <h3>Aliases</h3> 
        <button mat-raised-button color="primary" (click)="addAlias()">add alias</button>
        <div *ngFor="let alias of aliases.controls; let i = index">
            <div [formGroupName]="i">
                <p>Alias:</p>
                <mat-form-field>
                  <input matInput placeholder="name" formControlName="name" type="text" required>
                  <mat-error>field required</mat-error>
                </mat-form-field>  
                <mat-form-field>
                  <input matInput placeholder="value" formControlName="value" type="text" required>
                  <mat-error>field required</mat-error>
                </mat-form-field>  
            </div>
        </div>
    </div>

    <p>
        <button mat-raised-button color="primary" (click)="updateProfile()">Update Profile</button>
    </p>          
    <button mat-raised-button color="primary" [disabled]="!form.valid" type="submit">Save</button>
  
    <p>
        Value: {{ form.value | json }}
        Form status: {{form.status}}
    </p>

</form>
```

### app.module.ts

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,   
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```