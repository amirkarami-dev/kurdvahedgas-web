import type { StatItem } from "@/types";

const store: StatItem[] = [
  { id: "1", label: "پرونده ثبت‌شده", value: 8240, suffix: "+", iconName: "FileCheck", sortOrder: 1 },
  { id: "2", label: "مجری فعال", value: 215, suffix: "", iconName: "Users", sortOrder: 2 },
  { id: "3", label: "پروژه در دست اجرا", value: 632, suffix: "", iconName: "Activity", sortOrder: 3 },
  { id: "4", label: "نظارت انجام‌شده", value: 1840, suffix: "+", iconName: "ShieldCheck", sortOrder: 4 },
];

export const mockStatsService = {
  async getAll(): Promise<StatItem[]> {
    return [...store].sort((a, b) => a.sortOrder - b.sortOrder);
  },
  async getById(id: string): Promise<StatItem | null> {
    return store.find((s) => s.id === id) ?? null;
  },
  async create(data: Omit<StatItem, "id">): Promise<StatItem> {
    const item = { ...data, id: String(Date.now()) };
    store.push(item);
    return item;
  },
  async update(id: string, data: Partial<Omit<StatItem, "id">>): Promise<StatItem> {
    const idx = store.findIndex((s) => s.id === id);
    if (idx === -1) throw new Error("Not found");
    store[idx] = { ...store[idx], ...data };
    return store[idx];
  },
  async delete(id: string): Promise<void> {
    const idx = store.findIndex((s) => s.id === id);
    if (idx !== -1) store.splice(idx, 1);
  },
};

export default mockStatsService;
