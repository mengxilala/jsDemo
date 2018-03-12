<template>
    <div>
        <p>Completed Tasks:{{todos.filter(todo=>{return todo.done===true}).length}}</p>
        <p>Pending Tasks:{{todos.filter(todo=>{return todo.done===false}).length}}</p>
        <!-- 现在，我们将数据传递给todo组件，以呈现todo列表 -->
        <todo v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo" v-for="todo in todos" v-bind:todo.sync="todo"></todo>
    </div>
</template>

<script>
    import Todo from './Todo';
    export default {
        //在这里写逻辑
        props: ['todos'],
        components: {
            Todo
        },
        methods: {
            deleteTodo(todo) {
                var todoIndex = this.todos.indexOf(todo);
                this.todos.splice(todoIndex, 1);
            },
            completeTodo(todo) {
                var todoIndex = this.todos.indexOf(todo);
                this.todos[todoIndex].done = true;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* 这里写样式 */
</style>