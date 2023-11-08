import { FC } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';

import { useAppDispatch } from '../../store';
import { setSearchTerm } from '../../store/slices/incidentSlice';

import styles from './styles.module.scss';

type HeaderProps = {
  tabs: MenuItem[];
  activeTab: number;
  onChangeActiveTab: (index: number) => void;
};

export const Header: FC<HeaderProps> = ({
  onChangeActiveTab,
  activeTab,
  tabs,
}) => {
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return (
    <div className={styles.header}>
      <TabMenu
        model={tabs}
        activeIndex={activeTab}
        onTabChange={(e) => onChangeActiveTab(e.index)}
      />
      <div className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          placeholder="Search"
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
};
