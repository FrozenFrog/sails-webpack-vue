<template>
<div>
    <div class="z-depth-3 center-align" id="itemobj">
        <a data-target="modal1"  :class="editable"  @click="editItem(item)" :style="pointer">
            <img :src="item.imgBase64Data" alt="item.itemPrice" class="responsive-img">
            <span><i class="material-icons">bookmark_border</i>{{item.itemName}} </span> <br>
            <span><i class="material-icons">attach_money</i>{{item.itemName}} </span>
        </a>
    </div>
</div>

</template>

<script>
    export default {
        data() {
            return{
                isAdmin:0,
                editable: "",
                
            }
        },
        computed: {
            pointer(){
                if (this.isAdmin) return "cursor: pointer;"
                else return
            }
        },
        props: ['item'],
        methods: {
            editItem: function(item) { //emit editItem event with item object to displayitems.vue
                this.$emit('editItem', item)
            }
        },
        created: function () {
            let user = JSON.parse(localStorage.getItem('user'))
            if(user){
                if (user.isAdmin) {
                    this.editable = "modal-trigger" //only show modal to edit if user is admin
                    this.isAdmin = user.isAdmin
                } 
            }
            else this.$router.push({name: 'login'})
        },
    }
</script>

<style scoped>
img.responsive-img{
    height: 200px;
    width: 280px;
    padding-left: 15px;
    padding-top: 15px;
}
div#itemobj{
    background-color: #b2dfdb;
}

</style>