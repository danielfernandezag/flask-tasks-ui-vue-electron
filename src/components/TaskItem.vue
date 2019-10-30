<template>
	<div class="card container" @click="selectTask(task.id)">
		<div class="card-body px-0">
			<div class="container">
				<div class="row">
					<div class="col-sm">
						<h5 class="card-title text-dark">{{task.name}}</h5>
					</div>
					<div class="col-sm">
						<h6>
							<span
								v-if="task.done === true"
								v-bind:class="[task.done ? 'badge-success' : 'badge-info']"
								class="badge"
							>done</span>
							<span
								v-if="task.done === false"
								v-bind:class="[task.done ? 'badge-success' : 'badge-info']"
								class="badge"
							>todo</span>
						</h6>
					</div>
				</div>
			</div>
			<p class="card-text text-dark">{{task.content}}</p>
			<div class="row">
				<div class="col-sm">
					<a
						:href="false"
						v-if="task.done === true"
						class="btn btn-sm btn-block"
						@click="toggleDone(task.id)"
						v-bind:class="[task.done ? 'btn-success' : 'btn-info']"
					>Not done</a>
					<a
						:href="false"
						v-if="task.done === false"
						class="btn btn-sm btn-block"
						@click="toggleDone(task.id)"
						v-bind:class="[task.done ? 'btn-success' : 'btn-info']"
					>Done</a>
				</div>
				<div class="col-sm">
					<a :href="false" class="btn btn-sm btn-danger btn-block" @click="deleteTask(task.id)">Delete</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	name: 'TodoItem',
	props: {
		task: Object
	},
	methods: mapActions(['deleteTask', 'selectTask', 'toggleDone'])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card.container {
	margin: 0;
}
</style>
