# get-pkg-prop
> Pass a key name, get a value from package.json

![travis CI build status](https://travis-ci.org/servexyz/get-pkg-prop.svg?branch=master)

## FAQ
<details><summary>Why</summary>

<ul>
<li>Initially motivated by the desire to print package version</li>
<li>Destructuring rocks. <code>const { version } = require('./package.json')</code>. 
<ul> 
<li>Require's caching makes it difficult to use with development. Read more <a href="https://goenning.net/2016/04/14/stop-reading-json-files-with-require/">here </a>
<li>Unfortunately, Webpack throws a critical warning when using dynamic requires in certain circumstances (see <a href="https://github.com/TooTallNate/node-bindings/issues/42">example here</a>). And while there are supposed fixes, I wanted to avoid the cluster altogether since I use webpack in almost every javascript project</li>
</li>
</ul>
<li>
I wanted to have a more diverse API for different situations. 
<ul><li>Module self-testing? Call <code>get-pkg-prop("property")</code> without specifying package. </li>

<li>Testing child-module? Call <code>get-pkg-prop("property", "/sub/path/to/package.json")</code> with package path specified.</li> 

<li>Mock testing? Create a mock package JSON object and call it with <code>get-pkg-prop("property", myPkgObj)</code>
</li>
</ul>

</li>
</ul>
</details>

## Getting Started

**Install**
```
npm install get-pkg-prop -S
```

**Add to source**
```
import { getPkgProp } from 'get-pkg-prop
```

**Use**
```js
getPkgProp("version") // x.y.z
```


## API

<details><summary> <code>getPkgProp(szProperty)</code></h4></summary>
<hr />
<b>Where</b>

* *szProperty* is the name of the property. 

<b>How</b>

* This uses [pkg-up](https://github.com/sindresorhus/pkg-up) to find the closest `package.json`. 

<hr />
</details>

<details><summary> <code>getPkgProp(szProperty, szPathToPackageJSON)</code></h4></summary>
<hr />
<b>Where</b>

* *szProperty* is the name of the property. 
* *szPathToPackageJSON* is the path to either your package.json file or the directory which contains the package.json file. 

<b>Why</b>

* Specifying the path allows you to access the package of sub-modules or installed dependencies.

<hr />
</details>

<details><summary> <code>getPkgProp(szProperty, oPackageJSON)</code></h4></summary>
<hr />
<b>Where</b>

* *szProperty* is the name of the property. 
* *oPackageJSON* is the JSON object which contains your package

<b>Why</b>

* I added this for mock testing inline package objects. 
<hr />
</details>
