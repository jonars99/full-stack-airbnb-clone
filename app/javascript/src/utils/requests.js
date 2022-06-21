import { handleErrors } from "./fetchHelper";

export var authenticateUser = function (callback) {
  fetch('http://localhost:3000/api/authenticated')
  .then(handleErrors)
  .then(data => {
    callback(data);
  })
};