import React, { createContext, useContext, useReducer } from 'react';

export type JobCategory = 'webDev' | 'mobileDev' | 'uiux' | 'seo' | 'graphics' | 'content' | 'consulting' | null;

interface EstimationState {
  currentStep: number;
  selectedCategory: JobCategory;
  complexity: number;
  duration: number;
  requirements: string[];
}

type EstimationAction = 
  | { type: 'SET_CATEGORY'; payload: JobCategory }
  | { type: 'SET_COMPLEXITY'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'ADD_REQUIREMENT'; payload: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET' };

const initialState: EstimationState = {
  selectedCategory: null,
  complexity: 0,
  duration: 0,
  requirements: [],
  currentStep: 0, // Should ensure categories render initially
};

const EstimationContext = createContext<{
  state: EstimationState;
  dispatch: React.Dispatch<EstimationAction>;
} | undefined>(undefined);

function estimationReducer(state: EstimationState, action: EstimationAction): EstimationState {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_COMPLEXITY':
      return { ...state, complexity: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'ADD_REQUIREMENT':
      return { ...state, requirements: [...state.requirements, action.payload] };
    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 };
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function EstimationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(estimationReducer, initialState);
  console.log('EstimationProvider State:', state); // Debug state
  return (
    <EstimationContext.Provider value={{ state, dispatch }}>
      {children}
    </EstimationContext.Provider>
  );
}

export function useEstimation() {
  const context = useContext(EstimationContext);
  if (context === undefined) {
    throw new Error('useEstimation must be used within an EstimationProvider');
  }
  return context;
}