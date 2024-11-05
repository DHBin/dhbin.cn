import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as s,e as t}from"./app-Ba--U_Af.js";const p={},e=t(`<h1 id="openjdk是怎么启动jvm的" tabindex="-1"><a class="header-anchor" href="#openjdk是怎么启动jvm的"><span>openjdk是怎么启动jvm的</span></a></h1><p>java.c:1458</p><p><code>InitializeJVM</code>函数初始化jvm虚拟机，</p><p><code>JavaMain</code>以新的线程启动jvm</p><p><img src="https://cdn.dhbin.cn/202303301038617.svg+xml" alt="jvm"></p><p>.h标识不同的系统实现方式不同</p><ul><li><p>java.c:LoadJavaVM 加载libjvm.so动态链接库</p></li><li><p>java.c:ParseArguments 解析参数，找出mode(运行模式：main class、jar file)、what（主类）等等</p></li><li><p>java.h:JVMInit 主要执行<code>ContinueInNewThread</code></p></li><li><p>java.c:ContinueInNewThread 创建java main方法的参数，并执行<code>ContinueInNewThread0</code></p></li><li><p>java.h:ContinueInNewThread0 新建一个线程执行<code>JavaMain</code>函数，并阻塞（调用<code>pthread_join</code>）</p></li><li><p>java.c:JavaMain</p></li><li><ul><li>调用<code>InitializeJVM</code>创建jvm</li><li>Main找出java主类（这里不一定是main方法，javaFX就没有main方法）</li><li>构建主类的参数</li><li>执行main方法</li></ul></li></ul><div class="language-c line-numbers-mode" data-ext="c" data-title="c"><pre class="language-c"><code>JavaVM <span class="token operator">*</span>vm <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
JNIEnv <span class="token operator">*</span>env <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token comment">//&amp;ifn 是 InvocationFunctions</span>
<span class="token comment">// 创建jvm虚拟机</span>
<span class="token keyword">typedef</span> <span class="token function">jint</span> <span class="token punctuation">(</span>JNICALL <span class="token operator">*</span>CreateJavaVM_t<span class="token punctuation">)</span><span class="token punctuation">(</span>JavaVM <span class="token operator">*</span><span class="token operator">*</span>pvm<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span><span class="token operator">*</span>env<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">typedef</span> <span class="token function">jint</span> <span class="token punctuation">(</span>JNICALL <span class="token operator">*</span>GetDefaultJavaVMInitArgs_t<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">typedef</span> <span class="token function">jint</span> <span class="token punctuation">(</span>JNICALL <span class="token operator">*</span>GetCreatedJavaVMs_t<span class="token punctuation">)</span><span class="token punctuation">(</span>JavaVM <span class="token operator">*</span><span class="token operator">*</span>vmBuf<span class="token punctuation">,</span> jsize bufLen<span class="token punctuation">,</span> jsize <span class="token operator">*</span>nVMs<span class="token punctuation">)</span><span class="token punctuation">;</span>
args <span class="token operator">=</span> <span class="token punctuation">{</span>version <span class="token operator">=</span> <span class="token number">65538</span><span class="token punctuation">,</span> nOptions <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> option
    <span class="token number">0</span>s <span class="token operator">=</span> <span class="token number">0x55555576eaf0</span><span class="token punctuation">,</span> ignoreUnrecognized <span class="token operator">=</span> <span class="token number">0</span> <span class="token char">&#39;\\000&#39;</span><span class="token punctuation">}</span>
<span class="token function">InitializeJVM</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>vm<span class="token punctuation">,</span> <span class="token operator">&amp;</span>env<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ifn<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//-Dsun.java.launcher=SUN_STANDARD</span>
<span class="token comment">//-Djava.class.path=.</span>
<span class="token comment">//-Dsun.java.command=spring-boot-demo-0.0.1-SNAPSHOT.jar</span>
<span class="token comment">//-Dsun.java.launcher=SUN_STANDARD</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="jvm启动步骤" tabindex="-1"><a class="header-anchor" href="#jvm启动步骤"><span>Jvm启动步骤</span></a></h1><p><code>java.c:JLI_Launch</code>是程序的入口，执行下面的逻辑</p><div class="language-c line-numbers-mode" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token comment">// 加载虚拟机动态链接库，即libjvm.so</span>
<span class="token function">LoadJavaVM</span><span class="token punctuation">(</span>jvmpath<span class="token punctuation">,</span> <span class="token operator">&amp;</span>ifn<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 新建一个线程运行JavaMain</span>
<span class="token keyword">int</span> <span class="token function">JVMInit</span><span class="token punctuation">(</span>InvocationFunctions<span class="token operator">*</span> ifn<span class="token punctuation">,</span> jlong threadStackSize<span class="token punctuation">,</span> <span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">,</span><span class="token keyword">int</span> mode<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>what<span class="token punctuation">,</span> <span class="token keyword">int</span> ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 创建虚拟机InitializeJVM -&gt; 获取Main类LoadMainClass -&gt; 获取java应用的入参CreateApplicationArgs</span>
<span class="token keyword">int</span> JNICALL <span class="token function">JavaMain</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span> _args<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="如何获取main方法" tabindex="-1"><a class="header-anchor" href="#如何获取main方法"><span>如何获取Main方法</span></a></h2><div class="language-c line-numbers-mode" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token comment">// java.c</span>
<span class="token keyword">static</span> jclass <span class="token function">LoadMainClass</span><span class="token punctuation">(</span>JNIEnv <span class="token operator">*</span>env<span class="token punctuation">,</span> <span class="token keyword">int</span> mode<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 查找sun/launcher/LauncherHelper类</span>
<span class="token comment">// GetLauncherHelperClass -&gt; GetLauncherHelperClass -&gt; FindBootStrapClass -&gt; findBootClass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>FindBootStrapClass实现原理</p><div class="language-c line-numbers-mode" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token comment">// findBootClass函数签名</span>
<span class="token keyword">typedef</span> <span class="token function">jclass</span> <span class="token punctuation">(</span>JNICALL <span class="token function">FindClassFromBootLoader_t</span><span class="token punctuation">(</span>JNIEnv <span class="token operator">*</span>env<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>dlsym(RTLD_DEFAULT, &quot;JVM_FindClassFromBootLoader&quot;)获取到findBootClass函数</li><li>通过findBootClass(JNIEnv <em>env, const char</em> classname)查询返回</li></ol><p>获取main方法的步骤</p><ol><li>获取到sun/launcher/LauncherHelper类</li><li>获取到LauncherHelper类中的checkAndLoadMain(ZILjava/lang/String;)Ljava/lang/Class;方法</li><li></li></ol><h2 id="模拟openjdk创建jvm虚拟机" tabindex="-1"><a class="header-anchor" href="#模拟openjdk创建jvm虚拟机"><span>模拟openjdk创建jvm虚拟机</span></a></h2><div class="language-c line-numbers-mode" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;dlfcn.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;jni.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>

<span class="token comment">// libjvm.so的路径</span>
<span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> jvmpath <span class="token operator">=</span> <span class="token string">&quot;/home/dev/jdk/jdk8u275-b01/jre/lib/amd64/server/libjvm.so&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// 创建jvm虚拟机，libjvm.so中的函数，位于jni.h中</span>
<span class="token keyword">typedef</span> <span class="token function">jint</span> <span class="token punctuation">(</span>JNICALL <span class="token operator">*</span>CreateJavaVM_t<span class="token punctuation">)</span><span class="token punctuation">(</span>JavaVM <span class="token operator">*</span><span class="token operator">*</span>pvm<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span><span class="token operator">*</span>env<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>

CreateJavaVM_t createJavaVM<span class="token punctuation">;</span>

<span class="token comment">// 加载libjvm.so动态链接库</span>
<span class="token keyword">void</span> <span class="token function">LoadJavaVM</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 初始化jvm</span>
<span class="token keyword">void</span> <span class="token function">InitializeJVM</span><span class="token punctuation">(</span>JavaVM <span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">,</span> JNIEnv <span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">,</span> JavaVMInitArgs <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 运行hello world</span>
<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">JavaMain</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 1、加载jvm链接库</span>
  <span class="token function">LoadJavaVM</span><span class="token punctuation">(</span>jvmpath<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 2、解析参数 -- 这一步忽略不实现</span>


  <span class="token comment">// 创建新的线程执行JavaMain，包含初始化jvm和运行main方法</span>
  <span class="token class-name">pthread_t</span> tid<span class="token punctuation">;</span>
  <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tid<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> JavaMain<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">pthread_join</span><span class="token punctuation">(</span>tid<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">void</span> <span class="token function">LoadJavaVM</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>jvmpath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>createJavaVM <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">void</span> <span class="token operator">*</span>libjvm<span class="token punctuation">;</span>
  libjvm <span class="token operator">=</span> <span class="token function">dlopen</span><span class="token punctuation">(</span>jvmpath<span class="token punctuation">,</span> RTLD_NOW <span class="token operator">+</span> RTLD_GLOBAL<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>libjvm <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;加载jvm动态链接库成功。\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;加载jvm动态链接库失败。\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  createJavaVM <span class="token operator">=</span> <span class="token punctuation">(</span>CreateJavaVM_t<span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">dlsym</span><span class="token punctuation">(</span>libjvm<span class="token punctuation">,</span> <span class="token string">&quot;JNI_CreateJavaVM&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>createJavaVM <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;获取createJavaVM函数成功\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;获取createJavaVM函数失败\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">InitializeJVM</span><span class="token punctuation">(</span>JavaVM <span class="token operator">*</span><span class="token operator">*</span>pvm<span class="token punctuation">,</span> JNIEnv <span class="token operator">*</span><span class="token operator">*</span>penv<span class="token punctuation">,</span> JavaVMInitArgs <span class="token operator">*</span>args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  jint ret <span class="token operator">=</span> <span class="token function">createJavaVM</span><span class="token punctuation">(</span>pvm<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">)</span>penv<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;创建jvm虚拟机失败\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;创建jvm虚拟机成功\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">JavaMain</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>_args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 3、初始化JVM</span>
  JavaVM <span class="token operator">*</span>vm <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  JNIEnv <span class="token operator">*</span>env <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  JavaVMOption <span class="token operator">*</span>options<span class="token punctuation">;</span>
  options <span class="token operator">=</span> <span class="token punctuation">(</span>JavaVMOption<span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>JavaVMOption<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  options<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>optionString <span class="token operator">=</span> <span class="token string">&quot;-Djava.class.path=.&quot;</span><span class="token punctuation">;</span>
  options<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>optionString <span class="token operator">=</span> <span class="token string">&quot;-Dsun.java.launcher=SUN_STANDARD&quot;</span><span class="token punctuation">;</span>
  <span class="token comment">//options[2].optionString = &quot;-Dsun.java.command=spring-boot-demo-0.0.1-SNAPSHOT.jar&quot;;</span>
  <span class="token comment">//options[3].optionString = &quot;-Dsun.java.launcher.pid=&quot;;</span>
  JavaVMInitArgs args<span class="token punctuation">;</span>
  <span class="token function">memset</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>args<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  args<span class="token punctuation">.</span>version  <span class="token operator">=</span> JNI_VERSION_1_2<span class="token punctuation">;</span>
  args<span class="token punctuation">.</span>nOptions <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  args<span class="token punctuation">.</span>options  <span class="token operator">=</span> options<span class="token punctuation">;</span>
  args<span class="token punctuation">.</span>ignoreUnrecognized <span class="token operator">=</span> JNI_FALSE<span class="token punctuation">;</span>
  <span class="token function">InitializeJVM</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>vm<span class="token punctuation">,</span> <span class="token operator">&amp;</span>env<span class="token punctuation">,</span> <span class="token operator">&amp;</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 4、运行main 方法</span>

  jclass mainClass <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">*</span>env<span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">FindClass</span><span class="token punctuation">(</span>env<span class="token punctuation">,</span> <span class="token string">&quot;Main&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  jmethodID mainId <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">*</span>env<span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">GetStaticMethodID</span><span class="token punctuation">(</span>env<span class="token punctuation">,</span> mainClass<span class="token punctuation">,</span> <span class="token string">&quot;main&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;([Ljava/lang/String;)V&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* 执行main方法 */</span>
  <span class="token punctuation">(</span><span class="token operator">*</span>env<span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">CallStaticVoidMethod</span><span class="token punctuation">(</span>env<span class="token punctuation">,</span> mainClass<span class="token punctuation">,</span> mainId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),o=[e];function c(i,l){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","openjdk是怎么启动jvm的.html.vue"]]),d=JSON.parse('{"path":"/tech/java/openjdk%E6%98%AF%E6%80%8E%E4%B9%88%E5%90%AF%E5%8A%A8jvm%E7%9A%84.html","title":"openjdk是怎么启动jvm的","lang":"zh-CN","frontmatter":{"date":"2021-01-06T10:18:00.000Z","category":["Java"],"tag":["Jvm","源码"],"description":"openjdk是怎么启动jvm的 java.c:1458 InitializeJVM函数初始化jvm虚拟机， JavaMain以新的线程启动jvm jvm .h标识不同的系统实现方式不同 java.c:LoadJavaVM 加载libjvm.so动态链接库 java.c:ParseArguments 解析参数，找出mode(运行模式：main clas...","head":[["meta",{"property":"og:url","content":"https://dhbin.cn/tech/java/openjdk%E6%98%AF%E6%80%8E%E4%B9%88%E5%90%AF%E5%8A%A8jvm%E7%9A%84.html"}],["meta",{"property":"og:site_name","content":"HB技术栈"}],["meta",{"property":"og:title","content":"openjdk是怎么启动jvm的"}],["meta",{"property":"og:description","content":"openjdk是怎么启动jvm的 java.c:1458 InitializeJVM函数初始化jvm虚拟机， JavaMain以新的线程启动jvm jvm .h标识不同的系统实现方式不同 java.c:LoadJavaVM 加载libjvm.so动态链接库 java.c:ParseArguments 解析参数，找出mode(运行模式：main clas..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.dhbin.cn/202303301038617.svg+xml"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-30T02:48:50.000Z"}],["meta",{"property":"article:author","content":"DHB"}],["meta",{"property":"article:tag","content":"Jvm"}],["meta",{"property":"article:tag","content":"源码"}],["meta",{"property":"article:published_time","content":"2021-01-06T10:18:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-30T02:48:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"openjdk是怎么启动jvm的\\",\\"image\\":[\\"https://cdn.dhbin.cn/202303301038617.svg+xml\\"],\\"datePublished\\":\\"2021-01-06T10:18:00.000Z\\",\\"dateModified\\":\\"2023-03-30T02:48:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DHB\\",\\"url\\":\\"https://dhbin.cn\\"}]}"]]},"headers":[{"level":2,"title":"如何获取Main方法","slug":"如何获取main方法","link":"#如何获取main方法","children":[]},{"level":2,"title":"模拟openjdk创建jvm虚拟机","slug":"模拟openjdk创建jvm虚拟机","link":"#模拟openjdk创建jvm虚拟机","children":[]}],"git":{"createdTime":1680144530000,"updatedTime":1680144530000,"contributors":[{"name":"dhb","email":"xx158@qq.com","commits":1}]},"readingTime":{"minutes":2.7,"words":809},"localizedDate":"2021年1月6日","excerpt":"\\n<p>java.c:1458</p>\\n<p><code>InitializeJVM</code>函数初始化jvm虚拟机，</p>\\n<p><code>JavaMain</code>以新的线程启动jvm</p>\\n<p><img src=\\"https://cdn.dhbin.cn/202303301038617.svg+xml\\" alt=\\"jvm\\"></p>\\n<p>.h标识不同的系统实现方式不同</p>\\n<ul>\\n<li>\\n<p>java.c:LoadJavaVM 加载libjvm.so动态链接库</p>\\n</li>\\n<li>\\n<p>java.c:ParseArguments 解析参数，找出mode(运行模式：main class、jar file)、what（主类）等等</p>\\n</li>\\n<li>\\n<p>java.h:JVMInit 主要执行<code>ContinueInNewThread</code></p>\\n</li>\\n<li>\\n<p>java.c:ContinueInNewThread 创建java main方法的参数，并执行<code>ContinueInNewThread0</code></p>\\n</li>\\n<li>\\n<p>java.h:ContinueInNewThread0 新建一个线程执行<code>JavaMain</code>函数，并阻塞（调用<code>pthread_join</code>）</p>\\n</li>\\n<li>\\n<p>java.c:JavaMain</p>\\n</li>\\n<li>\\n<ul>\\n<li>调用<code>InitializeJVM</code>创建jvm</li>\\n<li>Main找出java主类（这里不一定是main方法，javaFX就没有main方法）</li>\\n<li>构建主类的参数</li>\\n<li>执行main方法</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{k as comp,d as data};
