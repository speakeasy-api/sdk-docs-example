import React, { FC, useContext } from 'react';
import { Select } from 'antd';

import { LanguageContext } from '@/utils/contexts/languageContext';
import { LANGUAGES } from '@/utils/enums/languages';

import { languages } from './utils/data';
import styles from './styles.module.scss';

const { Option } = Select;

interface ILanguageSelector {
  languageList: LANGUAGES[]
}

const LanguageSelector: FC<ILanguageSelector> = ({ languageList }) => {
  const { language, setLanguage } = useContext(LanguageContext);

  const handleChange = (value: LANGUAGES) => setLanguage(value);

  return (
    <Select
      defaultValue={language || languageList[0]}
      value={language}
      onChange={handleChange}
      className={styles.select}
    >
      {languageList.map(language => {
        const { title, Icon } = languages[language];

        return (
          <Option
            value={languages[language].value}
            key={language}
          >
            <Icon/>
            {title}
          </Option>
        );
      })}
    </Select>
  );
};

export default LanguageSelector;