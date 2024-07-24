import React, { createContext, useContext, useState } from 'react';
import { AircraftStateArray, AircraftContextProps, AircraftProviderProps, OSNAPIResponse } from '../types/AircraftTypes';

export const AircraftContext = createContext<AircraftContextProps | null>(null);

export const useAircraftContext = () => {
  const context = useContext(AircraftContext);
  if (!context) {
    throw new Error('useAircraftContext must be used within an AircraftProvider');
  }
  return context;
};

export const AircraftProvider: React.FC<AircraftProviderProps> = ({ children }) => {
  const [aircraftData, setAircraftData] = useState<OSNAPIResponse | null>(null);

  const updateAircraftData = (data: OSNAPIResponse) => {
    setAircraftData(data);
  };

  return (
    <AircraftContext.Provider value={{ aircraftData, updateAircraftData }}>
      {children}
    </AircraftContext.Provider>
  );
}