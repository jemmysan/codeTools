<?php


//********* Expemple de register avec la création du token *******/
function  register(Request $request){
    $fields  = $request->validate([
        'name'=>'required',
        'email'=>'required|email|unique:users',
        'password'=>'required|confirmed'
    ]);
     
    $user = User::create($fields);
    $token = $user->createToken($request->name);
       
    return [
        "user"=>$user,
        "token"=>$token
    ];
    return response()->json('Post added successfully');
    
}




//********* Expemple de login avec la création du token *******/

function  login(Request $request){
    $request->validate([
        'email'=>'required|email|exists:users',
        'password'=>'required'
    ]);

    $user = User::where('email',$request->email)->first();
    if(!$user || !Hash::check($request->password,$user->password)){
        return response()->json('The provided credentials are incorrect ! ');
    };

    $token = $user->createToken($user->name);
    return [
        "user"=>$user,
        "token"=>$token->plainTextToken
    ];

}



//********* Exemple de logout avec la suppression du token *******/

function  logout(Request $request){
        
    $request->user()->tokens()->delete();
    return ["message"=> "You are logged out"];
}