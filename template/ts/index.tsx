// index.js
module.exports = function (name) {
  return `
    import { useState } from 'react';

    const ${name} = () => {
      return (
        <div>
          <h1>This os ${name} page.</h1>
        </div>
      )
    };

    export default ${name};
  `;
};
