
function search()
  {
    if(this.typedValue =="")
    {
        this.ngOnInit()
    }
    else
    {
      this.listCat = this.listCat.filter(res=>{
          return res.libelle.toLowerCase().match(this.typedValue.toLowerCase());
      })
    }
  }