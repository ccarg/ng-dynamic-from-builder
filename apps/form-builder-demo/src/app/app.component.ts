import { Component } from '@angular/core';
import { FormGroup, FormArray} from '@angular/forms';
import { DynamicFormBuilderService } from '@ng-form-builder/dynamic-form-builder';

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
      title: null,
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
