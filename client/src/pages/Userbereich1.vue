<template>
    <div class="userbereich1Page">
        <b-tabs v-if="loaded" v-model="tabParkIndex" small card>
            <b-tab v-on:click="onParkTabChange" title="Forsteralm">
                <b-tabs v-model="getParks[0].tabTrackIndex" small pills>
                    <b-tab title="Lärchenschuss" 
                           v-on:click="onTrackTabChange"
                           :disabled="!getParks[0].tracks[0].hasRuns"></b-tab>
                    <b-tab title="Hirschkogel" 
                           v-on:click="onTrackTabChange"
                           :disabled="!getParks[0].tracks[1].hasRuns"></b-tab>
                    <b-tab title="Langhorn" 
                           v-on:click="onTrackTabChange"
                           :disabled="!getParks[0].tracks[2].hasRuns"></b-tab>
                </b-tabs>
            </b-tab>
            <b-tab v-on:click="onParkTabChange" title="Königsberg">
                <b-tabs v-model="getParks[1].tabTrackIndex" small pills>
                    <b-tab title="Kurvenkogel" 
                           v-on:click="onTrackTabChange"
                           :disabled="!getParks[1].tracks[0].hasRuns"></b-tab>
                    <b-tab title="S-Line" 
                           v-on:click="onTrackTabChange"
                           :disabled="!getParks[1].tracks[1].hasRuns"></b-tab>
                </b-tabs>
            </b-tab>
            <b-tab v-on:click="onParkTabChange" title="Saalbach">
                <b-tabs v-model="getParks[2].tabTrackIndex" small pills>
                    <b-tab title="Z-Line" 
                           v-on:click="onTrackTabChange"
                           :disabled="!getParks[2].tracks[0].hasRuns"></b-tab>
                    <b-tab title="Buchenwald" 
                           v-on:click="onTrackTabChange"
                           :disabled="!getParks[2].tracks[1].hasRuns"></b-tab>
                </b-tabs>
            </b-tab>
        </b-tabs>
        <b-table v-if="loaded" :items="runs" :fields="fields" />
    </div>
</template>

<script>
import gql from 'graphql-tag'

export const GET_USER = gql`{
    getUser(id: 33) {
        id
        username
        runs {
            timeFormatted
            timestampDate
            timestampTime
            track {
                track_name
                park {
                    parkname
                }
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
            getUser: [],
            getParks: [],
            runs: [],
            tabParkIndex: 0,
            tabTrackIndex: 0,
            tabTrackIndex1: 0,
            userReceived: false,
            parksReceived: false,
            loaded: false,
            userData: []
        }
    },
    apollo: {
        getUser: {
            query: GET_USER,
            result ({ data, loading }) {
                console.log('getUser received!');
                this.userReceived = true;

                if(this.userReceived && this.parksReceived)
                {
                    this.calcParksSkeleton();
                    this.updateRunsObject();
                    this.loaded = true;
                }
            },
            error (error) {
                console.error('We\'ve got an error!', error)
            }
        },
        getParks: {
            query: GET_PARKS,
            result ({ data, loading }) {
                console.log('getParks received!');
                this.parksReceived = true;

                if(this.userReceived && this.parksReceived)
                {
                    this.calcParksSkeleton();
                    this.updateRunsObject();
                    this.loaded = true;
                }
            },
            error (error) {
                console.error('We\'ve got an error!', error)
            }
        }
    },
    methods: {
        onParkTabChange: function() {
            // this.tabTrackIndex = 0;
            this.updateRunsObject();
        },
        onTrackTabChange: function() {
            this.updateRunsObject();
        },
        updateRunsObject: function() {
            var parkname = this.getParks[this.tabParkIndex].parkname;
            var trackname = this.getParks[this.tabParkIndex].tracks[this.getParks[this.tabParkIndex].tabTrackIndex].track_name;
            this.runs = this.getUser.runs.filter(run => (run.track.track_name == trackname && run.track.park.parkname == parkname));
        },
        hasTrackRuns: function() {
            
        },
        calcParksSkeleton: function() {
            this.getParks.forEach(park => {
                var tabTrackIndexSet = false;
                var tabTrackIndex = 0;

                park.tracks.forEach(track => {
                    var runsTemp = this.getUser.runs.filter(run => (run.track.track_name == track.track_name && run.track.park.parkname == park.parkname));
                    
                    if(runsTemp.length == 0)
                    {
                        track.hasRuns = false;
                    }
                    else
                    {
                        track.hasRuns = true;

                        if(!tabTrackIndexSet)
                        {
                            park.tabTrackIndex = tabTrackIndex;
                            tabTrackIndexSet = true;
                        }
                    }

                    tabTrackIndex++;
                });
            });
        }
    }
  }
</script>

<style>
.userbereich1Page {
    margin-top: 40px;
}
</style>
