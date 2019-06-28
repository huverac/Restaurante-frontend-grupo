<template>
  <div>
    <h2>{{ tituloFuncionalidad }}</h2>
    <hr>
    <div class="d-flex justify-content-end">
      <b-btn variant="primary" @click="crudSettings.showModal = !crudSettings.showModal">
        <i class="fa fa-plus" aria-hidden="true" /> Nuevo
      </b-btn>
    
      <b-btn variant="success" @click="getPedidosWs" style="margin-left:10px">
        <i class="fa fa-refresh" aria-hidden="true" /> Refrescar
      </b-btn>
      <b-btn variant="warning" @click="crudSettingsthig.showModal = !crudSettingsthig.showModal" style="margin-left:10px">
        <i class="fa fa-search" aria-hidden="true" /> Buscar
      </b-btn>
    </div>


    <b-modal v-model="crudSettingsthig.showModal" :title="tituloFuncionalidad">
      <b-form-group label="IdBuscar">
        <b-input
          placeholder="datoBusc del pedido"
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
      <b-alert show variant="primary" v-if="listarPedidos.length <= 0">No hay registros</b-alert>
      <b-table
        responsive
        striped
        v-else
        :fields="fields"
        stacked="md"
        :per-page="perPage"
        :current-page="currentPage"
        :items="listarPedidos"
      >
        <template slot="acciones" slot-scope="data">
          <b-btn variant="danger" size="lg" @click="eliminar(data.item.pedId)" title="Eliminar">
            <i class="fa fa-trash" aria-hidden="true" />
          </b-btn>
        </template>
      </b-table>
      
      <pagination
        :total-rows="listarPedidos.length"
        v-model="currentPage"
        :per-page="perPage"
        :list-per-page="listPerPage"
        @per-page-chaged="perPage = $event"
      />
    </div>

    <b-modal v-model="crudSettings.showModal" :title="tituloFuncionalidad">
      <b-form-group label="ID Persona">
        <b-input
          placeholder="ID del Persona"
          ref="persId"
          @keydown.native="validarCantidadCaracteres($event, payload.form.persId, 50)"
          v-model="payload.form.persId"
        />
      </b-form-group>

      <b-form-group label="ID Pedido">
        <b-input
          placeholder="ID del Pedido"
          ref="pedId"
          @keydown.native="validarCantidadCaracteres($event, payload.form.pedId, 50)"
          v-model="payload.form.pedId"
        />
      </b-form-group>

      <b-form-group label="Valor">
        <b-input
          placeholder="valor del Pedido"
          ref="pedValor"
          @keydown.native="validarCantidadCaracteres($event, payload.form.pedValor, 50)"
          v-model="payload.form.pedValor"
        />
      </b-form-group>

      <b-form-group label="Descuento">
        <b-input
          placeholder="valor del descuento"
          ref="pedDescuento"
          @keydown.native="validarCantidadCaracteres($event, payload.form.pedDescuento, 50)"
          v-model="payload.form.pedDescuento"
        />
      </b-form-group>

      <b-form-group label="ID Vendedor">
        <b-input
          placeholder="ID del vendedor"
          ref="idVendedor"
          @keydown.native="validarCantidadCaracteres($event, payload.form.idVendedor, 50)"
          v-model="payload.form.idVendedor"
        />
      </b-form-group>

      <b-form-group label="Estado">
        <b-form-select v-model="payload.form.pedEstado" class="mb-3">
          <option :value="null" disabled>Please select an option</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Cancelado">Cancelado</option>
        </b-form-select>
      </b-form-group>

      <b-form-group label="ID mesa">
        <b-input
          placeholder="ID del mesa"
          ref="mesaId"
          @keydown.native="validarCantidadCaracteres($event, payload.form.mesaId, 50)"
          v-model="payload.form.mesaId"
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

const FIELDS_PEDIDOS = [
  { key: 'persId', label:'ID persona'},
  { key: 'pedId', label: 'ID pedido' },
  { key: 'pedFecha', label: 'Fecha' },
  { key: 'pedValor', label: 'Valor' },
  { key: 'pedDescuento', label: 'Descuento' },
  { key: 'idVendedor', label: 'ID vendedor' },
  { key: 'pedEstado', label: 'Estado' },
  { key: 'mesaId', label: 'mesa' },
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
      msg:'ID del pedido'
    }
   }
  }
const PAYLOAD = {
  form: {
    persId: '',
    pedId: '',
    pedFecha: '',
    pedValor: '',
    pedDescuento: '',
    idVendedor: '',
    pedEstado: '',
    mesaId: ''
  },
  config: {
    persId:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'ID de persona'
    },
    pedId: {
      type: 'String',
      required: true,
      limite: 50,
      msg: 'ID de pedido'
    },
    pedFecha: {
      type: 'Date',
      limite: 50,
      required: false,
      msg: 'Fecha'
    },
    pedValor:{
      type:'float',
      required:true,
      limite:50,
      msg:'Valor'
    },
    pedDescuento:{
      type:'float',
      required:true,
      limite:50,
      msg:'Descuento'
    },
    idVendedor:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'Id vendedor'
    },
    pedEstado:{
      type:'String',
      required:true,
      limite:50,
      msg:'estado'
    },
    mesaId:{
      type:'Integer',
      required:true,
      limite:50,
      msg:'ID mesa'
    }
  }
}

export default {

    name: 'Pedidos',
    components: {
    Pagination
  },
  mixins: [tableMixin, validarForm, crudMixin(PAYLOAD), crudModal(PAYLOAD2)],
  data: () => ({
    listarPedidos: [],
    fields: FIELDS_PEDIDOS,
    tituloFuncionalidad: 'Gestionar Pedidos',
    payload: JSON.parse(JSON.stringify(PAYLOAD)),
    payload2: JSON.parse(JSON.stringify(PAYLOAD2)),
    nombreSearch: '',
  }),

  created: function() {
    this.getPedidosWs()
  },
  methods: {

    getPedidosWs: async function() {
      try {
        this.listarPedidos = (await this.$http.get('/api/pedido/list')).data
      } catch (error) {
        this.$toast(error.response.data)
        this.listarPedidos = []
      }
    },

    gestionar: async function() {
      if (!this.validarCampos(this.payload)) {
        return
      }

      try {
        let resp = (await this.$http.post(
          '/api/pedido/register',
          this.payload.form
        )).data
        this.$toast.success(resp.msg)
        await this.getPedidosWs()
        this.crudSettings.showModal = !this.crudSettings.showModal
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }
    },

    eliminar: async function(pedId) {
      const answer = await this.$bvModal.msgBoxConfirm(
          "¿Desea eliminar el pedido?",
          {
            title: "Eliminar pedido",
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
        let resp = (await this.$http.post('/api/pedido/del', {
          pedId:pedId
        })).data
        this.$toast.success(resp.msg)
      } catch (error) {
        this.$toast.error(error.response.data.error)
      }

     this.getPedidosWs()
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
    buscar:async function(){
     if(!this.validarCampos(this.payload2)){
        return
      }
        try {
       
        this.listarPedidos=[]
        this.listarPedidos=(await this.$http.post('/api/pedido/consultar',
        {pedId:this.payload2.form.datoBusc}
        )).data

        this.crudSettingsthig.showModal= !this.crudSettingsthig.showModal
 
      } catch (error) {
        console.log("esta entrando por un errror")
        this.$toast.error(error.response.data.error)
        this.listarPedidos=[]
      }
    }
    
}
}
</script>

<style scoped>
</style>
