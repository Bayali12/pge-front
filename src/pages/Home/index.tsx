import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Header } from '../../components/Header';
import { TableView } from '../../components/TableView';
import { CardsView } from '../../components/CardsView';
import { fetchIncidents } from '../../store/slices/incidentSlice';
import { useAppDispatch } from '../../store';
import { selectIncidents, selectSearchTerm } from '../../store/selectors';
import { filterIncidents } from '../../helpers';
import { AddIncident } from '../../components/AddIncident';

import styles from './styles.module.scss';

const tabs = [
  { label: 'Таблица', icon: 'pi pi-fw pi-list' },
  { label: 'Карточки', icon: 'pi pi-fw pi-table' },
];

export const Home = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const incidents = useSelector(selectIncidents);
  const searchTerm = useSelector(selectSearchTerm);
  const filteredIncidents = filterIncidents(incidents, searchTerm);

  useEffect(() => {
    dispatch(fetchIncidents());
  }, []);

  return (
    <div className={styles.home}>
      <Header
        tabs={tabs}
        onChangeActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <AddIncident />
      <div className={styles.content}>
        {activeTab ? (
          <CardsView incidents={filteredIncidents} />
        ) : (
          <TableView incidents={filteredIncidents} />
        )}
      </div>
    </div>
  );
};
