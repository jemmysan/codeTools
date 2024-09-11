<?php

function create()
    {
       $tags = \App\Models\Tag::pluck('name', 'id');
       $secteurs = \App\Models\Secteur::pluck('secteur', 'id');
       return view('startup.create', compact('tags','secteurs'));

    }