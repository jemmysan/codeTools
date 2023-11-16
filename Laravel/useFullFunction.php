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
}
