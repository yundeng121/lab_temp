<template>
    <div class="layout">
        <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
                <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                    <MenuItem name="1-1">成果展示</MenuItem>
                    <MenuItem name="1-2">发表论文</MenuItem>
                    <MenuItem name="1-3">研究专利</MenuItem>
                    <MenuItem name="1-4">获得荣誉</MenuItem>
                </Menu>
            </Sider>
            <Layout :style="{padding: '0 24px 24px'}">
                <Breadcrumb :style="{margin: '24px 0'}">
                    <BreadcrumbItem>主页</BreadcrumbItem>
                    <BreadcrumbItem>研究成果</BreadcrumbItem>
                    <BreadcrumbItem>发表论文</BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    <Table stripe :columns="columns1" :data="data1"></Table>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import { Layout,Sider,Menu,MenuItem,Breadcrumb,BreadcrumbItem,Content,Table } from 'view-design'
export default {
    name:'result',
    data(){
        return{
            columns1: [{
                title: '所属人',
                key: 'belong'
            },{
                title: '专利名',
                key: 'patent'
            },{
                title: '申请号',
                key: 'application'
            }],
            data1: [{
                belong: '李顺鹏、刘智、沈标',
                patent: "一株有机磷农药降解菌DLL-1 (Pseudomonas putida)",
                application: '01100595.5',
            },{
                belong: "余龙江、刘智、赵春芳",
                patent: "利用中国红豆杉枝叶体外合成紫杉醇的方法",
                application: '2004100600963.7',
            }]
        }
    },
    components:{
        Layout,
        Sider,
        Menu,
        MenuItem,
        Breadcrumb,
        BreadcrumbItem,
        Content,
        Table
    }
}
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
</style>