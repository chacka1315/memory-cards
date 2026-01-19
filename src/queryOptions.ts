import { queryOptions } from '@tanstack/react-query';
import getImages from './services/images-data';

export const cardsOptions = (count: number) => {
  return queryOptions({
    queryKey: ['cards-imgs'],
    queryFn: () => getImages(count),
    staleTime: Infinity,
  });
};
