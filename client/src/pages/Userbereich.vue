<template>
    <div class="userbereichPage">
            <b-tabs pills card vertical>
                <b-tab title="Bestzeiten" active>
                    <b-card no-body>
                        <b-tabs pills card>
                            <b-tab title="Forsteralm" active>
                                <b-tabs pills card vertical nav-wrapper-class="w-20">
                                    <b-tab title="Lärchenschuss" active>
                                        <b-table striped hover :items="getUser.runs.filter(run => (run.track.track_name == 'Lärchenschuss'))" :fields="fields" />
                                    </b-tab>
                                    <b-tab title="Mausefalle">
                                        <b-table striped hover :items="getUser.runs.filter(run => (run.track.track_name == 'Mausefalle'))" :fields="fields" />
                                    </b-tab>
                                </b-tabs>
                            </b-tab>

                            <b-tab title="Königsberg">
                                <b-tabs pills card vertical nav-wrapper-class="w-20">
                                    <b-tab title="Sonnenhang">
                                        <b-table striped hover :items="getUser.runs.filter(run => (run.track.track_name == 'Sonnenhang'))" :fields="fields" />
                                    </b-tab>
                                    <b-tab title="Maisfeld">
                                        <b-table striped hover :items="getUser.runs.filter(run => (run.track.track_name == 'Maisfeld'))" :fields="fields" />
                                    </b-tab>
                                </b-tabs>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </b-tab>

                <b-tab title="Account"> 
                    
                </b-tab>
            </b-tabs>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: 'userbereich',
    data() {
      return {
          fields: {
            time: {
              key: 'timeFormatted',
              label: 'Laufzeit'
            }
          },
          getUser: []
      }
    },
    apollo: {
      getUser: gql`{
        getUser(id:1) {
          id
          runs {
            timeFormatted
            track
            {
                track_name
                park_name
            }
          }
        }
      }`
    }
  }
</script>

<style>
.userbereichPage {
    margin-top: 56px;
}
</style>
