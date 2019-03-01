import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid/v1'

Vue.use(Vuex)


async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}

export default new Vuex.Store({
  state: {
    targets: [],
    status: ''

  },
  mutations: {
    populateTarget(state, payload){
      state.targets = payload
    },
    addTarget(state, payload){
      state.targets.push(Object.assign(payload, {uuid: uuid()}));
    },
    modifyTarget(state, {name, status, keyContacts, financialPerformance, id}){
      state.targets[id].name = name;
      state.targets[id].status = status;
      state.targets[id].keyContacts = keyContacts;
      state.targets[id].financialPerformance = financialPerformance;
    },
    deleteTarget(state, id){
      state.targets.splice(id, 1);
    }
  },
  actions: {
    async fetchTarget(context){
      let targets = [
        {
          name: 'Coca-Cola',
          uuid: '11aec854-6513-4b14-b924-b7b1de4d3df4',
          status: 'Researching',
          keyContacts: ['Jozef Allman', 'Ridwan Head', 'Lindsey Buchanan'],
          financialPerformance: 'Good',
          companyInfo: 'Proin vitae justo a lorem tincidunt consequat. In dictum tincidunt sagittis. Nunc ac erat vitae justo imperdiet imperdiet. Phasellus pellentesque dapibus turpis et mollis. Ut mollis lorem in sapien finibus porta. Sed sed nisi viverra, dignissim nisl vitae, eleifend tellus. Maecenas tincidunt gravida est, eu fermentum ante cursus nec. Fusce pellentesque, ligula eu tempus pellentesque, nisl odio faucibus nibh, ut posuere mi lacus ut arcu.'
        },
        {
          name: 'Insiten',
          uuid: '4c6bc619-0b96-4d54-8285-cc24cba42ee8',
          status: 'Researching',
          keyContacts: ['Maximillian Jenkins', 'Alara Mcmanus'],
          financialPerformance: 'Good',
          companyInfo: 'Morbi faucibus consequat velit sed lacinia. Integer eget odio fermentum, commodo mauris eu, rutrum mi. Proin semper, ipsum nec gravida porttitor, purus risus condimentum tellus, in luctus augue tellus in ex. Pellentesque leo justo, accumsan eu augue sit amet, semper lacinia tortor. Suspendisse potenti. Integer nibh diam, malesuada tincidunt lacus a, finibus rutrum felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
        },
        {
          name: 'GameDay',
          uuid: '1d95d38a-ca10-4630-bb63-e29d5812d2cc',
          status: 'Approved',
          keyContacts: ['Eleni Wilkinson', 'Taslima Anderson', 'Rumaysa Preece', 'Zayyan Markham'],
          financialPerformance: 'Good',
          companyInfo: 'Nam dapibus eu sapien ut placerat. Nam mattis nunc vel condimentum porttitor. Nullam posuere nulla nulla, nec luctus augue mattis id. Integer a iaculis diam. Proin nec purus eleifend, venenatis urna et, porttitor tortor. Curabitur congue lorem eu sollicitudin posuere. Quisque facilisis finibus turpis, quis rutrum libero. Integer ut dapibus elit. Vestibulum nec ullamcorper risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas suscipit euismod dolor vitae ultrices. Pellentesque blandit non ante in volutpat. Aliquam erat volutpat.'
        }
      ];

      context.state.status = 'loading';
      await stall();
      context.state.status = await 'loaded';
      await context.commit('populateTarget', targets)
    },
    async saveTarget( {commit}, payload){
      let target = {
        ...payload
      }
      await stall(500);
      await commit('addTarget', target);
    },
    async modifyTarget({commit}, payload){
      await stall(500);
      await commit('modifyTarget', payload)
    },
    async deleteCompany({commit}, id){
      await stall(500);
      await commit('deleteTarget', id);
    }
  }
})
