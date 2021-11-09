import { format, parse, parseISO } from 'date-fns';
import { DATE_TIME_FORMAT } from './datetime';

export const formatDOB = (dob: string | undefined) => {
  return dob ? format(parseISO(dob), DATE_TIME_FORMAT) : 'N/A';
};

export const getDateFromString = (dob: string | undefined) => {
  return dob ? parse(dob, DATE_TIME_FORMAT, new Date()) : new Date();
};
