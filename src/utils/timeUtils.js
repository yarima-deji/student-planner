// returns true if current time is in the user’s quiet-hours window
export function isWithinQuietHours(startHHmm, endHHmm) {
  const now = new Date();
  const [sh, sm] = startHHmm.split(":").map(Number);
  const [eh, em] = endHHmm.split(":").map(Number);

  const today    = now.toLocaleDateString();
  const startDt  = new Date(`${today} ${sh.toString().padStart(2, "0")}:${sm.toString().padStart(2, "0")}`);
  const endDt    = new Date(`${today} ${eh.toString().padStart(2, "0")}:${em.toString().padStart(2, "0")}`);

  // if end is earlier than start, quiet wraps midnight:
  if (endDt <= startDt) {
    // quiet hours from start→midnight AND midnight→end
    return now >= startDt || now <= endDt;
  }
  return now >= startDt && now <= endDt;
}
