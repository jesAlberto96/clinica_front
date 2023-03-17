<template>
	<main>
		<div class="p-5">
			<!-- <button-app></button-app> -->

			<login-page v-if="!isAuthenticated"></login-page>

			<home-page v-else></home-page>
		</div>
	</main>
</template>

<script lang="ts">
	import { computed } from 'vue';
  	import LoginPage from '../components/LoginPage.vue';
  	import HomePage from '../components/HomePage.vue';
	import config from '@/store/config/';

	export default {
		components:{
			LoginPage,
			HomePage
		},
		setup() {
            const isAuthenticated = computed(() => config.getters.getIsAuthenticated);

			return {
				isAuthenticated,
			}
    	},
	}
</script>
