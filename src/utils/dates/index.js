import moment from 'moment';

export const minutesOfDay = m => {
  return m.minutes() + m.hours() * 60;
};

export const validaNewReminderDate = (
  newReminderId = '',
  newReminderTime = moment(),
  newReminderDate = moment(),
  reminders = []
) => {
  return reminders.some(
    rmd =>
      minutesOfDay(moment(rmd.time)) ===
        minutesOfDay(moment(newReminderTime)) &&
      rmd.id !== newReminderId &&
      moment(rmd.date).isSame(moment(newReminderDate), 'day')
  );
};
