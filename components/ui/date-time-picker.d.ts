import * as React from "react";

declare module '@/components/ui/date-time-picker' {
  import { Dayjs } from 'dayjs';

  export interface DateTimePickerProps {
    date: Date | null;
    setDate: (date: Date | null) => void;
    className?: string;
    disabled?: boolean;
    placeholder?: string;
    fromDate?: Date;
    toDate?: Date;
    showTimeSelect?: boolean;
    timeIntervals?: number;
    timeFormat?: string;
    dateFormat?: string;
    minTime?: Date;
    maxTime?: Date;
    filterTime?: (time: Date) => boolean;
    filterDate?: (date: Date) => boolean;
    locale?: any;
    timeCaption?: string;
    showYearDropdown?: boolean;
    showMonthDropdown?: boolean;
    dropdownMode?: 'scroll' | 'select';
    withPortal?: boolean;
    shouldCloseOnSelect?: boolean;
    onCalendarOpen?: () => void;
    onCalendarClose?: () => void;
    onChange?: (date: Date | null) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    customInput?: React.ReactNode;
    customInputRef?: React.RefObject<HTMLInputElement>;
    renderCustomHeader?: (props: {
      date: Date;
      decreaseMonth: () => void;
      increaseMonth: () => void;
      decreaseYear: () => void;
      increaseYear: () => void;
      prevMonthButtonDisabled: boolean;
      nextMonthButtonDisabled: boolean;
      prevYearButtonDisabled: boolean;
      nextYearButtonDisabled: boolean;
    }) => React.ReactNode;
  }

  const DateTimePicker: React.FC<DateTimePickerProps>;
  
  export default DateTimePicker;
}
