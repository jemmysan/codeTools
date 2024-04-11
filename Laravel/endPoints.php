<?

Route::prefix('prefix')->group(function (){
    Route::verb('/route',[MyController::class,'methode']);
});