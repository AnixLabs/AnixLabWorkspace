import type { IProps } from "react-qrcode-logo/dist/esm/QRCode";

// ✅ Types for images
export interface ImageItem {
  url: string;
  type: string; // MIME type, e.g. "image/jpeg"
  width: number;
  height: number;
  resizedBlob?: Blob;
  resizedUrl?: string;
  resizedWidth?: number;
  resizedHeight?: number;
}

// ✅ Types for loading state
export interface LoadingState {
  resize: boolean;
  [key: string]: boolean;
}

// ✅ Resize options
export type WidthType = "percent" | "pixel";

export interface ResizeOptions {
  widthType: WidthType;
  widthInput?: number;
  heightInput?: number;
  maintainAspect: boolean;
  isCompress: boolean;
  quality: number; // 1–100
}

// ✅ Return type for resize handler
export type ResizeHandler = () => Promise<void>;

export interface QrFrame {
  type: number; // 0 for no frame, 1 for frame with text, etc.
  bg: string; // Background color
  text: string; // Optional text for the frame
  font: string; // Font family for the text
  color: string; // Color of the frame
}

export interface QrSettings {
  frame: QrFrame;
  qr: IProps; // QR code properties from react-qrcode-logo
}

export type DesignTab = "Frame" | "Style" | "Logo" | "Advance";

export type contentTab =
  | "URL"
  | "Text"
  | "Email"
  | "Wifi"
  | "Image"
  | "Video"
  | "VCard"
  | "Phone"
  | "Location";

export interface QrData {
  URL?: {
    url: string;
  };
  Text?: {
    text: string;
  };
  Email?: {
    email: string;
    subject?: string;
    body?: string;
  };
  Wifi?: {
    name: string;
    encryption?: "WEP" | "WPA" | "WPA2" | "nopass";
    password?: string;
    hidden?: boolean;
  };
  Image?: {
    url: string; // direct image link
  };
  Video?: {
    url: string; // YouTube / Vimeo / any video link
  };
  VCard?: {
    firstName: string;
    lastName?: string;
    phone?: string;
    email?: string;
    company?: string;
    title?: string;
    website?: string;
    address?: string;
  };
  Phone?: {
    number: string;
  };
  Location?: {
    latitude: number;
    longitude: number;
    query?: string; // optional place name
  };
}

export type oneEye = [number, number, number, number];
export type eyeRadius = [oneEye, oneEye, oneEye];

export interface InnerOuterRadii {
  inner: number | [number, number, number, number];
  outer: number | [number, number, number, number];
}
export interface InnerOuterEyeColor {
  inner: string;
  outer: string;
}