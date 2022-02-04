export default {
    emits: ['emit-empty','emit-delete'],
    template: `
        <div >
            <div class='bg'></div>
            <div class='delete-page'>
                <h1>確定刪除此產品嗎?</h1>
                <h2>{{this.title}}</h2>
                <div>
                    <button type='button' @click='send' class='btn' >Delete</button>
                    <button type='button' @click="togglePage" class='btn'>Cancel</button>
                </div>
            </div>
            
        </div>
        
    `,
    methods: {
        send() {
            this.$emit('emit-delete',this.id)
            this.togglePage()
        },
        togglePage() {
            this.$emit('emit-empty', '')
        }
    }
}