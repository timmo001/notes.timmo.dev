import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

import { useMemo } from "react";

export function Date({ date }: { date: Date }) {
  const formattedDate = useMemo<string>(() => {
    dayjs.extend(localizedFormat);
    return dayjs(date).format("L LT");
  }, [date]);

  return formattedDate;
}

export function DateFromNow({ date }: { date: Date }) {
  const formattedDate = useMemo<string>(() => {
    dayjs.extend(relativeTime);
    return dayjs(date).fromNow();
  }, [date]);

  return formattedDate;
}
