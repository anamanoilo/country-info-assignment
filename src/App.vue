<template>
  <header>
    <div class="container p-4 mx-auto">
      <RouterLink to="/" id="logo" class="inline-block font-bold text-xl"
        >🌍 Country Info</RouterLink
      >
    </div>
  </header>
  <main>
    <div class="container p-4 mx-auto">
      <RouterView />
    </div>
  </main>
</template>
