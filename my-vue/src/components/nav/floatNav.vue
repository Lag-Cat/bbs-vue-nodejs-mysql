<template>
  <div class="floatNav default-position" v-clickoutside="handleHideBtn">
    <div class="toggle">
      <div
        v-for="(item,key) in textArr"
        :key="key"
        class="fn-item round"
        :ref="item"
        v-bind:class="toggleCompenent[item]?'toggle-on':'toggle-off'"
        @click="handleItemClick(item)"
      >
        <span>{{item}}</span>
      </div>
    </div>
    <div class="fn-switch round" @click="handleSwitchClick"></div>
  </div>
</template>
<script>
import clickoutside from "../../directives/clickOutSide.js";
export default {
  name: "floatNav",
  props: {
    round: Boolean,
    textArr: Array
  },
  directives: {
    clickoutside
  },
  data() {
    return {
      toggle: false,
      toggleCompenent: {}
    };
  },
  created() {
    this.textArr.reverse().map(item => {
      this.$set(this.toggleCompenent, item, false);
    });
  },
  methods: {
    handleItemClick: function(item) {
      this.$emit("onItemClick", item);
    },
    handleSwitchClick: function() {
      this.toggle = this.toggle ? false : true;
      
      
    },
    handleHideBtn: function() {
      this.toggle = false;
    }
  },
  watch:{
    toggle(){
      let timer = 1;
      let speed = 0.3;
      if (this.toggle) {
        this.textArr.map(item => {
          setTimeout(() => {
            this.toggleCompenent[item] = true;
          }, timer * speed * 1000);
          timer++;
        });
      } else {
        this.textArr.map(item => {
          setTimeout(() => {
            this.toggleCompenent[item] = false;
          }, timer * speed * 1000);
          timer++;
        });
      }
    }
  }

};
</script>
<style lang="scss" scoped>
.floatNav {
  position: fixed;
  z-index: 1000;
  .toggle {
    .toggle-on {
      transition: all 0.5s;
      visibility: visible;
      opacity: 1;
    }

    .toggle-off {
      transition: all 0.5s;
      transform: translate(20px);
      visibility: hidden;
      opacity: 0;
    }

    .fn-item {
      height: 40px;
      width: 40px;
      background: #fff;
      border: 2px solid #ff7600;
      vertical-align: middle;
      text-align: center;
      line-height: 40px;
      font-size: 15px;
      color: #444444;
    }
  }

  &.default-position {
    right: 20px;
    bottom: 100px;
  }

  .fn-switch {
    position: relative;
    height: 40px;
    width: 40px;
    background: #ff7600;
    background-image: linear-gradient(0deg, rgba(255, 165, 0, 0.48), #ff7600);
    transition: all 1s;
    &:before {
      content: "";
      height: 0.78rem;
      width: 0.1rem;
      background: #fff;
      position: absolute;
      left: 0.48rem;
      top: 0.15rem;
      border-radius: 0.2rem;
    }
    &::after {
      content: "";
      height: 0.1rem;
      width: 0.78rem;
      background: #fff;
      position: absolute;
      left: 0.15rem;
      top: 0.48rem;
      border-radius: 0.2rem;
    }
    &:hover {
      transform: rotate(720deg);
    }
  }
}

.round {
  border-radius: 50%;
}
</style>