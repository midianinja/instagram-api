import dotenv from 'dotenv';
import { getPhotos } from './src/instagram';

export const getPhotosFunction = getPhotos;
export const ignore = () => null;

dotenv.config();
