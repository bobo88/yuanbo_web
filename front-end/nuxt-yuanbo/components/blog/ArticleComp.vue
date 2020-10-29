<template>
  <div class="container">
    <h1>{{ dataDetail.title }}</h1>
    <div class="info">
      <span>作者：{{ dataDetail.author }}</span>
      <span>日期：{{ dataDetail.createtime | dateFormatYyyyMmDd }}</span>
      <span>点击：{{ dataDetail.hot ? dataDetail.hot : 0 }}</span>
    </div>

    <div class="content">
      <div class="ql-editor">
        <!-- <div v-html="test"></div> -->
        <div v-html="dataDetail.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataDetail: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      test: `
        <p>有时候，我们会在jQuery框架或者其他js插件中发现里面有很多 “ &amp;&amp; ” 和 “ || ”，那么这两个标识到底是什么含义？怎么使用？我觉得还是有必要稍微深究一下。</p><h2>一、原理:</h2><p>&amp;&amp; 操作符特点：逻辑运算表达式中只要一个是false就取false的值，都是true取后面，都是false取前面。</p><p>|| 操作符特点：逻辑运算表达式中只要一个是true就取true的值，都是true取前面，都是false取后面。</p><p>在js逻辑运算中，我们知道 <strong><em>0、""、null、false、undefined、NaN</em> </strong>这五种数据类型是会被判断为false的。那么，我们在进行js的逻辑运算过程中，就可以根据上面的原理以及这五种数据类型来进行相应的判断处理。直接上DEMO...</p><h2>二、原始DEMO：</h2><p>先亮出问题！！！</p><p>如果我们要根据学生的成绩来判断等级，比如：90分表示A，80分表示B，60分表示C，其他表示D。</p><p>那么我们可以这么做：</p><pre class="ql-syntax" spellcheck="false">var score = 90;
var grade = '';
if(score === 90){
&nbsp; grade = "A";
}else if(score === 80){
&nbsp; grade = "B";
}else if(score === 60){
&nbsp; grade = "C";
}else{
&nbsp; grade = "D";
}
console.log("当前学生等级为：" + grade); // 当前学生等级为：A
</pre><p>或者这样：</p><pre class="ql-syntax" spellcheck="false">var score = 90;
var grade = '';
switch(score){
&nbsp; case 90:
&nbsp; &nbsp; grade = "A";
&nbsp; &nbsp; break;
&nbsp; case 80:
&nbsp; &nbsp; grade = "B";
&nbsp; &nbsp; break;
&nbsp; case 60:
&nbsp; &nbsp; grade = "C";
&nbsp; &nbsp; break;
&nbsp; default:
&nbsp; &nbsp; grade = "D";
&nbsp; &nbsp; break;
};
console.log("当前学生等级为：" + grade); // 当前学生等级为：A
</pre><h2>三、优化DEMO：</h2><p>其实，如果我们用 “ &amp;&amp; ” 和 “ || ” 的话，大可不必如上面那么麻烦。</p><pre class="ql-syntax" spellcheck="false">var score = 90;
var grade = (score===90 &amp;&amp; 'A') || (score===80 &amp;&amp; 'B') || (score===60 &amp;&amp; 'C') || 'D';
console.log("当前学生等级为：" + grade); // 当前学生等级为：A
</pre><p>上面代码可以这么理解：</p><p>&nbsp;如果score的值等于90，那么score===90的逻辑表达式就成立（也即是true），就会执行到后面 'A' 的赋值操作，同时后面的“||” 逻辑运算也可以忽略（因为“||”运算符的特点是前面一旦为true，后面就没有执行的必要了）。</p><p>&nbsp;如果score的值不等于90，那么score===90的逻辑表达式就不成立（也即是false），根据“&amp;&amp;”操作符的特点，我们知道“(score===90 &amp;&amp; 'A')”这段代码就不会执行到后面 'A' 的赋值操作，同时由于“(score===90 &amp;&amp; 'A')”这段代码整体是false，那么根据“||”的特点，整个逻辑表达式会继续往后执行。</p><p>&nbsp;以此类推，如果前面所有的逻辑表达式都不成立，那么根据“||”的特点（全部为false就取最后面的），最后的grade赋值就会是“D”。&nbsp;</p><p>我们还可以用 <strong><em>JSON</em></strong> 形式来处理上面的逻辑运算：</p><pre class="ql-syntax" spellcheck="false">var score = 90;
var grade = {90:"A", 80:"B", 60:"C"}[score] || 'D';
console.log("当前学生等级为：" + grade); // 当前学生等级为：A
</pre><p>这里利用了JSON对象的属性读取，当“JSON对象.属性值”存在的时候（为true），就会取得对应属性的key值（A、B或者C）。当score属性值不存在与JSON对象中的时候，就会执行“||”后面的内容，也就是把grade赋值为“D”。</p><p>当然，我们会发现上面的数值比较并没有太大的实用性，比如当学生的成绩在85分的时候，等级也会变成“D”，这明显是不合适的！！！</p><p>所以我们可以把上面的代码再优化下，把数值的 “相等比较” 改成 “范围区间比较” 。</p><pre class="ql-syntax" spellcheck="false">var score = 85;
var grade = (score&gt;=90 &amp;&amp; 'A') || (score&gt;=80 &amp;&amp; 'B') || (score&gt;=60 &amp;&amp; 'C') || 'D';
console.log("当前学生等级为：" + grade); // 当前学生等级为：B
</pre><p><br></p><p><br></p>
        `
    }
  },
  computed: {},
  created () {
    // xx
  },
  mounted () {
    // xx
  },
  methods: {
    handleSelect () {}
  }
}
</script>

<style lang="scss" scoped>
</style>
