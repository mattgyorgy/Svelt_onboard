import React, { createContext, useContext, useReducer } from 'react';
import { questions } from '../data/questions';

type OnboardingState = {
  currentStep: number;
  answers: Record<string, any>;
  isComplete: boolean;
};

type OnboardingAction = 
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_ANSWER'; questionId: string; answer: any }
  | { type: 'COMPLETE' };

const initialState: OnboardingState = {
  currentStep: 0,
  answers: {},
  isComplete: false,
};

const OnboardingContext = createContext<{
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
} | undefined>(undefined);

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'NEXT_STEP':
      const nextStep = state.currentStep + 1;
      // Check if we've reached the end of questions
      if (nextStep >= questions.length) {
        return {
          ...state,
          currentStep: nextStep,
          isComplete: true,
        };
      }
      return {
        ...state,
        currentStep: nextStep,
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(0, state.currentStep - 1),
        isComplete: false, // Reset complete state when going back
      };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.answer,
        },
      };
    case 'COMPLETE':
      return {
        ...state,
        isComplete: true,
      };
    default:
      return state;
  }
}

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}