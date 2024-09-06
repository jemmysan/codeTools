<?php

/*********** LIKE pour un filtre ********/
return Model::where('attribut','like','%'.$keyWord.'%');


/********** Inserer plusiurs fois dans une table d'association *******/
$table->methode()->attach($request->tabRequest);


/********** Voir les elements supprimée avec softDelte *******/
$Model::onlyTrashed()->latest()->get();

