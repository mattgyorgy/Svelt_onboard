<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { questions } from '$lib/data/questions';
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import QuestionCard from '$lib/components/QuestionCard.svelte';
  import CompletionScreen from '$lib/components/CompletionScreen.svelte';

  const currentStep = writable(0);
  const answers = writable<Record<string, any>>({});
  const isComplete = writable(false);

  let currentQuestion = questions[0];

  $: {
    currentQuestion = questions[$currentStep];
  }

  function nextStep() {
    currentStep.update(step => {
      const nextStep = step + 1;
      if (nextStep >= questions.length) {
        isComplete.set(true);
      }
      return nextStep;
    });
  }

  function prevStep() {
    currentStep.update(step => Math.max(0, step - 1));
    isComplete.set(false);
  }

  function setAnswer(questionId: string, answer: any) {
    answers.update(a => ({ ...a, [questionId]: answer }));
  }
</script>

<div class="min-h-[100dvh] bg-black flex items-center justify-center p-4 md:p-6">
  <div class="w-full max-w-xl mx-auto">
    <div class="space-y-8 animate-fadeIn">
      {#if $currentStep > 0 && !$isComplete}
        <ProgressBar current={$currentStep} total={questions.length - 1} />
      {/if}
      
      {#if $isComplete}
        <CompletionScreen />
      {:else if currentQuestion}
        <QuestionCard 
          question={currentQuestion}
          currentAnswer={$answers[currentQuestion.id]}
          isFirstQuestion={$currentStep === 0}
          {nextStep}
          {prevStep}
          {setAnswer}
        />
      {/if}
    </div>
  </div>
</div>

<style>
  :global(html) {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :global(.animate-fadeIn) {
    animation: fadeIn 0.3s ease-out forwards;
  }
</style>