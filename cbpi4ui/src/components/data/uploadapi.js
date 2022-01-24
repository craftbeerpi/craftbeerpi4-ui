import axios from "axios";

const getkbh = (callback_susscess = () => { }, callback_failed = () => { }) => {
  axios
    .get("/upload/kbh")
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const sendKBH = (id, path, callback_susscess = () => { }, callback_failed = () => { }) => {
  axios
    .post("/" + path + "/kbh", { id })
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

const getxml = (callback_susscess = () => { }, callback_failed = () => { }) => {
  axios
    .get("/upload/xml")
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const sendXML = (id, path, callback_susscess = () => { }, callback_failed = () => { }) => {
  axios
    .post("/" + path + "/xml", { id })
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

const getjson = (callback_susscess = () => { }, callback_failed = () => { }) => {
  axios
    .get("/upload/json")
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const sendJSON = (id, path, callback_susscess = () => { }, callback_failed = () => { }) => {
  axios
    .post("/" + path + "/json", { id })
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

const getbf = (offset, callback_susscess = () => { }, callback_failed = () => { }) => {
  axios
    .post("/upload/bf/" + offset + "/")
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};


const sendBF = (id, path, callback_susscess = () => { }, callback_failed = () => { }) => {
  axios
    .post("/" + path + "/bf", { id })
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

const sendFile = (data) => {
  return new Promise(function (callback_susscess = () => { }, callback_failed = () => { }) {
    axios({
      method: 'post',
      url: '/upload',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
        callback_susscess(response);
        window.location.reload()
      })
      .catch(function (error) {
        callback_failed();
      });
  });
};

const getpath = (callback_susscess = () => { }, callback_failed = () => { }) => {
  axios
    .get("/upload/getpath")
    .then(function (response) {
      callback_susscess(response.data['path']);
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const uploadapi = {
  getkbh,
  sendKBH,
  getxml,
  sendXML,
  getjson,
  sendJSON,
  getbf,
  sendBF,
  sendFile,
  getpath,
}