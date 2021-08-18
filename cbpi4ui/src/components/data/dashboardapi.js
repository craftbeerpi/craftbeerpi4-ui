import axios from "axios";

const save = (id, data, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/dashboard/"+id+"/content", data)
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const clear = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .delete("/dashboard/"+id+"/content")
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

const widgets = (callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .get("/dashboard/widgets" )
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};


const dashboardnumbers = (callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .get("/dashboard/numbers" )
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};


const setcurrentdashboard = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/dashboard/" + id + "/current" )
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const getcurrentdashboard = (callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .get("/dashboard/current" )
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
  widgets,
  dashboardnumbers,
  setcurrentdashboard,
  getcurrentdashboard,
  clear
}