import mongoose, { Schema } from 'mongoose';
import IRank from '../interfaces/rank';
import logging from '../config/logging';

const RankSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true},
    priority: { type: Number, required: true },
}, {
    timestamps: true
});

RankSchema.post<IRank>('save', () => {
    logging.info('MongoDB', 'A rank document as been saved.');
});

export default mongoose.model<IRank>('Rank', RankSchema);