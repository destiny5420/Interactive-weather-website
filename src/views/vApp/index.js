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
        { x: 0, value: 20 },
        { x: 0, value: 23 },
        { x: 0, value: 28 },
        { x: 0, value: 27.5 },
        { x: 0, value: 22 },
        { x: 0, value: 29 },
        { x: 0, value: 20 },
      ],
      desktopPoints: [40, 90, 140, 190, 240, 290, 340],
      loading: {
        weather: false,
        temperature: false,
      },
      dateConvertString: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      dateConvertTraditional: ['日', '一', '二', '三', '四', '五', '六'],
      weatherData: null,
      curWeather: null,
      location: null,
      darkDay: false,
      deviceIsMobile: true,
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

          switch (parseInt(vm.weatherData[0].value, 10)) {
            case 1:
              vm.curWeather = 'sun';
              break;
            case 2:
            case 3:
              vm.curWeather = 'sun-cloud';
              break;
            case 4:
            case 5:
            case 6:
            case 7:
              vm.curWeather = 'cloud';
              break;
            default:
              vm.curWeather = 'rain';
              break;
          }
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
    showWeatherIcon: {
      get: function() {
        const vm = this;
        return function(name) {
          if (vm.curWeather === name) {
            return true;
          }

          return false;
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
    styleTopBackground: {
      get: function() {
        const time = new Date();
        const hours = time.getHours();
        const percentage = hours / 24;
        return {
          'background-position-x': `${percentage * 100}%`,
        };
      },
    },
  },
  // // life cycle
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    const vm = this;
    // Get weather info
    vm.getWeatherCallback();

    // Get temperature info
    vm.getTemperatureCallback();

    // Setting if dark-day
    const time = new Date();
    if (time.getHours() >= 18 || time.getHours() < 6) {
      vm.darkDay = true;
    }

    // Detecting is mobile ?
    function isMobile() {
      try {
        document.createEvent('TouchEvent');
        return true;
      } catch (e) {
        return false;
      }
    }

    if (isMobile()) {
      vm.deviceIsMobile = true;
      for (let i = 0; i < vm.points.length; i += 1) {
        vm.points[i].x = vm.desktopPoints[i] - 12;
      }
    } else {
      vm.deviceIsMobile = false;
      for (let i = 0; i < vm.points.length; i += 1) {
        vm.points[i].x = vm.desktopPoints[i];
      }
    }
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  Destroy: function() {},
};
