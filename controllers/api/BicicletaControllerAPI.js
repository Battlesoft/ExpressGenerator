let Bicicleta = require("../../models/Bicicleta");

exports.bicicleta_list = function(req, res) {
    res.status(200).json ({
        bicicletas: Bicicleta.allBicis
    });    
};

exports.bicicleta_create = function(req,res){
    let bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.latitud, req.body.longitud];

    Bicicleta.add(bici);

    res.status(201).json({
        bicicleta: bici
    })
}

exports.bicicleta_update = function(req, res) {
    const id = req.body.id;

    const index = Bicicleta.allBicis.findIndex(bici => bici.id == id);

    if (index !== -1) {
        Bicicleta.allBicis[index].color = req.body.color || Bicicleta.allBicis[index].color;
        Bicicleta.allBicis[index].modelo = req.body.modelo || Bicicleta.allBicis[index].modelo;
        Bicicleta.allBicis[index].ubicacion = [req.body.latitud || Bicicleta.allBicis[index].ubicacion[0],
        req.body.longitud || Bicicleta.allBicis[index].ubicacion[1]];

        res.status(200).json({
            bicicleta: Bicicleta.allBicis[index]
        });
    } else {
        res.status(404).send({ error: 'Bicycle not found' });
    }
};

exports.bicicleta_delete = function(req, res){
    const id = req.body.id;

    // Find the index of the bicycle with the given id
    const index = Bicicleta.allBicis.findIndex(bici => bici.id == id);

    // If the bicycle with the given id is found, remove it from the array
    if (index !== -1) {
        Bicicleta.allBicis.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ error: 'Bicycle not found' });
    }
};