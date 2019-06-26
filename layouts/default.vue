<template>
  <div>
    <b-container fluid>
      <div class="row" style="background-image: url('https://1.bp.blogspot.com/-nEvZKm-TUvs/XRK1B79fIlI/AAAAAAAAIzA/rF8TlAdlNbcPL7CeA6hUKUqUeDQcHdVXwCLcBGAs/s1600/Sin%2Bt%25C3%25ADtulo-1.png');">
        <article class="col-3 col-sm-3 col-md-3 col-lg-3">
          <br>
          <b-img src="https://1.bp.blogspot.com/-nk9NZNCJvzU/XRK18lZ4eKI/AAAAAAAAIzM/DtcaVcAxGK4mvS4Bjz9HPrILsvYKrHqhACLcBGAs/s1600/logo.png" width="200" height="150" align="left" />
        </article>
        <aside class="col-9 col-sm-9 col-md-9 col-lg-9">
          <br>
          <br>
          <mayor><strong>Fonda Antioqueña La Cantinita</strong></mayor>
          <center>
            <titulo> Bar Restaurante</titulo>
          </center>
          <br>
        </aside>
      </div>
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#" @click="$router.push('/')">Inicio</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#" @click="$router.push('/libro')">¿Quiénes somos?</b-nav-item>
            <b-nav-item href="#" @click="$router.push('/')">Reseña Historica</b-nav-item>
            <b-nav-item href="#Mision_Vision" @click="$router.push('/')">Misión y Visión</b-nav-item>
            <b-nav-item href="#Administrativo" @click="$router.push('/')">Directorio administrativo</b-nav-item>
            <b-nav-item href="#" @click="$router.push('/ingredientes')">Ingredientes</b-nav-item>
            <b-nav-item href="#" @click="$router.push('/productos')">Productos</b-nav-item>
            <b-nav-item href="#" @click="$router.push('/')">Promociones</b-nav-item>
            <b-nav-item href="#domicilios" @click="$router.push('/')">Domicilios</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content"><em>User</em></template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <br>
      <br>
      <center>
        <figure class="icon-cards mt-3">
          <div class="icon-cards__content">
            <div class="icon-cards__item d-flex align-items-center justify-content-center">
              <span class="h1">
                <img src="https://www.clikisalud.net/wp-content/uploads/2016/03/comida-r%C3%A1pida.jpg"
                     width="120%" height="120%"
                >
              </span>
            </div>
            <div class="icon-cards__item d-flex align-items-center justify-content-center">
              <span class="h1">
                <img src="https://ministerioreforma.com/2019/wp-content/uploads/2018/07/fast-food.jpg"
                     width="120%" height="120%"
                >
              </span>
            </div>
            <div class="icon-cards__item d-flex align-items-center justify-content-center">
              <span class="h1">
                <img src="https://previews.123rf.com/images/margouillat/margouillat1711/margouillat171100564/90112846-surtido-de-comida-r%C3%A1pida-comida-chatarra.jpg"
                     width="120%" height="120%"
                >
              </span>
            </div>
          </div>
        </figure>
      </center>
      <div class="mx-3 mt-3">
        <nuxt />
      </div>
    </b-container>
  </div>
</template>

<script>
export default {

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Homemade+Apple|Special+Elite&display=swap');
@import url('https://fonts.googleapis.com/css?family=Fredericka+the+Great|Homemade+Apple|Special+Elite&display=swap');
  titulo{
    font-family: 'Special Elite', cursive;
    font-family: 'Homemade Apple', cursive;
    font-size: 40px;
  }
  mayor{
    font-family: 'Special Elite', cursive;
    font-family: 'Homemade Apple', cursive;
    font-family: 'Fredericka the Great', cursive;
    font-size: 55px;
  }
 h1{

   font-style: italic;
   padding-top: 5%;
   padding-bottom : 5%;
}
</style>
<style>
	.icon-cards {
	position: relative;
	width: 60vw;
	height: 100vw;
	max-width: 380px;
	max-height: 250px;
	margin: 0;
	color: white;
	-webkit-perspective: 1000px;
  perspective: 1000px;
		}
	.icon-cards__content {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: translateZ(-30vw) rotateY(0);
  transform: translateZ(-30vw) rotateY(0);
  -webkit-animation: carousel 10s infinite cubic-bezier(0.77, 0, 0.175, 1) forwards;
  animation: carousel 10s infinite cubic-bezier(0.77, 0, 0.175, 1) forwards;
	}
	.icon-cards__content.step-animation {
	-webkit-animation: carousel 8s infinite steps(1) forwards;
	animation: carousel 8s infinite steps(1) forwards;
		}
	.icon-cards__item {
	position: absolute;
	top: 0;
	left: 0;
	width: 60vw;
	height: 40vw;
	max-width: 380px;
	max-height: 250px;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
	border-radius: 6px;
		}
		.icon-cards__item:nth-child(1) {
	background: ;
	-webkit-transform: rotateY(0) translateZ(35vw);
	transform: rotateY(0) translateZ(35vw);
		}
		.icon-cards__item:nth-child(2) {
	background: ;
	-webkit-transform: rotateY(120deg) translateZ(35vw);
	transform: rotateY(120deg) translateZ(35vw);
		}
	.icon-cards__item:nth-child(3) {
	background: ;
	-webkit-transform: rotateY(240deg) translateZ(35vw);
	transform: rotateY(240deg) translateZ(35vw);
		}
	@-webkit-keyframes carousel {
	0%,  17.5% {
	-webkit-transform: translateZ(-35vw) rotateY(0);
	transform: translateZ(-35vw) rotateY(0);
	}
	27.5%, 45% {
  -webkit-transform: translateZ(-35vw) rotateY(-120deg);
  transform: translateZ(-35vw) rotateY(-120deg);
  }
	55%, 72.5% {
	-webkit-transform: translateZ(-35vw) rotateY(-240deg);
	transform: translateZ(-35vw) rotateY(-240deg);
	}
	82.5%, 100% {
  -webkit-transform: translateZ(-35vw) rotateY(-360deg);
	transform: translateZ(-35vw) rotateY(-360deg);
	}
  }
	@keyframes carousel {
	0%,  17.5% {
	-webkit-transform: translateZ(-35vw) rotateY(0);
	transform: translateZ(-35vw) rotateY(0);
	}
	27.5%, 45% {
	-webkit-transform: translateZ(-35vw) rotateY(-120deg);
	transform: translateZ(-35vw) rotateY(-120deg);
	}
	55%, 72.5% {
 -webkit-transform: translateZ(-35vw) rotateY(-240deg);
	transform: translateZ(-35vw) rotateY(-240deg);
	}
	82.5%, 100% {
	-webkit-transform: translateZ(-35vw) rotateY(-360deg);
	transform: translateZ(-35vw) rotateY(-360deg);
	}
	}

	</style>
