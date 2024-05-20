import {Gender} from './common';

export interface User extends mongoose.Document {
    _id: any!;
    email: string; // Google email 
    name: string;
    gender: Gender;
}

export interface UserTemp extends mongoose.Document {
    _id: any!;
    email: string; // Google email 
    name: string;
    gender: 'F' | 'M' | 'O';
  }