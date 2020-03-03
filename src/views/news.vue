<template>
    <div class="news">
        <List header="实验室动态" border size="large">
            <ListItem class="new">
                <a>某某同学在某某期刊上发表了某某文章</a>
                <template slot="extra">
                    发布日期2019-12-09
                </template>
            </ListItem>
            <ListItem class="new">
                <a>某某学校教授来访我们团队进行交流</a>
                <template slot="extra">
                    发布日期2019-12-09
                </template>
            </ListItem>
            <ListItem class="new">
                <a>某某小组参加某某比赛获得某某奖</a>
                <template slot="extra">
                    发布日期2019-12-09
                </template>
            </ListItem>
            <div class="pagination" slot="footer">
                <Page :total="40" size="small" show-elevator show-sizer />
            </div>
        </List>
    </div>
</template>
<script>
    import { Page } from 'view-design'
    import listVue from 'view-design/src/components/list/list.vue'
    import listItemVue from 'view-design/src/components/list/list-item.vue'
    export default {
        name:"news",
        components:{
            List:listVue,
            ListItem:listItemVue,
            Page:Page
        }
    }
</script>
<style>
    .new{
        display:flex;
        justify-content: space-between;
    }
    .pagination{
        display:flex;
        justify-content: center;
    }
</style>