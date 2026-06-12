const fs = require('fs');
const file = 'app/api/test-register/route.ts';
let content = fs.readFileSync(file, 'utf8');
content = content.replace('await registerAccount(formData);', 'const res = await registerAccount(formData); if(res?.error) throw new Error(res.error);');
fs.writeFileSync(file, content);
