import { FC, useEffect, useState } from 'react';

import { Incident } from '../../store/types';
import { DataView } from 'primereact/dataview';
import { Card } from '../Card';

import styles from './styles.module.scss';

type CardsViewProps = {
  incidents: Incident[];
};

const itemTemplate = (incident: Incident, layout: string) => {
  if (layout === 'grid' && incident) return Card({ incident });
  return;
};

export const CardsView: FC<CardsViewProps> = ({ incidents }) => {
  return (
    <div className={styles.cards}>
      <DataView
        value={incidents}
        layout="grid"
        itemTemplate={itemTemplate}
        paginator
        rows={8}
      />
    </div>
  );
};
