<?php

function collection(){

    $collections = NameResource::collection(Model::all());
    return $collections;
}