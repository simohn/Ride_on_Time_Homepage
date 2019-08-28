<template>
    <!--
    <div class="userbereichPage">
        <b-tabs pills card vertical>
            <b-tab title="Bestzeiten" active>
                <b-card no-body>
                    <b-tabs pills card>
                        <b-tab title="Forsteralm" active>
                            <b-tabs pills card vertical nav-wrapper-class="w-20">
                                <b-tab title="Lärchenschuss" active>
                                    <b-table 
                                        id="myTable"
                                        striped 
                                        hover 
                                        :current-page="currentPage"
                                        :per-page="perPage"
                                        :items="runsLaerchenschuss"
                                        :fields="fields" />
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

        <b-container fluid>
            <b-row>
                <b-col sm="5" md="6" class="my-1">
                    <b-form-group
                    label="Per page"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="perPageSelect"
                    class="mb-0"
                    >
                    <b-form-select
                        v-model="perPage"
                        id="perPageSelect"
                        size="sm"
                        :options="pageOptions"
                    ></b-form-select>
                    </b-form-group>
                </b-col>

                <b-col sm="7" md="6" class="my-1">
                    <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                    aria-controls="myTable"
                    ></b-pagination>
                </b-col>
            </b-row>

        </b-container>

    </div> -->

    <div class="userbereichPage">
        <!--
        <ul>
            <li v-for="(item, index) in getParks" :key="index"> {{ item.parkname }} </li>
        </ul>
        -->

        <template v-if="isLoaded">
            <b-card no-body>
                <b-tabs pills card>
                    <b-tab v-for="(item, index) in getParks" :key="index" :title="item.parkname">
                        <b-tabs pills card vertical nav-wrapper-class="w-20">
                            <b-tab :v-for="item2 in item.tracks" :title="item2.track_name">
                                <b-table
                                    :items="runsLaerchenschuss"
                                    :fields="fields" />
                            </b-tab>
                        </b-tabs>
                    </b-tab>
                </b-tabs>
            </b-card>
        </template>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export const GET_USERS = gql`{
    getUser(id:33) {
        id
        runs {
            timeFormatted
            timestampDate
            timestampTime
            track
            {
                track_name
            }
        }   
    }
}`;

export const GET_PARKS = gql`{
    getParks {
        parkname
        tracks {
            track_name
        }   
    }
}`;

export default {
    name: 'userbereich',
    data() {
      return {
            fields: {
                time: {
                    key: 'timeFormatted',
                    label: 'Laufzeit',
                    sortable: true
                },
                timestampDate: {
                    key: 'timestampDate',
                    label: 'Datum',
                    sortable: true
                },
                timestampTime: {
                    key: 'timestampTime',
                    label: 'Uhrzeit',
                    sortable: true
                }
            },
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15],
            getUser: [],
            getParks: [],
            isLoaded: false
        }
    },
    apollo: {
        getUser: {
            query: GET_USERS,
            manual: true,
            result ({ data, loading }) {
                console.log('We got some result!');
                console.log(data.getUser);
                this.getUser = data.getUser;
            },
            error (error) {
                console.error('We\'ve got an error!', error)
            }
        },
        getParks: {
            query: GET_PARKS,
            manual: true,
            result ({ data, loading }) {
                console.log('We got some result!');
                console.log(data.getParks);
                this.getParks = data.getParks;
                this.isLoaded = true;
            },
            error (error) {
                console.error('We\'ve got an error!', error)
            }
        }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.getUser.runs.length;
    },
    computed: {
        runsLaerchenschuss: function () {
            return this.getUser.runs.filter(run => (run.track.track_name == 'T1'))
        },
        parks: function () {
            return this.getParks.parkname;
        }
    }
  }
</script>

<style>
.userbereichPage {
    margin-top: 56px;
}
</style>
