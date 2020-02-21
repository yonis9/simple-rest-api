const people = require("../seed/people");
const cars = require("../seed/cars");


const getPeople = (ctx) => {
    const { havecar } = ctx.query;

//GET PEOPLE WHO OWNS CARS

    if ( havecar === 'true') {
        let filteredPeople = [];
      
        for (let i=0; i< people.length; i++) {
            if (cars.find( c => c.owner_id == people[i].id)) {
                filteredPeople.push(people[i])
            }
        }

        ctx.body = filteredPeople;
        return;
    
    }

    //GET PEOPLE WHO DOESN'T OWNS CARS

    if (havecar === 'false') {
        let filteredPeople = [];
      
        for (let i=0; i< people.length; i++) {
            if (!cars.find( c => c.owner_id == people[i].id)) {
                filteredPeople.push(people[i])
            }
        }

        ctx.body = filteredPeople;
        return;
    }

    //GET ALL PEOPLE

    ctx.body = people;
  }


const addPerson = (ctx) => {
    const { name, age  } = ctx.request.body;

    if (!name || !age) {
        ctx.status = 400;
        ctx.body = 'Please make sure you fill all fields correctly';
        return
    }

    const id = people[people.length-1].id+1;
    const newPerson = { id, name, age }
    people.push(newPerson)
    ctx.body = newPerson;
}


const getPerson = (ctx, next) => {
    const paramsId = ctx.params.id;
    const person = people.find((el, i) => el.id == paramsId);

    if (!person) {
        ctx.status = 404;
        ctx.body = 'Person not found';
        return;
    }
    ctx.body = person;
}


const updatePerson = (ctx) => {
    const id = ctx.params.id;
    const person = people.find(el => el.id == id);

    if (!person) {
        ctx.status = 404;
        ctx.body = 'Person not found';
        return;
    } 

    const { name, age } = ctx.request.body;
    if (!name || !age) {
        ctx.status = 400;
        ctx.body = 'Please make sure you fill all fields correctly';
        return;
    }

    const index = people.findIndex(el => el.id == id)
    const newPerson = { ...person, name, age }
    people[index] = newPerson
    ctx.body = newPerson;
}


const deletePerson = (ctx) => {
    const id = ctx.params.id;
    const person = people.find((el, i) => el.id == id);

    if (!person) {
        ctx.status = 404;
        ctx.body = 'Person not found';
        return;
    }

    const index = people.findIndex(el => el.id == id);
    people.splice(index, 1);
    ctx.body = { ...person ,message: 'person successfully deleted' };
}


const getCarsOfPerson = (ctx) => {
    const id = ctx.params.id;
    const person = people.find((el, i) => el.id == id);

    if (!person) {
        ctx.status = 404;
        ctx.body = 'Person not found';
        return;
    }

    ctx.body = cars.filter(car => car.owner_id == id);
}


  module.exports = {
      getPeople,
      addPerson,
      getPerson,
      updatePerson,
      deletePerson,
      getCarsOfPerson
  }