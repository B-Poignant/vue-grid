<template>
    <div>
        <button @click="onClick" :name="name" :type="type" :title="title">{{ msg }}</button>
    </div>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            msg: String,
            classes: Array,
            id: String,
            name: {type: String, required: true},
            value: String,
            attributes: Array,
            type: {type: String, default: 'button'},
            title: {type: String},
            onClick: Function,
        }
    }
</script>