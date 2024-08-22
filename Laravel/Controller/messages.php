<? 


    function resourceAlreadyExiste($message){
        $response = [
            'error'=>$message,
            'status'=>409
        ];
        return response()->json($response);
    }

    function succedRequest($message)
    {
        $response = [
            'status'=>200,
            'success'=>true,
            'message'=>$message
        ];
        return response()->json($response);
    }