<script lang="ts">
  export let current: number;
  export let total: number;

  $: progress = (current / total) * 100;
</script>

<div class="space-y-1.5 md:space-y-2">
  <div class="flex justify-between text-xs md:text-sm text-[#A6A6A6]">
    <span>Question {current} of {total}</span>
    <span>{Math.round(progress)}% Complete</span>
  </div>
  <div class="h-1.5 md:h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
    <div 
      class="h-full bg-[#D4FB5D] transition-all duration-300 ease-out"
      style="width: {progress}%"
    />
  </div>
</div>