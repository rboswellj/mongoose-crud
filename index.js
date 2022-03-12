import express from 'express';
import Car from './modules/Cars';
import bodyParser from 'body-parser';

/*
    cid
    year
    make 
    model
    miles
    price
    dealer_id
*/

var app = express();

// Routers
app.use(express.static('public'));

// Retrieve all
app.get('/showAll', (req, res) => {
    Car.find((err, foundCars) => {
        if (err) {
            res.status(500).send(err);
        } else {
            for(var foundCar in foundCars) {
                res.write(`<p>
                            ${foundCar.cid}, 
                            ${foundCar.year}, 
                            ${foundCar.make}, 
                            ${foundCar.model},
                            ${foundCar.miles},
                            ${foundCar.price},
                            ${foundCar.dealer_id} 
                        </p>`);
            }
            res.end();
        }
    })
});

// Create new
app.post('/addNewItem', (req, res) => {
    let newCar = new Car ({
        cid: req.body.cid,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        miles: req.body.miles,
        price: req.body.price,
        dealer_id: req.body.dealer_id
    });

    newCar.save((err) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.send("Car added");
        }
    });
});

// Find car
app.post('findCid', (req,res) => {
    var searchCid = req.body.cid;
    Car.findOne( {cid: searchCid}, (err, foundCar) => {
        if(err) {
            res.status(500).send(err);
        }
        else if (!foundCar) {
            res.send(`No car with CID of ${searchCid}`);
        } else {
            res.send(`${foundCar.cid}, 
            ${foundCar.year}, 
            ${foundCar.make}, 
            ${foundCar.model},
            ${foundCar.miles},
            ${foundCar.price},
            ${foundCar.dealer_id}`)
        }
    });
});

// update and edit
app.post('/updateItem', (req, res) => {
    
    var updateCar = req.body.cid;

    Car.findOne( {cid: updateCar}, (err, car1) => {
        if(err) {
            res.status.send(err);
        }
        else if(!car1) {
            res.send(`No car with CID ${updateCar}`);
        } else {
            car1.year = req.body.year;
            car1.make = req.body.make;
            car1.model = req.body.model;
            car1.miles = req.body.miles;
            car1.price = req.body.price;
            car1.dealer_id = req.body.dealer_id;

            car1.save((err) => {
                if(err) {
                    res.status(500).send(err);
                }
            });
            res.send('Update Successful');
        }
    });
})

// Delete
app.post('/deleteCar', (req, res) => {
    var deleteCid = req.body.cid;

    Car.findOneAndRemove({cid: deleteCid}, (err, foundCar) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (!foundCar) {
            res.send(`No car with CID ${deleteCid}`);
        } else {
            res.send(`Car with CID ${deleteCid} deleted.`);
        }
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000, ctrl-c to quit');
});
