import { Incident } from '../store/types';

export const getFormattedDate = (date: Date): string => {
  const dateObj = new Date(date);

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

export const filterIncidents = (incidents: Incident[], searchTerm: string) =>
  incidents.filter((incident) => {
    const searchFields = [
      incident.equipment,
      incident.message,
      incident.responsible,
    ];
    return searchFields.some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  });

export const allPropertiesNotEmpty = <T extends Record<string, any>>(
  obj: T,
): boolean => {
  return Object.keys(obj).every((key) => {
    return obj.hasOwnProperty(key) && obj[key] && obj[key].length > 0;
  });
};
