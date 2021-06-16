import axios from "axios";

const get = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .get("/log/" + id)
    .then(function (response) {
      callback_susscess(response.data, id);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const get2 = (data, callback_susscess = () => {}, callback_failed = () => {}) => {
  console.log(data)
  axios
    .post("/log/", data)
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const clear = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .delete("/log/" + id)
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const logapi = {
  get,
  get2,
  clear
}