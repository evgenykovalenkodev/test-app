export default {
    state: {
        items: [
            {
                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                name: 'John Doe',
                jobTitle: 'CEO'
            },
            {
                avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                name: 'John Smith',
                jobTitle: 'Manager'
            }
        ]
    },
    getters: {
        getItems: (state) => state.items
    },
    mutations: {
        deleteItem(state, payload) {
            state.items.splice(payload, 1);
        },
        addItem(state, payload) {
            state.items.push(payload);
        }
    }
};
