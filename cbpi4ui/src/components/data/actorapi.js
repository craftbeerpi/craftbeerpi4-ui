import axios from "axios";

const save = (id, data, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .put("/actor/" + id, data)
    .then(function (response) {
      console.log(response);
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const add = (data, callback_susscess = () => {}, callback_failed = () => {}) => {
  
  axios
    .post("/actor/", data)
    .then(function (response) {
      console.log(response);
      
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const remove = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .delete("/actor/"+ id)
    .then(function (response) {
      console.log(response);
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

const on = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/actor/"+ id + "/on")
    .then(function (response) {
      
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const off = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/actor/"+ id + "/off")
    .then(function (response) {
      
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const toggle = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/actor/"+ id + "/toggle")
    .then(function (response) {
      
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const action = (id, name, parameter, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/actor/"+id + "/action", {action:name, parameter})
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};


export const actorapi = {
  add,
  remove,
  action,
  save,
  on, 
  off,
  toggle,
}