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

export const getone = (name, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/config/"+name+"/")
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};


export const restart = ( callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/system/restart")
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const shutdown = ( callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/system/shutdown")
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const configapi = {
  get,
  update,
  getone,
  restart,
  shutdown
}