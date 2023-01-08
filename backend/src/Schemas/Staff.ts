import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IStaff from '../interfaces/staff';

const StaffSchema: Schema = new Schema({
    UUID: { type: String, required: true, unique: true},
    ranks: { type: Array, required: true },
}, {
    timestamps: true
});

StaffSchema.post<IStaff>('save', () => {
    logging.info('MongoDB', 'A staff document has been saved.');
});

export default mongoose.model<IStaff>('Staff', StaffSchema);