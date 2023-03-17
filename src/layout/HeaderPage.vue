<template>
    <nav class="navbar navbar-dark bg-primary mb-4">
		<div class="container-fluid">
			<h1 class="navbar-brand">
				CLÍNICA
			</h1>
			<a class="btn btn-primary mb-4" v-if="isAuthenticated" @click="closeSession()">Close session</a>
		</div>
	</nav>
</template>

<script lang="ts">
	import { computed } from 'vue';
	import config from '@/store/config/';
	import router from '@/router';

	export default {
		setup() {
            const isAuthenticated = computed(() => config.getters.getIsAuthenticated);

			const closeSession = async () => {
				config.commit('setIsAuthenticated', false)
				localStorage.setItem("isAuthenticated", false);
				localStorage.setItem("token", "");

				router.push({
					name: 'Home',
				});
			}

			return {
				isAuthenticated,
				closeSession,
			}
    	},
	}
</script>