<script>
import { mapGetters, mapActions } from 'vuex'
import Checkbox from '@/components/Checkbox'
import Chevron from '@/components/Chevron'
import Close from '@/components/Close'

export default {
  name: 'Nav',
  components: {
    Checkbox,
    Chevron,
    Close
  },
  data () {
    return {
      expanded: false
    }
  },
  computed: {
    ...mapGetters({
      breeds: 'dogs/breeds',
      sortByName: 'dogs/sortByName'
    }),
    isBreedRoute () {
      return !['/', '/favourites'].includes(this.$route.path)
    },
    isFavouritesRoute () {
      return this.$route.path === '/favourites'
    },
    isLastRoute () {
      const lastGroup = [...this.breeds].pop()
      const lastItem = [...lastGroup.items].pop()
      return lastItem
    }
  },
  beforeDestroy () {
    window.removeEventListener('click', this.closeNav)
  },
  methods: {
    ...mapActions({
      toggleSort: 'dogs/SET_SORT'
    }),
    toggleNav (value) {
      this.expanded = typeof value === 'boolean' ? value : !this.expanded
      const method = this.expanded === true ? 'addEventListener' : 'removeEventListener'
      document[method]('click', this.closeNav)
    },
    closeNav (event) {
      if (!this.$refs.nav.contains(event.target)) {
        this.toggleNav(false)
      }
    }
  }
}
</script>

<template>
  <div :class="$style.content">
    <div ref="nav">
      <div :class="$style.controls">
        <label
          id="label"
          :class="[
            $style.select,
            expanded && $style.selectExpanded
          ]"
          @click.prevent="toggleNav"
          @keydown.space.prevent="toggleNav"
          @keydown.enter.prevent="toggleNav"
          tabindex="0"
        >
          Породы
          <Chevron :class="$style.chevron" />
        </label>
        <template v-if="isBreedRoute">
          <router-link
            to="/"
            :class="$style.link"
          >
            {{ $route.params.breed }}
            <Close :class="$style.close" />
          </router-link>
        </template>
        <div
          v-if="!isBreedRoute && !isFavouritesRoute"
          :class="$style.sort"
        >
          <label
            id="sort"
            :class="$style.sortLabel"
            tabindex="0"
            @keydown.space.prevent="toggleSort"
            @keydown.enter.prevent="toggleSort"
          >
            Сортировка по алфавиту
            <Checkbox
              :checked="sortByName"
              @change="toggleSort"
            />
          </label>
        </div>
      </div>

      <div :class="[
        $style.dropdown,
        expanded && $style.dropdownExpanded
      ]">
        <nav :class="$style.options">
          <router-link
            :class="$style.link"
            to="/"
            exact
            @click.native="toggleNav"
            :tabindex="expanded ? 0 : -1"
          >
            Все пёсели
          </router-link>
          <hr :class="$style.divider" />

          <template
            v-for="{ name, items } in breeds"
          >
            <template v-for="(route, key) in items">
              <template v-if="key">
                <router-link
                  :key="route"
                  :class="[
                    $style.link,
                    key === items.length - 1 && $style.linkLast
                  ]"
                  :to="`/${route}`"
                  @click.native="toggleNav"
                  @blur.native="route === isLastRoute ? toggleNav(false) : null"
                  :tabindex="expanded ? 0 : -1"
                >
                  {{ route }}
                </router-link>
              </template>

              <template v-else>
                <div
                  :key="route"
                  :class="$style.joiner"
                >
                  <span :class="$style.key">
                    {{ name }}
                  </span>
                  <router-link
                    :class="$style.link"
                    :to="`/${route}`"
                    @click.native="toggleNav"
                    :tabindex="expanded ? 0 : -1"
                  >
                    {{ route }}
                  </router-link>
                </div>
              </template>
            </template>
          </template>
        </nav>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.content {
  margin: 0 auto;
  padding: 20px;
  max-width: var(--max-content-width);
  height: 100%;

  @include mq($from: tablet) {
    padding: 50px 60px;
  }
}

.controls {
  display: flex;
}

.sort {
  margin-left: auto;
  color: var(--inactive-color);
  transition: color .15s;

  .sortLabel {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: var(--default-color);
    }

    :global(.checkbox) {
      margin-left: 15px;
    }
  }
}

.select {
  margin-right: 20px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  height: 24px;
  cursor: pointer;
  user-select: none;

  &:before {
    content: '';
    position: absolute;
    right: -2px;
    bottom: 0;
    left: 0;
    height: 1px;
    background-image: linear-gradient(to right,
      var(--default-color) 50%,
      transparent 50%
    );
    background-size: 6px 1px;
  }

  .chevron {
    vertical-align: middle;
    margin-left: 10px;
    width: 9px;
    transition: transform .15s;
  }

  &:focus-within {
    color: var(--active-color);

    &:before {
      background-image: linear-gradient(to right,
        var(--active-color) 50%,
        transparent 50%
      );
    }
  }
}

.selectExpanded .chevron {
  transform: rotate(180deg);
}

.dropdown {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-height: 0;
  transition: max-height .25s cubic-bezier(0, 1, 0, 1);
  user-select: none;
}

.dropdownExpanded {
  max-height: 10000px;
  transition: max-height .5s ease-in-out;
}

.options {
  padding: 30px 0 0;
  display: flex;
  flex-wrap: wrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity .15s, transform .15s;
  transform: translateY(-15px);

  .dropdownExpanded & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

.key {
  margin: 0 15px 0 0;
  height: 24px;
  font-size: 20px;
  color: var(--inactive-color);
  text-transform: uppercase;
}

.link {
  margin: 0 15px 18px 0;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  height: 24px;
  font-size: 12px;
  color: var(--inactive-color);
  text-transform: capitalize;
  border: 1px solid var(--inactive-color);
  border-radius: 24px;
  transition: color .15s, border-color .15s;
  text-decoration: none;

  &:global(:not(.router-link-active)) {
    &:hover,
    &:focus {
      color: var(--default-color);
      border-color: var(--default-color);
    }
  }

  &:global(.router-link-active) {
    color: var(--active-color);
    border-color: var(--active-color);

    &:focus {
      color: var(--default-color);
      border-color: var(--default-color);
    }
  }

  &:focus {
    outline: none;
  }

  .close {
    margin-left: 10px;
  }

  &.linkLast {
    margin-right: 40px;
  }
}

.divider {
  background: none;
  border: none;
  width: 100%;
}

.joiner {
  display: flex;
}

</style>
