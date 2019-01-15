<template>
    <div class="notification-box">
        <p>{{ title }} <button>x</button></p>
        <div>{{ msg }}</div>
    </div>
</template>

<script>
    export default {
        name: 'NotificationBox',
        props: {
            title: String,
            msg: String,
            duration: Number,
        }
    }
</script>

<style scoped>
    .notification-box {
        text-align: left;
        padding-left:5px;
        padding-right:5px;
        color :red;
        border: 1px solid blue;
        border-radius: 5px;
    }
    .notification-box p{
        margin-top: 0px;
    }
    .notification-box p button{
        float: right;
    }
</style>
