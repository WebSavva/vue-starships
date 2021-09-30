<template>
  <main class="home">
    <logo class="home__logo" ref="logo"></logo>
    <search-bar
      v-model.trim="search"
      @update:modelValue="setNameQuery"
      @clear:modelValue="resetSearchMode"
      ref="searchBar"
    ></search-bar>
    <section class="home__display" ref="display">
      <message-box
        v-if="error"
        :isError="true"
        :retryHandler="fetchData"
        :isFixableError="error.isFixable"
        :text="error.message"
      ></message-box>
      <spinner v-else-if="loading"></spinner>
      <div v-else class="home__content">
        <message-box
          v-if="!starships.length"
          :isError="false"
          text="No starships found"
        ></message-box>
        <the-starships v-else :starshipsData="starships"></the-starships>
        <pagination
          :currentPage="currentPage"
          :overallNumberPages="overallNumberPages"
          :switchPage="switchPage"
        ></pagination>
      </div>
    </section>
  </main>
</template>

<script>
import Logo from "@/components/UI/Logo.vue";
import SearchBar from "@/components/SearchBar.vue";
import TheStarships from "@/components/TheStarships.vue";
import Pagination from "@/components/UI/Pagination.vue";
import Spinner from "@/components/UI/Spinner.vue";
import MessageBox from "@/components/UI/MessageBox.vue";
import { handleRequestError } from "@/shared/methods.js";

export default {
  name: "Home",
  components: {
    Logo,
    SearchBar,
    TheStarships,
    Pagination,
    Spinner,
    MessageBox,
  },
  created() {
    this.readQueryData(true);
    this.fetchData();
  },
  data() {
    return {
      loading: false,
      search: "",
      error: null,
      currentPage: 1,
      overallCount: null,
      numberPerPage: 10,
      delayedRequest: null,
      isNamePassedByLink: false,
    };
  },
  watch: {
    "$route.query"(nextQuery, prevQuery) {
      if (this.$route.path !== "/") return;
      this.readQueryData();
      if (this.searchMode && prevQuery && nextQuery.page === prevQuery.page) {
        this.debouncedFetchData();
      } else {
        this.fetchData();
      }
    },
  },
  computed: {
    starships() {
      return this.$store.state.starships;
    },
    http() {
      return this.$store.state.http;
    },
    history() {
      return this.$store.state.homeHistory;
    },
    searchParams() {
      return `?page=${this.currentPage}${
        this.search ? "&search=" + this.search : ""
      }`;
    },
    overallNumberPages() {
      return Math.ceil(this.overallCount / this.numberPerPage);
    },
    searchMode() {
      return !!this.search;
    },
  },
  methods: {
    async fetchData() {
      const isCached = this.history.has(this.searchParams);
      try {
        this.error = null;
        if (!isCached) {
          this.loading = true;
          this.$store.commit({
            type: "updateHomeHistory",
            request: this.searchParams,
          });
        }

        const response = await this.http.get(this.searchParams);
        const {
          data: { results, count },
        } = response;
        this.$store.commit({
          type: "updateStarships",
          fetchedData: results,
        });
        this.overallCount = count;
      } catch (error) {
        this.handleError(error);
      } finally {
        !isCached && setTimeout(() => (this.loading = false), 3e2);
      }
    },
    debouncedFetchData() {
      clearTimeout(this.delayedRequest);
      this.delayedRequest = setTimeout(() => this.fetchData(), 1e3);
    },
    switchPage(isNext) {
      this.pushNewQuery({
        page: this.currentPage + (isNext ? 1 : -1),
      });
    },
    handleError: handleRequestError,
    readQueryData(isComponentNotLoaded = false) {
      const {
        query: { name: requestedName, page: requestedPage },
      } = this.$route;
      if (requestedName) {
        this.search = requestedName;
        isComponentNotLoaded && (this.isNamePassedByLink = true);
      }
      if (requestedPage) {
        this.currentPage = +requestedPage;
      } else {
        this.resetPageNumber();
      }
    },
    setNameQuery() {
      this.pushNewQuery({
        ...(!this.isNamePassedByLink && { page: 1 }),
        ...(this.search && { name: this.search }),
      });
      this.isNamePassedByLink = false;
    },
    resetPageNumber() {
      this.pushNewQuery({
        page: 1,
      });
    },
    resetSearchMode() {
      this.search = "";
      this.resetPageNumber();
    },
    pushNewQuery(newQuery) {
      this.$router.push({
        name: "Home",
        query: {
          ...this.$route.$query,
          ...newQuery,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../styles/_module.scss";

.home {
  @extend %centered-columns;
  grid-row-gap: 2rem;
  &__logo {
    justify-self: center;
    @include media(md) {
      display: none;
    }
  }
  &__display {
    position: relative;
    background-color: $secondary-color;
    border-radius: 5px;
    padding: 2rem 5rem;
    height: 70vh;
    @include cutBorders(13%, "left", 35%);
    @include cutBorders(13%, "right", 35%);
  }
  &__content {
    height: 100%;
  }
}
</style>
