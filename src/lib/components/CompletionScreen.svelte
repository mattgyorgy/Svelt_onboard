<script lang="ts">
  import { CheckCircle2, Calendar } from 'lucide-svelte';
</script>

<div class="bg-black rounded-xl border border-[#A6A6A6] p-5 md:p-8 text-center space-y-5 md:space-y-6 animate-fadeIn">
  <div class="flex justify-center">
    <CheckCircle2 class="w-12 h-12 md:w-16 md:h-16 text-[#D4FB5D]" />
  </div>
  
  <h1 class="text-2xl md:text-3xl font-bold text-white">
    Welcome to Hero Network!
  </h1>
  
  <p class="text-sm md:text-base text-[#A6A6A6] max-w-md mx-auto">
    Thank you for completing your profile. We're excited to help you create amazing video content for your business.
  </p>

  <div class="pt-2 md:pt-4">
    <button class="inline-flex items-center px-5 md:px-6 py-3 bg-[#D4FB5D] text-black rounded-lg hover:bg-opacity-90 transition-colors text-sm md:text-base">
      <Calendar class="w-4 h-4 md:w-5 md:h-5 mr-2" />
      Schedule Your First Session
    </button>
  </div>

  <p class="text-xs md:text-sm text-[#A6A6A6]">
    Our team will review your information and reach out within 24 hours.
  </p>
</div>