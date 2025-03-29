import React from "react";
import { formatDistanceToNow, format, parseISO } from "date-fns";

interface RelativeTimeProps {
  timestamp: string; // ISO date string in UTC
}

const RelativeTime: React.FC<RelativeTimeProps> = ({ timestamp }) => {
  // Parse the UTC timestamp to create a Date object
  const utcDate = parseISO(timestamp); // This creates a Date object in UTC time

  // Get the local timezone offset in minutes (positive if behind UTC, negative if ahead of UTC)
  const timezoneOffset = new Date().getTimezoneOffset(); // Difference in minutes

  // Adjust the UTC date to local time by adding/subtracting the timezone offset in milliseconds
  const localDate = new Date(utcDate.getTime() - timezoneOffset * 60 * 1000);

  // Ensure localDate is a valid Date object
  if (!(localDate instanceof Date) || isNaN(localDate.getTime())) {
    throw new Error("Invalid date provided");
  }

  // Get the time difference in hours
  const hoursDifference =
    Math.abs(new Date().getTime() - localDate.getTime()) / 36e5;

  // Convert the localDate to a relative time string (e.g., "2 hours ago")
  const relativeTime = formatDistanceToNow(localDate, { addSuffix: true });

  // Format the localDate in MM/dd/yyyy hh:mm a format
  const formattedDate = format(localDate, "MM/dd/yyyy hh:mm a");

  return (
    <span className="mb-0 text-sm">
      {hoursDifference < 24 ? `${relativeTime}` : `${formattedDate}`}
    </span>
  );
};

export default RelativeTime;
