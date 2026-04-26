import dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL || 'https://frontendui-librarysystem.onrender.com/login',
  adminUsername: process.env.ADMIN_USERNAME || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin',
  invalidUsername: process.env.INVALID_USERNAME || 'invaliduser',
  invalidPassword: process.env.INVALID_PASSWORD || 'wrongpassword',
  timeout: parseInt(process.env.TIMEOUT || '30000'),
};
