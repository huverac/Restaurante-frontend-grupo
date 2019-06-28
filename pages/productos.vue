<template>
  <div>
    <h1 style="font-style:italic">Productos</h1>
    <p class="text-justify">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem nesciunt vel cum, totam harum repellendus, dolorum quam assumenda modi consectetur labore ducimus vero ratione velit quo. Commodi officiis excepturi minus?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempore minus? Quia alias doloribus, explicabo mollitia similique ab, voluptatum error voluptatem qui, quis eos quisquam voluptate odio praesentium deleniti architecto.
    </p>
    <br>
    <br>
    <div>
      <b-tabs content-class="mt-7" align="center">
        <b-tab title="Lunes" active>
          <div>
            <b-card no-body>
              <b-tabs pills card vertical>
                <b-tab title="Desayunos" active>
                  <b-card-text>Tab Contents 1</b-card-text>
                  <div class="row">
                    <section class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <b-img src="https://www.elmejornido.com/sites/default/files/146352lrg.jpg" alt="" />
                    </section>
                    <section class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <h2>Waffles de Café con Leche</h2>
                      <p>
                        Los sabores de tu café favorito de la mañana en un waffle casera fácil y deliciosa.
                      </p>
                      <br>
                      <br>
                      <div>
                        <b-button v-b-modal.modal-1 variant="success">Ingredientes</b-button>

                        <b-modal id="modal-1" title="Ingredientes" ok-only>
                          <p>WAFFLES</p>
                          <hr>
                          <ul>
                            <li>1/2 tazas de harina para todo uso</li>
                            <li>1/4 taza de azúcar granulado</li>
                            <li>2 cucharaditas de polvo para hornear</li>
                            <li>1/2 cucharadita de bicarbonato de soda</li>
                            <li>1/2 cucharadita de sal kosher</li>
                            <li>2 huevos grandes</li>
                            <li>1/4 tazas de suero de leche</li>
                            <li>1/4 taza (1/2 barra) de mantequilla sin sal, derretida</li>
                            <li>3 cucharadas de Café Puro Soluble NESCAFÉ CLÁSICO</li>
                            <li> 2 cucharaditas de extracto de vainilla</li>
                          </ul>
                          <br>
                          <p>CREMA BATIDA DE MAPLE</p>
                          <hr>
                          <ul>
                            <li>1/2 taza de crema para batir</li>
                            <li>1 cucharadita de almíbar de maple</li>
                            <li>1/8 cucharadita de sal kosher</li>
                            <li>Bayas y almíbar de maple puro, para servir</li>
                          </ul>
                        </b-modal>
                      </div>
                    </section>
                  </div>
                  <br>
                  <div class="row">
                    <section class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <b-img src="https://www.elmejornido.com/sites/default/files/145675lrg.jpg" />
                    </section>
                    <section class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <h2>
                        Sandwichitos de Fresa
                      </h2>
                      <br>
                      <p>
                        Celebra los frescos sabores de primavera con estos delicados mini sandwiches. 
                      </p>
                      <br>
                      <br>
                      <b-button v-b-modal.modal2 variant="success">Ingredientes</b-button>
                      <b-modal id="modal2" title="Ingredientes" ok-only>
                        <ul>
                          <li>
                            1 paquete (8 onzas) de queso crema
                          </li>
                          <li>
                            1/3 taza de Polvo de Sabor Fresa
                          </li>
                          <li>
                            1/4 cucharadita de cascara de naranja rallada (opcional)
                          </li>
                          <li>
                            16 tajadas delgadas de pan de trigo o blanco
                          </li>
                          <li>
                            1 taza de fresas frescas, cortadas en tajadas
                          </li>
                        </ul>
                      </b-modal>
                    </section>
                  </div>
                  <br>
                  <div class="row">
                    <section class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <b-img src="https://www.elmejornido.com/sites/default/files/146868lrg.jpg" />
                    </section>
                    <section class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <h2>
                        Tazón de Batido de Moras
                      </h2>
                      <br>
                      <p>
                        Celebra los frescos sabores de primavera con estos delicados mini sandwiches. 
                      </p>
                      <br>
                      <b-button v-b-modal.modal3 variant="success">Ingredientes</b-button>
                      <b-modal id="modal3" title="Ingredientes" ok-only>
                        <ul>
                          <li>1 taza de yogur de vainilla bajo en grasa</li>
                          <li>2 cucharadas de Polvo de Sabor a Fresa NESQUIK de NESTLÉ</li>
                          <li>4 fresas, cortadas por la mitad</li>
                          <li>1/4 taza de arándanos</li>
                          <li>1/4 de plátano, cortado en tajadas</li>
                          <li>1/4 taza de granola baja en grasa</li>
                        </ul>
                      </b-modal>
                    </section>
                  </div>
                </b-tab>
                <b-tab title="Alumuerzos"><b-card-text>Tab Contents 2</b-card-text></b-tab>
                <b-tab title="Cenas"><b-card-text>Tab Contents 3</b-card-text></b-tab>
              </b-tabs>
            </b-card>
          </div>
        </b-tab>
        <b-tab title="Martes"><p>I'm the second tab</p></b-tab>
        <b-tab title="Miércoles"><p>I'm a disabled tab!</p></b-tab>
        <b-tab title="Jueves"><p>I'm a disabled tab!</p></b-tab>
        <b-tab title="Viernes"><p>I'm a disabled tab!</p></b-tab>
        <b-tab title="Sábado"><p>I'm a disabled tab!</p></b-tab>
        <b-tab title="Domingo"><p>I'm a disabled tab!</p></b-tab>
      </b-tabs>
      <br>
      <br>
      <br>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus laudantium nemo accusamus aliquam voluptatum! Beatae, accusamus a, asperiores excepturi vitae eius id cum aperiam omnis delectus quis rerum explicabo eos.</p>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>
