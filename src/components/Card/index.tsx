import { FC } from 'react';
import { classNames } from 'primereact/utils';
import { Tooltip } from 'primereact/tooltip';
import { Card as CardWrapper } from 'primereact/card';

import { Incident } from '../../store/types';
import { getFormattedDate } from '../../helpers';
import { useAppDispatch } from '../../store';
import { toggleReadStatus } from '../../store/slices/incidentSlice';
import profile from '../../assets/profile.svg';
import message from '../../assets/message.svg';
import openMessage from '../../assets/openMessage.svg';

import styles from './styles.module.scss';

type CardProps = {
  incident: Incident;
};

export const Card: FC<CardProps> = ({ incident }) => {
  const dispatch = useAppDispatch();

  return (
    <CardWrapper
      style={{ width: '390px', padding: 0 }}
      className={classNames({ 'bg-primary-50': incident.isRead })}>
      <p className={styles.date}>
        {`Дата: ${getFormattedDate(incident.createdAt)}`}
      </p>
      <p className={styles.importance}>{`Важность: ${incident.importance}`}</p>
      <p className={styles.equipment}>
        {`Оборудование: ${incident.equipment}`}
      </p>
      <p
        className={classNames(styles.message, `messageText${incident.id}`)}
        data-pr-tooltip={`Сообщение: ${incident.message}`}>
        {`Сообщение: ${incident.message}`}
        <Tooltip
          mouseTrack
          target={`.messageText${incident.id}`}
          style={{ boxShadow: 'none' }}
        />
      </p>
      <div className={styles.footer}>
        <div className={styles.responsible}>
          <img src={profile} alt="" />
          <p>{incident.responsible}</p>
        </div>
        <button
          className={styles.toggleBtn}
          onClick={() => dispatch(toggleReadStatus(incident.id))}>
          <img src={incident.isRead ? openMessage : message} alt="icon" />
        </button>
      </div>
    </CardWrapper>
  );
};
