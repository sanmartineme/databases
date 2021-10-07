var bandas = db.musica.distinct('band')

function cuentaPalabra(banda, palabras){
    let nro = 0;
    let songs = db.musica.find({band:banda});
    
    songs.forEach(s => {
        palabras.forEach(p =>{
            if(s.musica.search(p.palabra) > -1){
                nro = nro +1;
            }
        });
    });
        
    return nro;
}

if(db.summary.totalSize()> 0){
     db.summary.drop();   
}

bandas.forEach(b =>{
   
    var positivas = db.numeros.find({valor: {$gt: 0}});
    var negativas = db.numeros.find({valor: {$lt: 0}});
   
   db.summary.insert({banda: b , positivas: cuentaPalabra(b,positivas) , negativas : cuentaPalabra(b, negativas)});
//   print(b + "positivas " + cuentaPalabra(b,positivas) + " negativas " + cuentaPalabra(b,negativas) )
})

db.local.find();

