import axios from "axios";

export const save = (id, data, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .put("/kettle/" + id, data)
    .then(function (response) {
      console.log(response);
      callback_susscess(response.data);
    })
    .catch(function (error) {
      console.log("ERROR", error)
      callback_failed();
    });
};

export const add = (data, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/kettle/", data)
    .then(function (response) {
      console.log(response);
      callback_susscess(response.data);
    })
    .catch(function (error) {
      console.log("ERROR")
      callback_failed();
    });
};

export const remove = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .delete("/kettle/"+ id)
    .then(function (response) {
      console.log(response);
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const kettleapi = {
  add,
  remove,
  save
}