<template>
  <div  class="uk-width-1-2@m uk-width-1-1@s uk-width-1-3@l">
    <vk-card hover>
      <vk-card-title class="uk-margin-bottom uk-text-bold">{{company.name}}</vk-card-title>
      <vk-label slot="badge">{{company.status}}</vk-label>
      <TransitionExpand>
        <div v-if="expanded">
          <div class="uk-text-lead">Company Info</div>
          <p class="uk-text-meta">
            {{company.companyInfo}}
          </p>
          <div class="uk-text-lead">Key Contacts</div>
          <div class="contact-container uk-padding-small uk-margin-bottom">
            <span class="uk-badge uk-margin-small-right" v-for="(contact, index) in company.keyContacts" :key="index">{{contact}}</span>
          </div>
          <div class="uk-text-lead">Performance</div>
          <p class="uk-text-meta">{{company.financialPerformance}}</p>
        </div>
      </TransitionExpand>
      <div slot="footer">
        <vk-button type="text" class="uk-margin-right" @click="expand">{{expanded ? 'Less' : 'Read More'}}</vk-button>
        <vk-button type="text" class="uk-margin-right" @click="$emit('modify', id)">Modify</vk-button>
        <vk-button type="text" class="uk-margin-right" @click="deleteCompany">Delete</vk-button>
      </div>
    </vk-card>
  </div>
</template>

<script>
import TransitionExpand from './transitionExpand.vue'

export default {
  name: 'Target',
  components: {
    TransitionExpand
  },
  data(){
    return {
      expanded: false
    }
  },
  props: {
    company: Object,
    id: Number
  },
  methods: {
    expand: function(){
      this.expanded = !this.expanded;
    },
    deleteCompany: function(){
      this.$store.dispatch('deleteCompany', this.id);
    }
  }
}
</script>

<style scoped>
.contact-container {
  border: dashed 1px #808080;
  border-radius: 5px;
}
</style>