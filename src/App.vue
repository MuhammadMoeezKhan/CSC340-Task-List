<template>
  <div class="container">
    <div class="text-center mb-4">
      <h1 class="display-4">To-Do App</h1>
    </div>
    <form @submit.prevent="addTodo" class="mb-4">
      <div class="input-group">
        <input class="form-control" v-model="item" placeholder="Enter Task..." type="text">
        <button type="submit" class="btn btn-primary">Add</button>
      </div>
    </form>
    <div v-for="i in todos" :key="i.id" class="card mb-3 shadow">
      <div class="card-body d-flex justify-content-between align-items-center">
        <h5 class="card-title" :class="{'text-decoration-line-through': i.done}">{{ i.content }}</h5>
        <div>
          <button @click="toggleDone(i.id)" class="btn btn-success">&#10003;</button>
          <button @click="deleteTodo(i.id)" class="btn btn-danger">&#10007;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../firebase/init.js'
import { col, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { onSnapshot, collection } from 'firebase/firestore'

export default {
  name: 'App',
  data() {
    return {
      item: '',
      todos: [],
    };
  },
  components: {},
  mounted() {
    onSnapshot(collection(db, 'todos'), (querySnapshot) => {
      const fbarray = [];
      querySnapshot.forEach((doc) => {
        const todo = {
          id: doc.id,
          content: doc.data().content,
          done: doc.data().done,
        };
        fbarray.push(todo);
      });
      this.todos = fbarray;
    });
  },
  methods: {
    addTodo() {
      addDoc(collection(db, 'todos'), {
        content: this.item,
        done: false,
      });
      this.item = '';
    },
    deleteTodo(id) {
      deleteDoc(doc(collection(db, 'todos'), id));
    },
    toggleDone(id) {
      const index = this.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        updateDoc(doc(db, 'todos', id), {
          done: !this.todos[index].done,
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.display-4 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.card {
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.2rem;
  margin: 0;
  flex-grow: 1;
}

.btn {
  font-size: 1rem;
}

.input-group {
  display: flex;
}

.form-control {
  flex-grow: 1;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.btn-primary {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.text-decoration-line-through {
  text-decoration: line-through;
}
</style>