const cars = require("../seed/cars");
const people = require("../seed/people");

const getCars = (ctx) => {

    //GET CAR BY BRAND WITH QUERY PARAMS

    const { brand } = ctx.query;
    if(brand) {
        ctx.body = cars.filter(c => c.brand == brand);
        return
    }
    //GET ALL CARS

    ctx.body = cars;
}


const addCar = (ctx) => {
    const { brand, model, color, owner_id } = ctx.request.body;

    if(!brand || !model || !color || !owner_id) {
        ctx.status = 400;
        ctx.body = 'Please make sure you fill all fields correctly';
        return
    }

    const id = cars[cars.length-1].id+1;
    const newCar = { id, brand, model, color, owner_id }
    cars.push(newCar);
    ctx.body = newCar;
}


const getCar = (ctx) => {
    const id = ctx.params.id;
    const car = cars.find(el => el.id == id);

    if (!car) {
        ctx.status = 404;
        ctx.body = 'Car not found'
        return
    }
    ctx.body = car;
}


const updateCar = (ctx) => {
    const id = ctx.params.id;
    const car = cars.find(el => el.id == id);

    if (!car) {
        ctx.status = 404;
        ctx.body = 'Car not found'
        return
    }

    const { brand, model, color, owner_id } = ctx.request.body;

    if(!brand || !model || !color || !owner_id) {
        ctx.status = 400;
        ctx.body = 'Please make sure you fill all fields correctly';
        return
    }

    const index = cars.findIndex(el => el.id == id);
    const newCar = { ...car, brand, model, color, owner_id };
    cars[index] = newCar;
    ctx.body = newCar;
}


const deleteCar = (ctx) => {
    const id = ctx.params.id;
    const car = cars.find(el => el.id == id);

    if (!car) {
        ctx.status = 404;
        ctx.body = 'Car not found'
        return
    }

    const index = cars.findIndex(el => el.id == id);
    cars.splice(index, 1);
    ctx.body = { ...car, message: 'Car successfully deleted '}

}


//GET CAR BY BRAND WITH PARAMS

const getCarByBrand = (ctx) => {
    const { brandName } = ctx.params;
    ctx.body = cars.filter(c => c.brand == brandName);
}


module.exports = {
    getCars,
    addCar,
    getCar,
    updateCar,
    deleteCar,
    getCarByBrand
}