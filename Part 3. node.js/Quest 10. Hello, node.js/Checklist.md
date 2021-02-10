---

# Question

- node.js는 어떤 식으로 동작하나요?
    - `require()` 함수는 어떻게 쓰는 것인가요?
    - `module.exports`와 `exports` 변수는 어떻게 다른가요?
- npm이 무엇인가요?
    - npm 패키지를 `g` 옵션을 통해 Global로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?

# Answers

> Node.js는 어떤 식으로 동작하나요?
- require() 함수는 어떻게 쓰는 것인가요?
- module.exports와 exports 변수는 어떻게 다른가요?

# Node.js는 무엇인가?

Java 언어가 모든 OS 운영체제에서 Virtual Machine 환경 안에서 Runtime 이 구동 되듯이 Node.JS 는 웹브라우저에 종속적인 자바스크립트에서 외부에서 실행할 수 있는 Runtime 환경을 Chrome V8 엔진을 제공하여 여러 OS 환경에서 실행할 수 있는 환경을 제공하게 됩니다. 이것을 Node.JS 라고 정의할 수 있습니다.

# 호출 스택과 이벤트 루프

```jsx
function first() {
   second()
   console.log('첫 번째 실행')
}
function second() {
   third()
   console.log('두 번째 실행')
}
function third() {
   console.log('세 번째 실행')
}
first()
```

**위 코드의 출력은 세 번째, 두 번째, 첫 번째 실행으로 실행 됩니다.** 이 부분의 실행 순서를 이야기 하기 위해선 호출 스택의 자료 구조로 first(), second(), third() 가 메모리에 들어가게 되어 있습니다. 스택의 특징으로는 Last In First Out(후입선출) 의 특징을 가지고 있습니다.

위의 코드는 first, second, third 함수가 정의 되어있고 first 함수 부터 호출을 합니다. 체이닝으로 실행이 연결되어 있고 first가 먼저 호출 되어있지만 second 함수는 first 함수에서 호출되고 second 함수는 third 함수에서 호출되게 됩니다. third 함수는 console.log를 실행하게 되고 가장 윗 부분에 상주해 있다가 스택에서 빠져 나오게 됩니다. 그 다음 second 안에 있는 console.log를 실행하게 되고 최종적으로는 first의 console.log를 가장 나중에 실행하게 됩니다. 결과는 아래와 같습니다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8aaa9ee3-5d47-4de5-9bb3-273bc3473222/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8aaa9ee3-5d47-4de5-9bb3-273bc3473222/Untitled.png)

```jsx
function run() {
   console.log(`3초 후 실행함`)
}
console.log(`시작`)
setTimeout(run, 3000)
console.log(`끝`)
```

위 코드의 출력은 아래와 같이 실행이 됩니다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/273e17ff-e6a9-485e-9dc1-22ad64341f2a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/273e17ff-e6a9-485e-9dc1-22ad64341f2a/Untitled.png)

setTimeout은 시간을 지연시켜 함수를 실행하는 타이머 함수입니다. 시간은 정해져있지만 실제로 자바스크립트는 비동기 처리에 대한 함수가 많기 때문에 위의 예제를 통해 이벤트 루프를 설명하자면 이렇습니다.실제로 동기적인 처리를 할 때는 자바스크립트는 컨텍스트 상 호출 스택 구조에서 가장 나중에 처리된 부분이 가장 먼저 처리 되는 현상을 볼 수가 있었습니다. 그 다음 console.log를 통해 찍어주는 단순한 키워드인 ‘시작' 과 ‘끝' 이후 setTimeout 이라는 타이머 함수를 통해 ‘3초 후에 실행함' 이라는 키워드가 가장 마지막에 동작하는 것을 보실 수 있었습니다. 이 때 비동기적인 결과에 대한 부분들은 태스크 큐라는 부분에 적재를 시키게 되고 큐는 자료구조상 First In First Out(선입선출) 특성을 가지고 있습니다.

이 때 3초 뒤에 스택으로 넘겨서 태스크가 실행이 되도록 하게 할 것이냐 라는 문제를 관리하는 놈이 바로 이벤트루프입니다. 이상 대략적인 스택, 태스크 큐 그리고 이벤트 루프의 설명이였습니다.

# Node Module System

프론트에서 대부분 <script src=’{소스위치}’> 자바스크립트 임포트 모듈을 통해 변수나 오브젝트를 불러오는 방법이 있었다면 Node.JS에서는 아래와 같이 다른 자바스크립트 파일에서 참조할 수 있습니다.

```jsx
<script src='{소스위치}'>

// 참조해야 하는 constants.js 파일
module.exports = {
    sayHello : 'Hello!',
    name : 'CaptainChain'  
}
```

위의 선언된 변수와 오브젝트들은 아래의 코드처럼 참조가 가능합니다.

```jsx
// funcModule.js
const { sayHello, name } = require('{파일위치}');
console.log(`${name} 님 ${sayHello}`)
```

# Single Thread, Event Driven, Non-Blocking I/O

Node.js는 위와같은 특성을 가지고 있습니다.

**Single Thread, Event Driven, Non-Blocking I/O를 간단히 정리하면 아래와 같습니다.**

- **싱글 쓰레드란?**

우선 자바스크립트의 경우 싱글 쓰레드로 처리하는 방식을 채택하고 있습니다. 실제로 처리해야 할 일은 많은데 한번에 하나의 일만 하고 있다는 것으로 생각하면 자바스크립트는 왜 멀티 쓰레드 방식이 아닐까에 대해서는 고민이 자연스럽게 됩니다. 추측으로는 OS 운영체제의 자원을 할당하고 관리하는 부분에서 자바스크립트의 태스크에 대한 제어가 비동기 처리 방식으로 인해 어렵지 않을까 생각됩니다. Node.JS 는 이러한 싱글쓰레드의 단점을 멀티쓰레드 방식과 비슷하게 같은 동작을 병렬로 처리할 수 있는 방법들로 개선하고 있습니다.

- **이벤트 드리븐이란?**

위에서 설명한 개념 중 스택과 이벤트 루프 그리고 태스크 큐에 대한 개념에서 이벤트 드리븐은 내가 서비스하고 있는 하나의 사이트를 통해 기능별로 등록된 리스너들입니다. 위의 코드 처럼 콘솔로 바로 실행 이후 종료되는 프로그램이 아니라 언제 누가 내가 만든 사이트에 들어올지 모르는 상황에서 대기를 하고 있다는 것이죠. 이 때 이벤트별로 기능이 정의가 되게 되는데요. 예를 들어 방문했을 때 text/html contentType으로 사용자에게 페이지를 보여준다던지 게시물에 좋아요 버튼을 눌렀을 때 결과를 json 형식으로 클라이언트에게 보내줘서 사용자의 액션이 제대로 수행이 되었는지 사용자한테 알려줘야 겠지요. 이때 모든 일련의 이벤트들의 동작을 정의하고 등록된 상태가 이벤트 리스너에 등록된 상태입니다.

- **Non-Blocking I/O 란?**

자바스크립트는 기본적으로 싱글쓰레드 방식을 채택중입니다. 이 때 비동기적 처리(Asyncronous Processing)의 태스크들을 호출 스택에서 태스크 큐로 보내거나 태스크 큐로 부터 이벤트 루프를 통해 다시 스택으로 가져오는 I/O의 형태를 Non-Blocking 이라고 하죠. 이에 따라 실행 순서에 영향을 미치는 행위를 Non-Blocking I/O 라고 간단히 말할 수 있을 것 같습니다. 반대로 Blocking 의 경우 동기적 처리(Syncronous Processing)들에 대해 뒤에 작업들이 해당 작업으로 인해 지연되는 현상을 이야기 합니다.

## require() 함수는 어떻게 쓰는 것일까요?

Node.JS 에서는 require 메서드를 통해 외부 모듈을 가져올 수 있습니다. require 메서드는 node가 local object에 추가한 메서드로서 다음과 같이 파라미터로 추가할 모듈의 파일 경로값을 받습니다.

```java
const foo = require('파일 경로');
```

require 메서드의 소스코드는 매우 복잡합니다. 하지만 요약하자면 아래와 같은 모양새로 구성되어 있습니다.

```jsx
var require = function(src){
var fileAsStr = readFile(src)                //line 2
    var module.exports = {}                  //line 3
    eval(fileAsStr)                          //line 4
    return module.exports                    //line 5
}
```

먼저 line 1에서는 src의 인자를 받아옵니다 즉,

```jsx
const foo = require('foo')
```

와 같은 경우 'foo'를 인자로 받아오는 식입니다.

line 2에서는 소스 파일을 읽어서 fileAsStr에 저장합니다.

line 3에서는 module.exports 라는 빈 해시를 만들어 둡니다.

line 4에서는 fileAsStr을 eval 합니다. 이 과정은 사실상 src를 복붙하는것과 같습니다.

line 4에 대해 조금 더 설명하면

```jsx
const foo = require('./foo.js')
```

를 한다는 것은, 곧 require()의 인자로 "./foo.js"를 넣는 식이고 위 require()의 line 4는

```jsx
eval(fileAsStr)
```

다음과 같이 변경되는 것과 마찬가지 입니다.

```jsx
var require = function(src){
	var fileAsStr = readFild(src)
	var module.exports = {}
	**const a = 10
	exports.a = a;**
	return module.exports
}
```

결국 exports 해시의 a라는 key에 10이 들어가는 모습입니다.

따라서, 아래 코드는

```jsx
// bar.js

const foo = require('./foo.js')
console.log(foo.a);
```

Runtime에는 아래와 같은 모습입니다.

```jsx
const foo = { a:10 }
console.log(foo.a)
```

foo 에서 exports에 들어간 <key, value> 들이 require() 함수의 아웃풋으로 나오는 것입니다.

## exports? module.exports?

`exports` 는 단순히 `module.exports` 를 참조할 뿐입니다.

공식문서에서 그게 다라고 합니다...!

`module.exports` 와 `exports` 는 같은 객체를 바라보고 있으며, `exports` 는 `module.exports` 의 shortcut입니다.

---

> npm은 무엇인가요?
- npm 패키지를 -g 옵션을 통해 Global로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?

NPM은 Node Package Manager의 약자입니다. 자바스크립트 패키지 매니저이고, NodeJS에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할을 하며 설치/관리를 수행할 수 있는 CLI를 제공합니다.

### npm install Option

npm install 명령어에는 지역(Local) 설치와 전역(Global) 설치 옵션이 있습니다. 옵션을 별도로 지정하지 않으면 지역으로 설치되며 프로젝트 루트 디렉터리에 `node_module` 디렉터리가 자동 생성되고 그 안에 패키지가 설치됩니다. 지역으로 설치된 패키지는 해당 프로젝트 내에서만 사용할 수 있습니다.

### npm -g (Global)

전역에 패키지를 설치하려면 npm install 명령어에 `-g` 옵션을 지정합니다. 전역으로 설치된 패키지는 전역에서 참조할 수 있습니다. 모든 프로젝트가 공통 사용하는 패키지는 지역으로 설치하지 않고 전역에 설치합니다.

> `ES` 모듈은 어떻게 쓰는 것인가요?
- import / export 은 어떻게 사용하나요?
- Dynamic import란 무엇인가요?
- `require()` 가 있는데 왜 `import` 가 생겼을까요?

# Javascript ES6 Module

`require` 는 Node JS에서 사용되고 있는 CommonJS 키워드이고, 여기서 배워볼 `import` 는 ES6에서 새롭게 도입된 키워드입니다. 두 개의 키워드 모두 하나의 파일에서 다른 파일의 코드를 불러온다는 동일한 목적을 가지고 있습니다.

```jsx
const moment = require("moment")
```

```jsx
import moment from "moment"
```

위 2줄의 코드는 기본적으로 `MomentJS` 라는 라이브러리를 불러오는 동일한 작업을 수행하고 있습니다. CommonJS 방식을 따른 첫번째 코드는 `require` 키워드를 사용하여 여터 다른 변수를 할당하듯이 모듈을 불러오는 반면에 ES6 방식을 따른 두번째 코드는 Java나 Python 처럼 `import` 키워드를 사용하여 좀 더 명시적으로 모듈을 불러오고 있습니다.

`require()` 함수 사용법에 대해선 위에 작성되어 있으니 ES6기반 import/export 방법에 대해서 알아보겠습니다.

## ES6 Module System의 이점

먼저 ES6 모듈 시스템은 CommonJS 모듈 시스템보다 최신 스펙이다 보니 여러가지 이점이 많습니다.

우선 `import`, `from`, `export`, `default` 처럼 모듈 관리 전용 키워드를 사용합니다. 그렇기 떄문에 가독성 측면에서 유리한 점이 많습니다. 또한 비동기 방식으로 작동하고 모듈에서 실제로 쓰이는 부분만 불러오기 때문에 성능과 메모리 부분에사도 유리한 측면이 있습니다.

앞으로 설명드릴 `Named Prameter` 와 같이 CommonJS에서는 지원하지 않는 기능들이 있습니다.

## Multiple Objects import/export

먼저 하나의 자바스크립트 모듈 파일에서 여러 개의 객체를 내보내고 불러오는 방법을 알아보도록 하겠습니다.

### export

CommonJS에서는 내보낼 복수 객체들을 `exports` 변수의 속성으로 할당하는 방식을 썼었는데, ES6에서는 `import` 키워드의 짝꿍인 `export` 키워드를 사용해서 명시적으로 선언해 줍니다. 이 때 내보내는 변수나 함수의 이름이 그대로 불러낼 때 사용하게 되는 이름이 되기 때문에 이를 Named Exports라고 일컫습니다.

아래는 미국과 캐나다 달러를 상호 변환해주는 자바스크립트 예제 코드입니다. 이 파일에는 3개의 함수가 있는데 아래 2개의 함수만 다른 파일에서 접근할 수 있도록 내보내기를 하였습니다. 첫번째 방법처럼 선언과 동시에 내보낼 수도 있고, 두번째 방법처럼 선언 후에 별도로 내보낼 수도 있습니다.

**currency-functions.js**

```jsx
const exchangeRate = 0.91;

// 내보내지 않음
function roundTwoDecimals(amount) {
	return Math.round(amount * 100) / 100;
}

// 첫번째 내보내기 방법
export function canadianToUs(canadian) {
	return roundTwoDecimals(canadian * exchangeRate);
}

// 두번째 내보내기 방법
const usToCanadian = function(us) {
	return roundTwoDecimals(us / exchangeRate)
}
export { usToCanadian }
```

### Import

여러 객체(Named Exports)를 불러올 때는 ES6의 `Destructuring` (구조 분해 할당) 문법을 사용해서 필요한 객체만 선택적으로 전역에서 사용하거나, 모든 객체에 별명을 붙이고 그 별명을 통해서 접근할 수도 있습니다.

**test-currency-function.js**

```jsx
// Desturturing
import { canadianToUs } from "./currency-functions"

console.log("50 Canadian dollars equals this amount of US dollars:");
console.log(canadianToUs(50));

// Alias
import * as currency from "./currency-functions"

console.log("30 US dollars equals this amount of Canadian dollars:");
console.log(currency.usToCanadian(30));
```

**실행 결과**

```
50 Canadian dollars equals this amount of US dollars:
45.5
30 US dollars equals this amount of Canadian dollars:
32.97
```

## Single Object export/import

다음으로 하나의 자바스크립트 모듈 파일에서 단 하나의 객체를 내보내고 불러오는 방법을 알아보겠습니다.

### export

CommonJS에서는 내보낼 단일 객체를 `module.exports` 변수에 할당하는 방식을 썼었는데, ES6에서는 그 대신 `export default` 키워드를 사용해서 명시적으로 선언해줍니다. 하나의 모듈에서 하나의 객체만 내보내기 때문에 이를 Default Export라고 부릅니다.

아래 예제는 두개 함수를 객체로 묶어서 내보내기를 한 코드입니다. 이름이 필요없기 때문에 별도 변수 할당 없이 바로 객체를 내보내기 할 수 있습니다. 내보낼때 어떤 이름도 지정하지 않기 때문에 불러올 때도 아무 이름이나 사용할 수 있습니다.

c**urrency-object.js**

```jsx
const exchangeRate = 0.91;

// 내보내지 않음
function roundTWoDecimals(amount) {
	return Math.round(amount * 100) / 100;
}

// 내보내기
export default {
	canadianToUs(canadian){
		return roundTwoDecimals(canadian * exchangeRate);
	},
	usToCanadian: function(us){
		return roundTwoDecimals(us / exhangeRate);
	},
}
```

변수에 할당을 하여 내보내기를 하고 싶다면 다음과 같이 작성할 수도 있습니다.

```jsx
const obj = {
  canadianToUs(canadian) {
    return roundTwoDecimals(canadian * exchangeRate)
  },
}

obj.usToCanadian = function (us) {
  return roundTwoDecimals(us / exchangeRate)
}

export default obj
```

### import

하나의 객체(Default Export)를 불러올 때는 간단하게 `import` 키워드를 사용해서 아무 이름이나 원하는 이름을 주고 해당 객체를 통해 속성에 접근하면 됩니다.

**test-currency-object.js**

```jsx
import currency from "./currency-object"

console.log("50 Canadian dollars equals this amount of US dollars:")
console.log(currency.canadianToUs(50))

console.log("30 US dollars equals this amount of Canadian dollars:")
console.log(currency.usToCanadian(30))
```

실행 결과

```
50 Canadian dollars equals this amount of US dollars:
45.5
30 US dollars equals this amount of Canadian dollars:
32.97
```

한가지 주의해야 할 점은 Bable없이 순수하게 Node.js 최신 버전으로 ES모듈을 시용하는 거라면 import를 살용할 떄 .js 확장자를 붙여주어야 합니다.


> Dynamic Import란 무엇일까요?

위에서 학습했던 `import` 를 사용하여 모든 스크립트를 동시에 가져온다면 로딩 시간이 길어질 수 밖에 없습니다.

ES6에서는 이러한 단점을 보완하기 위해 필요한 스크립트만 가져와서 사용할 수 있도록 `Dynamic Import` 를 정의하였습니다.

사용법은 간단합니다.

```jsx
import('./ImportClass.js');
```

위와 같이 `import` 안에 `import` 할 module명을 넣어 주면 됩니다. 그러면 `return` 값으로 `Promise` 객체를 받습니다.

class객체를 이용한 예제는 아래와 같습니다.

```jsx
export default class ImportClass {
	constructor() {
		console.log('import!');
	}
}
import('./ImportClass').then(importClass.Js=>{
	new importClassJs.default();
});
```

importClass.js 스크립트에서 `default`가 class에 선언되어 있으므로

`importClassJs.default()`로 class 객체를 생성하면 됩니다.

만약에 `default` 를 선언해주지 않았다면 `importClassJs.ImportClass()` 로 생성하면 됩니다.

그러면 'import!' 가 console에 출력됩니다.


> `require()` 가 있는데 왜 `import` 가 생겼을까요?

`require` 와 `import` 에 대해서 비교해 보기 위해서는 우선 `CommonJS` 와 `AMD(Asynchronous Module Definition)` , `ES6` 내장모듈과 같은 자바스크립트의 모듈 시스템에 대해 알고 있어야 합니다.

기존의 자바스크립트(ES5, 현재 대부분의 브라우저에서 지원하는 자바스크립트 문법)는  모듈이라는 개념이 부족하여 각 모듈(또는 파일) 간의 의존성 처리에 제한이 있었습니다. 고전적인 웹 프로젝트에서 자바스크립트를 사용하는 방법을 살펴보면, HTML 파일 내부에 `<script>` 태그를 삽입하여 모듈을 로드하고 있습니다. **하지만 이런 방식은 한가지 문제가 있는데, 자바스크립트 파일끼리 서로 모듈을 공유하는데 제약이 없다는 점입니다.** 그 이유는 `script` 태그로 로드된 모듈은 모두 `window` 객체의 속성이기 때문에 서로 다른 파일에 위치하면서도 모든 객체를 공유할 수 있기 때문입니다.

이처럼 각 자바스크립트 파일이 독립적으로 존재하지 못해 발생하는 여러 문제들 (예를들어 다른 파일에서 같은 이름의 변수를 사용하는 경우) 때문에 하나의 모듈로 관리하기 위한 다양한 패턴(Module Pattern, 즉시 실행 함수 등)을 사용하여 의존성을 관리할 수 밖에 없었습니다.

이를 해결하기 위한 수단으로 모듈이라는 개념을 도입하여 정의한 방법(또는 표준)이 CommonJs 와 AMD 입니다. 이 둘은 내부적으로 모듈 서로 간의 의존성이 지원되지 않는 상태로 만들어 졌는데, ES6에 이르러 언어 내부적으로 자바스크립트 모듈 의존성을 지원하게 되었습니다. (import, export).

### 모듈 정의 방식의 혼용

ES6 모듈은 기본적으로 CommonJs와 AMD 모듈을 혼용해서 사용할 수 있습니다. 모듈을 가져오는 부분에 `require` 와 `import` 를 같이 쓰더라도 문제없이 동작합니다.

`import` 는 ES6 문법이라 현재 사용되는 브라우저에서는 지원하지 않지만, bable과 같은 트랜스파일러가 해결해줄 수 있습니다. AMD는 생략하고 ES6와 CommonJS를 비교하여 설명해보겠습니다.

`import` 는 필요한 부분만 선택적으로 가져올 수 있고, 그것은 곧 메모리 성능의 최적화로 이루어 질 수 있습니다. 또한 비동기적으로 수행될 수 있어 조금 더 좋은 성능을 발휘할 수 있습니다.

또한 `Require` 모듈 시스템은 표준에 근거된 문법이 아닙니다. 현재 `ES6` 모듈이 존재하기 때문에 표준이 될 가능성은 거의 없습니다.

향후 다양한 구현에서 `ES6` 모듈을 기본적으로 지원하여 성능 면에서 유리 할 것입니다.

