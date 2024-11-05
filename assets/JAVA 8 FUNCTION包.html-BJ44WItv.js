import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as n,e as l}from"./app-Ba--U_Af.js";const a={},i=l('<h1 id="java-8-function包" tabindex="-1"><a class="header-anchor" href="#java-8-function包"><span>JAVA 8 FUNCTION包</span></a></h1><h1 id="总览" tabindex="-1"><a class="header-anchor" href="#总览"><span>总览</span></a></h1><table><thead><tr><th style="text-align:left;">接口</th><th style="text-align:left;">解释</th></tr></thead><tbody><tr><td style="text-align:left;">Consumer&lt; T &gt;</td><td style="text-align:left;">接收T对象，无返回值</td></tr><tr><td style="text-align:left;">Function&lt; T, R &gt;</td><td style="text-align:left;">接收T对象，返回R对象</td></tr><tr><td style="text-align:left;">Predicate&lt; T&gt;</td><td style="text-align:left;">接收T对象，返回boolean值</td></tr><tr><td style="text-align:left;">Supplier&lt; T &gt;</td><td style="text-align:left;">提供T对象（例如工厂），不接收值</td></tr><tr><td style="text-align:left;">BiFunction&lt; T, U, R &gt;</td><td style="text-align:left;">接收T对象和U对象，返回R对象</td></tr><tr><td style="text-align:left;">UnaryOperator&lt; T &gt;</td><td style="text-align:left;">接收T对象，返回T对象</td></tr><tr><td style="text-align:left;">BinaryOperator&lt; T &gt;</td><td style="text-align:left;">接收两个T对象，返回T对象，继承于BiFunction</td></tr></tbody></table><p>标注为FunctionalInterface的接口被称为函数式接口，该接口只能有一个自定义方法，但是可以包括从object类继承而来的方法。如果一个接口只有一个方法，则编译器会认为这就是一个函数式接口。是否是一个函数式接口，需要注意的有以下几点：</p><ul><li>该注解只能标记在”有且仅有一个抽象方法”的接口上。</li><li>JDK8接口中的静态方法和默认方法，都不算是抽象方法。</li><li>接口默认继承java.lang.Object，所以如果接口显示声明覆盖了Object中方法，那么也不算抽象方法。</li><li>该注解不是必须的，如果一个接口符合”函数式接口”定义，那么加不加该注解都没有影响。加上该注解能够更好地让编译器进行检查。如果编写的不是函数式接口，但是加上了@FunctionInterface，那么编译器会报错。</li><li>在一个接口中定义两个自定义的方法，就会产生Invalid ‘@FunctionalInterface’ annotation; FunctionalInterfaceTest is not a functional interface错误.</li></ul>',5),r=[i];function o(d,c){return e(),n("div",null,r)}const p=t(a,[["render",o],["__file","JAVA 8 FUNCTION包.html.vue"]]),y=JSON.parse('{"path":"/tech/java/JAVA%208%20FUNCTION%E5%8C%85.html","title":"JAVA 8 FUNCTION包","lang":"zh-CN","frontmatter":{"date":"2018-08-23T14:40:00.000Z","category":["Java"],"description":"JAVA 8 FUNCTION包 总览 标注为FunctionalInterface的接口被称为函数式接口，该接口只能有一个自定义方法，但是可以包括从object类继承而来的方法。如果一个接口只有一个方法，则编译器会认为这就是一个函数式接口。是否是一个函数式接口，需要注意的有以下几点： 该注解只能标记在”有且仅有一个抽象方法”的接口上。 JDK8接口中...","head":[["meta",{"property":"og:url","content":"https://dhbin.cn/tech/java/JAVA%208%20FUNCTION%E5%8C%85.html"}],["meta",{"property":"og:site_name","content":"HB技术栈"}],["meta",{"property":"og:title","content":"JAVA 8 FUNCTION包"}],["meta",{"property":"og:description","content":"JAVA 8 FUNCTION包 总览 标注为FunctionalInterface的接口被称为函数式接口，该接口只能有一个自定义方法，但是可以包括从object类继承而来的方法。如果一个接口只有一个方法，则编译器会认为这就是一个函数式接口。是否是一个函数式接口，需要注意的有以下几点： 该注解只能标记在”有且仅有一个抽象方法”的接口上。 JDK8接口中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-22T17:33:14.000Z"}],["meta",{"property":"article:author","content":"DHB"}],["meta",{"property":"article:published_time","content":"2018-08-23T14:40:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-22T17:33:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JAVA 8 FUNCTION包\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-08-23T14:40:00.000Z\\",\\"dateModified\\":\\"2023-03-22T17:33:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DHB\\",\\"url\\":\\"https://dhbin.cn\\"}]}"]]},"headers":[],"git":{"createdTime":1679384580000,"updatedTime":1679506394000,"contributors":[{"name":"donghaibin","email":"xx158@qq.com","commits":2},{"name":"dhb","email":"xx158@qq.com","commits":1}]},"readingTime":{"minutes":1.33,"words":399},"localizedDate":"2018年8月23日","excerpt":"\\n<h1>总览</h1>\\n<table>\\n<thead>\\n<tr>\\n<th style=\\"text-align:left\\">接口</th>\\n<th style=\\"text-align:left\\">解释</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td style=\\"text-align:left\\">Consumer&lt; T &gt;</td>\\n<td style=\\"text-align:left\\">接收T对象，无返回值</td>\\n</tr>\\n<tr>\\n<td style=\\"text-align:left\\">Function&lt; T, R &gt;</td>\\n<td style=\\"text-align:left\\">接收T对象，返回R对象</td>\\n</tr>\\n<tr>\\n<td style=\\"text-align:left\\">Predicate&lt; T&gt;</td>\\n<td style=\\"text-align:left\\">接收T对象，返回boolean值</td>\\n</tr>\\n<tr>\\n<td style=\\"text-align:left\\">Supplier&lt; T &gt;</td>\\n<td style=\\"text-align:left\\">提供T对象（例如工厂），不接收值</td>\\n</tr>\\n<tr>\\n<td style=\\"text-align:left\\">BiFunction&lt; T, U, R &gt;</td>\\n<td style=\\"text-align:left\\">接收T对象和U对象，返回R对象</td>\\n</tr>\\n<tr>\\n<td style=\\"text-align:left\\">UnaryOperator&lt; T &gt;</td>\\n<td style=\\"text-align:left\\">接收T对象，返回T对象</td>\\n</tr>\\n<tr>\\n<td style=\\"text-align:left\\">BinaryOperator&lt; T &gt;</td>\\n<td style=\\"text-align:left\\">接收两个T对象，返回T对象，继承于BiFunction</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{p as comp,y as data};
