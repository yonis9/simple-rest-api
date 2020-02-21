const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const people = require('./controllers/people')
const cars = require('./controllers/cars')

const app = new Koa();
 
const router = new Router();

app.use(bodyParser());


router.get('/people', (ctx, next) => people.getPeople(ctx));

router.post('/people', (ctx, next) => people.addPerson(ctx));

router.get('/people/:id', (ctx, next) => people.getPerson(ctx));

router.put('/people/:id', (ctx, next) => people.updatePerson(ctx));

router.del('/people/:id', (ctx, next) => people.deletePerson(ctx));


router.get('/cars', (ctx, next) => cars.getCars(ctx));

router.post('/cars', (ctx, next) => cars.addCar(ctx));

router.get('/cars/:id', (ctx, next) => cars.getCar(ctx));

router.put('/cars/:id', (ctx, next) => cars.updateCar(ctx));

router.del('/cars/:id', (ctx, next) => cars.deleteCar(ctx));


router.get('/people/:id/cars', (ctx, next) => people.getCarsOfPerson(ctx));

router.get('/cars/people/dontown', (ctx, next) => cars.getPeopleWithoutCars(ctx));

router.get('/cars/brand/:brandName', (ctx, next) => cars.getCarByBrand(ctx))


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(5000, () => {
    console.log('listen on port 5000')
});