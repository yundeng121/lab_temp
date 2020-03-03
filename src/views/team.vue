<template>
    <div class="layout">
        <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
                <Menu active-name="1" theme="light" width="auto" :open-names="['1']">
                    <Submenu name="1">
                        <template slot="title">
                            导师团队
                        </template>
                        <MenuItem name="1-1">教授</MenuItem>
                        <MenuItem name="1-2">研究员</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            学生团队
                        </template>
                        <MenuItem name="2-1">在读硕士生</MenuItem>
                        <MenuItem name="2-2">在读博士生</MenuItem>
                        <MenuItem name="2-3">博士后</MenuItem>
                        <MenuItem name="2-4">已毕业学生</MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout :style="{padding: '0 24px 24px'}">
                <Breadcrumb :style="{margin: '24px 0'}">
                    <BreadcrumbItem>主页</BreadcrumbItem>
                    <BreadcrumbItem>研究介绍</BreadcrumbItem>
                    <BreadcrumbItem>实验室介绍</BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    <div class="wrapper">
                        <div class="wrapper-content" v-for="(tutor,index) in tutorlist" :key="index">
                            <TutorCard
                                :tutor="tutor"
                            />
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import TutorCard from '../components/TutorCard'
import { Sider,Menu,MenuItem,Submenu,Layout,Breadcrumb,BreadcrumbItem,Content } from 'view-design'
export default {
    name:'team',
    data(){
        return{
            tutorlist:[{
                name:'刘智',
                imgUrl:'http://life.hust.edu.cn/__local/0/F1/FE/6E722737F8758F746AF90379922_BF546B80_6EA8.jpg',
                position:'教授',
                status:'团队负责人',
                introduction:'刘智，男，华中科技大学生命科学与技术学院某级教授，博士生导师'
            },{
                name:'刘智',
                imgUrl:'http://life.hust.edu.cn/__local/0/F1/FE/6E722737F8758F746AF90379922_BF546B80_6EA8.jpg',
                position:'教授',
                status:'团队负责人',
                introduction:'刘智，男，华中科技大学生命科学与技术学院某级教授，博士生导师'
            },{
                name:'刘智',
                imgUrl:'http://life.hust.edu.cn/__local/0/F1/FE/6E722737F8758F746AF90379922_BF546B80_6EA8.jpg',
                position:'教授',
                status:'团队负责人',
                introduction:'刘智，男，华中科技大学生命科学与技术学院某级教授，博士生导师'
            }]
        }
    },
    components:{
        TutorCard,
        Sider,
        Menu,
        MenuItem,
        Submenu,
        Layout,
        Breadcrumb,
        BreadcrumbItem,
        Content
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
    .wrapper{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .wrapper-content{
        width: 50%;
    }
</style>