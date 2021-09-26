import axios from "axios";

const save = (id, data, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .put("/sensor/" + id, data)
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const add = (data, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/sensor/", data)
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const remove = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .delete("/sensor/"+ id)
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

const action = (id, name, parameter, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/sensor/"+id + "/action", {action:name, parameter})
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const sensorapi = {
  add,
  remove,
  save,
  action
}