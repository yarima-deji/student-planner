// src/hooks/useReminders.js
import { useEffect, useRef, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { useSnackbar } from "notistack";
import { isWithinInterval, parseISO, addMinutes } from "date-fns";
import { isWithinQuietHours } from "../utils/timeUtils";

export function useReminders() {
  const {
    state: { tasks = [], events = [], settings = {} },
  } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const seen = useRef(new Set());

  // Precompute whether we're in quiet hours
  const inQuiet = useMemo(
    () =>
      settings.notificationsEnabled === false ||
      isWithinQuietHours(settings.quietHours.start, settings.quietHours.end),
    [settings.notificationsEnabled, settings.quietHours]
  );

  useEffect(() => {
    if (inQuiet) return; // no toasts if notifications off or during quiet hours

    const now = new Date();
    const lead = parseInt(settings.reminderLeadTime, 10) || 0;
    const windowEnd = addMinutes(now, lead);

    const checkAndNotify = (items, variant, label) => {
      items.forEach((item) => {
        const key = `${label}-${item.id}`;
        if (seen.current.has(key)) return;

        const tsString = item.due || item.time;
        if (!tsString) return;

        let date;
        try {
          date = parseISO(tsString);
        } catch {
          return;
        }

        if (isWithinInterval(date, { start: now, end: windowEnd })) {
          enqueueSnackbar(
            `${label === "task" ? "Upcoming Task" : "Upcoming Event"}: ${item.title}`,
            { variant }
          );
          seen.current.add(key);
        }
      });
    };

    checkAndNotify(tasks, "info", "task");
    checkAndNotify(events, "warning", "event");
  }, [
    tasks,
    events,
    inQuiet,
    settings.reminderLeadTime,
    enqueueSnackbar,
  ]);
}
