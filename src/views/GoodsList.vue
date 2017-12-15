<template>
  <div>
    <v-header></v-header>
    <v-bread><span>goods</span></v-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sort">Price
            <svg class="icon icon-arrow-short" :class="{'sort-up': !sortFlag}">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter屏幕小时隐藏  点击Filter by之后显示-->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': pricePopVisible}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" @click="priceFilter('all')" :class="{'cur': priceChecked === 'all'}">All</a>
              </dd>
              <dd v-for="(item,index) in priceFilters" @click="priceFilter(index)">
                <a href="javascript:void(0)" :class="{'cur': priceChecked === index}">{{item.startPrice}} -
                  {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/' + item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">${{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="60">
                <img  v-show="!noData" src="../../static/loading-svg/loading-bars.svg"/>
                <span v-show="noData">没有更多了</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overlayVisible" @click="closePop"></div>
    <v-footer></v-footer>
  </div>
</template>
<script type="text/ecmascript-6">
  import vHeader from '@/components/Header.vue';
  import vFooter from '@/components/Footer.vue';
  import vBread from '@/components/Bread.vue';
  import axios from 'axios';
  export default{
    data(){
      return {
        busy: true,
        goodsList: [],
        sortFlag: true,
        noData: false,
        priceChecked: 'all',
        pricePopVisible: false,
        overlayVisible: false,
        page: 1,
        pageSize: 8,
        priceFilters: [
          {startPrice: 0, endPrice: 500},
          {startPrice: 500, endPrice: 1000},
          {startPrice: 1000, endPrice: 1500},
          {startPrice: 1500, endPrice: 2000},
          {startPrice: 2000, endPrice: 5000},
        ]
      }
    },
    components: {
      vHeader,
      vFooter,
      vBread
    },
    mounted() {
      this.getGoodsList();
    },
    methods: {
      addCart(productId) {
        axios.post('/goods/addCart', {
          productId
        }).then((res) => {
          const data = res.data;
          if(data.status === 1) {
            alert('加入成功');
          } else {
            alert('msg: ' + data.msg);
          }
        });
      },
      priceFilter(index) {
        this.priceChecked = index;
        this.page = 1;
        this.getGoodsList();
      },
      loadMore() {
        // 先禁用上拉加载 以防多次上拉多次请求数据
        this.busy = true;
        this.page++;
        setTimeout(() => {
          this.getGoodsList(true);
        }, 500);
      },
      sort() {
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.getGoodsList();
      },
      closePop() {
        this.pricePopVisible = false;
        this.overlayVisible = false;
      },
      showFilterPop() {
        this.pricePopVisible = true;
        this.overlayVisible = true;
      },
      getGoodsList(flag) {
        let params = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceChecked
        };
        axios.get('/goods', {params: params}).then((res) => {
          const data = res.data;
          if (data.status === 1) {
            // 如果是分页
            if (flag) {
              // 如果没有商品了
              if (data.data.count === 0) {
                // 禁用上拉加载更多
                this.busy = true;
                this.noData = true;
              } else {
                this.goodsList = this.goodsList.concat(data.data.list);
                this.busy = false;
              }
            } else {
              this.goodsList = data.data.list;
              this.busy = false;
            }
          } else {
            this.goodsList = [];
          }
        });
      }
    }
  }
</script>
<style>
  .load-more{
    text-align: center;
    height: 100px;
  }
</style>
