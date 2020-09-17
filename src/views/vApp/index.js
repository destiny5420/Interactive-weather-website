export default {
  name: 'vApp',
  props: {},
  // components: {},
  data: function() {
    return {
      points: [
        { x: 40, value: 20 },
        { x: 90, value: 23 },
        { x: 140, value: 28 },
        { x: 190, value: 27.5 },
        { x: 240, value: 22 },
        { x: 290, value: 29 },
        { x: 340, value: 20 },
      ],
    };
  },
  // methods: {

  // },
  computed: {
    tmpLineY: {
      get: function() {
        const vm = this;
        return function(index) {
          const temUnit = Math.abs(40 - 10);
          const heightUnit = Math.abs(50 - 120);
          return 100 - (vm.points[index].value / temUnit) * heightUnit;
        };
      },
    },
  },
  // // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {},
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {},
};
