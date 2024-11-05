import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as s,e as n}from"./app-Ba--U_Af.js";const a={},o=n(`<h1 id="jedis-cluster模式连接出现no-more-cluster-attempts-left" tabindex="-1"><a class="header-anchor" href="#jedis-cluster模式连接出现no-more-cluster-attempts-left"><span>Jedis cluster模式连接出现No more cluster attempts left</span></a></h1><p>同事在测试环境jedis cluster模式出现<code>redis.clients.jedis.exceptions.JedisClusterMaxAttemptsException: No more cluster attempts left.</code>报错，找到我帮忙定位下问题</p><p><img src="https://cdn.dhbin.cn/202304102012717.png" alt=""></p><p>通过堆栈信息找到对应的源码位置<code>redis.clients.jedis.JedisClusterCommand#runWithRetries</code></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>  <span class="token keyword">private</span> <span class="token class-name">T</span> <span class="token function">runWithRetries</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">int</span> slot<span class="token punctuation">,</span> <span class="token keyword">int</span> attempts<span class="token punctuation">,</span> <span class="token keyword">boolean</span> tryRandomNode<span class="token punctuation">,</span> <span class="token class-name">JedisRedirectionException</span> redirect<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>attempts <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">JedisClusterMaxAttemptsException</span><span class="token punctuation">(</span><span class="token string">&quot;No more cluster attempts left.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从源码中分析得到，在测试<code>attempts</code>次之后就会抛出<code>No more cluster attempts left</code>的异常，根据源码下文有两种异常会导致重试</p><ul><li>JedisConnectionException：连接redis出现异常</li><li>JedisRedirectionException：redis重定向会抛出的异常，比如MOVE</li></ul><p><img src="https://cdn.dhbin.cn/202304102012522.png" alt=""></p><p>在对应的位置打上断点，运行出现问题的接口，出现以下报错</p><p><img src="https://cdn.dhbin.cn/202304102012155.png" alt=""></p><p>问题就很明显了，<code>ERR Client sent AUTH, but no password is set</code>，意思是项目配置设置了密码，但是这个redis节点没有设置密码，是运维的同学漏配置了</p>`,11),c=[o];function p(i,r){return e(),s("div",null,c)}const u=t(a,[["render",p],["__file","Jedis cluster模式连接出现No more cluster attempts left.html.vue"]]),m=JSON.parse('{"path":"/tech/java/Jedis%20cluster%E6%A8%A1%E5%BC%8F%E8%BF%9E%E6%8E%A5%E5%87%BA%E7%8E%B0No%20more%20cluster%20attempts%20left.html","title":"Jedis cluster模式连接出现No more cluster attempts left","lang":"zh-CN","frontmatter":{"date":"2023-04-10T00:00:00.000Z","category":["Java"],"tag":["Java","Jedis","Redis"],"description":"Jedis cluster模式连接出现No more cluster attempts left 同事在测试环境jedis cluster模式出现redis.clients.jedis.exceptions.JedisClusterMaxAttemptsException: No more cluster attempts left.报错，找到我帮忙定...","head":[["meta",{"property":"og:url","content":"https://dhbin.cn/tech/java/Jedis%20cluster%E6%A8%A1%E5%BC%8F%E8%BF%9E%E6%8E%A5%E5%87%BA%E7%8E%B0No%20more%20cluster%20attempts%20left.html"}],["meta",{"property":"og:site_name","content":"HB技术栈"}],["meta",{"property":"og:title","content":"Jedis cluster模式连接出现No more cluster attempts left"}],["meta",{"property":"og:description","content":"Jedis cluster模式连接出现No more cluster attempts left 同事在测试环境jedis cluster模式出现redis.clients.jedis.exceptions.JedisClusterMaxAttemptsException: No more cluster attempts left.报错，找到我帮忙定..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.dhbin.cn/202304102012717.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-10T12:15:46.000Z"}],["meta",{"property":"article:author","content":"DHB"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Jedis"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:published_time","content":"2023-04-10T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-10T12:15:46.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jedis cluster模式连接出现No more cluster attempts left\\",\\"image\\":[\\"https://cdn.dhbin.cn/202304102012717.png\\",\\"https://cdn.dhbin.cn/202304102012522.png\\",\\"https://cdn.dhbin.cn/202304102012155.png\\"],\\"datePublished\\":\\"2023-04-10T00:00:00.000Z\\",\\"dateModified\\":\\"2023-04-10T12:15:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DHB\\",\\"url\\":\\"https://dhbin.cn\\"}]}"]]},"headers":[],"git":{"createdTime":1681128946000,"updatedTime":1681128946000,"contributors":[{"name":"dhb","email":"xx158@qq.com","commits":1}]},"readingTime":{"minutes":0.81,"words":243},"localizedDate":"2023年4月10日","excerpt":"\\n<p>同事在测试环境jedis cluster模式出现<code>redis.clients.jedis.exceptions.JedisClusterMaxAttemptsException: No more cluster attempts left.</code>报错，找到我帮忙定位下问题</p>\\n<p><img src=\\"https://cdn.dhbin.cn/202304102012717.png\\" alt=\\"\\"></p>\\n<p>通过堆栈信息找到对应的源码位置<code>redis.clients.jedis.JedisClusterCommand#runWithRetries</code></p>","autoDesc":true}');export{u as comp,m as data};
