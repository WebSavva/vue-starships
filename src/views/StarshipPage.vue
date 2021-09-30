<template>
  <main class="starship">
    <message-box
      v-if="error"
      :retryHandler="loadStarshipData"
      :isError="true"
      :text="error.message"
      :isFixableError="error.isFixable"
    ></message-box>
    <spinner v-else-if="loading"></spinner>
    <div v-else class="starship__content" :style="backgroundStyle">
      <section class="starship__details">
        <h1 class="starship__heading starship__heading--main">
          {{ starshipData.name }}
        </h1>
        <div class="starship__section">
          <h3 class="starship__heading starship__heading--sub">Basics</h3>
          <ul class="starship__list">
            <li
              class="starship__item"
              v-for="(propValue, propName) in groupedStarshipData.basics"
              :key="propName"
            >
              <span>{{ propName }}:</span>
              <span>{{ propValue }}</span>
            </li>
          </ul>
        </div>
        <div class="starship__section">
          <h3 class="starship__heading starship__heading--sub">
            Characteristics
          </h3>
          <ul class="starship__list">
            <li
              class="starship__item"
              v-for="(propValue, propName) in groupedStarshipData.tech"
              :key="propName"
            >
              <span>{{ propName }} :</span>
              <span>{{ propValue }}</span>
            </li>
            <li
              v-for="(links, propName) in groupedStarshipData.list"
              :key="propName"
              class="starship__item"
              v-show="links.length"
            >
              <accordion>
                <template #head>
                  {{ propName }}
                </template>
                <template #body>
                  <ul class="starship__dropdown-list">
                    <li v-for="(link, i) in links" :key="link">
                      <a :href="link"
                        >{{ propName.slice(0, -1) }} {{ i + 1 }}</a
                      >
                    </li>
                  </ul>
                </template>
              </accordion>
            </li>
          </ul>
        </div>
      </section>
      <section class="starship__cards">
        <div
          class="starship__card"
          v-for="(propValue, propName) in groupedStarshipData.cards"
          :key="propName"
        >
          <h4>{{ propName }}</h4>
          <h3>{{ propValue }}</h3>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { handleRequestError } from "@/shared/methods.js";
import imagesData from "@/assets/starships_images_data.json";
import Spinner from "@/components/UI/Spinner.vue";
import MessageBox from "@/components/UI/MessageBox.vue";
import Accordion from "@/components/UI/Accordion.vue";
import numeral from "numeral";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Spinner,
    MessageBox,
    Accordion,
  },
  data() {
    const imgSrc =
      imagesData.baseUrl +
      imagesData.names[Math.floor(Math.random() * imagesData.names.length)];
    return {
      loading: false,
      error: null,
      starshipData: null,
      imgSrc,
    };
  },
  beforeMount() {
    this.loadStarshipData();
  },
  computed: {
    http() {
      return this.$store.state.http;
    },
    backgroundStyle() {
      return {
        backgroundImage: `linear-gradient(to bottom, #282727bd, #282727bd), url(${this.imgSrc})`,
      };
    },
    groupedStarshipData() {
      if (this.starshipData) {
        return Object.entries(this.starshipData).reduce(
          (ac, [propName, propValue]) => {
            if (["id", "name", "url"].includes(propName)) return ac;

            let groupName = "basics";
            if (
              [
                "length",
                "crew",
                "passengers",
                "cargo_capacity",
                "MGLT",
              ].includes(propName)
            ) {
              groupName = "tech";
            } else if (
              ["hyperdrive_rating", "consumables", "cost_in_credits"].includes(
                propName
              )
            ) {
              groupName = "cards";
            } else if (Array.isArray(propValue)) {
              groupName = "list";
            }
            let [prettifiedName, prettifiedValue] = this.prettifyData(
              propName,
              propValue
            );
            ac[groupName][prettifiedName] = prettifiedValue;
            return ac;
          },
          {
            basics: {},
            tech: {},
            cards: {},
            list: {},
          }
        );
      } else {
        return null;
      }
    },
  },
  methods: {
    loadStarshipData() {
      const existingStarshipData = Array.isArray(this.$store.state.starships)
        ? this.$store.state.starships.find((data) => data.id === +this.id)
        : null;
      if (existingStarshipData) {
        this.starshipData = existingStarshipData;
      } else {
        this.fetchStarshipData();
      }
    },
    prettifyData(name, value) {
      let prettifiedName = name,
        prettifiedValue = value;

      if (typeof value === "string" && value.split(" ").length >= 5) {
        prettifiedValue = value
          .split(" ")
          .slice(0, 4)
          .join(" ");
      }

      if (Number.isSafeInteger(+value)) {
        const formatType =
          +value / 1e6 > 1 ? "0.0a" : +value / 1e3 > 1 ? "0a" : "0,0";
        prettifiedValue = numeral(+value).format(formatType);
      }
      switch (true) {
        case name.includes("rating"):
          prettifiedName = "rating";
          break;
        case name.includes("cost"):
          prettifiedName = "cost";
          break;
        case name.includes("_"):
          prettifiedName = name.replace(/_/g, " ");
          break;
        case name === "created" || name === "edited":
          prettifiedValue = new Date(value).toLocaleDateString();
          break;
      }
      return [prettifiedName, prettifiedValue];
    },
    async fetchStarshipData() {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await this.http.get(`/${this.id}`);
        this.starshipData = data;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    handleError: handleRequestError,
  },
};
</script>

<style scoped lang="scss">
@import "./../styles/_module.scss";

.starship {
  position: relative;
  background-color: $secondary-color;
  width: 80%;
  margin: 2rem auto;
  border-radius: 5px;
  min-height: 50vh;
  @include centered;
  @include cutBorders(15%, "left", 50%);
  @include cutBorders(15%, "right", 50%);
  @include media(sm) {
    width: 95%;
    &::after,
    &::before {
      display: none;
    }
  }
  &__content {
    @include fillElement;
    border-radius: inherit;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 5rem;
    @include media(sm) {
      padding: 2rem 1rem;
    }
  }
  &__details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 2rem;
    grid-column-gap: 3rem;
    @include media(md) {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
  &__heading {
    font-weight: 600;
    &--main {
      font-size: 2.5rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      grid-column: 1/ -1;
      text-align: center;
    }
    &--sub {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }
  }
  &__item {
    padding: 0.4rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba($green-color, 0.7);
    span {
      &:first-child {
        text-transform: capitalize;
        text-align: left;
        margin-right: 1rem;
      }
      &:last-child {
        text-align: right;
      }
    }
  }

  &__dropdown-list {
    padding: 1rem;
    text-transform: capitalize;
    li {
      letter-spacing: 0.5px;
    }
  }

  &__cards {
    margin-top: 2rem;
    display: flex;
    justify-content: space-around;
    @include media(md) {
      flex-direction: column;
      gap: 2rem;
      justify-content: unset;
    }
  }

  &__card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: rgba($tertiary-color, 0.8);
    padding: 1rem 4rem;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    &::after,
    &::before {
      @extend %pseudoDefault;
      top: 0;
      height: 100%;
      width: 5px;
      background: $green-color;
      transform: scaleY(1.1);
      border-radius: inherit;
    }
    &::after {
      right: 0;
    }
    &::before {
      left: 0;
    }
    h4 {
      font-size: 1.6rem;
      font-weight: 200;
      text-transform: uppercase;
    }
    h3 {
      font-size: 2rem;
      font-weight: 600;
    }
  }
}
</style>
