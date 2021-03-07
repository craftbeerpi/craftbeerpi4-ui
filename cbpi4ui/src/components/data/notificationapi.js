import axios from "axios";

const action = (notifiaction_id, action_id, data, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post(`/notification/${notifiaction_id}/action/${action_id}`)
    .then(function (response) {
      console.log(response);
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};


export const notificationapi = {
  action
}