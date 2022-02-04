export default {
  props:['pages'],
  emits:['change-page'],
  methods:{
      toPrev(){
        if (this.pages.has_pre){
            this.$emit('change-page' , this.pages.current_page-1)
        }
      },
      toNex(){
        if (this.pages.has_next){
            this.$emit('change-page' , this.pages.current_page+1)
        }
      }
  },
  template: `
    <div class="page">
        <ul>
            <li :class='{disable : !pages.has_pre}' @click='toPrev'>
                Prev
            </li>
            <li class="mid" :class='{active : page === pages.current_page}' v-for="page in pages.total_pages" :key='page +333' @click='$emit("change-page" , page)'>
                
            {{page}}
            </li>
            <li :class='{disable : !pages.has_next}' @click='toNex'>
                Next
            </li>
        </ul>
    </div>
    `
};
