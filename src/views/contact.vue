<template>
    <div class="layout">
        <span>
            <img src="@/assets/map.png">
        </span>
        <div class="contact">
            <ul>
                <h3>刘智实验室</h3>
                <ol><p>地址：湖北省武汉市洪山区珞喻路1037号华中科技大学生命科学与技术学院</p></ol>
                <ol><p>邮编：430074</p></ol>
                <ol><p>联系电话：XXXXXXXXXXX</p></ol>
                <span>团队负责人邮箱：</span>
                <ol>XXX：<a>XXXXXX@XXX.com</a></ol>
                <ol>XXX：<a>XXXXXX@XXX.com</a></ol>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name:'contact'
    }
</script>
<style scoped>
    .layout{
        display: flex;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout > span{
        margin:10px;
    }
    .contact{
        margin: 10px;
        padding:20px;
        background: #fff;
    }
    ul > ol{
        margin-bottom: 10px;
    }
    ul > span{
        margin-bottom: 5px;
    }
</style>