<?php

/************** Substr *******/
substr($chaine,$position,$nbrCaractrArecup);

/************** Uppercase ********/
strtoupper($chaine);

/************** LowerCase ********/
strtolower($chaine);

// Diviser la chaîne en sous-chaînes de nbr caractères
str_split($chaine, $nbr);

// Joindre les sous-chaînes avec des tirets
implode('-', $chaine);

// Diviser la chaîne en parties en fonction du tiret
explode('-', $chaine);

// Inserer avec la date actuelle
// 'date'=> Carbon::now()->format('Y/m/d')