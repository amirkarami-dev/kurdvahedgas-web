"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { toPersianNumber } from "@/lib/persian-numbers";
import { Calculator, FileSearch, UserPlus, DollarSign, Flame, Info } from "lucide-react";
import type { Metadata } from "next";
import type { MeterType } from "@/types";

// Gas tariff data from official table 1405/02/19
const gasTariffs = [
  { meterType: "G2.5" as MeterType, volumeCapacity: 4,   floorArea: 60,   designFee: 25_687_000, supervisionFee: 31_326_000, vUnit: 1,   vVolumetric: 1   },
  { meterType: "G4"   as MeterType, volumeCapacity: 6,   floorArea: 150,  designFee: 25_687_000, supervisionFee: 31_326_000, vUnit: 1,   vVolumetric: 1   },
  { meterType: "G6"   as MeterType, volumeCapacity: 10,  floorArea: 450,  designFee: 35_961_000, supervisionFee: 43_856_000, vUnit: 1.4, vVolumetric: 1   },
  { meterType: "G10"  as MeterType, volumeCapacity: 16,  floorArea: 750,  designFee: 41_100_000, supervisionFee: 50_122_000, vUnit: 1.6, vVolumetric: 0.9 },
  { meterType: "G16"  as MeterType, volumeCapacity: 25,  floorArea: 1100, designFee: 46_237_000, supervisionFee: 56_387_000, vUnit: 1.8, vVolumetric: 0.8 },
  { meterType: "G25"  as MeterType, volumeCapacity: 40,  floorArea: 1800, designFee: 51_374_000, supervisionFee: 62_652_000, vUnit: 2,   vVolumetric: 0.7 },
  { meterType: "G40"  as MeterType, volumeCapacity: 65,  floorArea: 3000, designFee: 56_511_000, supervisionFee: 68_917_000, vUnit: 2.2, vVolumetric: 0.6 },
  { meterType: "G65"  as MeterType, volumeCapacity: 100, floorArea: 4500, designFee: 82_200_000, supervisionFee: 100_244_000, vUnit: 3.2, vVolumetric: 0.5 },
];

function formatRial(n: number) {
  return toPersianNumber(n.toLocaleString("en-US"));
}

export default function ServicesPage() {
  const [meterType, setMeterType] = useState<MeterType>("G2.5");
  const [licenseType, setLicenseType] = useState<"single" | "shared">("single");
  const [unitCount, setUnitCount] = useState(2);
  const [systemType, setSystemType] = useState<"surface" | "embedded">("surface");

  const tariff = gasTariffs.find((t) => t.meterType === meterType)!;

  let designTotal = 0;
  let supervisionTotal = 0;

  if (licenseType === "single") {
    designTotal = tariff.vUnit * tariff.designFee;
    supervisionTotal = tariff.vUnit * tariff.supervisionFee;
  } else {
    // shared: sum of vUnit * pBase for each unit, then multiply by vVolumetric
    designTotal = unitCount * tariff.vUnit * tariff.designFee * tariff.vVolumetric;
    supervisionTotal = unitCount * tariff.vUnit * tariff.supervisionFee * tariff.vVolumetric;
  }

  if (systemType === "embedded") {
    supervisionTotal = supervisionTotal * 1.4;
  }

  const totalFee = designTotal + supervisionTotal;

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16">
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">خدمات و تعرفه‌ها</h1>
            <p className="text-[var(--text-secondary)] mt-2">تعرفه‌های رسمی طراحی و نظارت سامانه‌های گاز فشار ضعیف — مصوب ۱۴۰۵/۰۲/۱۹</p>
          </div>

          <div className="space-y-8">

            {/* Tariff table */}
            <section id="tariff" className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-[var(--border)] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/15 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h2 className="font-bold text-[var(--text-primary)]">جدول تعرفه طراحی و نظارت سامانه‌های گاز فشار ضعیف</h2>
                  <p className="text-xs text-[var(--text-muted)]">تاریخ اجرا: ۱۴۰۵/۲/۱۹ تا اطلاع ثانوی — ارقام به ریال</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--bg-raised)]">
                      <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--text-muted)]">ظرفیت کنتور</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--text-muted)]">حجمی (m³/h)</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--text-muted)]">زیربنا (m²)</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--text-muted)]">تعرفه طراحی (ریال)</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--text-muted)]">تعرفه نظارت (ریال)</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--text-muted)]">V_Unit</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--text-muted)]">V_Volumetric</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {gasTariffs.map((t) => (
                      <tr key={t.meterType} className="hover:bg-[var(--bg-raised)] transition-colors">
                        <td className="px-4 py-3 font-bold text-emerald-500" dir="ltr">{t.meterType}</td>
                        <td className="px-4 py-3 text-[var(--text-muted)] tabular-nums">{toPersianNumber(t.volumeCapacity)}</td>
                        <td className="px-4 py-3 text-[var(--text-muted)] tabular-nums">{toPersianNumber(t.floorArea)}</td>
                        <td className="px-4 py-3 text-[var(--text-primary)] tabular-nums">{formatRial(t.designFee)}</td>
                        <td className="px-4 py-3 text-[var(--text-primary)] tabular-nums">{formatRial(t.supervisionFee)}</td>
                        <td className="px-4 py-3 text-center text-[var(--text-muted)]" dir="ltr">{t.vUnit}</td>
                        <td className="px-4 py-3 text-center text-[var(--text-muted)]" dir="ltr">{t.vVolumetric}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-[var(--border)] space-y-2">
                <div className="flex items-start gap-2 text-xs text-cyan-400">
                  <Info className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>حق‌الزحمه نظارت بر سامانه گاز توکار با ۴۰٪ افزایش نسبت به حق‌الزحمه خدمات سامانه گاز روکار محاسبه می‌شود.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-amber-400">
                  <Info className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>تعرفه‌های فوق برای حداقل ۴ مرحله بازدید در نظر گرفته شده است.</span>
                </div>
              </div>
            </section>

            {/* Interactive calculator */}
            <section id="calculator" className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-[var(--border)] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-600/15 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="font-bold text-[var(--text-primary)]">ماشین‌حساب تعرفه تعاملی</h2>
                  <p className="text-xs text-[var(--text-muted)]">محاسبه خودکار حق‌الزحمه طراحی و نظارت</p>
                </div>
              </div>

              <div className="p-6 grid sm:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">نوع کنتور</label>
                    <select
                      value={meterType}
                      onChange={(e) => setMeterType(e.target.value as MeterType)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-emerald-500 transition-colors"
                      dir="ltr"
                    >
                      {gasTariffs.map((t) => (
                        <option key={t.meterType} value={t.meterType}>
                          {t.meterType} — تا {t.floorArea} m² — {t.volumeCapacity} m³/h
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">نوع پروانه</label>
                    <div className="flex gap-3">
                      {(["single", "shared"] as const).map((v) => (
                        <button
                          key={v}
                          onClick={() => setLicenseType(v)}
                          className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors border ${
                            licenseType === v
                              ? "bg-emerald-600/15 border-emerald-500 text-emerald-400"
                              : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-active)]"
                          }`}
                        >
                          {v === "single" ? "تک واحدی" : "تجمیعی (مشترک)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {licenseType === "shared" && (
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        تعداد واحدها
                      </label>
                      <input
                        type="number"
                        min={2}
                        max={100}
                        value={unitCount}
                        onChange={(e) => setUnitCount(Math.max(2, Number(e.target.value)))}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-emerald-500 transition-colors"
                        dir="ltr"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">نوع سامانه</label>
                    <div className="flex gap-3">
                      {(["surface", "embedded"] as const).map((v) => (
                        <button
                          key={v}
                          onClick={() => setSystemType(v)}
                          className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors border ${
                            systemType === v
                              ? "bg-emerald-600/15 border-emerald-500 text-emerald-400"
                              : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-active)]"
                          }`}
                        >
                          {v === "surface" ? "روکار" : "توکار (+۴۰٪)"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Output */}
                <div className="rounded-2xl bg-[var(--bg-raised)] border border-[var(--border)] p-6 flex flex-col justify-center gap-5">
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <Flame className="w-5 h-5" />
                    <span className="font-semibold text-sm">نتیجه محاسبه</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-secondary)]">هزینه طراحی</span>
                      <span className="font-bold text-[var(--text-primary)] tabular-nums" dir="ltr">{formatRial(designTotal)} ریال</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-secondary)]">هزینه نظارت</span>
                      <span className="font-bold text-[var(--text-primary)] tabular-nums" dir="ltr">{formatRial(supervisionTotal)} ریال</span>
                    </div>
                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">جمع کل</span>
                      <span className="text-xl font-black text-emerald-400 tabular-nums" dir="ltr">{formatRial(totalFee)} ریال</span>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    * این محاسبه بر اساس تعرفه مصوب ۱۴۰۵/۰۲/۱۹ انجام شده است.
                  </p>
                </div>
              </div>
            </section>

            {/* Service cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div id="track" className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/15 flex items-center justify-center mb-4">
                  <FileSearch className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">پیگیری وضعیت پرونده</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  استعلام آنلاین وضعیت پرونده گازرسانی و پیگیری مراحل صدور. برای دسترسی به این سرویس نیاز به ورود به سامانه دارید.
                </p>
              </div>

              <div id="register" className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/15 flex items-center justify-center mb-4">
                  <UserPlus className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">ثبت‌نام مجریان</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  فرآیند ثبت‌نام، احراز صلاحیت و تمدید اعتبار مجریان حوزه گازرسانی. فرم ثبت‌نام در بخش آرشیو قابل دانلود است.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
