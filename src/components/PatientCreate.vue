<template>
	<div class="row">
		<div class="col-12 card-button-back">
			<button type="button" class="btn btn-primary" @click="$router.push({name: 'Home'});">Go Back</button>
		</div>
	</div>

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
				<form class="row" @submit.prevent="create()">
					<div class="col-6">
						<label for="Name"><b>Name</b></label>
						<input type="text" class="form-control" placeholder="Name" aria-label="Name" v-model="name" required/>
					</div>
					<div class="col-6">
						<label for="birthday"><b>Birthday</b></label>
						<input type="date" class="form-control" placeholder="birthday" aria-label="birthday" v-model="birth_date" required/>
					</div>
					<div class="col-6">
						<label for="gender"><b>Gender</b></label>
						<select class="form-select" aria-label="Select gender" v-model="gender" required>
							<option disabled selected>Select gender</option>
							<option value="M">Masculino</option>
							<option value="F">Femenino</option>
							<option value="O">Otro</option>
						</select>
					</div>
					<div class="col-6">
						<label for="height"><b>Height</b></label>
						<input type="text" class="form-control" placeholder="Height" aria-label="height" v-model="height" required/>
					</div>
					<div class="col-6">
						<label for="weight"><b>Weight</b></label>
						<input type="text" class="form-control" placeholder="weight" aria-label="weight" v-model="weight" required/>
					</div>
					<div class="col-12">
						<button class="btn btn-primary btn-save" type="submit">Save</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { ref, computed, onMounted  } from 'vue';
    import patient from '@/store/patient/';
	import router from '@/router';

	export default {
		setup() {
            const errors = ref(false);
            const name = ref('');
            const birth_date = ref('');
            const gender = ref('');
            const height = ref('');
            const weight = ref('');

			const create = async () => {
				const data = {
					name: name.value,
					birth_date: birth_date.value,
					gender: gender.value,
					height: height.value,
					weight: weight.value,
				};

                const response = await patient.dispatch('create', data);
				if (response.meta.success){
					router.push({
						name: 'PatientDetail',
						params: { id: response.data.id }
					});

					errors.value = false;
				} else {
					errors.value = response.meta.errors;
				}
			}

			return {
                errors,
				create,
				name,
				birth_date,
				gender,
				height,
				weight,
			}
    	},
	}
</script>

<style scoped>
	.card-button-back{
		display: flex;
		justify-content: end;
		align-items: end;
		margin-right: 4vh;
		margin-bottom: 4vh;
	}

	.content-form{
		justify-content: center;
    	align-items: center;
		color: #000000;
	}

	.btn-save{
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