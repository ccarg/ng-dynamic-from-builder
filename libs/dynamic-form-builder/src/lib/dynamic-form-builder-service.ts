import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class DynamicFormBuilderService{

    constructor(private fb: FormBuilder) {}

    isObject = val => typeof val === 'object' && !Array.isArray(val);
    isString = val => typeof val === 'string' || val instanceof String;
    isObjectArray = val => Array.isArray(val) && !this.isString(val)

    ccFormBuilder = (obj = {}, group : any = this.fb.group({})) => Object.entries(obj)
        .reduce(
            (result, [key,val]) => {
                if(this.isObject(val)){
                    const newGroup = this.ccFormBuilder(val, this.fb.group({}))
                    this.isObjectArray(result)
                        ? result.push(newGroup)
                        : result.controls[key] = newGroup;
                }
                else if (Array.isArray(val)){
                    const newArray = Object.values(this.ccFormBuilder(val, []))
                    result.controls[key] = this.fb.array(newArray)
                    
                }
                else{                
                    result.controls[key] = this.fb.control(val)
                }
                return result;
            }
            , group
        )      

    get formBuilder () : FormBuilder {
        return this.fb
    }
}