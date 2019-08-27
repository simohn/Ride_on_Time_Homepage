<template>
    <div>
        <b-jumbotron header="Servus, Rider!" lead="Hier findest du alle Infos, Ergebnisse und Parks rund um Ride on Time">
            <b-button variant="info" href="#">Wie funktionierts?</b-button>
        </b-jumbotron>

        <b-container id="parkcontainer">
            <b-card-group deck>
                <b-card bg-variant="light" :img-src="require('../assets/koenigsberg.jpg')" img-alt="Card image" title="Königsberg" img-bottom>
                    <b-card-text>
                        <strong>#Aushängeschild</strong> Hier gehts zu den Infos und Zeiten vom wahrscheinlich urigsten Park in Österreich.
                    </b-card-text>
                     <b-button href="#" variant="outline-info">Mehr Infos</b-button>
                </b-card>

                <b-card bg-variant="light" :img-src="require('../assets/forsteralm.jpeg')" img-alt="Card image" img-bottom title="Forsteralm">
                    <b-card-text>
                        In Kürze wird es auch auf der Forsteralm einen Park geben.
                    </b-card-text>
                    <b-button href="#" variant="outline-info">Mehr Infos</b-button>
                </b-card>

                <b-card bg-variant="light" :img-src="require('../assets/saalbach.jpeg')" img-alt="Card image" img-bottom title="Saalbach">
                    <b-card-text>
                        <strong>#ThePlaceToBe</strong> Wir hoffen auch hier bald einen Park eröffnen zu dürfen.
                    </b-card-text>
                    <b-button href="#" variant="outline-info">Mehr Infos</b-button>
                </b-card>
            </b-card-group>
        </b-container>
    </div>
</template>

<script>
 export default {
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style>
.jumbotron {
  background-image: linear-gradient(rgba(0,0,0,1), rgba(255, 255, 255, 0.3)),url("../assets/headerback.jpg");
  background-size: cover;
  color: white;
  border-radius: 0% !important;
  min-height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 56px;
}
#parkcontainer {
    margin-bottom: 2rem;
}
</style>
