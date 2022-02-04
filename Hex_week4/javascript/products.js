import pagination from './pagination.js'
import updateModal from './updateModal.js'
import deleteModal from './deleteModal.js'

const url = 'https://vue3-course-api.hexschool.io/v2'; // 加入站點
const path = 'hexschoolforhenrywu'; // 加入個人 API Path 'hexschoolforhenrywu'

const vm = Vue.createApp({
    data() {
        return {
            username: '',
            password: '',
            //渲染至畫面上用的
            products: [],
            //切換頁面
            pagination: {},
            //取得單一產品用的
            temp: {},
            //切換元件
            page: '',
            //接收上傳圖片
            photo:''
        }
    },
    mounted() {
        this.checkLogin();
        this.getProducts();
    },
    computed: {
        showCom() {
            if (this.page) {
                return `${this.page}-page`
            }
        }
    },
    components: {
        //換頁元件---------------------------------------
        pagination,
        //新增產品元件-----------------------------------
        'add-page': {
            data() {
                return {
                    singleProduct: {
                        imagesUrl: []
                    }
                }
            },
            ...updateModal
        },
        //修改產品元件-------------------------------------------
        'edit-page': {
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
                        calorie: this.calorie,
                        imageUrl: this.imageUrl,
                        imagesUrl: [...this.imagesUrl]
                    }
                }
            },
            props: ['title', 'category', 'origin_price', 'price', 'unit', 'description', 'content', 'is_enabled', 'num', 'imageUrl', 'imagesUrl', 'id', 'calorie'],
            ...updateModal
        },
        'delete-page': {
            data() {
                return {
                    singleProduct: {
                        title: this.title,
                        id: this.id,
                    }
                }
            },
            props: ['title', 'id'],
            ...deleteModal
        }
    },
    methods: {
        //確認登入狀態--------------------------------
        checkLogin() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexSchool\s*\=\s*([^;]*).*$)|^.*$/,
                "$1");
            axios.defaults.headers.common['Authorization'] = token;

            axios.post(`${url}/api/user/check`)
                .then((res) => {
                    console.log('登入成功')
                })
                .catch((error) => {
                    alert('請先登入')
                    console.dir(error)
                    window.location = 'login.html'
                })
        },

        //取得產品列表-----------------------
        getProducts(page = 1) {
            axios.get(`${url}/api/${path}/admin/products?page=${page}`)
                .then(res => {
                    //將回傳資料指定給Vue元件的products變數
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
                })
                .catch(err => {
                    console.dir(err)
                })
        },

        //取得單一產品資訊 無需驗證-------------------
        getSingleProduct(e, a) {
            const btn = [...document.querySelectorAll('.tableButton')];
            btn.forEach((item) => {
                item.classList.remove('active')
            })
            this.temp = {
                ...a
            };
            e.target.classList.add('active')
        },

        //刪除產品------------------------
        deleteProducts(id) {

            axios.delete(`${url}/api/${path}/admin/product/${id}`)
                .then(res => {
                    console.log('刪除產品完成')
                    this.getProducts()
                    this.temp = {}
                })
                .catch(err => {
                    console.dir(err)
                })
        },
        //新增或修改元件----------------------
        updateProduct(sample) {
            //接收元件傳出的產品資料
            const product = {
                data: sample
            }
            let site = `${url}/api/${path}/admin/product`;
            let method = 'post'

            //加入判斷:新增還是修改
            if (this.showCom === 'edit-page') {
                site = `${url}/api/${path}/admin/product/${sample.id}`;
                method = 'put'
            }
            axios[method](site, product)
                .then(res => {
                    console.log('修改成功')
                    this.getProducts();
                    this.temp = {
                        ...sample
                    };
                })
                .catch(err => {
                    console.dir(err)
                    alert('更新產品錯誤，請重新輸入')
                })
        },
        //上傳圖片-----------------------------
        upload() {

            const file = this.$refs.upload.files[0];
            const formData = new FormData();
            formData.append('file-to-upload', file);

            axios.post(`${url}/api/${path}/admin/upload`, formData)
                .then(res => {
                    console.log(res.data)
                    console.log('上傳圖片成功')
                })
                .catch(err => console.dir(err.response))
        },
        //實體接收子元件:更改元件-----------------
        changePage(val) {
            this.page = val
        },
        //取得temp並更改元件名----------------------
        toUpdate(item, method) {
            this.temp = {
                ...item
            };
            this.page = method
        }
    }
})
vm.mount('#mainPage')