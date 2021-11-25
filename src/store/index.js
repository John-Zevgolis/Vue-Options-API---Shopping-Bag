import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
	state() {
		return {
			products: [],
			productsInBag: []
		};
	},
	mutations: {
		loadProducts(state, payload) {
			state.products = payload;
		},
		loadBag(state, payload) {
			state.productsInBag = payload;
		},
		addToBag(state, payload) {
			state.productsInBag.push(payload);
			localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
		},
		removeFromBag(state, payload) {
			const updatedBag = state.productsInBag.filter(item => item.id !== payload);
			this.state.productsInBag = updatedBag;
			localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
		}
	},
	actions: {
		loadProducts({commit}) {
			axios('https://fakestoreapi.com/products').then(response => {
				commit('loadProducts', response.data);
			});
		},
		loadBag({commit}) {
			if(localStorage.getItem('productsInBag')) {
				commit('loadBag', JSON.parse(localStorage.getItem('productsInBag')));
			}
		},
		addToBag({commit}, payload) {
			commit('addToBag', payload);
		},
		removeFromBag({commit}, payload) {
			if(confirm('Are you sure you want to remove the item from bag?')) {
				commit('removeFromBag', payload);
			}
		}
	},
	getters: {
		products(state) {
			return state.products;
		},
		productsInBag(state) {
			return state.productsInBag;
		}
	},
	modules: {
	}
});
