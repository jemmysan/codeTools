<?php

/**********   Regex ********/
['required|min:3|regex:/^[a-zA-Z-]+$/'];

['min:2|regex:/^[a-zA-Z]+$/]'];

['required|regex:/^\d{4}-\d{4}$/|max:9|min:9'];

/************ Try catch for one insertion *******/
try{
    
        //Instruction
}
catch(QueryException $e){
    if($e->getCode() == '23000');
    //Instruction
} 


/*********** Validate ***********/
$validate = $request->validate([
    'column'=> 'required|......'
]);
