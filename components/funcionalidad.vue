<template>
  <div>
    <h2>{{ tituloFuncionalidad }}</h2>
    <hr>
    <div class="d-flex justify-content-end">
      <b-btn variant="primary" @click="crudSettings.showModal = !crudSettings.showModal">
        <i class="fa fa-plus" aria-hidden="true" /> Nuevo
      </b-btn>
    
      <b-btn variant="success" @click="getFuncionalidadWs" style="margin-left:10px">
        <i class="fa fa-refresh" aria-hidden="true" /> Refrescar
      </b-btn>
      <b-btn variant="warning" @click="crudSettingsthig.showModal = !crudSettingsthig.showModal" style="margin-left:10px">
        <i class="fa fa-search" aria-hidden="true" /> Buscar
      </b-btn>
    </div>
    
    <b-modal v-model="crudSettingsthig.showModal" :title="tituloFuncionalidad">
      <b-form-group label="IdBuscar">
        <b-input
          placeholder="datoBusc de la funcionalidad"
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
      <b-alert show variant="primary" v-if="listarFuncionalidad.length <= 0">No hay registros</b-alert>
      <b-table
        responsive
        striped
        v-else
        :fields="fields"
        stacked="md"
        :per-page="perPage"
        :current-page="currentPage"
        :items="listarFuncionalidad"
      >
        <template slot="acciones" slot-scope="data">
          <b-btn variant="danger" size="lg" @click="eliminar(data.item.funcId)" title="Eliminar">
            <i class="fa fa-trash" aria-hidden="true" />
          </b-btn>
          <b-btn variant="primary" size="lg" @click="consultar_modal(data.item.funcId)" title="Modificar">
            <i class="fa fa-pencil-square-o" aria-hidden="true" />
          </b-btn>
        </template>
      </b-table>
      
      <pagination
        :total-rows="listarFuncionalidad.length"
        v-model="currentPage"
        :per-page="perPage"
        :list-per-page="listPerPage"
        @per-page-chaged="perPage = $event"
      />
    </div>
    
    <b-modal v-model="crudSettings.showModal" :title="tituloFuncionalidad">
      <b-form-group label="ID">
        <b-input
          placeholder="ID Funcionalidad"
          ref="funcId"
          @keydown.native="validarCantidadCaracteres($event, payload.form.funcId, 50)"
          v-model="payload.form.funcId"
        />
      </b-form-group>

      <b-form-group label="Nombre">
        <b-input
          placeholder="Nombre de la Funcionalidad"
          ref="funcNombre"
          @keydown.native="validarCantidadCaracteres($event, payload.form.funcNombre, 50)"
          v-model="payload.form.funcNombre"
        />
      </b-form-group>
     
      <b-form-group label="Descripcion">
        <b-input
          placeholder="Descripcion de Funcionalidad"
          ref="funcDesc"
          @keydown.native="validarCantidadCaracteres($event, payload.form.funcDesc, 50)"
          v-model="payload.form.funcDesc"
        />
      </b-form-group>

      <b-form-group label="Icono">
        <b-input
          placeholder="Icono Funcionalidad"
          ref="funcIcn"
          @keydown.native="validarCantidadCaracteres($event, payload.form.funcIcn,50)"
          v-model="payload.form.funcIcn"
        />
      </b-form-group>

      <b-form-group label="URL">
        <b-input
          placeholder="URL Funcionalidad"
          ref="funcUrl"
          @keydown.native="validarCantidadCaracteres($event, payload.form.funcUrl,50)"
          v-model="payload.form.funcUrl"
        />
      </b-form-group>

      <b-form-group label="Orden">
        <b-input
          placeholder="Orden de Funcionalidad"
          ref="funcOrdn"
          @keydown.native="validarCantidadCaracteres($event, payload.form.funcOrdn,50)"
          v-model="payload.form.funcOrdn"
        />
      </b-form-group>

      <b-form-group label="Tipo">
        <b-input
          placeholder="Tipo de Funcionalidad"
          ref="funcTp"
          @keydown.native="validarCantidadCaracteres($event, payload.form.funcTp,50)"
          v-model="payload.form.funcTp"
        />
      </b-form-group>

      <b-form-group label="Padre">
        <b-input
          placeholder="Funcionalidad Padre"
          ref="funcPa"
          @keydown.native="validarCantidadCaracteres($event, payload.form.funcPa,50)"
          v-model="payload.form.funcPa"
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

const FIELDS_FUNCIONALIDAD = [
  { key: 'funcId', label:'ID'},
  { key: 'funcNombre', label: 'Nombre' },
  { key: 'funcDesc', label: 'Descripcion' },
  { key: 'funcIcn', label: 'Icono' },
  { key: 'funcUrl', label: 'URL' },
  { key: 'funcOrdn', label: 'Orden' },
  { key: 'funcTp', label: 'Tipo' } ,
  { key: 'funcPa', label: 'Padre' } ,
  { key: 'acciones', label: 'Acciones' } 
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
      msg:'ID de la Funcionalidad'
    }
   }
  }
const PAYLOAD = {
  form: {
    funcId: '',
    funcNombre: '',
    funcDesc: '',
    funcIcn: '',
    funcUrl:'',
    funcOrdn:'',
    funcTp:''

  },
  config: {
    funcId:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'ID de Funcionalidad'
    },
    funcNombre: {
      type: 'String',
      required: true,
      limite: 50,
      msg: 'Nombre de Funcionalidad'
    },
    funcDesc: {
      type: 'String',
      limite: 50,
      required: true,
      msg: 'Descripcion'
    },
    funcIcn:{
      type:'String',
      required:true,
      limite:50,
      msg:'Icono de Funcionalidad'
    },
    funcUrl:{
      type:'String',
      required:true,
      limite:50,
      msg:'Url'
    },
    funcOrdn:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'Orden'
    },
    funcTp:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'Tipo de Funcionalidad'
    }, 
    funcPa:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'Funcionalidad Padre'
    }
  }
}

export default {
  name: 'Funcionalidad',
  components: {
    Pagination
  },
  mixins: [tableMixin, validarForm, crudMixin(PAYLOAD), crudModal(PAYLOAD2)],
  data: () => ({
    listarFuncionalidad: [],
    fields: FIELDS_FUNCIONALIDAD,
    tituloFuncionalidad: 'Gestionar Funcionalidad',
    payload: JSON.parse(JSON.stringify(PAYLOAD)),
    payload2: JSON.parse(JSON.stringify(PAYLOAD2)),
    nombreSearch: '',
  }),
  created: function() {
    this.getFuncionalidadWs()
  },
  methods: {

    getFuncionalidadWs: async function() {
      try {
        this.listarFuncionalidad = (await this.$http.get('/api/funcionalidad/list')).data
      } catch (error) {
        this.$toast(error.response.data)
        this.listarFuncionalidad = []
      }
    },
    gestionar: async function() {
      if (!this.validarCampos(this.payload)) {
        return
      }

      try {
        let resp = (await this.$http.post(
          '/api/funcionalidad/register',
          this.payload.form
        )).data
        this.$toast.success(resp.msg)
        await this.getFuncionalidadWs()
        this.crudSettings.showModal = !this.crudSettings.showModal
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }
    },
    eliminar: async function(funcId) {
      const answer = await this.$bvModal.msgBoxConfirm(
          "¿Desea eliminar la funcionalidad?",
          {
            title: "Eliminar funcionalidad",
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
        let resp = (await this.$http.post('/api/funcionalidad/del', {
          funcId:funcId
        })).data
        this.$toast.success(resp.msg)
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }

      await this.getFuncionalidadWs()
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
        let resp = (await this.$http.post('/api/funcionalidad/update',this.payload.form)).data
        this.$toast.success(resp.msg)
        this.crudSettings.showModal = !this.crudSettings.showModal
        await this.getFuncionalidadWs()

      } catch (error) {
        this.$toast.error(error.response.data.error)
      }

    },
    consultar_modal:async function(funcId){
      try {
        let funcionalidad=[]
        funcionalidad=(await this.$http.post('/api/funcionalidad/consultar',
        {funcId:funcId}
        )).data
        console.log(funcionalidad[0].funcDesc)
        this.payload.form.funcId=funcionalidad[0].funcId,
        this.payload.form.funcNombre=funcionalidad[0].funcNombre,
        this.payload.form.funcDesc=funcionalidad[0].funcDesc,
        this.payload.form.funcIcn=funcionalidad[0].funcIcn,
        this.payload.form.funcUrl=funcionalidad[0].funcUrl,
        this.payload.form.funcOrdn=funcionalidad[0].funcOrdn,
        this.payload.form.funcTp=funcionalidad[0].funcTp
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
       
        this.listarFuncionalidad=[]
        this.listarFuncionalidad=(await this.$http.post('/api/funcionalidad/consultar',
        {funcId:this.payload2.form.datoBusc}
        )).data

        this.crudSettingsthig.showModal= !this.crudSettingsthig.showModal
 
      } catch (error) {
        this.$toast.error(error.response.data.error)
        this.listarFuncionalidad=[]
      }


    }
  }
}
</script>

<style scoped>
</style>