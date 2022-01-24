const url = 'https://vue3-course-api.hexschool.io/v2'; // 加入站點
const path = 'hexschoolforhenrywu'; // 加入個人 API Path 'hexschoolforhenrywu'


const vm = Vue.createApp({
    data() {
        return {
            username: '',
            password: '',

            //渲染至畫面上用的
            products: [],
            //取得單一產品用的
            temp: {},

            //切換元件
            page: '',

        }
    },
    computed: {
        showCom() {
            if (this.page) {
                return `${this.page}-page`
            }

        }
    },
    methods: {
        //確認登入狀態
        checkLogin: function () {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchool\s*\=\s*([^;]*).*$)|^.*$/,
                "$1");
            axios.defaults.headers.common['Authorization'] = token;

            axios.post(`${url}/api/user/check`)
                .then((res) => {
                    console.log(res.data)
                })
                .catch((error) => {
                    alert('請先登入')
                    console.dir(error)
                    window.location = 'login.html'
                })
        },

        //取得產品列表
        getProducts: function () {
            //取得token
            this.checkLogin();

            axios.get(`${url}/api/${path}/admin/products`)
                .then(res => {
                    //將回傳資料指定給Vue元件的products變數
                    this.products = res.data.products;
                })
                .catch(err => {
                    console.dir(err)
                })
        },

        //取得單一產品資訊 無需驗證
        getSingleProduct: function (e, a) {
            const btn = [...document.querySelectorAll('.tableButton')];
            btn.forEach((item) => {
                item.classList.remove('active')
            })
            this.temp = a;
            if (a.title === this.temp.title) {
                e.target.classList.add('active')
            }
        },

        //刪除產品
        deleteProducts: function (id) {
            this.checkLogin();

            let confirmText = prompt('Are you sure you want to delete this product?', 'yes / no');
            if (confirmText.toLowerCase().trim() === 'yes') {
                axios.delete(`${url}/api/${path}/admin/product/${id}`)
                    .then(res => {
                        this.getProducts()
                    })
                    .catch(err => {
                        console.dir(err)
                    })
            } else {
                return
            }

        },

        //新增產品
        addProduct(sample) {
            //淺複製新增產品列
            const product = {
                data: sample
            }

            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchool\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;

            //新增一個產品
            axios.post(`${url}/api/${path}/admin/product`, product)
                .then((res) => {
                    console.log(res.data)
                    this.getProducts()

                })
                .catch((error) => {
                    console.dir(error)
                    alert('新增產品錯誤，請重新輸入')
                })

        },

        //修改產品
        editProduct(sample) {
            const product = {
                data: sample
            }

            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchool\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;

            axios.put(`${url}/api/${path}/admin/product/${sample.id}`, product)
                .then(res => {
                    console.log('修改成功')
                    this.getProducts()
                })
                .catch(err => {
                    console.dir(err)
                })
        },

        //實體接收子元件:更改元件
        changePage(val) {
            this.page = val
        },

        //取得temp並更改元件名
        toEdit(item) {
            this.temp = item;
            this.page = 'edit'
        }
    },
    mounted() {
        this.getProducts()
    }
})

//新增產品元件
vm.component('add-page', {
    data() {
        return {
            singleProduct: {
                imagesUrl: []
            }
        }
    },
    emits: ['emit-product', 'emit-empty'],
    template: `
    <div>
            <div class='bg'></div>
            <div class='main'>
                <h1>產品新增頁面</h1>
                <div class='main-col'>
                    <div class='input-box'>
                        <div>
                            <input type="text" id="add_title" v-model='singleProduct.title'>
                            <label for="add_title">產品標題</label>
                        </div>
                        <div>
                            <input type="text" id="add_category" v-model='singleProduct.category'>
                            <label for="add_category">產品類型</label>
                        </div>
                        <div>
                            <input type="number" id="add_origin_price" v-model.number='singleProduct.origin_price'>
                            <label for="add_origin_price">產品原價</label>
                        </div>
                        <div>
                            <input type="number" id="add_price" v-model.number='singleProduct.price'>
                            <label for="add_price">產品售價</label>
                        </div>
                        <div>
                            <input type="text" id="add_unit" v-model='singleProduct.unit'>
                            <label for="add_unit">產品單位</label>
                        </div>
                        <div>
                            <input type="text" id="add_description" v-model='singleProduct.description'>
                            <label for="add_description">產品描述</label>
                        </div>
                        <div>
                            <input type="text" id="add_content" v-model='singleProduct.content'>
                            <label for="add_content">產品內容</label>
                        </div>
                        

                    </div>
                    <div class='img-box'>
                        <div>
                            <input type="number" id="add_is_enabled" v-model.number='singleProduct.is_enabled'>
                            <label for="add_is_enabled">產品是否上架</label>
                        </div>
                        <div>
                            <input type="number" id="add_num" v-model.number='singleProduct.num'>
                            <label for="add_num">產品數量</label>
                        </div>
                        <div>
                            <input type="text" id="add_imageUrl" v-model='singleProduct.imageUrl'>
                            <label for="add_imageUrl">產品圖片主網址</label>
                        </div>
                        <div>
                            <input type="text" id="add_imageUrl1" v-model='singleProduct.imagesUrl[0]'>
                            <label for="add_imageUrl1">產品圖片網址1</label>
                        </div>
                        <div>
                            <input type="text" id="add_imageUrl2" v-model='singleProduct.imagesUrl[1]'>
                            <label for="add_imageUrl2">產品圖片網址2</label>
                        </div>
                    </div>
                </div>

                <div>
                    <button type='button' @click = "send" class='btn' >Add</button>
                    <button type='button' @click="togglePage" class='btn'>Cancel</button>
                </div>

            </div>
        </div>
    `,
    methods: {
        send() {
            this.$emit('emit-product', this.singleProduct)
            this.togglePage()
        },
        togglePage() {
            this.$emit('emit-empty', '')
        }
    }
})

//修改產品元件
vm.component('edit-page', {
    data() {
        return {
            singleProduct: {
                title: this.title,
                id: this.id,
                category: this.category,
                origin_price: this.origin_price,
                price: this.price,
                unit: this.unit,
                description: this.description,
                content: this.content,
                is_enabled: this.is_enabled,
                num: this.num,
                imageUrl: this.imageUrl,
                imagesUrl: [...this.imagesUrl]
            }
        }
    },
    emits: ['emit-edit', 'emit-empty'],
    props: ['title', 'category', 'origin_price', 'price', 'unit', 'description', 'content', 'is_enabled', 'num', 'imageUrl', 'imagesUrl', 'id'],
    template: `
    <div>
            <div class='bg'></div>
            <div class='main'>
                <h1>產品修改頁面</h1>
                <div class='main-col'>
                    <div class='input-box'>
                        <div>
                            <input type="text" id="edit_title" v-model='singleProduct.title'>
                            <label for="edit_title">產品標題</label>
                        </div>
                        <div>
                            <input type="text" id="edit_category" v-model='singleProduct.category'>
                            <label for="edit_category">產品類型</label>
                        </div>
                        <div>
                            <input type="number" id="edit_origin_price" v-model.number='singleProduct.origin_price'>
                            <label for="edit_origin_price">產品原價</label>
                        </div>
                        <div>
                            <input type="number" id="edit_price" v-model.number='singleProduct.price'>
                            <label for="edit_price">產品售價</label>
                        </div>
                        <div>
                            <input type="text" id="edit_unit" v-model='singleProduct.unit'>
                            <label for="edit_unit">產品單位</label>
                        </div>
                        <div>
                            <input type="text" id="edit_description" v-model='singleProduct.description'>
                            <label for="edit_description">產品描述</label>
                        </div>
                        <div>
                            <input type="text" id="edit_content" v-model='singleProduct.content'>
                            <label for="edit_content">產品內容</label>
                        </div>
                        

                    </div>
                    <div class='img-box'>
                        <div>
                            <input type="number" id="edit_is_enabled" v-model.number='singleProduct.is_enabled'>
                            <label for="edit_is_enabled">產品是否上架</label>
                        </div>

                        <div>
                            <input type="number" id="edit_num" v-model.number='singleProduct.num'>
                            <label for="edit_num">產品數量</label>
                        </div>
                        <div>
                            <input type="text" id="edit_imageUrl" v-model='singleProduct.imageUrl'>
                            <label for="edit_imageUrl">產品圖片主網址</label>
                        </div>
                        <div>
                            <input type="text" id="edit_imageUrl1" v-model='singleProduct.imagesUrl[0]'>
                            <label for="edit_imageUrl1">產品圖片網址1</label>
                        </div>
                        <div>
                            <input type="text" id="edit_imageUrl2" v-model='singleProduct.imagesUrl[1]'>
                            <label for="edit_imageUrl2">產品圖片網址2</label>
                        </div>
                    </div>
                </div>

                <div>
                    <button type='button' @click='send' class='btn' >Edit</button>
                    <button type='button' @click="togglePage" class='btn'>Cancel</button>
                </div>

            </div>
        </div>
    `,
    methods: {
        send() {
            console.log(this.singleProduct)
            this.$emit('emit-edit', this.singleProduct)
            this.togglePage()

        },
        togglePage() {
            this.$emit('emit-empty', '')
        }
    }
})

vm.mount('#mainPage')