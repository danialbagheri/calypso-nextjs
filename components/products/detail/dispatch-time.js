import { useEffect, useState } from "react";

export default function DispatchTime() {
  const [dispatchTime, setDispatchTime] = useState("");

  function isSaturday(today) {
    const dayOfWeek = today.getDay();
    return dayOfWeek === 6; // 6 = Saturday, 0 = Sunday
  }
  function isSunday(today) {
    const dayOfWeek = today.getDay();
    return dayOfWeek === 0; // 6 = Saturday, 0 = Sunday
  }
  function isFriday(today) {
    const dayOfWeek = today.getDay();
    return dayOfWeek === 5; // 6 = Saturday, 0 = Sunday
  }

  function isEvening(today) {
    const currentHour = today.getHours();
    return currentHour >= 15;
  }
  function calculateTheDispatchTime() {
    const today = new Date();
    if (isSaturday(today) || isSunday(today)) {
      setDispatchTime(
        "Usually dispatched on Monday morning for next day delivery"
      );
    } else if (isFriday(today) && isEvening(today)) {
      setDispatchTime(
        "Usually dispatched on Monday morning for next day delivery"
      );
    } else {
      if (isEvening(today)) {
        setDispatchTime("Usually dispatched next day.");
      } else {
        setDispatchTime("Order before 3:00 pm for same day dispatch.");
      }
    }
  }

  useEffect(() => {
    calculateTheDispatchTime();
  }, []);
  return <>{dispatchTime}</>;
}
