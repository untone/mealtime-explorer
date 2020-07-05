<script>
import { mapGetters, mapActions } from 'vuex'
import Heart from '@/components/Heart'

export default {
  name: 'List',
  components: {
    Heart
  },
  computed: {
    ...mapGetters({
      dogs: 'dogs/dogs',
      favourites: 'dogs/favourites',
      progress: 'dogs/progress',
      sortByName: 'dogs/sortByName'
    }),
    isFavouritesRoute () {
      return this.$route.path === '/favourites'
    },
    currentList () {
      if (this.isFavouritesRoute) {
        return this.favourites
      }
      return this.dogs
    },
    displayList () {
      if (this.sortByName) {
        const sorted = [...this.currentList].sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
        return sorted
      }
      return this.currentList
    }
  },
  data () {
    return {
      bottom: false
    }
  },
  watch: {
    bottom (bottom) {
      if (bottom) {
        this.fetchDogs({
          params: this.$route.params,
          append: true
        })
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.setScrolledToBottom, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.setScrolledToBottom)
  },
  methods: {
    ...mapActions({
      fetchDogs: 'dogs/FETCH_DOGS',
      addFavourite: 'dogs/ADD_FAVOURITE',
      removeFavourite: 'dogs/REMOVE_FAVOURITE'
    }),
    isFavourite (item) {
      return this.favourites.includes(item)
    },
    setFavourite (event, item) {
      this.addFavourite(item)
    },
    unsetFavourite (event, item) {
      this.removeFavourite(item)
    },
    scrolledToBottom () {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    setScrolledToBottom () {
      if (!this.isFavouritesRoute) {
        this.bottom = this.scrolledToBottom()
      }
    }
  }
}
</script>

<template>
  <main :class="$style.content">
    <ul
      :class="$style.list"
      :key="`${this.$route.path}${this.sortByName}`">
      <template v-if="displayList.length">
        <template v-for="(item, index) in displayList">
          <li
            :key="index"
            :class="$style.item"
          >
            <figure :class="$style.wrapper" v-lazyload>
              <img
                :class="$style.image"
                :data-src="item.img"
                :alt="item.name"
              >
              <figcaption :class="$style.name">{{ item.name }}</figcaption>
              <div
                :class="$style.favourite"
                @click="isFavourite(item) ? unsetFavourite($event, item) : setFavourite($event, item)">
                <Heart
                  :class="$style.icon"
                  :filled="isFavourite(item)"
                />
              </div>
            </figure>
          </li>
        </template>
      </template>
    </ul>
    <template v-if="!this.isFavouritesRoute">
      <ul :class="[
        $style.progress,
        progress && $style.progressActive
      ]">
        <li :class="$style.tick"/>
        <li :class="$style.tick"/>
        <li :class="$style.tick"/>
      </ul>
    </template>
  </main>
</template>

<style lang="scss" module>
.content {
  margin: 0 auto;
  padding: 0 20px;
  max-width: var(--max-content-width);
  height: 100%;

  @include mq($from: tablet) {
    padding: 0 60px;
  }
}

.list {
  margin: 0 -15px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.item {
  box-sizing: content-box;
  margin: 0 0 30px;
  display: flex;
  position: relative;
  flex-basis: 50%;
  height: 200px;
  font-size: 25px;

  @include mq($from: tablet) {
    flex-basis: 33.33%;
    height: 290px;
  }

  &:first-of-type {
    flex-basis: 100%;
    height: 520px;
    font-size: 30px;
  }
}

.wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0 15px;
  border-radius: 8px;

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition: opacity .5s ease-in-out;

    &:not([src]) {
      opacity: 0;
    }
  }

  .name {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 25px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    text-align: right;
    font-weight: 600;
    text-transform: capitalize;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1));
  }
}

.favourite {
  position: absolute;
  top: 0;
  left: 0;
  padding: 25px;
  cursor: pointer;
  transform: scale(1);
  transition: transform .15s ease-in-out;

  .icon {
    width: 30px;
  }

  &:hover {
    transform: scale(1.15);
  }
}

.progress {
  padding: 50px 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--default-color);
  visibility: hidden;
  opacity: 0;

  .tick {
    margin: 0 5px;
    width: 10px;
    height: 10px;
    border: 1px solid;
    border-radius: 10px;
    transition: transform .15s ease-in-out;
    animation-name: zoom;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;

    &:nth-child(2) {
      animation-delay: .2s
    }

    &:nth-child(3) {
      animation-delay: .4s
    }
  }
}

.progressActive {
  visibility: visible;
  opacity: 1;
}

@keyframes zoom {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.5)
  }
  100% {
    transform: scale(1);
  }
}

</style>
