## Angular Dynamic Rective Form Builder Helper  

You can use the [editor on GitHub](https://github.com/ccarg/ng-dynamic-from-builder/edit/master/README.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

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

