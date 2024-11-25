import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';
import { Question } from '../types';
import { validateEmail, validateUrl } from '../utils/validation';

type QuestionCardProps = {
  question: Question;
  currentAnswer: any;
  isFirstQuestion?: boolean;
};

export default function QuestionCard({ question, currentAnswer, isFirstQuestion }: QuestionCardProps) {
  const { dispatch } = useOnboarding();
  const [answer, setAnswer] = useState('');
  const [otherValue, setOtherValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (question.type !== 'text') {
      setAnswer(currentAnswer);
    }
  }, [currentAnswer, question.type]);

  const validateAndProceed = () => {
    if (question.id === 'email') {
      const { valid, error } = validateEmail(answer);
      if (!valid) {
        setError(error);
        return;
      }
    }

    dispatch({ type: 'SET_ANSWER', questionId: question.id, answer });
    dispatch({ type: 'NEXT_STEP' });
    setError(null);
    
    if (question.type === 'text') {
      setAnswer('');
    }
  };

  const handleNext = () => {
    validateAndProceed();
  };

  const handlePrev = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  if (isFirstQuestion) {
    return (
      <div className="bg-black rounded-xl border border-[#A6A6A6] p-5 md:p-8 space-y-6 md:space-y-8 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Let's share your <span className="text-[#D4FB5D]">video stories</span>
        </h1>
        
        <div className="space-y-4">
          <p className="text-lg md:text-xl text-[#A6A6A6]">
            Answer a few questions to help us understand your business and create a personalized video content strategy.
          </p>
          
          <div className="flex items-center gap-2 text-[#A6A6A6] text-sm md:text-base">
            <Clock className="w-4 h-4 md:w-5 md:h-5" />
            <span>Takes about 3 minutes to complete</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleNext}
            className="w-full py-3.5 md:py-4 px-6 bg-[#D4FB5D] text-black rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 text-base md:text-lg"
          >
            Start Your Video Journey
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          
          <p className="text-xs md:text-sm text-[#A6A6A6] text-center">
            Your information helps us create a tailored experience for your business
          </p>
        </div>
      </div>
    );
  }

  const renderInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <div className="space-y-2">
            <input
              type={question.id === 'email' ? 'email' : 'text'}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setError(null);
              }}
              className={`w-full p-3 md:p-4 bg-black border ${error ? 'border-red-500' : 'border-[#A6A6A6]'} rounded-lg text-white placeholder-[#A6A6A6] focus:ring-2 focus:ring-[#D4FB5D] focus:border-transparent text-base md:text-lg`}
              placeholder={question.placeholder}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );
      case 'single-select':
        return (
          <div className="space-y-2.5 md:space-y-3">
            {question.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setAnswer(option.value);
                  if (!question.hasOther || option.value !== 'other') {
                    setTimeout(() => {
                      dispatch({ type: 'SET_ANSWER', questionId: question.id, answer: option.value });
                      dispatch({ type: 'NEXT_STEP' });
                    }, 300);
                  }
                }}
                className={`w-full p-3.5 md:p-4 text-left rounded-lg border transition-all text-base md:text-lg ${
                  answer === option.value
                    ? 'border-[#D4FB5D] bg-black text-[#D4FB5D]'
                    : 'border-[#A6A6A6] text-white hover:border-[#D4FB5D] hover:text-[#D4FB5D]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        );
      case 'multi-select':
        return (
          <div className="space-y-2.5 md:space-y-3">
            {question.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  const newAnswer = Array.isArray(answer) ? [...answer] : [];
                  const index = newAnswer.indexOf(option.value);
                  if (index === -1) {
                    newAnswer.push(option.value);
                  } else {
                    newAnswer.splice(index, 1);
                  }
                  setAnswer(newAnswer);
                }}
                className={`w-full p-3.5 md:p-4 text-left rounded-lg border transition-all text-base md:text-lg ${
                  Array.isArray(answer) && answer.includes(option.value)
                    ? 'border-[#D4FB5D] bg-black text-[#D4FB5D]'
                    : 'border-[#A6A6A6] text-white hover:border-[#D4FB5D] hover:text-[#D4FB5D]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-black rounded-xl border border-[#A6A6A6] p-5 md:p-8 space-y-5 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold text-white">{question.text}</h2>
      {question.description && (
        <p className="text-sm md:text-base text-[#A6A6A6]">{question.description}</p>
      )}
      
      <div className="space-y-5 md:space-y-6">
        {renderInput()}
        
        {question.hasOther && answer === 'other' && (
          <input
            type="text"
            value={otherValue}
            onChange={(e) => setOtherValue(e.target.value)}
            className="w-full p-3 md:p-4 bg-black border border-[#A6A6A6] rounded-lg text-white placeholder-[#A6A6A6] focus:ring-2 focus:ring-[#D4FB5D] focus:border-transparent text-base md:text-lg"
            placeholder="Please specify..."
          />
        )}
      </div>

      <div className="flex justify-between pt-4 md:pt-6">
        <button
          onClick={handlePrev}
          className="flex items-center px-3 md:px-4 py-2 text-[#A6A6A6] hover:text-white text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        
        {(question.type === 'multi-select' || question.type === 'text' || (question.hasOther && answer === 'other')) && (
          <button
            onClick={handleNext}
            disabled={!answer || (answer === 'other' && !otherValue)}
            className="flex items-center px-5 md:px-6 py-2 bg-[#D4FB5D] text-black rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}