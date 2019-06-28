<template>
  <div>
    <h2>{{ tituloFuncionalidad }}</h2>
    <hr>
    <div class="d-flex justify-content-end">
      <b-btn variant="primary" @click="crudSettings.showModal = !crudSettings.showModal">
        <i class="fa fa-plus" aria-hidden="true" /> Nuevo
      </b-btn>
    
      <b-btn variant="success" @click="getPersonasWs" style="margin-left:10px">
        <i class="fa fa-refresh" aria-hidden="true" /> Refrescar
      </b-btn>
      <b-btn variant="warning" @click="crudSettingsthig.showModal = !crudSettingsthig.showModal" style="margin-left:10px">
        <i class="fa fa-search" aria-hidden="true" /> Buscar
      </b-btn>
    </div>
    
    <b-modal v-model="crudSettingsthig.showModal" :title="tituloFuncionalidad">
      <b-form-group label="CedulaBuscar">
        <b-input
          placeholder="Ingrese la cedula para buscar"
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
      <b-alert show variant="primary" v-if="listarPersonas.length <= 0">No hay registros</b-alert>
      <b-table
        responsive
        striped
        v-else
        :fields="fields"
        stacked="md"
        :per-page="perPage"
        :current-page="currentPage"
        :items="listarPersonas"
      >
        <template slot="acciones" slot-scope="data">
          <b-btn variant="danger" size="lg" @click="eliminar(data.item.ingrCedula)" title="Eliminar">
            <i class="fa fa-trash" aria-hidden="true" />
          </b-btn>
          <b-btn variant="primary" size="lg" @click="consultar_modal(data.item.ingrCedula)" title="Modificar">
            <i class="fa fa-pencil-square-o" aria-hidden="true" />
          </b-btn>
        </template>
      </b-table>
      
      <pagination
        :total-rows="listarPersonas.length"
        v-model="currentPage"
        :per-page="perPage"
        :list-per-page="listPerPage"
        @per-page-chaged="perPage = $event"
      />
    </div>
    
    <b-modal v-model="crudSettings.showModal" :title="tituloFuncionalidad">
      <b-form-group label="ID">
        <b-input
          placeholder="ID de la Persona"
          ref="ingrId"
          @keydown.native="validarCantidadCaracteres($event, payload.form.ingrId, 50)"
          v-model="payload.form.ingrId"
        />
      </b-form-group>

      <b-form-group label="Cedula">
        <b-input
          placeholder="Ingrese cedula"
          ref="ingrCedula"
          @keydown.native="validarCantidadCaracteres($event, payload.form.ingrCedula, 50)"
          v-model="payload.form.ingrCedula"
        />
      </b-form-group>
     
      <b-form-group label="Nombres">
        <b-input
          v-model="payload.form.ingrNombre"
          placeholder="Ingrese Nombres"
          ref="ingrNombre"
          @keydown.native="validarCantidadCaracteres($event, payload.form.ingrNombre, 50)"
        />
      </b-form-group>

      <b-form-group label="Apellidos">
        <b-input
          v-model="payload.form.ingrApellido"
          placeholder="Ingrese Apellidos"
          ref="ingrApellido"
          @keydown.native="validarCantidadCaracteres($event, payload.form.ingrApellido, 50)"
        />
      </b-form-group>

      <b-form-group label="Direccion">
        <b-input
          v-model="payload.form.ingrDireccion"
          placeholder="Ingrese la Direccion"
          ref="ingrDireccion"
          @keydown.native="validarCantidadCaracteres($event, payload.form.ingrDireccion, 50)"
        />
      </b-form-group>
      <b-form-group label="Telefono">
        <b-input
          v-model="payload.form.ingrTelefono"
          placeholder="Ingrese la Telefono"
          ref="ingrTelefono"
          @keydown.native="validarCantidadCaracteres($event, payload.form.ingrTelefono, 50)"
        />
      </b-form-group>
      <b-form-group label="Email">
        <b-input
          v-model="payload.form.ingrEmail"
          placeholder="Ingrese la Direccion Email"
          ref="ingrEmail"
          @keydown.native="validarCantidadCaracteres($event, payload.form.ingrEmail, 50)"
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

const FIELDS_PERSONAS = [
  { key: 'ingrId', label:'ID'},
  { key: 'ingrCedula', label:'Cedula'},
  { key: 'ingrNombre', label: 'Nombres' },
  { key: 'ingrApellido', label: 'Apellidos' },
  { key: 'ingrDireccion', label: 'Direccion' },
  { key: 'ingrTelefono', label: 'Telefono' },
  { key: 'ingrEmail', label: 'Email' },
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
      msg:'ID de la persona'
    }
   }
  }
const PAYLOAD = {
  form: {
    ingrId: '',
    ingrCedula: '',
    ingrNombre: '',
    ingrApellido: '',
    ingrDireccion: '',
    ingrTelefono: '',
    ingrEmail: ''
  },
  config: {
    ingrId:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'ID de la persona'
    },
    ingrNombre: {
      type: 'String',
      required: true,
      limite: 50,
      msg: 'Nombre de la persona'
    },
    ingrApellido: {
      type: 'String',
      limite: 50,
      required: true,
      msg: 'Apellido de la persona'
    },
    ingrDireccion:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'Direccion de la persona'
    },
    ingrTelefono:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'Telefono de la persona'
    },
    ingrEmail:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'Email de la persona'
    }
  }
}

export default {
  name: 'Personas',
  components: {
    Pagination
  },
  mixins: [tableMixin, validarForm, crudMixin(PAYLOAD), crudModal(PAYLOAD2)],
  data: () => ({
    listarPersonas: [],
    fields: FIELDS_PERSONAS,
    tituloFuncionalidad: 'Gestionar Personas',
    payload: JSON.parse(JSON.stringify(PAYLOAD)),
    payload2: JSON.parse(JSON.stringify(PAYLOAD2)),
    nombreSearch: '',
  }),
  created: function() {
    this.getPersonasWs()
  },
  methods: {

    getPersonasWs: async function() {
      try {
        this.listarPersonas = (await this.$http.get('/api/persona/list')).data
      } catch (error) {
        this.$toast(error.response.data)
        this.listarPersonas = []
      }
    },
    gestionar: async function() {
      if (!this.validarCampos(this.payload)) {
        return
      }

      try {
        let resp = (await this.$http.post(
          '/api/persona/register',
          this.payload.form
        )).data
        this.$toast.success(resp.msg)
        await this.getPersonasWs()
        this.crudSettings.showModal = !this.crudSettings.showModal
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }
    },
    eliminar: async function(ingrId) {
      const answer = await this.$bvModal.msgBoxConfirm(
          "øDesea eliminar la Persona?",
          {
            title: "Eliminar persona",
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
        let resp = (await this.$http.post('/api/persona/del', {
          ingrCedula:ingrId
        })).data
        this.$toast.success(resp.msg)
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }

      this.getPersonasWs()
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
        let resp = (await this.$http.post('/api/persona/update',this.payload.form)).data
        this.$toast.success(resp.msg)
        this.crudSettings.showModal = !this.crudSettings.showModal
        await this.getPersonasWs()

      } catch (error) {
        this.$toast.error(error.response.data.error)
      }

    },
    consultar_modal:async function(ingrCedular){
      console.log(ingrCedular)
      try {
        let personas=[]
        personas=(await this.$http.post('/api/persona/consultar',
        {ingrCedula:ingrCedular}
        )).data
        console.log('entro aqui')
        this.payload.form.ingrId=personas[0].ingrId,
        this.payload.form.ingrCedula=personas[0].ingrCedula,
        this.payload.form.ingrNombre=personas[0].ingrNombre,
        this.payload.form.ingrApellido=personas[0].ingrApellido,
        this.payload.form.ingrDireccion=personas[0].ingrDireccion,
        this.payload.form.ingrTelefono=personas[0].ingrTelefono,
        this.payload.form.ingrEmail=personas[0].ingrEmail,
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
       
        this.listarPersonas=[]
        this.listarPersonas=(await this.$http.post('/api/persona/consultar',
        {ingrCedula:this.payload2.form.datoBusc}
        )).data

        this.crudSettingsthig.showModal= !this.crudSettingsthig.showModal
 
      } catch (error) {
        this.$toast.error(error.response.data.error)
        this.listarPersonas=[]
      }


    }
  }
}
</script>

<style scoped>
</style>