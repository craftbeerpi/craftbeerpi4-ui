import axios from "axios";

const save = (id, data, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/dashboard/1/content", data)
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const clear = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .delete("/dashboard/1/content")
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

const get = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .get("/dashboard/"+id+"/content" )
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};




export const dashboardapi = {
  save,
  get,
  clear
}