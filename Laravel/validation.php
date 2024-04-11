<?php

/**********   Regex ********/

        //----- Alphabet and dash ---------
['required|min:3|regex:/^[a-zA-Z-]+$/'];

        //----- Alphabet only ---------
['min:2|regex:/^[a-zA-Z]+$/]'];

        //----- Alphabet et accents + caracteres speciaux ---------
['required|min:3|regex:/^[\pL\s\-]+$/u'];

        //-----  ---------
['required|regex:/^\d{4}-\d{4}$/|max:9|min:9'];


/**********    Validation image *************/
['required|image|mimes:jpeg,png,jpg,gif,svg|max:{$taille}'];


/************ Try catch for one insertion *******/
try{
    
        //Instruction
}
catch(QueryException $e){
    if($e->getCode() == '23000');
    //Instruction
} 

// QueryException a importer

/*********** Validate ***********/
$validate = $request->validate([
    'column'=> 'required|......'
]);

/*********** Encode image base64 ******/
$imageContents = file_get_contents($request->photo->path());
$base64Image = base64_encode($imageContents);
