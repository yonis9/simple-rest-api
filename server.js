const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const people = require('./controllers/people')

const app = new Koa();
 
const router = new Router();

app.use(bodyParser());


router.get('/people', (ctx, next) => people.getPeople(ctx));

router.post('/people', (ctx, next) => people.createPerson(ctx));

router.get('/people/:id', (ctx, next) => people.getPerson(ctx));

router.put('/people/:id', (ctx, next) => people.updatePerson(ctx));

router.del('/people/:id', (ctx, next) => people.deletePerson(ctx));





app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(5000, () => {
    console.log('listen on port 5000')
});