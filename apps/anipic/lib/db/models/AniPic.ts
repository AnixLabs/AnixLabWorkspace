import "server-only";

import { Schema, type Model, type Connection, type Types } from "mongoose";

import connectToAniPicDb from "../connections/aniPicDb";

export interface AniPic {
  _id: Types.ObjectId;

  originalUrl: string;
  displayUrl: string;
  thumbnailUrl: string;

  uploadedBy: string;
  approved: boolean;

  tags: string[];

  width: number;
  height: number;

  downloads: number;
  views: number;
  likes: number;

  isDeleted: boolean;
  dmcaFlag: boolean;
  dmcaReason?: string;

  createdAt: Date;
  updatedAt: Date;
}

const aniPicSchema = new Schema<AniPic>(
  {
    originalUrl: { type: String, required: true, unique: true },
    displayUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },

    uploadedBy: { type: String, required: true, ref: "User" },
    approved: { type: Boolean, default: false },

    tags: { type: [String], default: [] },

    width: { type: Number, required: true },
    height: { type: Number, required: true },

    downloads: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },

    isDeleted: { type: Boolean, default: false },
    dmcaFlag: { type: Boolean, default: false },
    dmcaReason: { type: String },
  },
  { timestamps: true },
);

// Cursor + filter indexes
aniPicSchema.index({ approved: 1, isDeleted: 1, dmcaFlag: 1, _id: -1 });
aniPicSchema.index({ approved: 1, isDeleted: 1, dmcaFlag: 1, likes: -1, _id: -1 });
aniPicSchema.index({ approved: 1, isDeleted: 1, dmcaFlag: 1, views: -1, _id: -1 });
aniPicSchema.index({ approved: 1, isDeleted: 1, dmcaFlag: 1, downloads: -1, _id: -1 });
aniPicSchema.index({ tags: 1, approved: 1, isDeleted: 1, dmcaFlag: 1, _id: -1 });

let cachedModel: Model<AniPic> | null = null;

export default async function getAniPicModel(): Promise<Model<AniPic>> {
  const conn: Connection = await connectToAniPicDb();
  cachedModel ??= conn.models.AniPic ?? conn.model<AniPic>("AniPic", aniPicSchema);
  return cachedModel;
}
