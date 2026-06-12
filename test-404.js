const http = require('http');

async function test() {
  // First, get CSRF token and Cookie
  const loginRes = await fetch('http://localhost:3000/login', { redirect: 'manual' });
  const cookies = loginRes.headers.get('set-cookie');
  console.log("Login page HTTP status:", loginRes.status);
  
  // We can just use curl with no cookies to see if it's a 307 or 404
  const testRes = await fetch('http://localhost:3000/admin/users', { redirect: 'manual' });
  console.log("/admin/users HTTP status:", testRes.status);
}
test();
