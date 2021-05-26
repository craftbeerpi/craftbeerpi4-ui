import axios from "axios";

const getkbh = (callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .get("/upload/kbh" )
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const sendKBH = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/upload/kbh" , {id})
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

const getxml = (callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .get("/upload/xml" )
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const sendXML = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/upload/xml" , {id})
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

const sendFile = (data, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios({
    method: 'post',
    url: '/upload',
    data: data,
    headers: {'Content-Type': 'multipart/form-data'}
   })
    .then(function (response) {
      callback_susscess();
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
  sendFile,
  }