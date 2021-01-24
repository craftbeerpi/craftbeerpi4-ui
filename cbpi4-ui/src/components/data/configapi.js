import axios from "axios";

export const get = ( callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .put("/config/")
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const update = (name, value, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .put("/config/"+name+"/", {value})
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};



export const configapi = {
  get,
  update
}