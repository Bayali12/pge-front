import { useState } from 'react';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Incident } from '../../store/types';
import { allPropertiesNotEmpty } from '../../helpers';
import axios from '../../http';

import styles from './styles.module.scss';

export const AddIncident = () => {
  const [newIncident, setNewIncident] = useState<
    Pick<Incident, 'equipment' | 'message' | 'importance' | 'responsible'>
  >({
    equipment: '',
    message: '',
    importance: '',
    responsible: '',
  });
  const [visible, setVisible] = useState(false);

  const hideDialog = () => {
    setVisible(false);
  };

  const setNewIncidentValue = (
    value: string,
    key: 'equipment' | 'message' | 'importance' | 'responsible',
  ) => {
    setNewIncident({ ...newIncident, [key]: value });
  };

  const onClicklSave = async () => {
    try {
      if (allPropertiesNotEmpty(newIncident)) {
        await axios.post('/', newIncident);
        hideDialog();
      }
    } catch (error) {
      console.warn(error);
      alert('Ошибка при добавлении события');
    }
  };

  return (
    <div className={styles.card}>
      <Button onClick={() => setVisible(true)}>Добавить</Button>
      <Dialog
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        visible={visible}
        header="Добавить событие"
        onHide={hideDialog}
        draggable={false}>
        <form>
          <div className="flex flex-column gap-2 pb-3">
            <label htmlFor="importance">Важность</label>
            <InputText
              id="importance"
              onChange={(e) =>
                setNewIncidentValue(e.target.value, 'importance')
              }
              required
            />
          </div>
          <div className="flex flex-column gap-2 pb-3">
            <label htmlFor="equipment">Оборудование</label>
            <InputText
              id="equipment"
              onChange={(e) => setNewIncidentValue(e.target.value, 'equipment')}
              required
            />
          </div>
          <div className="flex flex-column gap-2 pb-3">
            <label htmlFor="message">Сообщение</label>
            <InputText
              id="message"
              onChange={(e) => setNewIncidentValue(e.target.value, 'message')}
              required
            />
          </div>
          <div className="flex flex-column gap-2 pb-3">
            <label htmlFor="responsible">Ответственный</label>
            <InputText
              id="responsible"
              onChange={(e) =>
                setNewIncidentValue(e.target.value, 'responsible')
              }
              required
            />
          </div>
          <div className="flex justify-content-end gap-2 pt-3">
            <Button
              onClick={() => hideDialog()}
              outlined
              label="Отменить"
              icon="pi pi-times"
            />
            <Button
              type="submit"
              label="Сохранить"
              icon="pi pi-check"
              onClick={onClicklSave}
            />
          </div>
        </form>
      </Dialog>
    </div>
  );
};
