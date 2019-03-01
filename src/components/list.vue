<template>
  <div>
    <vk-button id="show-modal" @click="addNewCompany" class="uk-margin-bottom" type="primary">Add Companies</vk-button>
    <div v-if="status === 'loading'" >
      <vk-spinner ratio='3' class="uk-text-lead align-center"></vk-spinner>
    </div>
    <div v-else-if="status === 'loaded' && targets.length === 0" class="uk-text-center uk-text-lead">
      There are no targets
    </div>
    <vk-grid>
      <Target v-for="(target, index) in targets" :key="target.uuid" :company="target" :id="index" @modify="modifyCompany"></Target>
    </vk-grid>

      <!-- use the modal component, pass in the prop -->
      <Modal v-if="showModal" @close="showModal = false" :companyId="editCompanyId">
        <vk-card-title slot="header">{{modalTitle}}</vk-card-title>
      </Modal>
  </div>
</template>

<script>
import Target from './target.vue'
import Modal from './modal.vue'

export default {
  name: 'List',
  components: {
    Target,
    Modal
  },
  data(){
    return {
      showModal: false,
      modalTitle: '',
      editCompanyId: null
    }
  },
  computed: {
    targets(){
      return this.$store.state.targets;
    },
    status(){
      return this.$store.state.status;
    }
  },
  methods: {
    addNewCompany: function(){
      this.modalTitle = 'Add New Company';
      this.editCompanyId = null;
      this.showModal = true;
    },
    modifyCompany: function(id){
      this.modalTitle = "Modify Company";
      this.editCompanyId = id;
      this.showModal = true;
    }
  }
}

</script>

<style scoped>
.align-center{
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
</style>