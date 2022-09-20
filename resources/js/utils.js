import moment from "moment";

export const statuses = [
  {
    key: 0,
    value: 'Aktif',
    color: 'green'
  },
  {
    key: 1,
    value: 'Update',
    color: 'rgb(229, 195, 24)'
  },
  {
    key: 2,
    value: 'Expired',
    color: 'red'
  }
]

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const formatDate = (stringDate) => {
  return moment(stringDate).format('DD-MM-yyyy')
}