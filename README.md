EnterIN
=======

<blockquote>An Inception Effect plugin for jQuery!</blockquote>

<h3>Write HTML logic</h3>
<pre>
&lt;div id=&quot;enterin-wrapper&quot;&gt;
   &lt;div class=&quot;enterin-slide slide1&quot;&gt;&lt;/div&gt;
   &lt;div class=&quot;enterin-slide slide2&quot;&gt;&lt;/div&gt;
   &lt;div class=&quot;enterin-slide slide3&quot;&gt;&lt;/div&gt;
   &lt;div class=&quot;enterin-slide slide4&quot;&gt;&lt;/div&gt;
   &lt;div class=&quot;enterin-slide slide5&quot;&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;div id=&quot;enterin-ctrl&quot;&gt;
   &lt;a href=&quot;javascript:;&quot; data-enterin=&quot;1&quot;&gt;Slide 1&lt;/a&gt;
   &lt;a href=&quot;javascript:;&quot; data-enterin=&quot;2&quot;&gt;Slide 2&lt;/a&gt;
   &lt;a href=&quot;javascript:;&quot; data-enterin=&quot;3&quot;&gt;Slide 3&lt;/a&gt;
   &lt;a href=&quot;javascript:;&quot; data-enterin=&quot;4&quot;&gt;Slide 4&lt;/a&gt;
   &lt;a href=&quot;javascript:;&quot; data-enterin=&quot;5&quot;&gt;Slide 5&lt;/a&gt;
&lt;/div&gt;
</pre>							

<h3>Set property CSS rulers</h3>
Example:
<br>
<pre>
#enterin-wrapper,
#enterin-wrapper .enterin-slide
{
   width:100%;
   height:100%;
   min-height:100%;
}

#enterin-wrapper .enterin-slide.slide1 {
   background: url('path/to/transparent/image1.png') center center no-repeat transparent;
   background-size: 80%;
}
#enterin-wrapper .enterin-slide.slide2 {
   background: url('path/to/transparent/image2.png') center center no-repeat transparent;
   background-size: 80%;
}
#enterin-wrapper .enterin-slide.slide3 {
   background: #999999;
}
...
</pre>					

<h3>Add jQuery and EnterIN .js at end of document</h3>
<pre>
   ...
   &lt;script src=&quot;path/to/js/jquery.min.js&quot;&gt;&lt;/script&gt;
   &lt;script src=&quot;path/to/js/jquery.enterin.min.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
</pre>	

<h3>Call EnterIN</h3>
<pre>
&lt;script&gt;

jQuery("#enterin-wrapper").enterin({
   controllers:	'#enterin-ctrl',
   maxScale: 20,
   effectTime: 3.0,
   ease: 'linear',
   endCallback:	function(current_index) {
      // your code here
   }
});

&lt;/script&gt;
</pre>	

&copy; 2013 Gianfilippo Balestriero under <a target="_blank" href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>