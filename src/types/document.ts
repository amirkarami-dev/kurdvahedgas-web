export type DocumentCategory =
  | "نظام‌نامه"
  | "دستورالعمل"
  | "تعرفه"
  | "فرم اجرایی"
  | "بخشنامه"
  | "چک‌لیست"
  | "مقررات ملی ساختمان";

export interface Document {
  id: string;
  title: string;
  category: DocumentCategory;
  date: string;
  jalaliDate: string;
  version: string;
  description: string;
  fileSize: string;
  downloadCount: number;
  tags: string[];
  fileUrl?: string;
  featured?: boolean;
}

export interface DocumentFilters {
  category?: DocumentCategory;
  search?: string;
  sortBy?: "date" | "name" | "category" | "downloads";
}

// Gas tariff types
export type MeterType = "G2.5" | "G4" | "G6" | "G10" | "G16" | "G25" | "G40" | "G65";

export interface GasTariff {
  meterType: MeterType;
  volumeCapacity: number;    // m3/h
  floorArea: number;         // متر مربع
  designFee: number;         // ریال — تک واحدی
  supervisionFee: number;    // ریال — تک واحدی
  vUnit: number;             // ضریب ظرفیت کنتورتکی
  vVolumetric: number;       // ضریب کنتور مشترک
}
