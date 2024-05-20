import {Gender} from './common';

export interface Friend {
  _id: any!;
  id: string;
  name: string;
  subname: string;
  gender: Gender;
  prompt: string;
  mainImage: string;
  avatarImage: string;
  description: string;
  greeting: string;
}