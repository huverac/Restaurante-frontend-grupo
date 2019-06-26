<template>
  <div>
    <h1 style="font-style:italic">Productos</h1>
    <br>
    <div>
      <b-tabs content-class="mt-7" align="center">
        <b-tab title="Lunes" active>
          <p>I'm the first tab</p>
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
                      <b-button v-b-modal.modalPopover variant="success">Ingredientes</b-button>

                      <b-modal id="modalPopover" title="Ingredientes" ok-only>
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
