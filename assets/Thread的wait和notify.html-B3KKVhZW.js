import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as t,o as p,c as e,a as n,b as c,d as o,e as i}from"./app-Ba--U_Af.js";const l={},u=i(`<h1 id="thread的wait和notify" tabindex="-1"><a class="header-anchor" href="#thread的wait和notify"><span>Thread的wait和notify</span></a></h1><p>当不同线程之间需要通信时，就要使用到wait和notify这两个方法</p><h2 id="wait的作用" tabindex="-1"><a class="header-anchor" href="#wait的作用"><span>wait的作用</span></a></h2><p>让线程进入阻塞状态，并且会释放线程占有的锁，并交出CPU执行权限。</p><h2 id="nofity" tabindex="-1"><a class="header-anchor" href="#nofity"><span>nofity</span></a></h2><p>唤醒等待队列中的某个线程，如果时多个线程同时等待并不能指定唤醒某个线程，这有CPU来决定</p><h2 id="notifyall" tabindex="-1"><a class="header-anchor" href="#notifyall"><span>notifyAll</span></a></h2><p>这个方法则是唤醒等待队列中的所有线程</p><h1 id="实践" tabindex="-1"><a class="header-anchor" href="#实践"><span>实践</span></a></h1><blockquote><p>实现一个容器，提供get和size两个方法，些两个线程，线程1添加10个元素到容器中，线程2实现监控元素的个数，当个数大于5时，线程2给出提示并结束</p></blockquote><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码"><span>代码</span></a></h2><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>dhbin</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">TimeUnit</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 实现一个容器，提供get和size两个方法，些两个线程，线程1添加10个元素到容器中，
 * 线程2实现监控元素的个数，当个数大于5时，线程2给出提示并结束
 * 使用Thread的wait和notify实现
 *
 * <span class="token keyword">@author</span> dhb
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Container1</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 容器
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Container1</span> c <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Container1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">/*
        * 监控大小的线程必须先执行，因为如果添加元素线程先执行的话，添加元素线程
        * 取到了锁并不释放，监控大小的线程就无法加入while块
        * */</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        lock<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;容器到达5个，结束&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// 唤醒添加元素线程</span>
                    lock<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    c<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;---&quot;</span> <span class="token operator">+</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 通知监控大小线程，notify并不会释放锁</span>
                        lock<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">try</span> <span class="token punctuation">{</span>
                            <span class="token comment">// wait让出cpu，让监控大小线程执行</span>
                            lock<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="资料" tabindex="-1"><a class="header-anchor" href="#资料"><span>资料</span></a></h1>`,13),k={href:"https://juejin.im/post/5bbc9311f265da0ac6696d06",target:"_blank",rel:"noopener noreferrer"};function r(d,m){const s=t("ExternalLinkIcon");return p(),e("div",null,[u,n("p",null,[n("a",k,[c("Java并发编程（一）Thread详解"),o(s)])])])}const h=a(l,[["render",r],["__file","Thread的wait和notify.html.vue"]]),y=JSON.parse('{"path":"/tech/java/Thread%E7%9A%84wait%E5%92%8Cnotify.html","title":"Thread的wait和notify","lang":"zh-CN","frontmatter":{"date":"2019-07-11T00:42:00.000Z","category":["Java"],"tag":["线程"],"description":"Thread的wait和notify 当不同线程之间需要通信时，就要使用到wait和notify这两个方法 wait的作用 让线程进入阻塞状态，并且会释放线程占有的锁，并交出CPU执行权限。 nofity 唤醒等待队列中的某个线程，如果时多个线程同时等待并不能指定唤醒某个线程，这有CPU来决定 notifyAll 这个方法则是唤醒等待队列中的所有线程 ...","head":[["meta",{"property":"og:url","content":"https://dhbin.cn/tech/java/Thread%E7%9A%84wait%E5%92%8Cnotify.html"}],["meta",{"property":"og:site_name","content":"HB技术栈"}],["meta",{"property":"og:title","content":"Thread的wait和notify"}],["meta",{"property":"og:description","content":"Thread的wait和notify 当不同线程之间需要通信时，就要使用到wait和notify这两个方法 wait的作用 让线程进入阻塞状态，并且会释放线程占有的锁，并交出CPU执行权限。 nofity 唤醒等待队列中的某个线程，如果时多个线程同时等待并不能指定唤醒某个线程，这有CPU来决定 notifyAll 这个方法则是唤醒等待队列中的所有线程 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-22T17:33:14.000Z"}],["meta",{"property":"article:author","content":"DHB"}],["meta",{"property":"article:tag","content":"线程"}],["meta",{"property":"article:published_time","content":"2019-07-11T00:42:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-22T17:33:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Thread的wait和notify\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-07-11T00:42:00.000Z\\",\\"dateModified\\":\\"2023-03-22T17:33:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DHB\\",\\"url\\":\\"https://dhbin.cn\\"}]}"]]},"headers":[{"level":2,"title":"wait的作用","slug":"wait的作用","link":"#wait的作用","children":[]},{"level":2,"title":"nofity","slug":"nofity","link":"#nofity","children":[]},{"level":2,"title":"notifyAll","slug":"notifyall","link":"#notifyall","children":[]},{"level":2,"title":"代码","slug":"代码","link":"#代码","children":[]}],"git":{"createdTime":1679384580000,"updatedTime":1679506394000,"contributors":[{"name":"dhb","email":"xx158@qq.com","commits":1},{"name":"donghaibin","email":"xx158@qq.com","commits":1}]},"readingTime":{"minutes":1.66,"words":497},"localizedDate":"2019年7月11日","excerpt":"\\n<p>当不同线程之间需要通信时，就要使用到wait和notify这两个方法</p>\\n<h2>wait的作用</h2>\\n<p>让线程进入阻塞状态，并且会释放线程占有的锁，并交出CPU执行权限。</p>\\n<h2>nofity</h2>\\n<p>唤醒等待队列中的某个线程，如果时多个线程同时等待并不能指定唤醒某个线程，这有CPU来决定</p>\\n<h2>notifyAll</h2>\\n<p>这个方法则是唤醒等待队列中的所有线程</p>\\n<h1>实践</h1>\\n<blockquote>\\n<p>实现一个容器，提供get和size两个方法，些两个线程，线程1添加10个元素到容器中，线程2实现监控元素的个数，当个数大于5时，线程2给出提示并结束</p>\\n</blockquote>","autoDesc":true}');export{h as comp,y as data};
