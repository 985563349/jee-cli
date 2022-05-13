// service.js
module.exports = function (name) {
  return `
    import { request } from 'umi'

    export const get${name}s = () => {
      require({
        url: '',
        method: 'GET',
      })
    }
  `;
};
