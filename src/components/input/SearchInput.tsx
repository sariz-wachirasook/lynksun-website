import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import TextInput from './TextInput';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
}

const SearchInput: FC<Props> = ({ name, label, placeholder }) => {
  const { t } = useTranslation();

  return (
    <>
      <label
        htmlFor={name}
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-2.5 flex items-center pl-3 pointer-events-none">
          <i className="fas fa-search"></i>
        </div>
        <TextInput type="search" id={name} name={name} placeholder={placeholder} />
        <button
          type="submit"
          className="btn btn-outline absolute inset-y-0 right-0"
        >
          {t('search')}
        </button>
      </div>
    </>
  );
};

export default SearchInput;
