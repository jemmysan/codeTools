
/********** Recuperer l'element de l'option du select *****/
function getSelectContent(catSelect? : HTMLSelectElement)
{
    let selectedOption = catSelect?.options[catSelect.selectedIndex];
    let cat = selectedOption?.text;
}