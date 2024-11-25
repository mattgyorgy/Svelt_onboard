import React from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import CompletionScreen from './CompletionScreen';
import { questions } from '../data/questions';

export default function OnboardingFlow() {
  const { state } = useOnboarding();
  const totalSteps = questions.length;
  const currentQuestion = questions[state.currentStep];

  // Check if we've completed all questions
  if (state.currentStep >= questions.length) {
    return <CompletionScreen />;
  }

  // Ensure we have a valid question before rendering
  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {state.currentStep > 0 && (
        <ProgressBar current={state.currentStep} total={totalSteps - 1} />
      )}
      <QuestionCard 
        question={currentQuestion}
        currentAnswer={state.answers[currentQuestion.id]}
        isFirstQuestion={state.currentStep === 0}
      />
    </div>
  );
}