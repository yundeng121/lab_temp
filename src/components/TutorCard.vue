<template>
    <div class="tutor">
        <a :title="tutor.name" href='/'>
            <img :alt="tutor.name" class="tutor_avatar" :src='tutor.imgUrl'/>
        </a>
        <div class="tutor_description">
            <div class="tutor_info">
                <a class="name">{{tutor.name}}</a>
                <span class="position">{{tutor.position}}</span>
                <div class="status">{{tutor.status}}</div>
            </div>
            <p>{{tutor.introduction}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        name:'TutorCard',
        props:['tutor'],
    }
</script>
<style scoped>
    .tutor{
        display: flex;
    }
    .tutor_description{
        margin-left: 20px;
    }
    .tutor_info{
        font-size:14px;
    }
    .name{
        color: #333;
        font-size: 30px;
        text-decoration: none;
    }
    .tutor_avatar{
        width:200px;
    }
    .tutor_description > p {
        font-size: 12px;
    }
</style>