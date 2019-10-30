<template>
	<div id="app" class="container-fluid px-0 mx-0">
		<NavBar :filter="filter" />
		<div class="row px-0 mx-0">
			<div class="col-sm-2" />
			<div class="col-sm-8">
				<div class="card">
					<div class="card-header text-white bg-dark">
						<TaskForm />
					</div>
					<div class="card-body text-white bg-dark">
						<div class="container">
							<div class="row" v-if="loading === true">
								<div
									class="spinner-grow text-primary mx-auto"
									style="width: 4rem; height: 4rem;"
									role="status"
								></div>
								<span class="sr-only">Loading...</span>
							</div>
							<div class="row" v-if="loading === false">
								<div class="col-sm" v-if="tasks.length > 0">
									<h5 class="text-white">{{filter}}</h5>
									<TaskList :type="'all'" />
								</div>
								<div class="col-sm" v-if="tasksTodo.length > 0">
									<h5 class="text-white">To do</h5>
									<TaskList :type="'todo'" />
								</div>
								<div class="col-sm" v-if="tasksDone.length > 0">
									<h5 class="text-white">Done</h5>
									<TaskList :type="'done'" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-2" />
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NavBar from './NavBar';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

export default {
	name: 'app',
	components: {
		NavBar,
		TaskList,
		TaskForm
	},
	computed: mapGetters(['tasks', 'tasksTodo', 'tasksDone', 'loading', 'filter']),
	methods: mapActions(['fetchTasks']),
	created() {
		this.fetchTasks();
	}
};
</script>

<style>
html,
body,
#root {
	height: 100%;
	padding: 0;
	background: #343a40; /* fallback for old browsers */
	background: -webkit-linear-gradient(to top, #2c5364, #203a43, #343a40); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to top, #2c5364, #203a43, #343a40); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	background-repeat: no-repeat;
	background-attachment: fixed;
	color: #232526;
	font-weight: 600;
}

.nav-item {
	cursor: pointer;
}
</style>
