export default {
    emits: ['emit-update', 'emit-empty'],
    template: `
    <div>
        <div class='bg'></div>
        <div class='main'>
            <h1>產品修改頁面</h1>
            <div class='main-col'>
                <div class='input-box'>
                    <div>
                        <input type="text" id="title" v-model='singleProduct.title'>
                        <label for="title">產品標題</label>
                    </div>
                    <div>
                        <input type="text" id="category" v-model='singleProduct.category'>
                        <label for="category">產品類型</label>
                    </div>
                    <div>
                        <input type="number" id='origin_price' v-model.number='singleProduct.origin_price'>
                        <label for="origin_price">產品原價</label>
                    </div>
                    <div>
                        <input type="number" id="price" v-model.number='singleProduct.price'>
                        <label for="price">產品售價</label>
                    </div>
                    <div>
                        <input type="text" id="unit" v-model='singleProduct.unit'>
                        <label for="unit">產品單位</label>
                    </div>
                    <div>
                        <input type="text" id="description" v-model='singleProduct.description'>
                        <label for="description">產品描述</label>
                    </div>
                    <div>
                        <input type="text" id="content" v-model='singleProduct.content'>
                        <label for="content">產品內容</label>
                    </div>
                </div>
                <div class='img-box'>
                    <div>
                        <input type="number" id="is_enabled" v-model.number='singleProduct.is_enabled'>
                        <label for="is_enabled">產品是否上架</label>
                    </div>
                    <div>
                        <input type="number" id="num" v-model.number='singleProduct.num'>
                        <label for="num">產品數量</label>
                    </div>
                    <div>
                        <input type="text" id="calorie" v-model='singleProduct.calorie'>
                        <label for="calorie">產品熱量</label>
                    </div>
                    <div>
                        <input type="text" id="imageUrl" v-model='singleProduct.imageUrl'>
                        <label for="imageUrl">產品圖片主網址</label>
                    </div>
                    <div>
                        <input type="text" id="imageUrl1" v-model='singleProduct.imagesUrl[0]'>
                        <label for="imageUrl1">產品圖片網址1</label>
                    </div>
                    <div>
                        <input type="text" id="imageUrl2" v-model='singleProduct.imagesUrl[1]'>
                        <label for="imageUrl2">產品圖片網址2</label>
                    </div>
                </div>
            </div>

            <div>
                <button type='button' @click='send' class='btn' >Update</button>
                <button type='button' @click="togglePage" class='btn'>Cancel</button>
            </div>

        </div>
    </div>
    `,
    methods: {
        send() {
            this.$emit('emit-update', this.singleProduct)
            this.togglePage()
        },
        togglePage() {
            this.$emit('emit-empty', '')
        }
    }
}