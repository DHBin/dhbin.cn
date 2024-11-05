import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as s,e}from"./app-Ba--U_Af.js";const t={},p=e(`<h1 id="jvm中各种内存溢出情况分析" tabindex="-1"><a class="header-anchor" href="#jvm中各种内存溢出情况分析"><span>Jvm中各种内存溢出情况分析</span></a></h1><blockquote><p>本文以 JDK8 来研究讨论，其它 JDK 可能有不同的结果。</p></blockquote><p>oom 即 OutOfMemoryError，出现这个报错的主要原因是<strong>内存空间不足以装下数据导致抛出异常</strong>。要探讨 JVM 出现 oom 的情况，首先要了解下 jvm 的内存模型。</p><p><img src="https://cdn.dhbin.cn/374980155.png" alt="jmm.png"></p><p>上图中每个区域都可能出现 oom，除此之外还有**直接内存（direct memory）**溢出。</p><h1 id="堆溢出" tabindex="-1"><a class="header-anchor" href="#堆溢出"><span>堆溢出</span></a></h1><p>java 堆用于存储对象实例，只要不断地产生对象，并且<strong>保证 GC Roots 到对象之间有可达路径来避免垃圾回收机制清除这些对象</strong>，那么在对象数量达到最大堆的容量限制后就会产生内存溢出异常。</p><h2 id="可达性分析算法" tabindex="-1"><a class="header-anchor" href="#可达性分析算法"><span>可达性分析算法</span></a></h2><p>判断对象是否可以回收采用的是可达性分析算法，只要被 gc roots 引用的对象就不会被回收。那么 gc root 有那几种？一个对象可以属于多个 root，GC root 有几下种： ・Class - 由系统类加载器 (system class loader) 加载的对象，这些类是不能够被回收的，他们可以以静态字段的方式保存持有其它对象。我们需要注意的一点就是，通过用户自定义的类加载器加载的类，除非相应的 java.lang.Class 实例以其它的某种（或多种）方式成为 roots，否则它们并不是 roots</p><p>・Thread - 活着的线程</p><p>・Stack Local - Java 方法的 local 变量或参数</p><p>・JNI Local - JNI 方法的 local 变量或参数</p><p>・JNI Global - 全局 JNI 引用</p><p>・Monitor Used - 用于同步的监控对象</p><p>・Held by JVM - 用于 JVM 特殊目的由 GC 保留的对象，但实际上这个与 JVM 的实现是有关的。可能已知的一些类型是：系统类加载器、一些 JVM 知道的重要的异常类、一些用于处理异常的预分配对象以及一些自定义的类加载器等。然而，JVM 并没有为这些对象提供其它的信息，因此就只有留给分析分员去确定哪些是属于 &quot;JVM 持有&quot; 的了。</p><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子"><span>例子</span></a></h2><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * VM args: -Xmx20m -Xms20m -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=<span class="token punctuation">{</span>HeapDump文件目录<span class="token punctuation">}</span>
 *
 * <span class="token keyword">@author</span> donghaibin
 * <span class="token keyword">@date</span> 2020/1/20
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HeapOomTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">OomObject</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">OomObject</span><span class="token punctuation">&gt;</span></span> oomObjects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            oomObjects<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OomObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java.lang.OutOfMemoryError: Java heap space
Dumping heap to java_pid56168.hprof ...
Heap dump file created [28216756 bytes in 0.077 secs]
Exception in thread &quot;main&quot; java.lang.OutOfMemoryError: Java heap space
    at java.util.Arrays.copyOf(Arrays.java:3210)
    at java.util.Arrays.copyOf(Arrays.java:3181)
    at java.util.ArrayList.grow(ArrayList.java:265)
    at java.util.ArrayList.ensureExplicitCapacity(ArrayList.java:239)
    at java.util.ArrayList.ensureCapacityInternal(ArrayList.java:231)
    at java.util.ArrayList.add(ArrayList.java:462)
    at jvm.HeapOomTest.main(HeapOomTest.java:21)

Process finished with exit code 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://cdn.dhbin.cn/1025183087.png" alt="img"></p><p>通过 mat 内存分析工具打开 dump 出来的文件，如果是内存泄漏，查看泄漏对象到 gc roots 的引用链，找到泄漏对象是通过怎样的路径与 gc roots 相关联并导致垃圾收集器无法自动回收它们的，就能比较准确定位出泄漏代码的位置。如果不是内存泄漏，换句话说，就是堆里的内存必须存活，那就考虑增大堆的大小、代码上检查是否有对象生命周期过长，尝试减少程序运行期的内存消耗。</p><h1 id="虚拟机栈与本地方法栈溢出" tabindex="-1"><a class="header-anchor" href="#虚拟机栈与本地方法栈溢出"><span>虚拟机栈与本地方法栈溢出</span></a></h1><p>Hotshot 不区分虚拟机栈和本地方法栈，因此，通过 - Xoss 参数设置本地方法栈的大小实际上是无效的。栈容量只能通过 <strong>-Xss</strong> 参数设定。关于虚拟机栈和本地方法栈的溢出，在 Java 虚拟机规范中描述了两种异常：</p><ul><li>线程执行深度大于虚拟机所允许的深度时，将抛出 StackOverflowError</li><li>如果虚拟机在扩展栈时无法申请到足够的内存空间，将抛出 OutOfMemoryError</li></ul><p>运行一个线程就会创建一个虚拟机栈，每个方法的调用对应栈中的栈帧</p><h3 id="stackoverflowerror-例子" tabindex="-1"><a class="header-anchor" href="#stackoverflowerror-例子"><span>StackOverflowError 例子</span></a></h3><p>递归执行 stackLeek 方法，每次向栈中压入一个栈帧，当大于虚拟机所需要的允许时就抛出异常</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Vm args: -Xss128k
 *
 * <span class="token keyword">@author</span> donghaibin
 * <span class="token keyword">@date</span> 2020/1/20
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StackOomTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> stackLength <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">stackLeek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        stackLength<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token function">stackLeek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">StackOomTest</span> stackOomTest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StackOomTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            stackOomTest<span class="token punctuation">.</span><span class="token function">stackLeek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;stack length: &quot;</span> <span class="token operator">+</span> stackLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">throw</span> throwable<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>stack length: 1885
Exception in thread &quot;main&quot; java.lang.StackOverflowError
    at jvm.StackOomTest.stackLeek(StackOomTest.java:15)
    at jvm.StackOomTest.stackLeek(StackOomTest.java:15)
    ...
    at jvm.StackOomTest.stackLeek(StackOomTest.java:15)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="outofmemoryerror-例子" tabindex="-1"><a class="header-anchor" href="#outofmemoryerror-例子"><span>OutOfMemoryError 例子</span></a></h2><p>操作系统为每个进程分配内存是有限制的，譬如 32 位的 Windows 限制为 2G。虚拟机提供参数控制堆和方法区这两部分内存大小，剩下的内存由虚拟机栈和本地方法栈<strong>瓜分</strong>。<strong>分配给进程的总内存减去最大堆内存减去方法区，程序计数器占用的内存小，可以忽略，剩下的就是虚拟机栈和本地方法栈的内存大小。</strong></p>`,32),o=[p];function c(i,l){return a(),s("div",null,o)}const d=n(t,[["render",c],["__file","Jvm中各种内存溢出情况分析.html.vue"]]),m=JSON.parse('{"path":"/tech/java/Jvm%E4%B8%AD%E5%90%84%E7%A7%8D%E5%86%85%E5%AD%98%E6%BA%A2%E5%87%BA%E6%83%85%E5%86%B5%E5%88%86%E6%9E%90.html","title":"Jvm中各种内存溢出情况分析","lang":"zh-CN","frontmatter":{"date":"2020-01-20T13:23:00.000Z","category":["Java"],"tag":["Jvm"],"description":"本文以 JDK8 来研究讨论，其它 JDK 可能有不同的结果。","head":[["meta",{"property":"og:url","content":"https://dhbin.cn/tech/java/Jvm%E4%B8%AD%E5%90%84%E7%A7%8D%E5%86%85%E5%AD%98%E6%BA%A2%E5%87%BA%E6%83%85%E5%86%B5%E5%88%86%E6%9E%90.html"}],["meta",{"property":"og:site_name","content":"HB技术栈"}],["meta",{"property":"og:title","content":"Jvm中各种内存溢出情况分析"}],["meta",{"property":"og:description","content":"本文以 JDK8 来研究讨论，其它 JDK 可能有不同的结果。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.dhbin.cn/374980155.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-22T17:33:14.000Z"}],["meta",{"property":"article:author","content":"DHB"}],["meta",{"property":"article:tag","content":"Jvm"}],["meta",{"property":"article:published_time","content":"2020-01-20T13:23:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-22T17:33:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jvm中各种内存溢出情况分析\\",\\"image\\":[\\"https://cdn.dhbin.cn/374980155.png\\",\\"https://cdn.dhbin.cn/1025183087.png\\"],\\"datePublished\\":\\"2020-01-20T13:23:00.000Z\\",\\"dateModified\\":\\"2023-03-22T17:33:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DHB\\",\\"url\\":\\"https://dhbin.cn\\"}]}"]]},"headers":[{"level":2,"title":"可达性分析算法","slug":"可达性分析算法","link":"#可达性分析算法","children":[]},{"level":2,"title":"例子","slug":"例子","link":"#例子","children":[{"level":3,"title":"StackOverflowError 例子","slug":"stackoverflowerror-例子","link":"#stackoverflowerror-例子","children":[]}]},{"level":2,"title":"OutOfMemoryError 例子","slug":"outofmemoryerror-例子","link":"#outofmemoryerror-例子","children":[]}],"git":{"createdTime":1679506394000,"updatedTime":1679506394000,"contributors":[{"name":"dhb","email":"xx158@qq.com","commits":1}]},"readingTime":{"minutes":4.11,"words":1232},"localizedDate":"2020年1月20日","excerpt":"\\n<blockquote>\\n<p>本文以 JDK8 来研究讨论，其它 JDK 可能有不同的结果。</p>\\n</blockquote>\\n","autoDesc":true}');export{d as comp,m as data};
