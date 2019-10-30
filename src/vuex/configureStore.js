import tasksStore from './tasksStore';

export default {
	state: {
		...tasksStore.state
	},
	actions: {
		...tasksStore.actions
	},
	mutations: {
		...tasksStore.mutations
	},
	getters: {
		...tasksStore.getters
	}
};
