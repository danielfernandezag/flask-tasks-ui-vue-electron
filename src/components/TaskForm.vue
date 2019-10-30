<template>
	<form @submit="onSubmit">
		<div class="form-group">
			<label for="task-input-name">Task name</label>
			<input
				type="text"
				v-model="name"
				name="name"
				class="form-control"
				id="task-input-name"
				aria-describedby="task-name-help"
				placeholder="name"
			/>
			<small
				id="task-name-help"
				v-if="existsError === true"
				v-bind:class="[existsError || nameError ? 'text-danger': 'text-muted']"
				class="form-text"
			>task already exists</small>
			<small
				id="task-name-help"
				v-if="existsError === false"
				v-bind:class="[existsError || nameError ? 'text-danger': 'text-muted']"
				class="form-text"
			>add task name.</small>
		</div>
		<div class="form-group">
			<label for="task-input-content">Task content</label>
			<input
				type="text"
				v-model="content"
				name="content"
				class="form-control"
				id="task-input-content"
				aria-describedby="task-content-help"
				placeholder="content"
			/>
			<small
				id="task-content-help"
				v-bind:class="[contentError ? 'text-danger': 'text-muted']"
				class="form-text"
			>add task content.</small>
		</div>
		<button type="submit" class="btn btn-primary btn-block">Add</button>
	</form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'TaskForm',
	data() {
		return {
			name: '',
			content: '',
			nameError: false,
			contentError: false,
			existsError: false
		};
	},
	computed: mapGetters(['tasks']),
	methods: {
		...mapActions(['addTask']),
		onSubmit(e) {
			e.preventDefault();
			const alreadyExists = this.tasks.find(task => task.name === this.name);
			if (this.name !== '' && this.content !== '' && alreadyExists === undefined) {
				this.nameError = false;
				this.contentError = false;
				this.existsError = false;
				this.addTask({ name: this.name, content: this.content });
				this.name = '';
				this.content = '';
			} else if (this.name === '') {
				this.nameError = true;
				this.contentError = false;
				this.existsError = false;
			} else if (e.target.content.value === '') {
				this.nameError = false;
				this.contentError = true;
				this.existsError = false;
			} else if (alreadyExists !== undefined) {
				this.nameError = false;
				this.contentError = false;
				this.existsError = true;
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
