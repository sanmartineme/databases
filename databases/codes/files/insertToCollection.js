function insertMovieToCatalog (movie) { 
    db.catalog.insert(movie);
    print("Datos insertados"); 
}

var karateKid = {
    title: "Karate Kid",
    director: "¿?",
    year: 1986,
    rating: 8,
};

insertMovieToCatalog(karateKid);