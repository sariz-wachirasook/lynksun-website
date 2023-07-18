import { t } from 'i18next';

export const formatDateTime = (datetime: string | null) => {
  if (!datetime) {
    return '';
  }

  const date = new Date(datetime);

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

export const getDate = (datetime: string | null) => {
  if (!datetime) {
    return '';
  }

  const date = new Date(datetime);

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(date);
};

export const getTime = (datetime: string | null) => {
  if (!datetime) {
    return '';
  }

  const date = new Date(datetime);

  return new Intl.DateTimeFormat('en-US', {
    timeStyle: 'short',
  }).format(date);
};

export const getDateTime = (datetime: string | null) => {
  if (!datetime) {
    return '';
  }

  const date = new Date(datetime);

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

export const getSeason = (datetime: string | null) => {
  if (!datetime) {
    return '';
  }

  const date = new Date(datetime);
  const month = date.getMonth() + 1;
  const season = Math.floor((month % 12) / 3);

  switch (season) {
    case 0:
      return t('spring');
    case 1:
      return t('summer');
    case 2:
      return t('autumn');
    case 3:
      return t('winter');
    default:
      return '';
  }
};
