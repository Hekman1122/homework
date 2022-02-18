export default{
    data() {
        return {
            banner: ["https://media.istockphoto.com/photos/business-owner-at-a-bakery-shop-picture-id588598056?k=20&m=588598056&s=612x612&w=0&h=CzAw591lOyxoMtVE8aKD7mEuXqk90XQpjejsE6wFItk=",
                "https://media.istockphoto.com/photos/interior-design-of-bakery-picture-id514111760?k=20&m=514111760&s=612x612&w=0&h=lh8qMYpAbybmuP1WZQ848Y4QEob45v0C3AopKXOmb4U=",
                "https://media.istockphoto.com/photos/desserts-picture-id91457258?k=20&m=91457258&s=612x612&w=0&h=NEFpzC02Sju4ZjXf0v6npzbN3AqrThma2miSkuain8U=",
                "https://media.istockphoto.com/photos/couple-buying-bread-at-the-bakery-picture-id590149084?k=20&m=590149084&s=612x612&w=0&h=QZhnyV6g3ztfLRbNG207u9BxIlLqa6_Z5_dU029iS44=",
                "https://media.istockphoto.com/photos/cafe-staff-offering-fancy-and-sponge-cakes-picture-id519610636?k=20&m=519610636&s=612x612&w=0&h=ksN3z-DgzDYE-EI6_MdoKrVuCy8yFAzRjmLj_HSbsQs="
            ],
            bannerIndex: 0
        }
    },
    template: `
    <div class="banner">
        <i class="fa-regular fa-circle-left" @click="shiftLeft" :class='{disabled:bannerIndex===0}'></i>
        <img :src="bannerList">
        <i class="fa-regular fa-circle-right" @click="shiftRight" :class='{disabled:bannerIndex===4}'></i>
    </div>
    `,
    computed: {
        bannerList() {
            return this.banner[this.bannerIndex]
        }
    },
    methods: {
        shiftLeft() {
            if (this.bannerIndex >= 1) {
                this.bannerIndex -= 1
            }
        },
        shiftRight() {
            if (this.bannerIndex < 4) {
                this.bannerIndex += 1
            }
        }
    }
}