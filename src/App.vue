<template>
  <router-view />
</template>

<style lang="scss">
@import "~normalize.css";

@font-face {
  font-family: "chucknorris";
  src: url("/fonts/chucknorris.woff") format("woff"), url("/fonts/chucknorris.ttf") format("truetype");
}

:root {
  --primary-color: #f15b23;
}

h1 {
  color: var(--primary-color);
  text-shadow: 3px 3px #222;
  font-family: "chucknorris", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
}
</style>
