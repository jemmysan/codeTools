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

/**********    Validation email *************/
['required|email|max:255|unique:users'];

/**********    Validation mot de passe *************/
['required|string|min:8|confirmed'];

/************ Try catch for one insertion *******/
try{
    
        //Instruction
}
catch(QueryException $e){
    if($e->getCode() == '23000');
    //Instruction
} 

/************/
try{
        $password = Hash::make($request->password);
        User::create([
            'firstname'=>$request->firstname,
            'lastname'=>$request->lastname,
            'phone'=>$request->phone,
            'email'=>$request->email,
            'password'=>$password 
       ]);
    }catch (QueryException $e) {
        Log::error('Erreur de base de données : ' . $e->getMessage());
        return response()->json(['error' => 'Erreur de base de données'], 500);
    } catch (\Exception $e) {
        Log::error('Erreur : ' . $e->getMessage());
        return response()->json(['error' => 'Une erreur est survenue'], 500);
    }
// QueryException a importer

/*********** Validate ***********/
$validate = $request->validate([
    'column'=> 'required|......'
]);

/*********** Encode image base64 ******/
$imageContents = file_get_contents($request->photo->path());
$base64Image = base64_encode($imageContents);
