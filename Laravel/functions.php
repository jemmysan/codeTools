<?php


/*************** Créer une reference ************/

    function insertOrderNum($model,$idCategorie)
    {
        if($model === 'Article')
            return count(Article::where('categorie_id',$idCategorie)->get())+1;
    }

    function createReference($libelle,$categorie)
    {
        $lib = substr($libelle,0,3);
        $getCat = Categorie::find($categorie);
        $libelleCat = $getCat->libelle;
        $checkDash = strstr($libelleCat,'-')?true:false;
        $cat = '';

        if($checkDash){
            $explodeCat = explode('-',$libelleCat);
            $cat = substr($explodeCat[0],0,1).substr($explodeCat[1],0,2);
        }else{
            $cat = substr($libelleCat,0,3);
        }
        
        $x = $this->insertOrderNum('Article',$getCat->id);
        $refJoined = "ref".$lib.$cat.$x;
        $segment = str_split($refJoined,3);
        $implode = implode('-',$segment);
        $reference = strtoupper($implode);
        return $reference = strtoupper($implode); 
    }



/*************** Reorganiser en ordre ************/

   function incrementation(){
        $colonne = $request->input('nomcolonne');

     Model::where('colonne', '>=', $colonne)
            ->increment('colonne', 1);
    }

/*************** Update Reorganiser en ordre ************/
    function updateIncrementation(Request $request, $id){
        
        request()->validate([
            'colonne'=>'required',
        ]);
        $model = model::findOrFail($id);

        $ordre = $request->input('ordre');
        model::where('ordre','>=',$ordre)
                    ->increment('ordre',1);

        $model->update([
            'colonne'=>$request->input('colonne'),
        ]);

        $reupdatemodels = model::orderBy('ordre')->get();
        foreach ($reupdatemodels as $index => $model) {
            $model->update(['ordre' => $index + 1]);
        }
        return redirect()->back()->with('message','model modifier avec succès !');
    }