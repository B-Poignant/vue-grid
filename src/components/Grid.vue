<style scoped>
    .vue-grid-layout {
        background: #eee;
    }

    .layoutJSON {
        background: #ddd;
        border: 1px solid black;
        margin-top: 10px;
        padding: 10px;
    }

    .eventsJSON {
        background: #ddd;
        border: 1px solid black;
        margin-top: 10px;
        padding: 10px;
        height: 100px;
        overflow-y: scroll;
    }

    .columns {
        -moz-columns: 120px;
        -webkit-columns: 120px;
        columns: 120px;
    }

    .vue-resizable-handle {
        z-index: 5000;
        position: absolute;
        width: 20px;
        height: 20px;
        bottom: 0;
        right: 0;
        background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
        background-position: bottom right;
        padding: 0 3px 3px 0;
        background-repeat: no-repeat;
        background-origin: content-box;
        box-sizing: border-box;
        cursor: se-resize;
    }

    .vue-grid-item:not(.vue-grid-placeholder) {
        background: #ccc;
        border: 1px solid black;
    }

    .vue-grid-item.resizing {
        opacity: 0.9;
    }

    .vue-grid-item.static {
        background: #cce;
    }

    .vue-grid-item .text {
        font-size: 24px;
        text-align: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: 100%;
        width: 100%;
    }

    .vue-grid-item .no-drag {
        height: 100%;
        width: 100%;
    }

    .vue-grid-item .minMax {
        font-size: 12px;
    }

    .vue-grid-item .add {
        cursor: pointer;
    }

    .vue-draggable-handle {
        position: absolute;
        width: 20px;
        height: 20px;
        top: 0;
        left: 0;
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
        background-position: bottom right;
        padding: 0 8px 8px 0;
        background-repeat: no-repeat;
        background-origin: content-box;
        box-sizing: border-box;
        cursor: pointer;
    }
</style>

<template>
    <div>
        <grid-layout v-if="this.$store.state.getInfoAsyncData"
                :layout="this.$store.state.getInfoAsyncData"
                :col-num="12"
                :row-height="30"
                :is-draggable="true"
                :is-resizable="true"
                :is-mirrored="false"
                :vertical-compact="true"
                :margin="[10, 10]"
                :use-css-transforms="false"
                :max-rows="10"
        >

            <grid-item v-for="item in this.$store.state.getInfoAsyncData"
                       :key="item.i"
                       :x="item.x"
                       :max-w="item.maxW"
                       :max-h="item.maxH"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i">
                <span class="text">{{ $t(item.i) }}</span>
            </grid-item>
        </grid-layout>

        <div class="btn-action">
            <Button v-bind:classes="['btn', 'btn-secondary']" name="test" v-bind:msg="$t('save')" :onClick=saveGrid />
        </div>
    </div>
</template>

<script>
    import VueGridLayout from 'vue-grid-layout';
    import Button from './Button.vue';
    import * as types from '../store/mutation-types'

    export default {
        name: 'Grid',
        props: {
            base_url_ajax: String,
            testLayout: Array
        }, components: {
            Button,
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem
        },
        computed: {
            fullUrl: function () {
                return this.base_url_ajax
            }
        },
        created: function () {
            this.getGrid()
        },
        methods: {
            clearState(type) {
                this.$store.commit(type.BASE, {type: type.SUCCESS, value: {}})
                this.$store.commit(type.BASE, {type: type.FAILURE, value: null})
            },
            saveGrid() {
                this.$notify({
                    group: 'common',
                    title: this.$t('saveGrid_notif_title'),
                    text: this.$t('saveGrid_notif_text')
                });

                if (this.$store.state.postInfoAsyncPending !== true) {
                    this.clearState(types.POST_INFO_ASYNC)
                    this.$store.dispatch('postAsync', {
                        url: this.fullUrl,
                        data: this.$store.state.getInfoAsyncData
                    })
                }
            },
            getGrid() {
                if (this.$store.state.getInfoAsyncPending !== true) {
                    this.clearState(types.GET_INFO_ASYNC)

                    this.$store.dispatch('getAsync', {url: this.fullUrl})
                }
            }
        }
    }
</script>

<style scoped>
    button {
        margin: 40px;
    }
</style>
