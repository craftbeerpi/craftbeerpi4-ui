import axios from "axios";

const save = (id, data, callback_susscess = () => {}, callback_failed = () => {}) => {
    axios
    .put("/fermenterrecipe/" + id, data)
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const load = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .get("/fermenterrecipe/" + id)
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};


const get = (callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .get("/fermenterrecipe/" )
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const remove = (name, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .delete("/fermenterrecipe/" + name )
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

const create = (name, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/fermenterrecipe/create", {name})
    .then(function (response) {
      callback_susscess(response.data.id);
    })
    .catch(function (error) {
      callback_failed();
    });
};


const clone = (id, name, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/fermenterrecipe/"+id+"/clone", {name})
    .then(function (response) {
      callback_susscess(response.data.id);
    })
    .catch(function (error) {
      callback_failed();
    });
};


const brew = (fermenterid, recipeid, name, callback_susscess = () => {}, callback_failed = () => {}) => {
  if (!name) {name="Fermentation"} 
  axios
    .post("/fermenterrecipe/" + recipeid + "/" + fermenterid + "/" + name + "/brew" )
    .then(function (response) {
      callback_susscess(response.data.id);
    })
    .catch(function (error) {
      callback_failed();
    });
};
export const fermenterrecipeapi = {
  load,
  remove,
  clone,
  brew,
  save,
  create,
  get,

}