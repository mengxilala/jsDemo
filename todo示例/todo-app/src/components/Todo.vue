<template>
    <div class="ui centered card">
        <!-- 当我们不在编辑模式时显示的todo列表 -->
        <div class="content" v-show="!isEditing">
            <div class="header">
                {{todo.title}}
            </div>
            <div class="meta">
                {{todo.project}}
            </div>
            <div class="extra content">
                <!-- 编辑一个todo -->
                <span class="right floated edit icon" v-on:click="showForm">
                    <i class="edit icon"></i>
                </span>
                <!-- 删除一个todo -->
                <span class="right floated trash icon" v-on:click="deleteTodo(todo)">
                    <i class="trash icon"></i>
                </span>
            </div>
        </div>

        <!-- 当我们在编辑模式时，表单是可见的 -->
        <div class="content" v-show="isEditing">
            <div class="ui form">
                <div class="filed">
                    <label>Title</label>
                    <input type="text" v-model="todo.title">
                </div>
                <div class="filed">
                    <label>Project</label>
                    <input type="text" v-model="todo.project">
                </div>
                <div class="ui two button attached buttons">
                    <button class="ui basic blue button" v-on:click="hideForm">Close X</button>
                </div>
            </div>
        </div>
        <div class="ui bottom attached green basic button" v-show="!isEditing && todo.done" disabled>
            Completed
        </div>
        <div class="ui bottom attached red basic button" v-show="!isEditing && !todo.done">
            UnComplete
        </div>
    </div>
</template>

<script>
    export default {
        //在这里写逻辑
        props: ['todo'],
        data() {
            return {
                isEditing: false
            }
        },
        methods: {
            showForm() {
                this.isEditing = true;
            },
            hideForm() {
                this.isEditing = false;
            },
            deleteTodo(todo) {
                this.$emit('delete-todo', todo);
            },
            completeTodo(todo) {
                this.$emit('complete-todo', todo);
            }
        }
    }
</script>