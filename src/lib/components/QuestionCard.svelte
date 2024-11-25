<script lang="ts">
  import { ArrowLeft, ArrowRight, Clock } from 'lucide-svelte';
  import type { Question } from '$lib/types';
  import { validateEmail, validateUrl } from '$lib/utils/validation';

  export let question: Question;
  export let currentAnswer: any;
  export let isFirstQuestion: boolean = false;
  export let nextStep: () => void;
  export let prevStep: () => void;
  export let setAnswer: (questionId: string, answer: any) => void;

  let answer = '';
  let otherValue = '';
  let error: string | null = null;

  $: if (question.type !== 'text') {
    answer = currentAnswer;
  }

  function validateAndProceed() {
    if (question.id === 'email') {
      const { valid, error: validationError } = validateEmail(answer);
      if (!valid) {
        error = validationError;
        return;
      }
    }

    setAnswer(question.id, answer);
    nextStep();
    error = null;
    
    if (question.type === 'text') {
      answer = '';
    }
  }

  function handleNext() {
    validateAndProceed();
  }
</script>

{#if isFirstQuestion}
  <div class="bg-black rounded-xl border border-[#A6A6A6] p-5 md:p-8 space-y-6 md:space-y-8 max-w-2xl mx-auto">
    <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight">
      Let's share your <span class="text-[#D4FB5D]">video stories</span>
    </h1>
    
    <div class="space-y-4">
      <p class="text-lg md:text-xl text-[#A6A6A6]">
        Answer a few questions to help us understand your business and create a personalized video content strategy.
      </p>
      
      <div class="flex items-center gap-2 text-[#A6A6A6] text-sm md:text-base">
        <Clock class="w-4 h-4 md:w-5 md:h-5" />
        <span>Takes about 3 minutes to complete</span>
      </div>
    </div>

    <div class="space-y-4">
      <button
        on:click={nextStep}
        class="w-full py-3.5 md:py-4 px-6 bg-[#D4FB5D] text-black rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 text-base md:text-lg"
      >
        Start Your Video Journey
        <ArrowRight class="w-4 h-4 md:w-5 md:h-5" />
      </button>
      
      <p class="text-xs md:text-sm text-[#A6A6A6] text-center">
        Your information helps us create a tailored experience for your business
      </p>
    </div>
  </div>
{:else}
  <div class="bg-black rounded-xl border border-[#A6A6A6] p-5 md:p-8 space-y-5 md:space-y-6">
    <h2 class="text-xl md:text-2xl font-semibold text-white">{question.text}</h2>
    {#if question.description}
      <p class="text-sm md:text-base text-[#A6A6A6]">{question.description}</p>
    {/if}
    
    <div class="space-y-5 md:space-y-6">
      {#if question.type === 'text'}
        <div class="space-y-2">
          <input
            type={question.id === 'email' ? 'email' : 'text'}
            bind:value={answer}
            on:input={() => error = null}
            class="w-full p-3 md:p-4 bg-black border {error ? 'border-red-500' : 'border-[#A6A6A6]'} rounded-lg text-white placeholder-[#A6A6A6] focus:ring-2 focus:ring-[#D4FB5D] focus:border-transparent text-base md:text-lg"
            placeholder={question.placeholder}
          />
          {#if error}
            <p class="text-red-500 text-sm">{error}</p>
          {/if}
        </div>
      {:else if question.type === 'single-select'}
        <div class="space-y-2.5 md:space-y-3">
          {#each question.options || [] as option}
            <button
              on:click={() => {
                answer = option.value;
                if (!question.hasOther || option.value !== 'other') {
                  setTimeout(() => {
                    setAnswer(question.id, option.value);
                    nextStep();
                  }, 300);
                }
              }}
              class="w-full p-3.5 md:p-4 text-left rounded-lg border transition-all text-base md:text-lg {
                answer === option.value
                  ? 'border-[#D4FB5D] bg-black text-[#D4FB5D]'
                  : 'border-[#A6A6A6] text-white hover:border-[#D4FB5D] hover:text-[#D4FB5D]'
              }"
            >
              {option.label}
            </button>
          {/each}
        </div>
      {:else if question.type === 'multi-select'}
        <div class="space-y-2.5 md:space-y-3">
          {#each question.options || [] as option}
            <button
              on:click={() => {
                const newAnswer = Array.isArray(answer) ? [...answer] : [];
                const index = newAnswer.indexOf(option.value);
                if (index === -1) {
                  newAnswer.push(option.value);
                } else {
                  newAnswer.splice(index, 1);
                }
                answer = newAnswer;
              }}
              class="w-full p-3.5 md:p-4 text-left rounded-lg border transition-all text-base md:text-lg {
                Array.isArray(answer) && answer.includes(option.value)
                  ? 'border-[#D4FB5D] bg-black text-[#D4FB5D]'
                  : 'border-[#A6A6A6] text-white hover:border-[#D4FB5D] hover:text-[#D4FB5D]'
              }"
            >
              {option.label}
            </button>
          {/each}
        </div>
      {/if}

      {#if question.hasOther && answer === 'other'}
        <input
          type="text"
          bind:value={otherValue}
          class="w-full p-3 md:p-4 bg-black border border-[#A6A6A6] rounded-lg text-white placeholder-[#A6A6A6] focus:ring-2 focus:ring-[#D4FB5D] focus:border-transparent text-base md:text-lg"
          placeholder="Please specify..."
        />
      {/if}
    </div>

    <div class="flex justify-between pt-4 md:pt-6">
      <button
        on:click={prevStep}
        class="flex items-center px-3 md:px-4 py-2 text-[#A6A6A6] hover:text-white text-sm md:text-base"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back
      </button>
      
      {#if question.type === 'multi-select' || question.type === 'text' || (question.hasOther && answer === 'other')}
        <button
          on:click={handleNext}
          disabled={!answer || (answer === 'other' && !otherValue)}
          class="flex items-center px-5 md:px-6 py-2 bg-[#D4FB5D] text-black rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
        >
          Next
          <ArrowRight class="w-4 h-4 ml-2" />
        </button>
      {/if}
    </div>
  </div>
{/if}