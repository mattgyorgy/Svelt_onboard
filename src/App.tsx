import React from 'react';
import { OnboardingProvider } from './context/OnboardingContext';
import OnboardingFlow from './components/OnboardingFlow';

function App() {
  return (
    <OnboardingProvider>
      <div className="min-h-[100dvh] bg-black flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-xl mx-auto">
          <OnboardingFlow />
        </div>
      </div>
    </OnboardingProvider>
  );
}

export default App;