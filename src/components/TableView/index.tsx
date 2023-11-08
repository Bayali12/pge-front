import { FC } from 'react';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { Incident } from '../../store/types';
import { useAppDispatch } from '../../store';
import { toggleReadStatus } from '../../store/slices/incidentSlice';
import { getFormattedDate } from '../../helpers';
import message from '../../assets/message.svg';
import openMessage from '../../assets/openMessage.svg';

import styles from './styles.module.scss';

type tableViewProps = {
  incidents: Incident[];
};

const actionBodyTemplate = (rowData: Incident) => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={styles.toggleBtn}
      onClick={() => dispatch(toggleReadStatus(rowData.id))}>
      <img src={rowData.isRead ? openMessage : message} alt="icon" />
    </button>
  );
};

const dateBodyTemplate = (rowData: Incident) => {
  const formattedDate = getFormattedDate(rowData.createdAt);
  return formattedDate;
};

const rowClass = (data: any) => {
  return {
    'bg-primary-50': data.isRead,
  };
};

export const TableView: FC<tableViewProps> = ({ incidents }) => {
  return (
    <DataTable
      className={styles.table}
      value={incidents}
      rowClassName={rowClass}
      paginator
      rows={10}>
      <Column field="createdAt" header="Дата" body={dateBodyTemplate} />
      <Column field="importance" header="Важность" />
      <Column field="equipment" header="Оборудование" />
      <Column sortable field="message" header="Сообщение" />
      <Column sortable field="responsible" header="Ответственный" />
      <Column align="center" body={actionBodyTemplate} />
    </DataTable>
  );
};
