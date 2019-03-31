import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray} from '@angular/forms';

@Component({
  selector: 'icon-dynamic-form-example',
  templateUrl: './dynamic-form-example.component.html',
  styleUrls: ['./dynamic-form-example.component.scss']
})
export class DynamicFormExampleComponent implements OnInit {

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.ccFormBuilder(this.model)
    }

    //this way will not work
    model = {
        firstName: 'fn',
        lastName: 'ln',
        address: {
            street:'st',
            city:'ci',
            state:'sta',
            zip:'zi',
        },
        aliases: [
            {aa:'b2', bb:'b1'},
            {aa:'b3', bb:'b4'}
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

    //define form with builder
    //   form = this.fb.group({
    //       firstName: ['fn', Validators.required],
    //       lastName: ['ln'],
    //       address: this.fb.group({
    //           street:['st'],
    //           city:['ci'],
    //           state:['sta'],
    //           zip:['zi'],
    //       }),
    //       aliases: this.fb.array([
    //           this.fb.group({aa:['b2'], bb:['b1']})
    //       ])
    //   })

    get aliases(){
        return this.form.get('aliases') as FormArray
    }

    addAlias(){
        this.aliases.push(this.fb.group({aa:[''], bb:['']}))
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
