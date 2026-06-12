import { registerAccount } from './lib/actions/register';
const formData = new FormData();
formData.append('email', 'testregister@university.edu');
formData.append('password', 'password123');
registerAccount(formData).then(console.log).catch(console.error);
