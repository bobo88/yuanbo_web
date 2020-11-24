<template>
  <div class="OprateNews" v-loading="loading" :max-height="$store.state.auth.bodyHight">
    <div class="common-content">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="common-tit">
				<el-breadcrumb-item>{{$t("message.NewsContents")}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/news/news-list' }">{{$t("message.NewsList")}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ $route.query.type === 'edit' ? $t("message.edit") : $t("message.add") }}</el-breadcrumb-item>
			</el-breadcrumb>

			<div class="cont-cont">
        <!-- 注意：PC端新闻页面展示必须加上 ql-editor -->
        <div class="ql-editor">
          <div v-html="newsData.content"></div>
        </div>
        {{newsData.content}}
        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.Title') }}:</p>
          <div class="cont-tmain"><el-input clearable size="mini" class="w100Percent mb5" v-model="newsData.title"></el-input></div>
        </div>
        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.FullContent') }}:</p>
          <div class="cont-tmain">
            <!-- 富文本编辑器 -->
            <quill-editor
              ref="myQuillEditor"
              v-model="newsData.content"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            />
          </div>
        </div>

        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.NewsLanguage') }}:</p>
          <div class="cont-tmain">
            <el-select clearable size="mini" class="w100Percent mb5" v-model="newsData.language">
              <el-option key="0" label="中文" value="cn"></el-option>
              <el-option key="1" label="English" value="en"></el-option>
            </el-select>
          </div>
        </div>
        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.NewsType') }}:</p>
          <div class="cont-tmain">
            <el-select clearable size="mini" class="w100Percent mb5" v-model="newsData.type">
              <el-option key="0" :label="$t('message.CompanyNews')" value="company"></el-option>
              <el-option key="1" :label="$t('message.IndustryNews')" value="industry"></el-option>
            </el-select>
          </div>
        </div>
        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.NewsPosition') }}:</p>
          <div class="cont-tmain">
            <el-select clearable size="mini" class="w100Percent mb5" v-model="newsData.position">
              <el-option key="0" label="Yes" value="0"></el-option>
              <el-option key="1" label="No" value="1"></el-option>
            </el-select>
          </div>
        </div>

        <div class="mb20">
          <p class="cont-tname mb10 fb">{{ $t('message.CoverPicture') }}:</p>
          <div class="cont-tmain">
            <el-upload v-loading="loadingUploadFile1" element-loading-spinner="el-icon-loading" class="avatar-uploader uploader-cover inline-block vm"
              :action="actionImageUrl" :headers="headers" :show-file-list="false" :on-success="function(res, file) {handleAvatarSuccess(res, file, 1)}" :before-upload="function(file) {beforeAvatarUpload(file, 1)}" :on-error="handleAvatarError">
              <img style="width:100%;height:100%;" v-if="newsData.coverImage" :src="newsData.coverImage" class="avatar-upload-image">
              <i v-else class="el-icon-plus f20 avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>

        <div>
          <el-button size="mini" @click="search" type="primary" class="w250">{{ $t('message.Submit') }}</el-button>
          <el-button size="mini" @click="OnekeyReset" type="danger" class="w150">{{ $t('message.OnekeyReset') }}</el-button>
        </div>
        
			</div>
    </div>

  </div>
</template>

<script>


export default {
	name: 'OprateNews',
	data () {
		return {
      loading: false,
      newsData: {},
      editorOption: {
        // Some Quill options...
      }
		};
	},
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    // 根据ID获取新闻详情数据
    this.getNewsDetailById();
    console.log('this is current quill instance object', this.editor)
  },
	methods: {
    async OnekeyReset () {
      let callback = await this.$confirm(
        this.$t('message.PromptInformation.areYouSure'),
        this.$t('message.PromptInformation.prompt'),
        {
          confirmButtonText: this.$t('message.PromptInformation.YES'),
          cancelButtonText: this.$t('message.PromptInformation.NO'),
          type: 'warning',
          center: true
        }
      );
      if (callback) {
        this.newsData = Object.assign(this.newsData, {
          title: '',
          content: '',
          shortContent: '',
          language: '',
          type: '',
          coverImage: ''
        });
      }
    },
    getNewsDetailById () {
      if (!this.$route.query.id) {
        this.newsData = {
          title: '',
          content: '',
          shortContent: '',
          language: '',
          type: '',
          coverImage: ''
        };
      } else {
        this.newsData = {
          id: '1',
          title: '创业邦：如何打造出非洲流媒体音乐第一名？',
          content: `
            <div data-v-4f9a7542=""><p>以下文章来源于创业邦 ，作者孔露娇</p><p><br></p><p>文丨孔露娇</p><p>编辑丨杨绚然</p><p>视频丨Facebook x 创业邦</p><p><br></p><p><br></p><p>“非洲之王”传音不仅在非洲卖手机。</p><p>除了硬件产品，传音也在往互联网方向发展。2015年，传音控股旗下一款手机推出预装音乐播放器Boomplay，面向非洲用户提供全球正版音乐和视频在线播放下载服务。</p><p>在音乐方面，网易更擅长。2017年，传音控股与网易成立合资公司传易，Boomplay作为双方战略合作的一部分，由传易旗下全资子公司传易音乐进行具体运营，并独立发展。</p><p>传音和网易的渊源实际上早于传易的成立。2017年6月，传音完成 B 轮融资，网易为投资方之一。对网易来说，在阿里、腾讯频频下注东南亚和印度之后，非洲或许会成为其最重要的海外市场。</p><p>这为后来Boomplay的爆发奠定了基础。</p><p>经过五年的发展，Boomplay已经成为非洲最大的流媒体音乐平台，月活用户达3000万，曲库规模达2000万。市场主要集中在尼日利亚、肯尼亚、加纳、坦桑尼亚、乌干达、赞比亚、卢旺达等地区。</p><p>对于成功背后的原因，Boomplay CEO贺晓秋在接受采访时表示，产品一开始的定位是内容驱动，产品深度挖掘了非洲用户的需求，为非洲用户定制了某些功能。</p><p>在非洲流媒体音乐市场，Boomplay的快速增长已经引来了国际巨头的注意，Spotify 和 Apple Music 相继进入非洲市场。</p><p>Boomplay的优势在于内容版权，目前已经与全球三大唱片公司环球音乐、华纳音乐、索尼音乐以及全球最大独立音乐发行商Merlin Network达成版权合作。</p><p>在麦星投资李鑫看来，音乐是当地非常头部的品类，整个非洲市场未来潜力巨大，无论是经济增长的潜力，还是C端对于音乐的消费意愿，都让这个行业充满了前景。</p><p>近日，Facebook与创业邦对话了Boomplay 创始人兼CEO贺晓秋、麦星投资李鑫，分享了中国创业者进击非洲音乐市场的故事。</p><p><img src="http://www.yuanbo-web.com/assets/images/cyb.jpeg"></p><p>从左至右依次为麦星投资李鑫(Tony)、Boomplay创始人兼CEO贺晓秋(Joe)、Facebook大中华区营销总监陈耿星(Patrick)。</p><p>主持人：越来越多的中国企业开始对非洲市场感兴趣，早在2015年Boomplay就在非洲尼日利亚问世，现在发展成了非洲最大的在线音乐平台。我想问一下Joe（贺晓秋），当时你为什么会选择非洲市场？你觉得非洲市场有哪些机遇和挑战？</p><p>贺晓秋：一开始是因为传音，所以我们选择了非洲。后来发现在非洲其实有很多的机会，就继续在非洲市场深耕移动互联网，选择了音乐这样一个在非洲最高频的场景作为切入口。Boomplay原本是预装于传音手机的一款音乐播放器，后来我们独立出来发展成一个音乐媒体服务。</p><p>主持人：一开始做非洲市场就获得了当地用户的认可，你觉得这背后成功的最大原因是什么？</p><p>贺晓秋：因为我们的业务从一开始的定位就是内容驱动，产品也专门为非洲用户打造了一些功能，深度挖掘了非洲用户的需求。</p><p>主持人：现在Boomplay和网易、传音，这三家的关系是怎样的？</p><p>贺晓秋：传音和网易都是我们的大股东。传音对我们最大的支持，主要是流量方面和本地运营方面。网易旗下的网易音乐，在中国来讲应该是最受欢迎的音乐流媒体服务，我们两个团队定期会有很多交流。</p><p>我们从他们身上学到了很多，他们帮Boomplay在产品以及运营方面避免踩了很多坑，一些关键的布局也吸取了他们的经验，这让我们确实非常有信心。</p><p>主持人：作为一个独立的公司，Boomplay接下来会有哪些战略布局？</p><p>贺晓秋：首先是内容版权上的布局，既要有广度也要有深度，广度其实我们已经有了，接下来比较重要的就是版权储备的深度。</p><p>我们希望能够成为一个在非洲市场举足轻重的版权公司，这是我们接下来在版权上的布局规划。同时，我们也希望能够利用已经搭建起来的全球广泛的合作关系，把非洲音乐带向全世界。</p><p><img src="http://www.yuanbo-web.com/assets/images/cyb2.jpeg"></p><p>主持人：2019年初，Boomplay获得2000万美元的融资，麦星作为领投方，从投资的角度，当时为什么看好Boomplay？接下来会有哪些机遇跟挑战？</p><p>李鑫：我们首先是传音的投资人，所以对传音在海外的互联网业务布局，很早就有了解。其次从需求的角度，我们也充分认识到音乐是非常头部的一个品类，这一点我们在非洲当地看了以后才会有很深的感触。</p><p>无论是创业者还是投资人，我们大多数人最开始出海的时候，都会很自然的带有一种固有的框架去看待新兴市场。但实际上当你深入实地了解以后，会发现当地C端的生活状态和需求点、需求刚性和固有的框架完全不一样。</p><p>对于非洲当地老百姓来讲，没有其它的娱乐方式，电视内容很贵，所以音乐是非常重要的娱乐消遣的品类，需求非常刚性，我觉得这是非常重要的一点。</p><p>内容这东西一定要本地化。非洲这个地方，用户大部分的音乐消费是本地化的内容需求，虽然大家也能接触到欧美流行音乐，但本地内容在排行榜上长期都占据统治性的地位，这是我们持续看好非洲流媒体音乐和投资Boomplay的一个很重要的原因。</p><p>主持人：关于非洲流媒体市场的商业化变现，你有怎样的看法？</p><p>李鑫：在我看来，它的变现路径一定大概率跟中国、美国都不一样，一定要摸出独特的适应当地环境和条件的方式，肯定不是简单的照搬。</p><p>对于所有中国内容方面的出海，我都有同样的看法，照搬一个在国内或者美国成功的模式到新兴市场，大概率是不会成功的。一定要会去了解当地需求，创造出真正有用户价值的本地化产品。要依据当地的需求和基础设施条件，摸索出适合你的、适合当地的商业模式。</p><p>主持人：未来可能还有更多像传音、Boomplay这样的中国企业走向非洲市场，你怎么看待整个非洲市场的机遇和挑战？</p><p>李鑫：如果从大的周期来看，我觉得非洲市场还是非常promising（有潜力）的。它的资源非常丰富，土地、能源等自然资源丰富，劳动力人口高速增长且非常年轻。</p><p>地方政局逐渐稳定下来，基础条件也在慢慢改善，人口红利不断释放，所以从长周期的角度看，我觉得非洲的发展基础还是非常好的。从挑战的角度来讲，我觉得最重要的是文化对于组织管理的挑战和机会的时间窗口匹配问题。</p><p>主持人：麦星其实也投资了其它新兴市场的企业，你觉得非洲市场有何不同？</p><p>李鑫：不同经济体所处的发展阶段、自然和地缘环境不同，因此商业上演进的路径可能也就不太一样。需要依据拥有的资源、能力的独特优势，结合本地的特点和约束条件来确定自己的发展路径。</p><p>我觉得未来的全球化发展策略，或者说中国企业、中国创业者出海的策略，一定要沿着这个方向走。</p></div>
          `,
          shortContent: `
            以下文章来源于创业邦 ，作者孔露娇
  
              &nbsp;
  
              文丨孔露娇
  
              编辑丨杨绚然
  
              视频丨Facebook x 创业邦
  
  
  
              &nbsp;.....
          `,
          language: 'cn',
          type: 'company',
          coverImage: 'https://preview.pro.ant.design/static/logo.f0355d39.svg'
        };
      }
    },
		onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    // --------------------------- 上传图片相关方法 ------------------------------------------
    beforeAvatarUpload (file, type) {
      // this[`loadingUploadFile${type}`] = true;
    },
    handleAvatarSuccess (res, file, type) {
      // this['loadingUploadFile' + type] = false;
      // if (parseInt(res.code) === 0) {
      //   switch (type) {
      //     case 1:
      //       this.dataHottopic.pictureUrlBig = res.data.cdnUrl;
      //       this.dataHottopic.pictureBigHeight = res.data.height;
      //       this.dataHottopic.pictureBigWidth = res.data.width;
      //       break;
      //     case 2:
      //       this.dataHottopic.pictureUrlSmall = res.data;
      //       break;
      //     case 3:
      //       this.dataHottopic.pictureUrlUserBg = res.data;
      //       break;
      //     default:
      //       break;
      //   }
      //   this.$message.success(this.$t('message.PromptInformation.uploadSuccess'));
      // } else {
      //   this.$message.error(this.$t('message.PromptInformation.uploadFail'));
      // }
    },
    handleAvatarError() {
      // this.loadingUploadFile1 = false;
      // this.loadingUploadFile2 = false;
      // this.loadingUploadFile3 = false;
      // this.$message.error(this.$t('message.PromptInformation.uploadFail'));
    }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="scoped" type="text/css">

</style>
