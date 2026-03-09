"use client";

import { useState } from "react";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  format,
  addYears,
  isBefore,
  addMonths,
} from "date-fns";
import { Checkbox } from "@shared/components/ui/Input";
import Section from "@shared/components/ui/Section";
import DateInput from "@shared/components/ui/DateInput";

export default function AgeCalculator() {
  const [dob, setDob] = useState<string>("");
  const [dob2, setDob2] = useState<string>("");
  const [showDiff, setShowDiff] = useState(false);

  const [tillNow, setTillNow] = useState(true);
  const [tillDate, setTillDate] = useState<string>("");

  const today = new Date();
  const effectiveTillDate = tillNow ? today : tillDate ? new Date(tillDate) : today;

  const calculateAge = (date: string, toDate?: Date) => {
    if (!date) return null;
    const birthDate = new Date(date);
    const endDate = toDate ?? new Date();

    if (isBefore(endDate, birthDate)) return null;

    const years = differenceInYears(endDate, birthDate);
    let temp = addYears(birthDate, years);

    const months = differenceInMonths(endDate, temp);
    temp = addMonths(temp, months);

    const days = differenceInDays(endDate, temp);

    // Next birthday (only valid if tillNow = true)
    let nextBirthday: Date | null = null;
    let daysToBirthday: number | null = null;

    if (tillNow) {
      nextBirthday = new Date(endDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      if (isBefore(nextBirthday, endDate)) {
        nextBirthday = addYears(nextBirthday, 1);
      }
      daysToBirthday = differenceInDays(nextBirthday, endDate);
    }

    return { years, months, days, nextBirthday, daysToBirthday };
  };

  const age1 = calculateAge(dob, effectiveTillDate);
  const age2 = calculateAge(dob2, effectiveTillDate);

  const getDiff = () => {
    if (!dob || !dob2) return null;

    const d1 = new Date(dob);
    const d2 = new Date(dob2);

    // Ensure earlier <= later
    const [er, later] = d1 < d2 ? [d1, d2] : [d2, d1];
    let earlier = er;
    const years = differenceInYears(later, earlier);
    earlier = addYears(earlier, years);

    const months = differenceInMonths(later, earlier);
    earlier = addMonths(earlier, months);

    const days = differenceInDays(later, earlier);

    return { years, months, days };
  };

  const diff = getDiff();

  return (
    <Section className="max-w-2xl" title="Age Calculator">
      {/* DOB Input */}
      <div className="mb-6 mt-3">
        <label className="block font-medium mb-2">Enter Date of Birth:</label>
        <DateInput
          value={dob ? new Date(dob) : null}
          onChange={(d) => {
            if (d instanceof Date) {
              setDob(format(d, "yyyy-MM-dd"));
            } else {
              setDob("");
            }
          }}
          maxDate={effectiveTillDate}
          labelClassName="block font-medium mb-2"
        />
      </div>

      {/* Till now toggle */}
      <div className="flex items-center gap-2 mb-4">
        <Checkbox
          id="tillNow"
          checked={tillNow}
          onChange={(e) => setTillNow(e.target.checked)}
        />
        <label htmlFor="tillNow">Calculate till now</label>
      </div>

      {/* Custom till date if unchecked */}
      {!tillNow && (
        <div className="mb-6">
          <label className="block font-medium mb-2">Calculate till date:</label>
          <DateInput
            value={tillDate ? new Date(tillDate) : null}
            onChange={(d) => {
              if (d instanceof Date) setTillDate(format(d, "yyyy-MM-dd"));
              else setTillDate("");
            }}
            minDate={dob ? new Date(dob) : undefined}
            labelClassName="block font-medium mb-2"
          />
        </div>
      )}

      {/* Age Result */}
      {age1 && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <h2 className="font-semibold mb-2">Your Age:</h2>
          <p>
            <span className="font-bold">{age1.years}</span> Years{" "}
            <span className="font-bold">{age1.months}</span> Months{" "}
            <span className="font-bold">{age1.days}</span> Days
          </p>

          {tillNow && age1.nextBirthday && (
            <p className="mt-2">
              🎂 Next Birthday:{" "}
              <span className="font-semibold">{format(age1.nextBirthday, "PPP")}</span> (
              {age1.daysToBirthday} days left)
            </p>
          )}
        </div>
      )}

      {/* Toggle Difference */}
      <div className="flex items-center gap-2 mb-4">
        <Checkbox
          id="showDiff"
          checked={showDiff}
          onChange={(e) => setShowDiff(e.target.checked)}
        />
        <label htmlFor="showDiff">Compare with another person</label>
      </div>

      {showDiff && (
        <>
          <div className="mb-6">
            <label className="block font-medium mb-2">Enter Second Date of Birth:</label>
            <DateInput
              value={dob2 ? new Date(dob2) : null}
              onChange={(d) => {
                if (d instanceof Date) setDob2(format(d, "yyyy-MM-dd"));
                else setDob2("");
              }}
              maxDate={effectiveTillDate}
              labelClassName="block font-medium mb-2"
            />
          </div>

          {age2 && (
            <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <h2 className="font-semibold mb-2">Second Person Age:</h2>
              <p>
                <span className="font-bold">{age2.years}</span> Years{" "}
                <span className="font-bold">{age2.months}</span> Months{" "}
                <span className="font-bold">{age2.days}</span> Days
              </p>
              {tillNow && age2.nextBirthday && (
                <p className="mt-2">
                  🎂 Next Birthday:{" "}
                  <span className="font-semibold">{format(age2.nextBirthday, "PPP")}</span> (
                  {age2.daysToBirthday} days left)
                </p>
              )}
            </div>
          )}

          {diff && (
            <div className="mt-4 p-4 border rounded-lg bg-blue-50 dark:bg-blue-900">
              <h2 className="font-semibold mb-2">Age Difference:</h2>
              <p>
                <span className="font-bold">{diff.years}</span> Years{" "}
                <span className="font-bold">{diff.months}</span> Months{" "}
                <span className="font-bold">{diff.days}</span> Days
              </p>
            </div>
          )}
        </>
      )}
    </Section>
  );
}
