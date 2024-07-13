import { useEffect, useState } from 'react';

export const useSearchQuery = (defaultValue: string) => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const storedQuery = localStorage.getItem('movie');
    return storedQuery ? storedQuery : defaultValue;
  });

  useEffect(() => {
    return () => {
      localStorage.setItem('movie', searchQuery);
    };
  }, [searchQuery]);

  return [searchQuery, setSearchQuery] as const;
};
