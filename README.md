## Angular 7 Dynamic Rective Form Builder Helper  

Simple way to build data model FormGroup  

### How ro run:
- clone repository 
- npm install
- ng serve --project=form-builder-demo

```markdown

form: FormGroup;

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

```

