<?php



function handleDataBeforeShow($id,$indicOfStartup){
    $startupIndicateurs = StartupIndicateur::with(['startup', 'indicateur.mesure'])
        ->where('startup_id', $id)
        ->get();

    // Si la startup existe
    if ($startupIndicateurs->isNotEmpty()) {
        $startup = $startupIndicateurs->first()->startup;

        // Obtenez tous les indicateurs associés à cette startup
        $indicateurs = $startupIndicateurs->map(function ($item) {
            return [
                'id'=> $item->id,
                'libelle' => $item->indicateur->libelle,
                'description' => $item->indicateur->description,
                'date' => $item->date,
                'unite_mesure' => $item->indicateur->mesure ? $item->indicateur->mesure->symbole : 'Unité non précise',
                'value'=> $item->value
            ];
        });

        // Retourne les informations de la startup avec ses indicateurs
       $indicOfStartup = [
            'id'=> $startup->id,
            'nom_startup' => $startup->nom_startup,
            'indicateurs' => $indicateurs,
        ];
        
        return $indicOfStartup;
    }
    // return redirect()->back()->with('error', 'Startup non trouvée.');
}








function searchStartUp(Request $request)
    { 
        $keyword = $request->input('search');
        if (!is_null($keyword)) {
            $this->suivies = collect($this->suivies)->filter(function ($item) use ($keyword) {
                return stripos($item['nom_startup'], $keyword) !== false || 
                stripos($item['libelle_indicateur'], $keyword) !== false;
            })->values();
        } 
        return $this->index();
    }




function searchIndicateurStartup(Request $request, $id){
        $keyword = $request->input('search');
        if (!is_null($keyword)) {
           $data = $this->handleDataBeforeShow($id,$this->indicOfStartup);

            $this->indicOfStartup['indicateurs'] = collect($data['indicateurs'])->filter(function ($indicateur) use ($keyword) {
                return stripos($indicateur['libelle'], $keyword) !== false;
            })->values();

            $newData = [
                'id'=>  $data['id'],
                'nom_startup' => $data['nom_startup'],
                'indicateurs' => $this->indicOfStartup['indicateurs'],
            ];
            return view('startup-indicateur.show', ["indicateurs" => $newData]);
        } 
        return $this->show($id);
    }