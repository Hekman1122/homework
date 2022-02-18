export default {
    data() {
        return {
            temp: {},
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'hexschoolforhenrywu',
            detailSwitch: false
        }
    },
    methods: {
        customerGetProduct(id) {
            axios.get(`${this.url}/api/${this.path}/product/${id}`)
                .then(res => {
                    this.temp = {
                        ...res.data.product
                        
                    }
                    this.detailSwitch = !this.detailSwitch
                })
                .catch(err => {
                    console.dir(err)
                })
        },
        changeSwitch() {
            this.detailSwitch = !this.detailSwitch
            this.temp = {}
        }
    },
    
    template: `
    <div v-if="detailSwitch">
        <div class="bg"></div>
        <div class='showDetail'>
            <span class="cancel" @click='changeSwitch'><i class="fa-solid fa-xmark"></i></span>
            <h1>產品細節</h1>
            <div class="itemContent">
                <div class="col-1">
                    <img class='largepic' :src="temp.imageUrl">
                    <ul>
                        <li v-for="(item , i) in temp.imagesUrl" :key="i">
                            <img class="smallpic" :src="item">
                        </li>
                    </ul>
                </div>

                <div class="col-2">
                    <h2>{{temp.title}} <span>{{temp.category}}</span></h2>
                    <p>商品描述 : {{temp.description}}</p>
                    <p>商品內容 : {{temp.content}}</p>
                    <p>產品售價 : 超激價! {{temp.price}} <span class='originPrice'>{{temp.origin_price}}</span> 個 / 元</p>
                    <p>產品熱量 : {{temp.calorie}}千卡</p>
                    <p>尚有數量 : {{temp.num}} {{temp.unit}}</p>
                </div>
            </div>
        </div>
    </div>
    `
}