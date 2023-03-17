<template>
	<div class="row content-info" v-if="data != false">
		<div class="col-12 card-button">
			<button type="button" class="btn btn-primary" @click="$router.push({name: 'Home'});">Go Back</button>
		</div>
		<div class="col-12">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title fw-bold">INFORMATION</h5>
					<div class="row">
						<div class="col-6">
							<p class="fw-bold mb-1">Name</p>
							<p class="card-text" v-text="data.name"></p>
							<p class="fw-bold mb-1">Birthday</p>
							<p class="card-text" v-text="data.birth_date"></p>
							<p class="fw-bold mb-1">Gender</p>
							<p class="card-text" v-text="data.des_gender"></p>
						</div>
						<div class="col-6">
							<p class="fw-bold mb-1">Height</p>
							<p class="card-text" v-text="data.height"></p>
							<p class="fw-bold mb-1">Weight</p>
							<p class="card-text" v-text="data.weight"></p>
						</div>
						<div class="col-12">
							<p class="fw-bold mb-1 recomendations">Recomendations</p>
							<p class="card-text" v-text="data.recomendations"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { ref, computed, onMounted  } from 'vue';
    import patient from '@/store/patient/';

	export default {
		props: {
			id: {
				type: String,
				default: ''
			},
		},

		setup(props) {
            const data = ref(false);

			const find = async () => {
				const response = await patient.dispatch('find', { id: props.id });
                if (response.meta.success){
                    data.value = response.data;
                } else {
					data.value = false;
				}
			}

			find();

			return {
                data,
			}
    	},
	}
</script>

<style scoped>
	.card-body{
		color: #000000;
	}

	.content-info{
		justify-content: space-around;
	}

	.keywords{
		text-transform: uppercase;
	}

	.card-button{
		display: flex;
		justify-content: end;
		align-items: end;
		margin-right: 4vh;
		margin-bottom: 4vh;
	}

	.recomendations{
		margin-top: 2vh;
	}
</style>