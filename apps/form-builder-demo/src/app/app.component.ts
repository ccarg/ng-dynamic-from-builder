import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'ng-form-builder-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
      this.form = this.ccFormBuilder(this.model)
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

  isObject = val => typeof val === 'object' && !Array.isArray(val);
  isString = val => typeof val === 'string' || val instanceof String;
  isObjectArray = val => Array.isArray(val) && !this.isString(val)

  ccFormBuilder = (obj = {}, group : any = this.fb.group({})) => Object.entries(obj)
      .reduce(
          (result, [key,val]) => {
              if(this.isObject(val)){
                  let newGroup = this.ccFormBuilder(val, this.fb.group({}))
                  this.isObjectArray(result)
                      ? result.push(newGroup)
                      : result.controls[key] = newGroup;
              }
              else if (Array.isArray(val)){
                  let newArray = Object.values(this.ccFormBuilder(val, []))
                  result.controls[key] = this.fb.array(newArray)
                  
              }
              else{                
                  result.controls[key] = this.fb.control(val)
              }
              return result;
          }
          , group
      )      

  get aliases(){
      return this.form.get('aliases') as FormArray
  }

  addAlias(){
    this.aliases.push(this.fb.group({name:[''], value:['']}))
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
