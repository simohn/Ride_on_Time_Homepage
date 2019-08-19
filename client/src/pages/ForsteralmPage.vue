<template>
    <div class="rankingPage">
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="Königsberg" active>
             <b-tabs pills card vertical nav-wrapper-class="w-20">
              <b-tab title="Lärchenschuss" active>
                <b-table striped hover :items="getRuns.filter(run => (run.track.track_name == 'Lärchenschuss'))" :fields="fields" />
              </b-tab>
              <b-tab title="Mausefalle">
                <b-table striped hover :items="getRuns.filter(run => (run.track.track_name == 'Mausefalle'))" :fields="fields" />
              </b-tab>
            </b-tabs>
          </b-tab>
          <b-tab title="Forsteralm"><b-card-text>Keine Bestzeiten verfügbar</b-card-text></b-tab>
        </b-tabs>
      </b-card>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    name: 'forsteralm-page',
    data() {
      return {
          fields: {
            username: {
              key: 'user.username',
              label: 'Name'
            },
            time: {
              key: 'time',
              label: 'Laufzeit'
            }
          },
          getRuns: [],
          hello: ''
      }
    },
    apollo: {
      getRuns: gql`{
        getRuns {
          id
          time
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
