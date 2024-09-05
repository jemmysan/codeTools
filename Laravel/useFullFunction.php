<?php


/********************* DB TRANSACTION  ***************/
$existArticle = Article::where('libelle', $libelle)->first();

if (!$existArticle) {
    return DB::transaction(function () use ($request) {
        $article = Article::create([
            'libelle' => $request->libelle,
            'prix' => $request->prix,
            'stock' => $request->stock,
            'categorie' => $request->categorie,
            'photo' => $request->photo
        ]);

        return $article->fournisseurs()->attach($request->fournisseurs);
    });
} else {
    return DB::transaction(function () use ($request, $existArticle) {
        // Utiliser l'ID de l'article existant pour associer les fournisseurs
        return $existArticle->fournisseurs()->attach($request->fournisseurs);
    });
};


/*--------------- Supprimer id d'une relation one to many ou le 
many a migré -------*/

function delete($id)
{
    Indicateur::where('mesure_id',$id)->update(['mesure_id'=>null]);
    $mesure = UniteMesure::find($id);
    $mesure->delete();
    return redirect()->back()->with('success', 'Unité de mesure supprimée avec succès !');
}



/************ Fonction filtre affiche la les indicateur avec la plus recente ajoutée *****/
function __construct(){

    return $this->suivies = StartupIndicateur::with(['startup', 'indicateur.mesure'])
    ->get()
    ->groupBy('startup_id')
    ->map(function ($group) {
        return $group->sortByDesc('date')->first();
    })
    ->map(function ($item) {
        return [
            'id' => $item->id,
            'startup_id' => $item->startup_id,
            'nom_startup' => $item->startup->nom_startup, 
            'indicateur_id' => $item->indicateur_id,
            'libelle_indicateur' => $item->indicateur->libelle, 
            'symbole_mesure' => $item->indicateur->mesure->symbole, 

            'value'=>$item->value,
            'date' => $item->date,
        ];
    })->values(); 
}



/*********** afficher les indicateurs d'une startup *********/
function show($id)
{
   
    $startupIndicateurs = StartupIndicateur::with(['startup', 'indicateur.mesure'])
        ->where('startup_id', $id)
        ->get();

    // Si la startup existe
    if ($startupIndicateurs->isNotEmpty()) {
        $startup = $startupIndicateurs->first()->startup;

        // Obtenez tous les indicateurs associés à cette startup
        $indicateurs = $startupIndicateurs->map(function ($item) {
            return [
                'id' => $item->indicateur->id,
                'libelle' => $item->indicateur->libelle,
                'description' => $item->indicateur->description,
                'date' => $item->date,
                'unite_mesure' => $item->indicateur->mesure ? $item->indicateur->mesure->libelle . ' (' . $item->indicateur->mesure->symbole . ')' : 'Unité non précise',
                'value'=> $item->value
            ];
        });

        // Retourne les informations de la startup avec ses indicateurs
       $indicOfStartup = [
            'startup_id' => $startup->id,
            'nom_startup' => $startup->nom_startup,
            'indicateurs' => $indicateurs,
        ];

        return view('startup-indicateur.show', ["indicateurs" => $indicOfStartup]);
    }

    // Si aucune startup n'a été trouvée
    return redirect()->back()->with('error', 'Startup non trouvée.');
}
