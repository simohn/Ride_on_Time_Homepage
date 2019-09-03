<template>
    <div class="userbereichPage">
        <b-tabs v-model="tabParkIndex" small card>
            <b-tab v-for="(item1, index1) in getParks" 
                    :key="index1"
                    v-on:click="updateRunsObject"
                    :title="item1.parkname">

                <b-tabs v-model="getParks[index1].tabTrackIndex" small pills>
                    <b-tab
                        v-for="(item2, index2) in item1.tracks"
                        :title="item2.track_name"
                        :key="index2"
                        v-on:click="updateRunsObject"
                        :disabled="!getParks[index1].tracks[index2].hasRuns">
                    </b-tab>
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
            userReceived: false,
            parksReceived: false,
            loaded: false,
            userData: [],
            parksSkeleton: []
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
        updateRunsObject: function() {
            var parkname = this.getParks[this.tabParkIndex].parkname;
            var trackname = this.getParks[this.tabParkIndex].tracks[this.getParks[this.tabParkIndex].tabTrackIndex].track_name;
            this.runs = this.getUser.runs.filter(run => (run.track.track_name == trackname && run.track.park.parkname == parkname));
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
.userbereichPage {
    margin-top: 40px;
}
</style>
