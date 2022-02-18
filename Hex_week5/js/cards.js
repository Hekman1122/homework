export default {

    data() {

        return {
            url:'https://vue3-course-api.hexschool.io/v2',
            path:'hexschoolforhenrywu',
            products:[],
            
        }
    },
    props:['filter'],
    template: `
        <div class="product-list">
            <div class="card" v-for='item in productFilter' :key='item.id'>
                <h2>{{item.title}}</h2>
                <div class="col-1">
                    <img :src="item.imageUrl" >
                </div>
                <div class="col-2">
                    <h3>{{item.description}}</h3>
                    <h3 class="profile">
                        <span>價格 : {{item.price}}元</span>
                        <span>數量 : {{item.num}}個</span>
                        <span @click='toggle(item.id)'>更多..</span>
                    </h3>
                </div>
                <button @click='addToCart($event,item.id)'>加入購物車</button> 
            </div>
        </div>
    `,
    computed:{
        productFilter(){
            if(this.filter){
                const newP =[]
                this.products.forEach((item)=>{
                    if(item.category === this.filter){
                        newP.push(item)
                    }
                })
                return newP
            }
            return this.products
        }
    },
    mounted() {
        this.getProducts()
    },
    
}