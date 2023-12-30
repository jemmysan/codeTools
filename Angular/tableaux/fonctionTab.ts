
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