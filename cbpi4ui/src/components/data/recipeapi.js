import axios from "axios";

const save = (id, data, callback_susscess = () => {}, callback_failed = () => {}) => {
    axios
    .put("/recipe/" + id, data)
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const load = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .get("/recipe/" + id)
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};


const get = (callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .get("/recipe/" )
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const remove = (name, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .delete("/recipe/" + name )
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

const create = (name, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/recipe/create", {name})
    .then(function (response) {
      callback_susscess(response.data.id);
    })
    .catch(function (error) {
      callback_failed();
    });
};


const clone = (id, name, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/recipe/"+id+"/clone", {name})
    .then(function (response) {
      callback_susscess(response.data.id);
    })
    .catch(function (error) {
      callback_failed();
    });
};


const brew = (name, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/recipe/" + name + "/brew" )
    .then(function (response) {
      callback_susscess(response.data.id);
    })
    .catch(function (error) {
      callback_failed();
    });
};
export const recipeapi = {
  load,
  remove,
  clone,
  brew,
  save,
  create,
  get,

}