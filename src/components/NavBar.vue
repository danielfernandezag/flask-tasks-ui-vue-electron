<template>
	<nav class="navbar navbar-expand-lg navbar-dark text-white bg-dark">
		<a class="navbar-brand" :href="false">Tasks App</a>
		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item">
					<a class="nav-link" :href="false" @click="deleteAll">Delete All Tasks</a>
				</li>
				<li class="nav-item dropdown">
					<a
						class="nav-link dropdown-toggle"
						:href="false"
						id="navbarDropdown"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<span v-if="filter === 'search'">Filter</span>
						<span v-if="filter === 'all'">Filter Tasks</span>
						<span v-if="filter === 'done'">Done</span>
						<span v-if="filter === 'todo'">To do</span>
					</a>
					<div class="dropdown-menu" aria-labelledby="navbarDropdown">
						<a class="dropdown-item" :href="false" @click="filterTasks('all')">All</a>
						<a class="dropdown-item" :href="false" @click="filterTasks('done')">Done</a>
						<a class="dropdown-item" :href="false" @click="filterTasks('todo')">To do</a>
					</div>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						:href="false"
						tabindex="-1"
						aria-disabled="true"
						@click="setAllDone(true)"
					>Mark All As Done</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						:href="false"
						tabindex="-1"
						aria-disabled="true"
						@click="setAllDone(false)"
					>Mark All To Do</a>
				</li>
			</ul>
			<form class="form-inline my-2 my-lg-0" @submit="onSearchSubmit">
				<input
					class="form-control mr-sm-2"
					v-model="search"
					name="search"
					type="search"
					placeholder="Search"
					aria-label="Search"
					@change="onSearchChange"
				/>
				<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			</form>
		</div>
	</nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'NavBar',
	data() {
		return {
			search: ''
		};
	},
	methods: {
		...mapActions(['filterTasks', 'setAllDone', 'deleteAll', 'setKeyword']),
		onSearchSubmit(e) {
			e.preventDefault();
			this.setKeyword(this.search);
		},
		onSearchChange() {
			this.setKeyword(this.search);
		}
	},
	props: {
		filter: String
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
