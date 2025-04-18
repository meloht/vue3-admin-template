<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tags-view  />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup>
import { Navbar, AppMain,TagsView } from "./components/index.js";
import useStore from "@/store";
import { useWindowSize } from '@vueuse/core';
import { computed, watchEffect } from 'vue';
import Sidebar from "./components/Sidebar/index.vue";

const { width } = useWindowSize();
const WIDTH = 992;

const { app, setting } = useStore();

const sidebar = computed(() => app.sidebar);
const device = computed(() => app.device);
const fixedHeader = computed(() => setting.fixedHeader);
const needTagsView = computed(() => setting.tagsView);

const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile'
}));

watchEffect(() => {
  if (width.value < WIDTH) {
    app.toggleDevice('mobile');
    app.closeSideBar(true);
  } else {
    app.toggleDevice('desktop');
  }
});

function handleClickOutside() {
  app.closeSideBar(false);
}

</script>

<style lang="scss" scoped>
@use "@/styles/variables.module.scss" as moduleVal;
@use "@/styles/mixin.scss" as mix;



.app-wrapper {
  @include mix.clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{moduleVal.$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
