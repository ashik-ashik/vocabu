import { useContext } from 'react';
import { DataContext } from '../contexts/CreateContext';

const useData = () => {
  return useContext(DataContext);
};

export default useData;