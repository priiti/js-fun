const url = require('url');

const hostname = 'https://example.com/api/search/?q=spread';

console.log(url.parse(hostname, true));
console.log(url.parse(hostname, true).query.q);

/*

Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'example.com',
  port: null,
  hostname: 'example.com',
  hash: null,
  search: '?q=spread',
  query: { q: 'spread' },
  pathname: '/api/search/',
  path: '/api/search/?q=spread',
  href: 'https://example.com/api/search/?q=spread' }
spread

*/