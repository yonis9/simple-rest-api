const people = require("../seed/people");
const cars = require("../seed/cars");


const getPeople = (ctx) => {
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
        return
    }
    ctx.body = person;
}


const updatePerson = (ctx) => {
    const id = ctx.params.id;
    const person = people.find(el => el.id == id);

    if (!person) {
        ctx.status = 404;
        ctx.body = 'Person not found';
        return
    } 

    const { name, age } = ctx.request.body;
    if (!name || !age) {
        ctx.status = 400;
        ctx.body = 'Please make sure you fill all fields correctly';
        return
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
        return
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
        return
    }

    ctx.body = cars.filter(car => car.owner_id == id);
}


const getPeopleWithoutCars = (ctx) => {
    let filteredPeople = people;
    for (let i=0; i< cars.length; i++) {
        filteredPeople = filteredPeople.filter(p => p.id != cars[i].owner_id)
    }
    console.log(filteredPeople)
}

  module.exports = {
      getPeople,
      addPerson,
      getPerson,
      updatePerson,
      deletePerson,
      getCarsOfPerson,
      getPeopleWithoutCars
  }