<template>
	<div class="row content-errors" v-if="errors != false">
		<div class="col-12">
			<div class="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
				<ul>
					<li v-for="item in errors" v-text="item"></li>
				</ul>
			</div>
		</div>
	</div>
	
	<div class="row content-form">
		<div class="col-8">
			<div class="row">
				<form @submit.prevent="login()">
					<div class="col-12">
						<label for="email">Email</label>
						<input type="email" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="button-addon2" name="email" v-model="email" required/>
					</div>
					<div class="col-12">
						<label for="password">Password</label>
						<input type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="button-addon2" name="password" v-model="password" required/>
					</div>
					<div class="col-12">
						<button class="btn btn-primary btn-login" type="submit">Login</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { ref, computed, onMounted  } from 'vue';
    import user from '@/store/user/';
	import router from '@/router';
	import config from '@/store/config/';

	export default {
		setup() {
            const email = ref('');
            const password = ref('');
            const errors = ref(false);

			const login = async () => {
                const response = await user.dispatch('login', 
				{
					email: email.value,
					password: password.value,
					device: 'windows'
				});

				if (response.meta.success){
					config.commit('setIsAuthenticated', true)
					localStorage.setItem("isAuthenticated", true);
					localStorage.setItem("token", response.data.token);
					errors.value = false;
				} else {
					config.commit('setIsAuthenticated', false)
					localStorage.setItem("isAuthenticated", false);
					localStorage.setItem("token", "");
					errors.value = response.meta.errors;
				}
			}

			return {
                errors,
				email,
				password,
				login,
			}
    	},
	}
</script>

<style scoped>
	.card-body{
		color: #000000;
	}

	.content-form{
		justify-content: center;
    	align-items: center;
	}

	.btn-login{
		margin-top: 4vh;
	}

	.content-errors{
		margin-bottom: 2vh;
	}

	.content-errors div div{
		color: #ff0000;
		font-weight: bold;
		font-size: 18px;
	}
</style>