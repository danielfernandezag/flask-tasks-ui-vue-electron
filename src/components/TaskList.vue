<template>
	<div>
		<ul class="list-group" v-if="type === 'all'">
			<div v-for="task in tasks" :key="task.id">
				<li class="list-group-item px-0 py-0 mx-0">
					<TaskItem v-bind:task="task" />
				</li>
			</div>
		</ul>
		<ul class="list-group" v-if="type === 'todo'">
			<div v-for="task in tasksTodo" :key="task.id">
				<li class="list-group-item px-0 py-0 mx-0">
					<TaskItem v-bind:task="task" />
				</li>
			</div>
		</ul>
		<ul class="list-group" v-if="type === 'done'">
			<div v-for="task in tasksDone" :key="task.id">
				<li class="list-group-item px-0 py-0 mx-0">
					<TaskItem v-bind:task="task" />
				</li>
			</div>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import TaskItem from './TaskItem';

export default {
	name: 'TaskList',
	components: {
		TaskItem
	},
	props: {
		type: String
	},
	computed: mapGetters(['tasks', 'tasksTodo', 'tasksDone'])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item {
	margin: 0;
	padding: 0;
}
</style>
