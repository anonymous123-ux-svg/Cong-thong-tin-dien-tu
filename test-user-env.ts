import dotenv from 'dotenv';
dotenv.config();
import { updateUserProfile } from './lib/actions/user';
updateUserProfile('1', { email: 'test@test.com' }).then(console.log).catch(console.error);
