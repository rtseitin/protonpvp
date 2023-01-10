import { Document } from 'mongoose';

export default interface IRank extends Document {
    name: string;
    priority: number;
}