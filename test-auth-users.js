const http = require('http');

async function test() {
  const res = await fetch('http://localhost:3000/api/auth/callback/credentials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'email=admin%40elearning.com&password=password123&redirect=false',
    redirect: 'manual'
  });
  
  const cookies = res.headers.get('set-cookie');
  if(!cookies) {
     console.log("No cookies, auth failed", await res.text());
     return;
  }
  
  const tokenMatches = cookies.match(/(authjs\.session-token=[^;]+)/g);
  if (!tokenMatches) {
     console.log("No session token");
     return;
  }
  
  const cookieString = tokenMatches.join('; ');
  
  const pageRes = await fetch('http://localhost:3000/admin/users', {
    headers: { 'Cookie': cookieString },
    redirect: 'manual'
  });
  
  console.log("HTTP status for /admin/users:", pageRes.status);
  if (pageRes.status !== 200) {
    console.log("Body:", await pageRes.text());
  } else {
    console.log("Page fetched successfully (200 OK)");
  }
}
test();
