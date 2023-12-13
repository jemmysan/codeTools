

/************ Separer les chaines apres 3 lettres par un tiret *****/
let stringToreplace! : string 
stringToreplace.replace(/(.{3})/g, "$1-");
