import dotenv from 'dotenv';
dotenv.config();
import { registerAccount } from './lib/actions/register';
const formData = new FormData();
formData.append('email', 'test2@university.edu');
formData.append('password', 'password123');
registerAccount(formData).then(console.log).catch(console.error);
