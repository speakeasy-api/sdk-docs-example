import React, { FC, useContext } from 'react';
import cn from 'classnames';
import { Select } from 'antd';
import { LanguageContext } from '@/utils/contexts/languageContext';
import { Language } from '@/utils/enums/language';
import { languageData } from './utils/data';
import styles from './styles.module.scss';

const { Option } = Select;

interface ILanguageSelector {
  style?: 'icon' | 'small' | 'large';
}

const LanguageSelector: FC<ILanguageSelector> = ({ style = 'large' }) => {
  const { language, setLanguage, languages } = useContext(LanguageContext);

  const handleChange = (value: Language) => setLanguage(value);

  return (
    <Select
      defaultValue={language}
      value={language}
      onChange={handleChange}
      className={cn(
        styles.select,
        { [styles.small]: style === 'small' },
        { [styles.icon]: style === 'icon' },
      )}
      getPopupContainer={({ parentElement }) => parentElement}
      suffixIcon={style !== 'icon' && undefined}
    >
      {languages.map((language) => {
        const { title, Icon } = languageData[language];

        return (
          <Option value={language} key={language}>
            {style !== 'large' && <Icon />}
            {style !== 'icon' && title}
          </Option>
        );
      })}
    </Select>
  );
};

export default LanguageSelector;
