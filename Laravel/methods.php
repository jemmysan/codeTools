<?php

/****************** Supprimer un enregistrement *******/

/********************** Supprimer un enregistrement avec la table d'association ******/

class deleteOrRestore
{
    /********************** Supprimer un enregistrement avec la table d'association ******/
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


    /********************** Supprimer un enregistrement simple ******/
    public function deleteOne($id){
        $model = Model::find($id);
        if($model){
            $model->delete();
            return 'message';
        }else{
            return 'message';
        }
    }


    public function restore($id){
        $model = Model::onlyTrashed()->where('id',$id)->first();
        if($Model){
            $model->restore();
            return 'message';
        }else{
            return 'message';
        }
    }
}