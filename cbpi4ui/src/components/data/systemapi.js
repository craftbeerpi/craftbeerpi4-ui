import axios from "axios";

const restart = (callback_susscess = () => { }, callback_failed = () => { }) => {
  axios
    .post("/system/restart")
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const shutdown = (callback_susscess = () => { }, callback_failed = () => { }) => {
  axios
    .post("/system/shutdown")
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const backupConfig = (callback_susscess = () => { }, callback_failed = () => { }) => {
  axios({
    method: 'get',
    url: '/system/backup',
    responseType: 'arraybuffer'
  })
    .then(function (response) {
      callback_susscess(response.data);
      
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'cbpi4_config.zip'); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    })

    .catch(function (error) {
      callback_failed();
    });
};

const downloadlog = (logtime, callback_susscess = () => { }, callback_failed = () => { }) => {
  axios({
    method: 'get',
    url: '/system/log/'+ logtime + '/' ,
    responseType: 'arraybuffer'
  })
    .then(function (response) {
      callback_susscess(response.data);
      
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'cbpi4_log.zip'); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    })

    .catch(function (error) {
      callback_failed();
    });
};


const restoreConfig = (data) => {
  return new Promise(function (callback_susscess = () => { }, callback_failed = () => { }) {
    axios({
      method: 'post',
      url: '/system/restore',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
        callback_susscess(response);
       })
      .catch(function (error) {
        callback_failed();
      });
  });
};

const getsysteminfo = (callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .get("/system/systeminfo")
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};

const uploadSVG = (data) => {
  return new Promise(function (callback_susscess = () => { }, callback_failed = () => { }) {
    axios({
      method: 'post',
      url: '/system/uploadsvg',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
        callback_susscess(response);
       // window.location.reload()
      })
      .catch(function (error) {
        callback_failed();
      });
  });
};

export const systemapi = {
  restart,
  shutdown,
  backupConfig,
  restoreConfig,
  downloadlog,
  getsysteminfo,
  uploadSVG
}