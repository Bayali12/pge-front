import { RootState } from '..';

export const selectIncidents = (state: RootState) => state.incidents.data;
export const selectSearchTerm = (state: RootState) =>
  state.incidents.searchTerm;
