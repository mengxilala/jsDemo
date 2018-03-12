<template>
  <div id="app">
    <!-- 要渲染组件，我们就要像HTML元素一样调用它。组件名称以下划线分隔，而不是采用驼峰的写法 -->
    <todo-list v-bind:todos="todos"></todo-list>
    <create-todo v-on:add-todo="addTodo"></create-todo>
  </div>
</template>

<script> 
  // 引入刚才创建的组件
  import TodoList from './components/TodoList';
  import CreateTodo from './components/CreateTodo';

  export default {
    components: {
      // 把TodoList和CreateTodo组件添加到组件列表中 
      TodoList,
      CreateTodo
    },
    // 需要给todos列表的主组件中提供数据
    data() {
      return {
        todos: [
          {
            title: 'Todo A',
            project: 'Project A',
            done: false
          },
          {
            title: 'Todo B',
            project: 'Project B',
            done: false
          },
          {
            title: 'Todo C',
            project: 'Project C',
            done: true
          },
          {
            title: 'Todo D',
            project: 'Project D',
            done: false
          },
        ]
      }
    },
    // 添加一个新方法用来创建新的Todos
    methods: {
      addTodo(title) {
        this.todos.push({
          title,
          done: false
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>