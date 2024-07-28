import { useEffect, useState } from 'react';

export const useSearchQuery = (defaultValue: string) => {
  const [searchQuery, setSearchQuery] = useState<string>((): string => {
    const storedQuery = localStorage.getItem('movie');
    return storedQuery ? storedQuery : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem('movie', searchQuery);

    return () => {
      localStorage.removeItem('movie');
    };
  }, [searchQuery]);

  return [searchQuery, setSearchQuery] as const;
};
