<?php



/********************** Supprimer un enregistrement avec la table d'association ******/

class deleteAssociation
{
    public function delete($id)
    {
        return DB::transaction(function () use($id){
            $model = Model::find($idArticle);
            if($model)
            {
                // $model->associationMethod()->update(['deleted_at' => now()]);
                $association = Association::where('id',$idArticle)->get();
                foreach ($association as $items) {
                    $items->update(['deleted_at' => now()]);
                }
                $model->delete();
                return response()->json(['messages'=>'article supprimé avec succès']);
            }
            else
            {
                return response()->json(['messages'=>'article introuvable']);
            }
        });
    }
}