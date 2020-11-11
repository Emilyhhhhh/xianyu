  - 机票项详情信息的展开与收起
  
- `FlightsFilters` 组件实现机票列表的数据筛选

  - 利用组件自定义事件在 `flights.vue` 父组件触发

    ```vue
    <template>
      <!--
        ...
      -->
    	<div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters
          :data="flightsCacheData"
          @filterdata="setFlights"
        />
        <!--
        	...
      	-->
      </div>
    	<!--
        ...
      -->
    </template>
    ```

  - 在父组件需要缓存一份数据，用于返回筛选数据，不断替换展示性数据，实现筛选功能

    - 注意，缓存数据必须利用复制对象的方法，不能直接赋值原始数据，否则会发生值的按引用传递现象

      ```js
      async getFlightsData () {
        const [err, res] = await this.$api.getAirs(this.$route.query)
      
        if (err) {
          return this.$message.error('获取航班信息失败，发生错误')
        }
      
        this.flightsData = res.data
        /*
        缓存一份新的列表数据数据，这个列表不会被修改
        而 flightsData 会被修改，注意这里需要使用 ES9 的解构对象，或者
        Object.assign() 静态方法进行对象的复制，否则会出现引用赋值的现象，两个变量
        指向同一个对象
         */
        this.flightsCacheData = { ...res.data }
        this.setFlights()
      }
      ```

  - 每当展示筛选数据时，分页器重新从第一页展示

    ```vue
    <script>
    data () {
      return {
        flightsData: {
          flights: [],
          info: {},
          options: {}
        }, // 航班总数据，会被筛选出来的数据不停的覆盖
        flightsCacheData: {  // 缓存一份数据，用于返回筛选数据
          flights: [],
          info: {},
          options: {}
        },
        // ...
      }
      // ...
    },
    methods: {
      // 获取一段航班列表数据，设置每一页的航班列表数据
      setFlights (data) {
        // 如果有新数据从第一页开始显示
        if (data) {
          this.pageIndex = 1
          this.flightsData.flights = data
          this.flightsData.total = data.length
        }
    
        const start = (this.pageIndex - 1) * this.pageSize
        const end = start + this.pageSize
        this.flights = this.flightsData.flights.slice(start, end)
      },
      // ...
    }
    </script>
    ```

  - 子组件的筛选操作实现

    - 选择下拉列表时触发筛选操作

    ```vue
    <template>
    <!-- ... -->
    <el-col :span="4">
      <el-select
      	size="mini"
      	v-model="airport"
      	placeholder="起飞机场"
      	@change="filterAirport"
       >
        <el-option
        	v-for="(item, index) in data.options.airport"
        	:key="index"
        	:label="item"
        	:value="item"
        />
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-select
      	size="mini"
      	v-model="flightTimes"
      	placeholder="起飞时间"
      	@change="filterFlightTimes"
      >
        <el-option
        	v-for="(item, index) in data.options.flightTimes"
        	:key="index"
        	:label="`${item.from}:00 - ${item.to}:00`"
        	:value="`${item.from},${item.to}`"
        />
      </el-select>
    </el-col>
    <!-- ... -->
    </template>
    <script>
    // ...
    methods: {
      // 选择机场时候触发
      filterAirport (value) {
        const airportData = this.data.flights.filter(v =>
                                                     v.org_airport_name === value
                                                    )
        this.$emit('filterdata', airportData)
      },
    
      // 选择出发时间时候触发
      filterFlightTimes (value) {
        const [from, to] = value.split(',') // [6,12]
    
        const flightTimesData = this.data.flights.filter(v => {
          // 出发时间小时
          const start = +v.dep_time.split(':')[0]
          return start >= from && start < to
        })
    
        this.$emit('filterdata', flightTimesData)
      }
      // ...
    }
    </script>
    ```

    - 筛选条件撤销功能

      ```js
      // 撤销条件时候触发
      handleFiltersCancel () {
        this.airport = ''
        this.flightTimes = ''
        this.company = ''
        this.airSize = ''
        this.$emit('filterdata', this.data.flights)
      }
      ```

- `FlightsAside` 组件实现侧边栏机票搜索历史记录展示

- 配合 `vuex` 与 `vuex-persistedState` 插件进行机票搜索历史记录本地数据持久化

  ```js
  // @/components/air/SearchForm.vue
  // 提交表单时触发
  handleSubmit () {
  	// ...
    // 存储历史记录并保存到本地
    this.$store.commit('air/setQueryAirsHistory', query)
    // ...
  }
  ```

  ```js
  // @/store/air.js
  export const state = () => ({
    queryAirsHistory: []
  })
  
  export const mutations = {
    setQueryAirsHistory (state, data) {
      state.queryAirsHistory.push(data)
    },
    removeQueryAirsHistory (state) {
      state.queryAirsHistory = []
    }
  }
  ```

  ```js
  // @/plugins/localStorage.js
  createPersistedState({
  	// 这里添加一个 path
    paths: ['user.userInfo', 'air.queryAirsHistory']
  })(store)
  ```

  