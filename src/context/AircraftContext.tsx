import React, { createContext, useContext, useState } from 'react';

import { AircraftState, AircraftContextProps, AircraftProviderProps } from '../types/AircraftTypes';

export const AircraftContext = createContext<AircraftContextProps | undefined>(undefined);

export const useAircraftContext = () => {
  const context = useContext(AircraftContext);
  if (!context) {
    throw new Error('useAircraftContext must be used within an AircraftProvider');
  }
  return context;
};

export const AircraftProvider: React.FC<AircraftProviderProps> = ({ children }) => {
  const [aircraftData, setAircraftData] = useState<AircraftState[][]>([]);

  const updateAircraftData = (data: AircraftState[][]) => {
    setAircraftData(data);
  };

  return (
    <AircraftContext.Provider value={{ aircraftData, updateAircraftData }}>
      {children}
    </AircraftContext.Provider>
  );
};