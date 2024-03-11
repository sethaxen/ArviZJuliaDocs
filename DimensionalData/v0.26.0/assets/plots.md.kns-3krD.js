import{_ as s,c as i,o as a,V as e}from"./chunks/framework.8I68nsaJ.js";const t="/DimensionalData.jl/v0.26.0/assets/sjcbaue.n-ox3dil.png",l="/DimensionalData.jl/v0.26.0/assets/firjzky._ABBMo44.png",u=JSON.parse('{"title":"Plots.jl","description":"","frontmatter":{},"headers":[],"relativePath":"plots.md","filePath":"plots.md","lastUpdated":null}'),n={name:"plots.md"},h=e(`<h1 id="Plots.jl" tabindex="-1">Plots.jl <a class="header-anchor" href="#Plots.jl" aria-label="Permalink to &quot;Plots.jl {#Plots.jl}&quot;">​</a></h1><p>Plots.jl and Makie.jl functions mostly work out of the box on <code>AbstractDimArray</code>, although not with the same results - they choose to follow each packages default behaviour as much as possible.</p><p>This will plot a line plot with &#39;a&#39;, &#39;b&#39; and &#39;c&#39; in the legend, and values 1-10 on the labelled X axis:</p><p>Plots.jl support is deprecated, as development is moving to Makie.jl</p><h1 id="Makie.jl" tabindex="-1">Makie.jl <a class="header-anchor" href="#Makie.jl" aria-label="Permalink to &quot;Makie.jl {#Makie.jl}&quot;">​</a></h1><p>Makie.jl functions also mostly work with <a href="/DimensionalData.jl/v0.26.0/api/reference#DimensionalData.AbstractDimArray"><code>AbstractDimArray</code></a> and will <code>permute</code> and <a href="/DimensionalData.jl/v0.26.0/object_modification#reorder"><code>reorder</code></a> axes into the right places, especially if <code>X</code>/<code>Y</code>/<code>Z</code>/<code>Ti</code> dimensions are used.</p><p>In makie a <code>DimMatrix</code> will plot as a heatmap by defualt, but it will have labels and axes in the right places:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DimensionalData, CairoMakie</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">A </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> rand</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">X</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Y</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:c</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Makie</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">plot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(A; colormap</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:inferno</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p><img src="`+t+'" alt=""></p><p>Other plots also work, here DD ignores the axis order and instead favours the categorical varable for the X axis:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Makie</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">rainclouds</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(A)</span></span></code></pre></div><p><img src="'+l+'" alt=""></p><p>A lot more is planned for Make.jl plots in future!</p>',13),p=[h];function o(k,r,d,c,g,E){return a(),i("div",null,p)}const m=s(n,[["render",o]]);export{u as __pageData,m as default};
