<template>
    <div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了..." @load="onLoad">
          <newsItem
            v-for="(item,key) in list"
            :key="key"
            :userName="item.CreateName"
            :subInfo="item.CreateDate | datetime2String('recently')"
            :content="item.PostTitle"
            :picList="item.AttachmentList | filePathArr('AttachmentId')"
            :overLength="100"
            @click.native="onItemClick(item)"
          ></newsItem>
          <van-skeleton title avatar :row="4" :loading="skeletonLoading" />
          <van-skeleton title avatar :row="4" :loading="skeletonLoading" />
          <van-skeleton title avatar :row="4" :loading="skeletonLoading" />
          <van-skeleton title avatar :row="4" :loading="skeletonLoading" />
          <van-skeleton title avatar :row="4" :loading="skeletonLoading" />
        </van-list>
      </van-pull-refresh>
    </div>
</template>
<script>
import newsItem from '../../components/panel/newsItem'
import bbsApis from '../../apis/post.js'
import clubApis from '../../apis/club.js'
import floatNav from '../../components/nav/floatNav'
export default {
  name: 'home',
  components: { newsItem, floatNav },
  data () {
    return {
      rows: 10,
      page: -1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      skeletonLoading: false,
      onLoadLock: false
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    onLoad () {
      if (!this.onLoadLock) {
        this.onLoadLock = true
        let _this = this
        this.skeletonLoading = true
        this.loading = true
        this.page++

        this.getNewsList().then(
          res => {
            this.onLoadLock = false
            this.loading = false
            this.skeletonLoading = false
          },
          err => {
            this.onLoadLock = false
            this.loading = false
            this.skeletonLoading = false
            this.finished = true
          }
        )
      }
    },
    onRefresh () {
      this.page = 0
      this.refreshing = true
      this.finished = false
      let length = this.list.length
      for (let i = 0; i < length; i++) {
        this.list.shift()
      }
      this.getNewsList().then(res => {
        this.refreshing = false
      })
    },
    getNewsList () {
      let _this = this
      return new Promise((resolve, reject) => {
        bbsApis.getAllPostList(this.rows, this.page).then(res => {
          if (res.length > 0) {
            for (let item of res) {
              _this.list.push(item)
            }
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    onItemClick (item) {
      this.$router.push({
        name: 'postDetail',
        query: {
          postId: item.PostId
        }
      })
    },
    handleItemClick: function (name) {
      if (name === '发帖') {
        this.$router.push({
          name: 'addPostHead',
          query: {
            clubId: this.club.Id,
            clubName: this.club.Name
          }
        })
      }
      if (name === '刷新') {
        this.$router.go(0)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.club-info {
  position: relative;
  border-bottom: 1px solid #e9e9e9;
  padding: 10px 5px;
  .club-icon {
    float: left;
    >>> img {
      border-radius: 20px;
    }
  }

  .club-content {
    float: left;
    .content-title {
      font-size: 15px;
      line-height: 25px;
    }
  }

  .club-opera {
    position: absolute;
    right: 10px;
    top: 20px;
  }
}
</style>
