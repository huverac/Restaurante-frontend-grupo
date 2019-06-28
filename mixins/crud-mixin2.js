import Vue from 'vue'

export const crudModal = (PAYLOAD2, customShowModal = () => {}, customSendModificar = () => {}) => ({
  data: () => ({
    crudSettingsthig: {
      showModal: false,
      msgBtn: 'Buscar',
      toogleFilter: false
    }
  }),
  watch: {
    'crudSettingsthig.showModal': function (newValue) {
      if (newValue) {
        return
      }
      Vue.nextTick(() => {
        this.PAYLOAD = JSON.parse(JSON.stringify(PAYLOAD2))
        this.crudSettingsthig.msgBtn = 'Buscar'
        this.customShowModal()
      })
    }
  },
  methods: {
    customShowModal,
    customSendModificar
  }
 
})

export default crudModal
