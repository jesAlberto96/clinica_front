<template>
	<main>
		<div class="p-5">
			<patient-create></patient-create>
		</div>
	</main>
</template>

<script lang="ts">
  	import PatientCreate from '@/components/PatientCreate.vue'

	export default {
		components:{
			PatientCreate,
		},
	}
</script>

