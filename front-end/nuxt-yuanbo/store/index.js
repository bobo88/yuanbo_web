export const state = () => ({
  topicTypeList: [],
  rankList: []
})

export const mutations = {
  SET_TOPIC_TYPE_LIST(state, payload) {
    state.topicTypeList = [].concat(payload)
  },
  SET_RANK_LIST(state, payload) {
    state.rankList = [].concat(payload)
  }
}

export const actions = {
  // 获取其他分类
  async getTopicTypeList({ commit }) {
    this.$axios.get('/api/blog/topic/list').then((res) => {
      const resData = res.data
      if (resData && resData.code === 0) {
        const resDataData = resData.data
        if (resDataData.list && resDataData.list.length > 0) {
          commit('SET_TOPIC_TYPE_LIST', resDataData.list)
        } else {
          commit('SET_TOPIC_TYPE_LIST', [])
        }
      }
    })
  },
  // 获取热度排行榜
  async getBlogRankList({ commit }) {
    this.$axios.post('/api/blog/rank').then((res) => {
      const resData = res.data
      if (resData && resData.code === 0) {
        const resDataData = resData.data
        if (resDataData.list && resDataData.list.length > 0) {
          commit('SET_RANK_LIST', resDataData.list)
        } else {
          commit('SET_RANK_LIST', [])
        }
      }
    })
  }
}