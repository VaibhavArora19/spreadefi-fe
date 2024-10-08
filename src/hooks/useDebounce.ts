import { useEffect, useState } from 'react';

export const useDebounce = (searchInput: string, debounceDelay: number) => {
  const [value, setValue] = useState(searchInput);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setValue(searchInput);
    }, debounceDelay);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchInput, debounceDelay]);

  return value;
};
