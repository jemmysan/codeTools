
/************* Supprimer un element present dans un tableau d'objets d'un autre tableau ****/

function removeIdOfArrayToAnother(ArraySource=[], ArrayTarget=[]){
    // let ids = ArraySource.map(item => item.clé);
    // return ArrayTarget.filter(element=> !ids.includes(element.clé));
}


/************* Supprimer un element d'un tableau ******/
function removeIdFromArray(id : never, arrayTarget = [])
{
    let index = arrayTarget.indexOf(id);
    return arrayTarget.splice(index,1);
}



/************* Supprimer un element d'un tableau d'objet ******/

function removeMenu(id: number, arrayTarget: any[]) {
    let newArray = arrayTarget.filter(item => item.id !== id);
    this.gottenMenu = this.getMenuFormLocalStorage(newArray); 
}