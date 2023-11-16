<?php

/*********** LIKE ********/
return Model::where('first_name','like','%'.$keyWord.'%');


/********** Inserer plusiurs fois dans une table d'association *******/
$table->methode()->attach($request->tabRequest);
