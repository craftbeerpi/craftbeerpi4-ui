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


export const start = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/kettle/"+ id + "/on")
    .then(function (response) {
      console.log(response);
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};


export const stop = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/kettle/"+ id + "/off")
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const toggle = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/kettle/"+ id + "/toggle")
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};


export const target_temp = (id, temp, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/kettle/"+ id + "/target_temp", {temp})
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};


export const kettleapi = {
  add,
  remove,
  toggle,
  target_temp,
  save,
  start,
  stop
}