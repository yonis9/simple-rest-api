const people = require("../seed/people");


const getPeople = (ctx) => {
    ctx.body = people;
  }


const createPerson = (ctx) => {
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
        ctx.status = 400;
        ctx.body = 'Person not found';
        return
    }
    ctx.body = person;
}


const updatePerson = (ctx) => {
    const id = ctx.params.id;
    const person = people.find(el => el.id == id);

    const { name, age } = ctx.request.body;

    if (!person) {
        ctx.status = 400;
        ctx.body = 'Person not found';
        return
    } else if (!name || !age) {
        ctx.status = 400;
        ctx.body = 'Please make sure you fill all fields correctly';
        return
    }

    const newPerson = { ...person, name, age }
    const index = people.findIndex(el => el.id == id)
    people[index] = newPerson
    ctx.body = newPerson;
}


const deletePerson = (ctx) => {
    const id = ctx.params.id;
    const person = people.find((el, i) => el.id == id);

    if (!person) {
        ctx.status = 400;
        ctx.body = 'Person not found';
        return
    }

    const index = people.findIndex(el => el.id == id);
    people.splice(index, 1);
    console.log(people)
    ctx.body = { ...person ,message: 'person successfuly deleted' };
}


  module.exports = {
      getPeople,
      createPerson,
      getPerson,
      updatePerson,
      deletePerson
  }