# get-pkg-prop

> Pass a key name & get the corresponding value from the intended package.json

![travis CI build status](https://travis-ci.org/servexyz/get-pkg-prop.svg?branch=master)

## Getting Started

**Install**

```
npm install get-pkg-prop -S
```

**Add to source**

```js
import { getPkgProp } from "get-pkg-prop";
```

**Use**

```js
import { getPkgProp } from 'get-pkg-prop'

const pkgMock = { version: "1.0.0", custom: { foo: "bar", baz: "bax" }   }

(async () => {
  await getPkgProp("name");
  // --> "get-pkg-prop"
  await getPkgProp("version", "path/to/child/module");
  // --> "x.y.z"
  await getPkgProp("custom", pkgMock)
  // --> { foo: "bar", baz: "bax" }
  await getPkgProp("fakeprop");
  // --> false
})
```

## API

<details><summary> <code>getPkgProp(szProperty)</code></h4></summary>
<b>Where</b>

- _szProperty_ is the name of the property.

<b>How</b>

- This uses [pkg-up](https://github.com/sindresorhus/pkg-up) to find the closest `package.json`.

<b>Why</b>

- Useful for confirmations when toggling between local linked deps and remote installed deps. I wanted to enable modules to self-report relevant meta info (like their version)

<hr />
</details>

```js
import { getPkgProp } from 'get-pkg-prop'

(async () => {
  await getPkgProp("name")
  // --> "get-pkg-prop"
  await getPkgProp("version")
  // --> "0.2.6"
  await getPkgProp()
  // --> null; must provide property to check
  await getPkgProp("xyz")
  // --> false; property must exist in package.json
  await getPkgProp("repository")
  // --> { "type": "git", "url": "https://github.com/servexyz/get-pkg-prop" }
  */
})
```


<details><summary> <code>getPkgProp(szProperty, oPackageJSON)</code></h4></summary>
<b>Where</b>

- _szProperty_ is the name of the property.
- _oPackageJSON_ is the JSON object which contains your package

<b>Why</b>

- I added this for mock testing inline package objects.
  <hr />
  </details>

```js
import { getPkgProp } from 'get-pkg-prop'

const pkgMock = {
  "name": "my-pkg",
  "version": "1.0.0",
  "repository": {
      "type": "git",
      "url": "https://github.com/namespace/my-repo-pkg"
  }
}

(async () => {
  await getPkgProp("name", pkgMock)
  // --> "my-pkg"
  await getPkgProp("name")
  // --> "get-pkg-prop"; defaults to current pkg when unspecified
  await getPkgProp("version", pkgMock)
  // --> "0.2.6"
  await getPkgProp(, pkgMock)
  // --> null; must provide property to check
  await getPkgProp("xyz")
  // --> false; property must exist in package.json
  await getPkgProp("repository", pkgMock)
  // -->  { "type": "git", "url": "https://github.com/namespace/my-repo-pkg" }
  await getPkgProp("repository")
  // pkgMock wasn't specified, it returns value of cwd package:
  // -->  { "type": "git", "url": "https://github.com/servexyz/get-pkg-prop" }
})
```

<details><summary> <code>getPkgProp(szProperty, szPathToPackageJSON)</code></h4></summary>
<b>Where</b>

- _szProperty_ is the name of the property.
- _szPathToPackageJSON_ is the path to either your package.json file or the directory which contains the package.json file.

<b>Why</b>

- Specifying the path allows you to access the package of sub-modules or installed dependencies.

<b>Note</b>

- <em>"path/to/child/module"</em> and <em>"path/to/child/module/package.json"</em> are processed equally

<hr />
</details>

```js
import { getPkgProp } from 'get-pkg-prop'

(async () => {
  await getPkgProp("name")
  // --> "get-pkg-prop"; defaults to current pkg when unspecifeid
  await getPkgProp("name", "path/to/child/module")
  // --> "child-module-name"
  await getPkgProp("version", "path/to/child/module")
  // --> "x.y.z"
  await getPkgProp(,"path/to/child/module")
  // --> null; must provide property to check
  await getPkgProp("xyz", "path/to/child/module")
  // --> false; property must exist in package.json
  await getPkgProp("repository", "path/to/child/module")
  // --> { "type": "git", "url": "https://github.com/namespace/child-module-name" }
})
```

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

<details><summary><code>return</code> scheme</summary>

<ul>
<li><code>&lt;null&gt;</code> - Whenever the <em>&lt;string&gt; szProperty</em> parameter is missing</li>
<li><code>&lt;string&gt;</code> - Whenever the property is found and extracted from the specified package object</li>
<li><code>&lt;false&gt;</code> - Whenever the property does not exist in the specified package object</li>
</ul>
</details>