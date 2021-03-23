import { Document } from 'mongoose';

export default interface IStaff extends Document {
    UUID: string;
    ranks: Array<string>;
}