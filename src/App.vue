<style scoped>
    #content {
        width: 100%;
        margin-top: 10px;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    #notifications {
        float: right;
        width: 15%;
    }
</style>

<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">

        <Grid base_url_ajax="" model="eco_product" />

        <div id="notifications">
            - {{typeof this.$store.state.postInfoAsyncStatusCode }} -  {{typeof this.$store.state.postInfoAsyncPending }} -
            <div v-if="typeof this.$store.state.postInfoAsyncStatusCode !='undefined' && typeof this.$store.state.postInfoAsyncPending !='undefined' ">
                <div v-if="this.$store.state.postInfoAsyncStatusCode == 201 && this.$store.state.postInfoAsyncPending === false">
                    <NotificationBox title="SaveOk" msg="Save Ok !"/>
                </div>
                <div v-else>
                    <NotificationBox title="SavePasOk" msg="Save Pas Ok !"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Grid from './components/Grid.vue';
    import NotificationBox from './components/NotificationBox.vue';

    export default {
        name: 'app',
        components: {
            NotificationBox,
            Grid
        }
    }
</script>