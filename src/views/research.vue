<template>
    <div class="layout">
        <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
                <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                    <MenuItem name="1-1">实验室介绍</MenuItem>
                    <MenuItem name="1-2">研究方向</MenuItem>
                    <MenuItem name="1-3">研究课题</MenuItem>
                </Menu>
            </Sider>
            <Layout :style="{padding: '0 24px 24px'}">
                <Breadcrumb :style="{margin: '24px 0'}">
                    <BreadcrumbItem>主页</BreadcrumbItem>
                    <BreadcrumbItem>研究介绍</BreadcrumbItem>
                    <BreadcrumbItem>实验室介绍</BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    &nbsp;&nbsp;&nbsp;&nbsp;我们实验室有多少三级教授，分别在某某领域做出过怎样的贡献，曾经在某某杂志发表过重要期刊
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
    
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