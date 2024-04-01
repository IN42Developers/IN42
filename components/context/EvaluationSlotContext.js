import React, { createContext, useContext, useState } from 'react';

const EvaluationSlotContext = createContext();

export const useEvaluationSlotContext = () => useContext(EvaluationSlotContext);

export const EvaluationSlotProvider = ({ children }) => {
  const [mainModalVisible, setMainModalVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  // other state variables...

  const contextValue = {
    mainModalVisible,
    setMainModalVisible,
    timePickerVisible,
    setTimePickerVisible,
    // other state variables and functions...
  };

  return (
    <EvaluationSlotContext.Provider value={contextValue}>
      {children}
    </EvaluationSlotContext.Provider>
  );
};