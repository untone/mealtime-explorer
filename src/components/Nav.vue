<script>
import { mapGetters } from 'vuex'
import Chevron from '@/components/Chevron'
import Close from '@/components/Close'

export default {
  name: 'Nav',
  components: {
    Chevron,
    Close
  },
  computed: {
    ...mapGetters({
      breeds: 'dogs/breeds'
    }),
    isBreedRoute () {
      return !['/', '/favourites'].includes(this.$route.path)
    }
  },
  data () {
    return {
      expanded: false
    }
  },
  methods: {
    toggleNav () {
      this.expanded = !this.expanded
    }
  }
}
</script>

<template>
  <div :class="$style.content">
    <div :class="$style.controls">

      <div
        :class="[
          $style.select,
          expanded && $style.selectExpanded
        ]"
        @click="toggleNav"
      >
        Породы
        <Chevron :class="$style.chevron" />
      </div>

      <template v-if="isBreedRoute">
        <router-link
          to="/"
          :class="$style.link"
        >
          {{ $route.params.breed }}
          <Close :class="$style.close" />
        </router-link>
      </template>

      <div :class="$style.sort">
        Сортировка по алфавиту
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
}

.select {
  margin-right: 20px;
  position: relative;
  display: inline-block;
  vertical-align: top;
  height: 24px;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    right: -2px;
    bottom: 0;
    left: 0;
    height: 1px;
    background: linear-gradient(to right,
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
}

.selectExpanded .chevron {
  transform: rotate(180deg);
}

.dropdown {
  overflow: hidden;
  margin: 30px 0 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-height: 0;
  transition: max-height .25s cubic-bezier(0, 1, 0, 1);
}

.dropdownExpanded {
  max-height: 10000px;
  transition: max-height .5s ease-in-out;
}

.options {
  display: flex;
  flex-wrap: wrap;
  opacity: 0;
  transition: opacity .15s, transform .15s;
  transform: translateY(-10px);

  .dropdownExpanded & {
    opacity: 1;
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

  &:global(.router-link-active) {
    color: var(--active-color);
    border-color: var(--active-color);
  }

  &:global(:not(.router-link-active)) {
    &:hover,
    &:focus {
      color: var(--default-color);
      border-color: var(--default-color);
    }
  }

  .close {
    margin-left: 10px;
  }
}

.linkLast {
  margin-right: 40px;
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
