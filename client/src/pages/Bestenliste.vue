<template>
    <div class="rankingPage">
        <b-card no-body>
                <b-tabs pills card>
                <b-tab title="Forsteralm" active>
                    <b-tabs pills card vertical nav-wrapper-class="w-20">
                      <b-tab title="Lärchenschuss" active>
                          <b-table striped hover :items="getRuns.filter(run => (run.track.track_name == 'Lärchenschuss'))" :fields="fields" />
                      </b-tab>
                      <b-tab title="Mausefalle">
                          <b-table striped hover :items="getRuns.filter(run => (run.track.track_name == 'Mausefalle'))" :fields="fields" />
                      </b-tab>
                    </b-tabs>
                </b-tab>
                <b-tab title="Königsberg">
                  <b-tabs pills card vertical nav-wrapper-class="w-20">
                      <b-tab title="Sonnenhang" active>
                          <b-table striped hover :items="getRuns.filter(run => (run.track.track_name == 'Sonnenhang'))" :fields="fields" />
                      </b-tab>
                      <b-tab title="Maisfeld">
                          <b-text>Keine Bestzeiten verfügbar</b-text>
                      </b-tab>
                    </b-tabs>
                </b-tab>
                </b-tabs>
        </b-card>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: 'bestenliste',
    data() {
      return {
          fields: {
            username: {
              key: 'user.username',
              label: 'Name'
            },
            time: {
              key: 'timeFormatted',
              label: 'Laufzeit'
            }
          },
          getRuns: []
      }
    },
    apollo: {
      getRuns: gql`{
        getRuns {
          id
          timeFormatted
          track {
            id
            track_name
            park_name
          }
          user {
            id
            username
          }
        }
      }`
    }
  }
</script>

<style>
.rankingPage {
    margin-top: 56px;
}
</style>
