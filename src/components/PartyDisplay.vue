<template>
  <v-card flat>
    <v-card-title
      class="primary headerText--text"
    >
      Party
    </v-card-title>
    <v-card-text
      class="background d-flex flex-wrap justify-center"
    >
      <v-card
        v-for="(member, index) in party"
        :key="`party-member-${index}`"
        class="primary ma-3"
      >
        <v-img
          class="primary align-end"
          width="200"
          contain
          :src="member.picture"
        >
          <div class="primary">
            <v-card-title class="headerText--text">
              {{ member.name }}
            </v-card-title>
            <v-card-subtitle class="headerText--text">
              {{ member.race }}
            </v-card-subtitle>
          </div>
        </v-img>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class PartyDisplay extends Vue {
  get party() {
    return this.$store.state.party;
  }
}
</script>

<style lang="scss" scoped>
</style>
