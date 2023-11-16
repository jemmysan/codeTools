<?php

/*************** Function Response Request ********/

class ResponseMessage extends Controller
{
    public function succedRequest($result,$message)
    {
        $response = [
            'status'=>200,
            'success'=>true,
            'data'=>$result,
            'message'=>$message
        ];
        return response()->json($response);
    }

    public function errorRequest($message,$status)
    {
        $response = [
            'message'=>$message,
            'status'=>$status
        ];
        return response()->json($response);
    }
}
