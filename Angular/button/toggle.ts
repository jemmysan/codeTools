
//***** Changer etat en edit ou ajouter */
function toggle(){
    this.isToggle = !this.isToggle;
    if(this.isToggle){
        this.bgButton = 'bg-yellow-400';
        this.buttonAddOrEdit = 'Modifier';
    }else{
      this.bgButton = "bg-blue-800";
      this.buttonAddOrEdit = 'Ajouter';
    }
  }