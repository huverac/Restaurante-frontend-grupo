<template>
  <div>
    <h2>{{ tituloFuncionalidad }}</h2>
    <hr>
    <div class="d-flex justify-content-end">
      <b-btn variant="primary" @click="crudSettings.showModal = !crudSettings.showModal">
        <i class="fa fa-plus" aria-hidden="true" /> Nuevo
      </b-btn>
    
      <b-btn variant="success" @click="getIngredientesWs" style="margin-left:10px">
        <i class="fa fa-refresh" aria-hidden="true" /> Refrescar
      </b-btn>
      <b-btn variant="warning" @click="crudSettingsthig.showModal = !crudSettingsthig.showModal" style="margin-left:10px">
        <i class="fa fa-search" aria-hidden="true" /> Buscar
      </b-btn>
    </div>
    
    <b-modal v-model="crudSettingsthig.showModal" :title="tituloFuncionalidad">
      <b-form-group label="IdBuscar">
        <b-input
          placeholder="datoBusc del ingrediente"
          ref="datoBusc"
          v-model="payload2.form.datoBusc"
          @keydown.native="validarCantidadCaracteres($event, payload2.form.datoBusc, 50)"
        />
      </b-form-group>
      <div slot="modal-footer">
        <b-btn class="float-right" variant="primary" @click="buscar">{{ crudSettingsthig.msgBtn }}</b-btn>
      </div>
    </b-modal>


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
          <b-btn variant="danger" size="lg" @click="eliminar(data.item.ingrId)" title="Eliminar">
            <i class="fa fa-trash" aria-hidden="true" />
          </b-btn>
          <b-btn variant="primary" size="lg" @click="consultar_modal(data.item.ingrId)" title="Modificar">
            <i class="fa fa-pencil-square-o" aria-hidden="true" />
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
          v-model="payload.form.ingrObservaciones"
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
        <b-btn class="float-right" variant="primary" @click="verificar">{{ crudSettings.msgBtn }}</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { tableMixin } from '@/mixins/table-mixin'
import { crudMixin } from '@/mixins/crud-mixin'
import { crudModal } from '@/mixins/crud-mixin2'
import validarForm from '@/mixins/validarForm'
import Pagination from '@/components/pagination'
/* import _ from 'lodash' */

const FIELDS_INGREDIENTES = [
  { key: 'ingrId', label:'ID'},
  { key: 'ingrNombre', label: 'Nombre' },
  { key: 'ingrObservaciones', label: 'Observaciones' },
  { key: 'ingrExistentes', label: 'Existentes' },
  { key: 'ingrMinimo', label: 'Minimo' },
  { key: 'acciones', label: 'Accciones' } 
]
  

const PAYLOAD2 = {
  form: {
     datoBusc: ''
 
  },
  config: {
    datoBusc:{
      type:'String',
      required:true,
      limite:50,
      msg:'ID del ingrediente'
    }
   }
  }
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
      msg:'ID del ingrediente'
    },
    ingrNombre: {
      type: 'String',
      required: true,
      limite: 50,
      msg: 'Nombre del ingredientes'
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
      msg:'Existentes '
    },
    ingrMinimo:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'Minimo '
    }
  }
}

export default {
  name: 'Ingredientes',
  components: {
    Pagination
  },
  mixins: [tableMixin, validarForm, crudMixin(PAYLOAD), crudModal(PAYLOAD2)],
  data: () => ({
    listarIngredientes: [],
    fields: FIELDS_INGREDIENTES,
    tituloFuncionalidad: 'Gestionar Ingredientes',
    payload: JSON.parse(JSON.stringify(PAYLOAD)),
    payload2: JSON.parse(JSON.stringify(PAYLOAD2)),
    nombreSearch: '',
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
          '/api/ingrediente/register',
          this.payload.form
        )).data
        this.$toast.success(resp.msg)
        await this.getIngredientesWs()
        this.crudSettings.showModal = !this.crudSettings.showModal
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }
    },
    eliminar: async function(ingrId) {
      const answer = await this.$bvModal.msgBoxConfirm(
          "¿Desea eliminar el ingrediente?",
          {
            title: "Eliminar ingrediente",
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
        let resp = (await this.$http.post('/api/ingrediente/del', {
          ingrId:ingrId
        })).data
        this.$toast.success(resp.msg)
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }

      await this.getIngredientesWs()
    },
    verificar:async function(){
     
      try {
        let boton=this.crudSettings.msgBtn+''
        if(boton=='Registrar'){
          this.gestionar()

        }

        if(boton=='Guardar Cambios'){
           if(!this.validarCampos(this.payload)){
          return
         }
          this.modificar()

        }
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }
    },
    modificar: async function(){
      try {
        let resp = (await this.$http.post('/api/ingrediente/update',this.payload.form)).data
        this.$toast.success(resp.msg)
        this.crudSettings.showModal = !this.crudSettings.showModal
        await this.getIngredientesWs()

      } catch (error) {
        this.$toast.error(error.response.data.error)
      }

    },
    consultar_modal:async function(ingrId){
      try {
        let ingredientes=[]
        ingredientes=(await this.$http.post('/api/ingrediente/consultar',
        {ingrId:ingrId}
        )).data
        console.log(ingredientes[0].ingrObservaciones)
        this.payload.form.ingrId=ingredientes[0].ingrId,
        this.payload.form.ingrNombre=ingredientes[0].ingrNombre,
        this.payload.form.ingrObservaciones=ingredientes[0].ingrObservaciones,
        this.payload.form.ingrExistentes=ingredientes[0].ingrExistentes,
        this.payload.form.ingrMinimo=ingredientes[0].ingrMinimo
        this.sendModificar(this.payload.form)

      } catch (error) {
                this.$toast.error(error.response.data.error)

      }
    },
    buscar:async function(){
     if(!this.validarCampos(this.payload2)){
        return
      }
        try {
       
        this.listarIngredientes=[]
        this.listarIngredientes=(await this.$http.post('/api/ingrediente/consultar',
        {ingrId:this.payload2.form.datoBusc}
        )).data

        this.crudSettingsthig.showModal= !this.crudSettingsthig.showModal
 
      } catch (error) {
        this.$toast.error(error.response.data.error)
        this.listarIngredientes=[]
      }


    }
  }
}
</script>

<style scoped>
</style>
