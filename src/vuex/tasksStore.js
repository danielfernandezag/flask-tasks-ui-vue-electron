import axios from 'axios';

const url = 'http://192.168.1.18:5000/tasks';

const state = {
	tasks: [],
	filter: 'all',
	keyword: '',
	loading: false,
	selectedTask: {}
};

const getters = {
	loading: state => state.loading,
	keyword: state => state.keyword,
	selectedTask: state => state.selectedTask,
	filter: state => state.filter,
	tasks: state => state.tasks.filter(task => task.name.toLowerCase().includes(state.keyword.toLowerCase()) || task.content.toLowerCase().includes(state.keyword.toLowerCase())),
	tasksTodo: state =>
		state.tasks.filter(task => task.done === false).filter(task => task.name.toLowerCase().includes(state.keyword.toLowerCase()) || task.content.toLowerCase().includes(state.keyword.toLowerCase())),
	tasksDone: state =>
		state.tasks.filter(task => task.done === true).filter(task => task.name.toLowerCase().includes(state.keyword.toLowerCase()) || task.content.toLowerCase().includes(state.keyword.toLowerCase()))
};

const actions = {
	fetchTasks({ commit }) {
		commit('FETCH_LOADING');
		setTimeout(
			() =>
				axios
					.get(url + '/all', { mode: 'cors' })
					.then(response => {
						commit('SET_TASKS', response.data);
						commit('FETCH_DONE');
					})
					.catch(() => {
						commit('FETCH_DONE');
					}),
			1500
		);
	},
	addTask({ commit }, { name, content }) {
		commit('FETCH_LOADING');
		setTimeout(
			() =>
				axios
					.post(url, {
						name,
						content
					})
					.then(response => {
						commit('ADD_TASK', response.data);
						commit('FETCH_DONE');
					})
					.catch(() => {
						commit('FETCH_DONE');
					}),
			1500
		);
	},
	deleteTask({ commit }, id) {
		commit('FETCH_LOADING');
		setTimeout(
			() =>
				axios
					.delete(url + '/' + id)
					.then(response => {
						commit('DELETE_TASK', response.data.id);
						commit('FETCH_DONE');
					})
					.catch(() => {
						commit('FETCH_DONE');
					}),
			1500
		);
	},
	toggleDone({ commit }, id) {
		axios.put(url + '/done/' + id).then(response => {
			commit('TOGGLE_TASK_DONE', { id: response.data.id, done: response.data.done });
		});
	},
	updateName({ commit }, { id, name }) {
		axios
			.put(url + '/name/' + id, {
				name
			})
			.then(response => {
				commit('UPDATE_TASK_NAME', { id: response.data.id, name: response.data.name });
			});
	},
	updateContent({ commit }, { id, content }) {
		axios
			.put(url + '/content/' + id, {
				content
			})
			.then(response => {
				commit('UPDATE_TASK_CONTENT', { id: response.data.id, content: response.data.content });
			});
	},
	filterTasks({ commit }, filter) {
		commit('SET_FILTER', filter);
	},
	setAllDone({ commit }, done) {
		axios
			.put(url + '/done/all', {
				done: done.toString()
			})
			.then(() => {
				if (done) {
					commit('SET_ALL_DONE');
				} else {
					commit('SET_ALL_TODO');
				}
			});
	},
	deleteAll({ commit }) {
		axios.delete(url + '/all').then(() => {
			commit('DELETE_ALL_TASKS');
		});
	},
	setKeyword({ commit }, keyword) {
		commit('SET_KEYWORD', keyword);
	},
	selectTask({ commit }, id) {
		commit('SELECT_TASK', id);
	}
};

const mutations = {
	SET_FILTER: (state, filter) => (state.filter = filter),
	SET_KEYWORD: (state, keyword) => {
		state.keyword = keyword;
		if (keyword !== '') {
			state.filter = 'search';
		}
	},
	SET_TASKS: (state, tasks) => (state.tasks = tasks),
	FETCH_LOADING: state => (state.loading = true),
	FETCH_DONE: state => (state.loading = false),
	ADD_TASK: (state, task) => (state.tasks = [...state.tasks, task]),
	DELETE_TASK: (state, id) => (state.tasks = state.tasks.filter(task => task.id !== id)),
	DELETE_ALL_TASKS: state => {
		state.tasks = [];
		state.filter = 'all';
		state.keyword = '';
		state.loading = false;
		state.selectedTask = {};
	},
	TOGGLE_TASK_DONE: (state, { id, done }) => (state.tasks = state.tasks.map(task => (task.id === id ? { ...task, done } : task))),
	UPDATE_TASK_NAME: (state, { id, name }) => (state.tasks = state.tasks.map(task => (task.id === id ? { ...task, name } : task))),
	UPDATE_TASK_CONTENT: (state, { id, content }) => (state.tasks = state.tasks.map(task => (task.id === id ? { ...task, content } : task))),
	SELECT_TASK: (state, id) => (state.selectedTask = state.tasks.filter(task => task.id === id)),
	SET_ALL_TODO: state => (state.tasks = state.tasks.map(task => ({ ...task, done: false }))),
	SET_ALL_DONE: state => (state.tasks = state.tasks.map(task => ({ ...task, done: true })))
};

export default {
	state,
	getters,
	actions,
	mutations
};
