const axios = require('axios');
const names = ['Priit', 'Barbara', 'Lol', 'Troll'];
const numbers = [1, 2, 3, 4, 5];
const log = console.log;
const BASE_URL = 'https://mysterious-basin-71618.herokuapp.com';

const randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getName = (namesList) => {
  return new Promise((resolve, reject) => {
    if (namesList.length < 1) {
      reject('No names available');
    }

    const name = namesList[randomNumberGenerator(0, namesList.length - 1)];
    resolve(name);
  });
};

const getNumberFromNumbersList = (values) => {
  return new Promise((resolve, reject) => {
    if (values.length < 1) {
      reject('No numbers available');
    }

    const number = values[randomNumberGenerator(0, values.length - 1)];
    resolve(number);
  });
};

const getRandomTodoFromAPI = async (url) => {
  try {
    const { data } = await axios.get(url);
    
    if (!data) {
      throw new Error('No todos found');
    }

    return data.todos[randomNumberGenerator(0, data.todos.length - 1)].text;

  } catch (error) {
    log(error);
  }
};

const assignedNumberNameTodo = (name, num, todo) => {
  return new Promise((resolve, reject) => {

    resolve(`${num}: ${name}\nTodo: ${todo}`);
  });
};

const getSomeData = async (namesList, values, url) => {
  try {
    const data = await Promise.all([getName(namesList), getNumberFromNumbersList(values)]);
    const todo = await getRandomTodoFromAPI(`${url}/todos`);
    const result = await assignedNumberNameTodo(data[0], data[1], todo);

    log(result);
  } catch (error) {
    log(error);
  }
};

getSomeData(names, numbers, BASE_URL);