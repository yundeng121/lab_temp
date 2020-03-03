<template>
    <div class="Navigation">
      <Menu v-model="active" mode="horizontal">
        <MenuItem 
            v-for="(item,index) in tabItems"
            :to="item.path"
            :key="item.name"
            :name="index"
        >{{item.name}}
        </MenuItem>
      </Menu>
    </div>
</template>
<script>
    import { Menu, MenuItem } from 'view-design'
    export default {
        name:'Navigation',
        data(){
            return{
                active: 0,
                tabItems: [{
                    name: '首页',
                    pathName: 'index',
                    path: '/',
                }, {
                    name: '最新动态',
                    pathName: 'news',
                    path: '/news',
                },{
                    name: '研究介绍',
                    pathName: 'research',
                    path: '/research',
                },{
                    name: '团队成员',
                    pathName: 'team',
                    path: '/team',
                },{
                    name: '研究成果',
                    pathName: 'results',
                    path: '/results',
                },{
                    name: '招生信息',
                    pathName: 'recruit',
                    path: '/recruit',
                },{
                    name: '联系我们',
                    pathName: 'contact',
                    path: '/contact',
                }]
            }
        },
        components: {
            Menu,
            MenuItem
        },
        watch: {
            '$route.name': function () {
                this.setActive(this.$route.name)
            }
        },
        created() {
            const activeTab = this.$route.name;
            this.setActive(activeTab)
        },
        methods: {
            setActive(name) {
                this.tabItems.forEach((item, index) => {
                    if (item.pathName === name) {
                        this.active = index
                    }
                })
            }
        },
    }
</script>
<style scoped>
    .Navigation{
        margin-bottom: 15px;
    }
</style>