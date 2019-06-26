<template>
  <div>
    <h2>{{ tituloFuncionalidad }}</h2>
    <hr>
    <div class="d-flex justify-content-end">
      <b-btn variant="primary" @click="crudSettings.showModal = !crudSettings.showModal">
        <i class="fa fa-plus" aria-hidden="true" /> Nuevo
      </b-btn>
    </div>
    <div class="mt-3">
      <b-alert show variant="primary" v-if="listarIngredientes.length <= 0">No hay registros</b-alert>
      <b-table
        responsive
        striped
        v-else
        :fields="fields"
        stacked="md"
        :per-page="perPage"
        :current-page="currentPage"
        :items="listarIngredientes"
      >
        <template slot="acciones" slot-scope="data">
          <b-btn variant="danger" size="sm" @click="eliminar(data.item.ingrId)" title="Eliminar">
            <i class="fa fa-trash" aria-hidden="true" />
          </b-btn>
         
          <b-btn variant="secondary" size="sm" @click="crudSettings.showModal = !crudSettings.showModal" title="Modificar">
            <i class="fa fa-cog" aria-hidden="true" />
          </b-btn>
        </template>
      </b-table>
      
      <pagination
        :total-rows="listarIngredientes.length"
        v-model="currentPage"
        :per-page="perPage"
        :list-per-page="listPerPage"
        @per-page-chaged="perPage = $event"
      />
    </div>
    
    <b-modal v-model="crudSettings.showModal" :title="tituloFuncionalidad">
      <b-form-group label="ID">
        <b-input
          placeholder="ID del ingrediente"
          ref="ingrId"
          @keydown.native="validarCantidadCaracteres($event, payload.form.ingrId, 50)"
          v-model="payload.form.ingrId"
        />
      </b-form-group>

      <b-form-group label="Nombre">
        <b-input
          placeholder="Nombre del ingrediente"
          ref="ingrNombre"
          @keydown.native="validarCantidadCaracteres($event, payload.form.ingrNombre, 50)"
          v-model="payload.form.ingrNombre"
        />
      </b-form-group>
     
      <b-form-group label="Observaciones">
        <b-input
          v-model="payload.form.librNombre"
          placeholder="Observaciones"
          ref="ingrObservaciones"
          @keydown.native="validarCantidadCaracteres($event, payload.form.ingrObservaciones, 50)"
        />
      </b-form-group>

      <b-form-group label="Existente">
        <b-input
          v-model="payload.form.ingrExistentes"
          placeholder="Cantidad de Ingredientes"
          ref="ingrExistentes"
        />
      </b-form-group>

      <b-form-group label="Minimo">
        <b-input
          v-model="payload.form.ingrMinimo"
          placeholder="Minimo de Ingredientes"
          ref="ingrMinimo"
        />
      </b-form-group>
      <div slot="modal-footer">
        <b-btn class="float-right" variant="primary" @click="gestionar">{{ crudSettings.msgBtn }}</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { tableMixin } from '@/mixins/table-mixin'
import { crudMixin } from '@/mixins/crud-mixin'
import validarForm from '@/mixins/validarForm'
import Pagination from '@/components/pagination'
/* import _ from 'lodash' */

const FIELDS_INGREDIENTES = [
  { key: 'ingrId', label:'ID'},
  { key: 'ingrNombre', label: 'Nombre' },
  { key: 'ingrObservaciones', label: 'Observaciones' },
  { key: 'ingrExistentes', label: 'Existentes' },
  { key: 'ingrMinimo', label: 'Minimo' }
]

const PAYLOAD = {
  form: {
    ingrId: '',
    ingrNombre: '',
    ingrObservaciones: '',
    ingrExistentes: '',
    ingrMinimo:''
  },
  config: {
    ingrId:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'ID del libro'
    },
    ingrNombre: {
      type: 'String',
      required: true,
      limite: 50,
      msg: 'Nombre del ingrediente'
    },
    ingrObservaciones: {
      type: 'String',
      limite: 50,
      required: true,
      msg: 'Observaciones'
    },
    ingrExistentes:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'ingredientes'
    },
    ingrMinimo:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'ID del ingredientes'
    }
  }
}

export default {
  name: 'Ingredientes',
  components: {
    Pagination
  },
  mixins: [tableMixin, validarForm, crudMixin(PAYLOAD)],
  data: () => ({
    listarIngredientes: [],
    fields: FIELDS_INGREDIENTES,
    tituloFuncionalidad: 'Gestionar Ingredientes',
    payload: JSON.parse(JSON.stringify(PAYLOAD)),
    nombreSearch: ''
  }),
  created: function() {
    this.getIngredientesWs()
  },
  methods: {

    getIngredientesWs: async function() {
      try {
        this.listarIngredientes = (await this.$http.get('/api/ingrediente/list')).data
      } catch (error) {
        this.$toast(error.response.data)
        this.listarIngredientes = []
      }
    },
    gestionar: async function() {
      if (!this.validarCampos(this.payload)) {
        return
      }

      try {
        let resp = (await this.$http.post(
          '/api/libro/register',
          this.payload.form
        )).data
        this.$toast.success(resp.msg)
        await this.getLibrosWs()
        this.crudSettings.showModal = !this.crudSettings.showModal
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }
    },
    eliminar: async function(librId) {
      const answer = await this.$bvModal.msgBoxConfirm(
          "¿Desea eliminar el libro?",
          {
            title: "Eliminar libro",
            size: "sm",
            buttonSize: "sm",
            okVariant: "primary",
            okTitle: "SI",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          }
        )

        if(!answer) {
          return
        }

      try {
        let resp = (await this.$http.post('/api/libro/del', {
          librId: librId
        })).data
        this.$toast.success(resp.msg)
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }

      await this.getLibrosWs()
    },
    modificar: async function(librId){
      try {
        let resp = (await this.$http.post('/api/libro/mofi', {
          librId: librId
        })).data
      
        this.$toast.success(resp.msg)
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }

    }
  }
}
</script>

<style scoped>
</style>
