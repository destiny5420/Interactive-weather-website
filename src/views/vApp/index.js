import cLoading from '@/components/cLoading/index.vue';
import cDayWeatherSun from '@/components/cDayWeather-sun/index.vue';
import cDayWeatherRain from '@/components/cDayWeather-rain/index.vue';
import cDayWeatherCloud from '@/components/cDayWeather-cloud/index.vue';
import cDayWeatherSunCloud from '@/components/cDayWeather-sun-cloud/index.vue';

export default {
  name: 'vApp',
  props: {},
  components: {
    cLoading,
    cDayWeatherSun,
    cDayWeatherRain,
    cDayWeatherCloud,
    cDayWeatherSunCloud,
  },
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
      loading: {
        weather: false,
        temperature: false,
      },
      dateConvertString: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      dateConvertTraditional: ['日', '一', '二', '三', '四', '五', '六'],
      weatherData: null,
      location: null,
    };
  },
  methods: {
    getWeatherCallback: function() {
      const vm = this;
      vm.loading.weather = true;
      vm.axios({
        method: 'get',
        url: `${process.env.VUE_APP_HOST}/get-weather`,
      })
        .then((response) => {
          console.log('Weather: ', response);
          vm.loading.weather = false;
          vm.weatherData = response.data.data;
          vm.location = response.data.location;
        })
        .catch((err) => {
          vm.loading.weather = false;
          console.error(err);
        });
    },
    getTemperatureCallback: function() {
      const vm = this;
      vm.loading.temperature = true;
      vm.axios({
        method: 'get',
        url: `${process.env.VUE_APP_HOST}/get-temperature`,
      })
        .then((response) => {
          console.log('Temperature: ', response);
          vm.loading.temperature = false;
          for (let i = 0; i < response.data.data.length; i += 1) {
            const value = parseInt(response.data.data[i].value, 10);
            vm.points[i].value = value;
          }
        })
        .catch((err) => {
          vm.loading.temperature = false;
          console.error(err);
        });
    },
  },
  computed: {
    isLoading: {
      get: function() {
        const vm = this;
        return vm.loading.temperature || vm.loading.weather;
      },
    },
    tmpLineY: {
      get: function() {
        const vm = this;
        return function(index) {
          const temUnit = Math.abs(40 - 10);
          const heightUnit = Math.abs(70 - 120);
          return 100 - (vm.points[index].value / temUnit) * heightUnit;
        };
      },
    },
    currentWeather: {
      get: function() {
        const vm = this;
        return function(index) {
          const resultData = parseInt(vm.weatherData[index].value, 10);

          switch (resultData) {
            case 1:
              return 'cDayWeather-sun';
            case 2:
            case 3:
              return 'cDayWeather-sun-cloud';
            case 4:
            case 5:
            case 6:
            case 7:
              return 'cDayWeather-cloud';
            default:
              return 'cDayWeather-rain';
          }
        };
      },
    },
    dateToString: {
      get: function() {
        const vm = this;
        return function(index) {
          return vm.dateConvertString[index];
        };
      },
    },
    dataToTraditional: {
      get: function() {
        const vm = this;
        return function(index) {
          return vm.dateConvertTraditional[index];
        };
      },
    },
  },
  // // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    this.getWeatherCallback();
    this.getTemperatureCallback();
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {},
};
