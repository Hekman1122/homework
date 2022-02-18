export default {
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "hexschoolforhenrywu",
      cartData: {},
      
    };
  },
  props: ['userData'],
  watch:{
    userData(n){
        this.user = n
    }
  },
  methods: {
    getCarts() {
      axios
        .get(`${this.url}/api/${this.path}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    deleCartItem(id) {
      this.isLoading = id;
      axios
        .delete(`${this.url}/api/${this.path}/cart/${id}`)
        .then((res) => {
          this.getCarts();
          this.isLoading = "";
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    updateCartItem(item) {
      const data = {
        product_id: item.id,
        qty: item.qty,
      };
      this.isLoading = item.id;
      axios
        .put(`${this.url}/api/${this.path}/cart/${item.id}`, {
          data,
        })
        .then((res) => {
          this.getCarts();
          this.isLoading = "";
        });
    },
    deleteAll() {
      axios
        .delete(`${this.url}/api/${this.path}/carts`)
        .then((res) => {
          this.getCarts();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    //結帳
    payCheck(e) {
        const data={...this.userData}
        e.target.classList.add('disable')
        axios.post(`${this.url}/api/${this.path}/order`,{ 'data':data})
          .then(res => {
            console.log(res.data.response)
            e.target.classList.remove('disable')
            this.getCarts()
          })
          .catch(err => {
            console.dir(err)
            alert('請先登入')
            e.target.classList.remove('disable')
          })
      }
  },
  mounted() {
    this.getCarts();
    this.user = this.userData
  },
  template: `
  <div class="carts">
    <button type="button" @click="deleteAll" :class='{disable :cartData.final_total===0}'>清空購物車</button>
    <table>
        <thead>
            <tr>
                <th>圖片</th>
                <th>產品名稱</th>
                <th>售價</th>
                <th>調整數量</th>
                <th>調整產品</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in cartData.carts" :key="item.id">
                <td><img :src="item.product.imageUrl"></td>
                <td> {{item.product.title}}</td>
                <td> {{item.final_total}}</td>
                <td>
                    <select name="amount" v-model="item.qty" @change="updateCartItem(item)">
                        <option :value="num" v-for="num in 100" :key="num">{{num}}</option>
                    </select><label for="amount">{{item.qty + item.product.unit}} </label>
                </td>
                <td>
                    <i class="far fa-trash-alt" @click="deleCartItem(item.id)"></i>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="5"><h3>總計 : {{cartData.final_total}} 元</h3></td> 
            </tr>
        </tfoot>
    </table>
    <div>
      <button type='button' :class='{disable :cartData.final_total===0}' @click='payCheck($event)'>結帳</button>
    </div>
    
  </div>
  `,
};