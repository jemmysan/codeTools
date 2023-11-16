<?php


/*************** Créer une reference ************/
    function createReference($libelle,$categorie)
    {
        $lib = substr($libelle,0,3);
        $getCat = Categorie::find($categorie)->libelle;
        $checkDash = strstr($getCat,'-')?true:false;
        $cat = '';

        if($checkDash){
            $explodeCat = explode('-',$getCat);
            $cat = substr($explodeCat[0],0,1).substr($explodeCat[1],0,2);
        }else{
            $cat = substr($getCat,0,3);
        }

        $x = count(Article::where('categorie_id',$categorie)->get())+1;
        $refJoined = "ref".$lib.$cat.$x;
        $segment = str_split($refJoined,3);
        $implode = implode('-',$segment);
        $reference = strtoupper($implode);
        return $reference = strtoupper($implode); 
    }