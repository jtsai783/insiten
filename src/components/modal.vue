<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <vk-card class="uk-width-1-2@m uk-width-1-3@l uk-align-center">

          <slot name="header">

          </slot>

          <div class="modal-body">
              <div class="uk-text-emphasis">Company Name</div>
              <input class="uk-input uk-margin-bottom" v-model="companyName" placeholder="Company Name" ref="company-name">
              <div class="uk-text-emphasis">Company Status</div>
              <div class="uk-margin-bottom">
                  <select class="uk-select" v-model="status" ref="company-status">
                      <option disabled value="">Select Status</option>
                      <option>Researching</option>
                      <option>Pending Approval</option>
                      <option>Approved</option>
                      <option>Declined</option>
                  </select>
              </div>
              <div class="uk-text-emphasis">Company Info</div>
              <textarea class="uk-textarea uk-margin-bottom" v-model="companyInfo"></textarea>
              <div class="uk-text-emphasis">Key Contacts</div>
              <div class="contact-container uk-padding-small uk-margin-bottom">
                <span class="uk-badge uk-margin-small-right" v-for="(contact, index) in keyContacts" :key="index">{{contact}}</span>
              </div>

              <div class="uk-margin-bottom">
                <input class="uk-input uk-margin-bottom" placeholder="Contact Name" ref="contact-input" @keydown.enter="addContact">
                <vk-button @click="addContact">add contact</vk-button>
              </div>

              <div class="uk-text-emphasis">Financial Performance</div>
              <input class="uk-input uk-margin-bottom" v-model="financialPerformance" placeholder="Financial Performance">
          </div>

          <div class="modal-footer">
              <vk-button type="primary" class="uk-margin-right" @click="addOrModifyTarget">
                {{ (companyId === null) ? 'Add' : 'Modify' }}
              </vk-button>
              <vk-button @click="$emit('close')">
                Cancel
              </vk-button>
          </div>
        </vk-card>
      </div>
    </div>
  </transition>
</template>

<script>
export default{
  name: 'modal',
  data(){
    return {
      companyName: '',
      status: '',
      keyContacts: [],
      financialPerformance: '',
      companyInfo: ''
    }
  },
  props: [ 'companyId'],
  methods: {
    addContact: function(){
      var contactName = this.$refs['contact-input'].value;
      this.$refs['contact-input'].value = '';
      this.keyContacts.push(contactName);
    },
    addOrModifyTarget: function(){
      if(!this.valid()){
        return;
      }

      let target = {
        name: this.companyName,
        status: this.status,
        keyContacts: this.keyContacts,
        financialPerformance: this.financialPerformance
      }
      if(this.companyId === null){
        this.$store.dispatch('saveTarget', target);
        this.$emit('close');
      } else {
        Object.assign(target, {id: this.companyId});
        this.$store.dispatch('modifyTarget', target);
        this.$emit('close');
      }
    },
    valid(){
      let valid = true;

      if(!this.companyName){
        this.$refs['company-name'].classList.add('uk-form-danger');
        valid = false;
      } else {
        this.$refs['company-name'].classList.remove('uk-form-danger');
      }

      if(!this.status){
        this.$refs['company-status'].classList.add('uk-form-danger');
        valid = false;
      } else {
        this.$refs['company-status'].classList.remove('uk-form-danger');
      }

      return valid;
    }
  },
  computed: {
    companies: function(){
      return this.$store.state.targets;
    }
  },
  mounted(){
    if(this.companyId !== null){
      let company = this.companies[this.companyId];
      this.companyName = company.name;
      this.status = company.status;
      this.keyContacts = company.keyContacts;
      this.financialPerformance = company.financialPerformance;
      this.companyInfo = company.companyInfo;
    }
  }
}
</script>

<style scoped>
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.contact-container {
  border: dashed 1px #808080;
  border-radius: 5px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>