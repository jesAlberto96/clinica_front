<template>
    <div class="row">
		<div class="col-12" align="right">
			<button type="button" class="btn btn-primary mb-4" @click="$router.push({name: 'PatientCreate'});">Nueva historia</button>
		</div>
	</div>

    <div class="row">
		<div class="col-12">
			<table class="table align-middle mb-0 bg-white">
				<thead class="bg-light table-dark">
					<tr>
						<th><p class="fw-bold mb-1">Name</p></th>
						<th><p class="fw-bold mb-1">Birth Date</p></th>
						<th><p class="fw-bold mb-1">Gender</p></th>
						<th v-html="'&ensp;'"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in data">
						<td>
                            <p class="fw-normal mb-1" v-text="item.name"></p>
						</td>
						<td>
							<p class="fw-normal mb-1" v-text="item.birth_date"></p>
						</td>
						<td v-text="item.des_gender"></td>
						<td>
							<button type="button" class="btn btn-success" style="margin-right: 2vh" @click="$router.push({
                                name: 'PatientDetail',
                                params: { id: item.id }
                            })">Detail</button>
							<button type="button" class="btn btn-danger" @click="deletePatient(item.id)">Delete</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

    <div class="row">
		<div class="col-12">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" :class="{ 'disabled': (link_prev == null) }" aria-label="Previous" @click="findByPage(current_page-1)">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>

                    <li v-for="page in page_cant" :key="page" class="page-item" :class="{ 'active': (page == current_page) }" @click="findByPage(page)"><a class="page-link" href="#" v-text="page"></a></li>

                    <li class="page-item">
                        <a class="page-link" href="#" :class="{ 'disabled': (link_next == null) }" aria-label="Next" @click="findByPage(current_page+1)">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
	</div>
</template>

<script lang="ts">
	import { ref, computed, onMounted  } from 'vue';
    import config from '@/store/config/';
    import patient from '@/store/patient/';

	export default {
		setup() {
            const link_prev = ref(false);
            const link_next = ref(false);
            const page_cant = ref(false);
            const current_page = ref(false);
            const data = ref(false);

			const findByPage = async (page: any) => {
                const response = await patient.dispatch('findByPage', { page });

                if (response.data){
                    link_prev.value = response.links.prev;
                    link_next.value = response.links.next;
                    page_cant.value = response.meta.last_page;
                    current_page.value = response.meta.current_page;
                    data.value = response.data;
                }
			}

            const deletePatient = async (id: any) => {
                if (confirm("Do you want to delete this patient?")){
                    const response = await patient.dispatch('delete', { id });
                    if (response.meta.success){
                        findByPage(1);
                    }
                }
			}

            onMounted(async () => {
                findByPage(1);
            });

			return {
                link_prev,
                link_next,
                page_cant,
                current_page,
                data,

                findByPage,
                deletePatient,
			}
    	},
	}
</script>

<style scoped>
.pagination{
    margin-top: 2vh;
    justify-content: center;
    align-items: center;
}
</style>