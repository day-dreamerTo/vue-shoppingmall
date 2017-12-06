<template>
  <div>
    <v-header></v-header>
    <v-bread><span>goods</span></v-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short">
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
              <dd><a href="javascript:void(0)" @click="priceChecked = 'all'" :class="{'cur': priceChecked === 'all'}">All</a></dd>
              <dd v-for="(item,index) in priceFilter" @click="priceChecked = index">
                <a href="javascript:void(0)" :class="{'cur': priceChecked === index}">{{item.startPrice}} - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/' + item.productImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.productPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
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
        goodsList: [],
        priceChecked: 'all',
        pricePopVisible: false,
        overlayVisible: false,
        priceFilter: [
          {startPrice: 0, endPrice: 500},
          {startPrice: 500, endPrice: 1000},
          {startPrice: 1000, endPrice: 1500},
          {startPrice: 1500, endPrice: 2000},
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
      closePop() {
        this.pricePopVisible = false;
        this.overlayVisible = false;
      },
      showFilterPop() {
        this.pricePopVisible = true;
        this.overlayVisible = true;
      },
      getGoodsList() {
        axios.get('/goods').then((res) => {
          this.goodsList = res.data.result;
        });
      }
    }
  }
</script>
