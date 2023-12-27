
/**** 1) Ajouter check dans l'interface *****/

/****** Declaration des variables *******/
let checkAll : boolean = false;
let selectedCatIds : any[] = [];

/******************************* */

function checkAllCheckBoxes()
  {
      for(let item of this.listCat){
          item.checked = this.checkAll
      }
      this.updateCheckAllState();
      this.getSelectedIds();
  }

function updateCheckAllState()
  {
      this.checkAll = this.listCat.every(item =>item.checked);
  }

function checkSingleCheckBox(){
    this.updateCheckAllState();
    this.getSelectedIds();
  }

function getSelectedIds()
  {
    this.selectedCatIds = this.listCat.filter(
      item =>item.checked).map(
        item=>item.id
    )
    console.log(this.selectedCatIds)
  }