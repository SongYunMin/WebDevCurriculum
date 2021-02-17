let foo = require('./foo.js');

console.log('---------- require.cache ----------')
console.log(require.cache);

console.log('---------- require.cache keys ----------')
console.log(Object.keys(require.cache));