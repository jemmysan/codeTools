
//************ Rechercher un element dans un tableau ********/
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



//**************** function gerer un bouton Toggle ********/
 function  toggle(){
    // la (isToggle) variable est boolean et est innitialisée a false
    this.isToggle = !this.isToggle;
    if(!this.isToggle)
    {
        console.log('toggled')
    }
    else
    {
      console.log('not toggled');
    }
  }