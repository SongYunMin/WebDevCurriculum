---

# Question

- 어떠한 자바스크립트 코드가 HTTP 응답이나 사용자의 이벤트등에 종속되어 언제 실행되어야 할 지 알기 어려울 때엔 어떻게 해야 할까요?
- 브라우저의 `XMLHttpRequest` 객체는 무엇이고 어떻게 동작하나요?
- `fetch` API는 무엇이고 어떻게 동작하나요?
    - 자바스크립트의 Promise는 어떤 객체이고 어떤 일을 하나요?
    - 자바스크립트의 `async`와 `await` 키워드는 어떤 역할을 하며 그 정체는 무엇일까요?

# Answer

> 어떠한 자바스크립트 코드가 HTTP 응답이나 사용자의 이벤트등에 종속되어 언제 실행되어야 할 지 알기 어려울 떄엔 어떻게 해야 할까요?

자바스크립트는 기본적으로 동기적으로 작동합니다. 하지만 자바스크립트는 여러개의 비동기 메소드를 지원하여 사용자에 이벤트나 HTTP 응답에 반응할 수 있도록 만들어 졌습니다.

사용자의 행동은 언제 발생할지 예측하는 것은 매우 복잡한 문제이며 실제로 그런 방법은 많지 않습니다. 그렇기 때문에 특정 이벤트에 종속되어 있거나, HTTP 응답등을 기다려야 하는 경우에, 우리가 알고있는 동기 프로그래밍(Syncronous Programming)은 매우 비효율 적인 방식입니다.

## 비동기 프로그래밍 (Asyncronous Programming)

비동기 프로그래밍은 어떤 일이 완료되기를 기다리지 않고 다음 코드를 실행해 나가는 프로그래밍 방식입니다. 반대로 어떤 일이 완려될 때까지 코드의 실행을 멈추고 기다리는 프로그래밍 방식을 동기식 프로그래밍(Synchronous Programming)이라고 부릅니다.

브라우저에서의 비동기 프로그래밍은 주로 통신과 같이 오래 걸리는 작업들을 브라우저에 위임할 때 이루어집니다.

비동기 프로그래밍 방식은 대게 프로그래밍 성능과 응답성을 높이는 데에 도움을 줍니다. 하지만 코드가 실제로 실행되는 순서가 뒤죽박죽이 되므로, 코드의 가독성을 해치고 디버깅을 어렵게 만든다는 비판을 받아왔습니다. 이런 문제를 해결하기 위해 비동기 프로그래밍을 위한 여러 기법이 생겨났고, 또 어떤 것들은 JavaScript언어 자체에 포함되기도 했습니다. 여기에서는 근래 JavaScript 생태계에서 자주 사용되는 몇 가지 비동기 프로그래밍 기법들을 살펴 보겠습니다.

## 콜백 (Callback)

콜백은 다른 함수의 인수로 넘기는 함수를 말하는데, 이 콜백을 가지고 비동기 프로그래밍을 할 수 있습니다.

아래 예제는 유명한 JavaScript 라이브러리인 JQuery를 이용해 Github의 Create-react-app 프로젝트에 등록되어 있는 이슈 목록을 가져와서 출력하는 코드입니다.

```jsx
const $ = require('jquery');
const API_URL = "https://api.github.com/repos/facebookincubator/create-react-app/issues?per_page=10";

$.ajaxSetup({
	dataType: 'json'
});

$.get(API_URL, issues => {
	console.log('최근 10개의 이슈:');
	issues
		.map(issue => issue.title)
		.forEach(title => console.log(title));
	console.log('출력이 끝났습니다.');
});

console.log('받아오는 중...');
```

위 예제에서 `$.get` 메소드의 두 번째 인수로 콜백을 넘겨주었습니다. `$.get` 메소드는 비동기식으로 동작하며, Github API 서버와 통신하는 일을 브라우저에 위임한 후 바로 종료됩니다. 통신이 끝나면, 그 결과를 첫 번째 인수로 해서 콜백을 호출하게 됩니다.

여기서 주의할 것은 콜백을 인수로 받는 함수가 항상 비동기식으로 동작하는 것은 아니라는 것입니다. 위 예제의 `map`, `forEach` 의 인수로 넘겨준 것 역시 콜백이지만 이 때에는 콜백이 동기식으로 호출됩니다. 즉, 콜백의 실행이 끝날때 까지 코드의 실행 흐름이 다음으로 넘어가지 않습니다.
5
콜백은 JavaScript가 고차함수를 잘 지원한다는 특징으로 인해 가장 많이 사용되는 비동기 프로그래밍 양식이었습니다. 하지만 콜백만으로는 복잡한 비동기 데이터 흐름을 표현하기가 어려워서 많이 프로그래머들이 힘들어 했고 결국, **콜백 지옥(Callback Hell)** 이라는 용어까지 생겼났습니다.

---

> XMLHttpRequest는 무엇이고 어떻게 동작하나요?

`XMLHttpRequest` (XHR) 객체는 서버와 상호작용 하기 위하여 사용됩니다. 전체 페이지의 새로고침없이도 URL로부터 데이터를 받아올 수 있습니다. 이는 웹 페이지가 사용하고 있는 것을 방해하지 않으면서, 페이지의 일부를 업데이트할 수 있도록 해 줍니다. `XMLHttpRequest` 는 주로 `AJAX` 프로그래밍에 사용됩니다.

![img.png](./skeleton/img/img.png)
`XMLHttpRequest` 는 XML 뿐만 아니라 모든 종류의 데이터를 받아올 수 있습니다. 물론 HTTP 이외의 프로토콜도 지원합니다.(`file` 과 `ftp` 포함)

통신을 통해 서버로부터 이벤트나 메시지 데이터를 받아야 한다면 `EventSource` 를 통한 server-sent events 사용을 고려해야 합니다. 완전 양방향 통신을 해야 한다면 `Web Socket` 이 더 나은 선택일 수 있습니다.

## 생성자

`XMLHttpRequest()`

생성자는 `XMLHttpRequest` 를 초기화합니다. 다른 모든 메서드 호출 이전에 호출되어야 합니다.

## Example

```jsx
let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.responseText);
            } else {
                console.error(xhr.responseText);
            }
        }
    };
    xhr.open('GET', 'http://localhost:3000/single-json');
    xhr.send();
```

위 예제를 보면 생성자를 이용하여 인스턴스를 생성합니다. 그 후에 `onreadystatechange` 메서드를 사용하게 되는데 이는 `readyState` 애트리뷰트가 변경될때마다 호출되는 이벤트 핸들러 입니다. 그 후에 `reponseText` 를 사용하여 요청에 대합 응답을 텍스트로 갖는 `DOMString` 을 반환 받습니다. 만약 요청이 성공하지 못했거나 아직 전송되지 않았을 경우 `null` 을 반환합니다.

아래쪽에 `xhr.open()` 메서드를 사용하여 보낼 요청을 초기화합니다. 메서드 Type과 URL이 인자로 들어가게 됩니다.

맨 마지막 줄에 `xhr.send()` 를 통해서 요청을 보냅니다. 요청이 비동기인 경우 이 메소드는 요청이 보내진 즉시 반환합니다.

---

> `fetch` API는 무엇이고 어떻게 동작하나요?
- 자바스크립트의 Promise는 어떤 객체이고 어떤 일을 하나요?
- 자바스크립트의 `async`와 `await` 키워드는 어떤 역할을 하며 그 정체는 무엇일까요?

## Fetch API

Fetch API는 네트워크 통신을 포함한 리소스 취득을 위한 인터페이스가 정의되어 있습니다.

`XMLHttpRequest` 가 비슷한 역할을 하지만, Fetch API가 좀더 강력하고 유연한 조작을 가능하게 합니다.

## 개념 및 사용방법

Fetch 에는 일반적인 오브젝트로 `Request` 와 `Response` 가 포함되어 있습니다. 이것들은 Service worker, Cache API 같이 응답 객체와 요청 객체를 다루는 API나 독자적으로 응답을 발생시키는 경우에도 사용 가능합니다.

또한 `CORS` 나 `HTTP` 오리진 헤더의 행동에 관련한 개념에 대해서도 정의되어 있습니다. 이 정의는 여러곳에 분산되어있는 갖가지 행동에 대한 정의들을 한곳에 고쳐 쓴 것입니다.

Fetch API 로 리소스를 취득하기 위해선 `GlobalFetch.fetch` 메서드를 불러들여야 합니다. 이 메서드는 `Window` 나 `WorkerGlobalScope` 와 같은 인터페스로부터 구현되었습니다.

`fetch()`를 불러들이는 경우, 취득할 리소스를 반드시 인수로 지정하지 않으면 안됩니다. 읽어들인 뒤, `fetch()`는 `Promise`객체를 반환합니다. 리퀘스트가 성공하든 실패하든 해당 리퀘스트 통신에 대한 Response객체가 취득됩니다. `fetch()`의 두번째 인수는 초기화에 사용되는 객체를 정의하고 있습니다. 이 인수는 기입하지 않아도 함수의 동작에 문제가 없습니다. 이 인수에 대한 상세한 정보는 Request)를 참고해주시기 바랍니다.

`Response`를 가져온 후에, 콜백함수의 매개변수로 담긴 response 객체에는 리스폰스에 포함되어있는 컨텐츠와 그에대한 처리방법이 담긴 메소드들이 담겨있습니다.

`Request()` 와 `Response()` 를 사용하는 것으로, Request와 Response를 직접 작성할 수 있습니다. 하지만 이러한 추가 옵션들은   `FetchEvent.respondWith` 와 같은 또다른 API를 불러 들이는 작업이 수행되어야 하므로 필요하지 않다면 굳이 작성하지 않는 편이 좋습니다.

## Using Fetch

Fetch API를 이용하면 Request나 Response와 같은 HTTP 파이프라인을 구성하는 요소를 조작하는 것이 가능합니다. 또한 `fetch()` 메서드를 이용하는 것으로 비동기 네트워크 통신을 알기쉽게 기술할 수 있습니다.

`Fetch` 의 기본 스펙은 `jQuery.ajax()` 와 기본적으로 두가지가 다르다는 사실에 유념해야 합니다.

- `fetch()`로 부터 반환되는 Promise 객체는 **HTTP error 상태를 reject하지 않습니다.** HTTP Statue Code가 404나 500을 반환해도 마찬가지 입니다. 대신 ok 상태가 false인 resolve가 반환되며, 네트워크 장애나 요청이 완료되지 못한 상태에는 reject가 반환됩니다.
- 보통 `fetch`는 **쿠키를 보내거나 받지 않습니다.** 사이트에서 사용자 세션을 유지 관리해야하는 경우 인증되지 않는 요청이 발생합니다. 쿠키를 전송하기 위해서는 자격증명(credentials) 옵션을 반드시 설정해야 합니다.

기본적인 `fetch` 는 누구라도 알기 쉽고 간단하게 작성할 수 있습니다.

```jsx
fetch('http://example.com/movies.json')
	.then(function(response) {
		return response.json();
	})
	.then(function(myJson) {
		console.log(JSON.stringify(myJson));
	});

```

네트워크에서 JSON 파일을 가져와서 콘솔에 인쇄합니다. 간단한 `fetch()` 사용 흐름은 인수 한개(경로)를 가져오고 응답을 포함하는 Promise(Response Object)를 반환하는 것입니다.

위 예제는 단순한 HTTP Response이며, 실제 JSON이 아닙니다. response 객체로부터 사진을 가져오기 위해서는 json() 메서드를 사용할 필요가 있습니다.

# Javascript Promise

## Promise

콜백(Callback Hell)의 문제를 해결하기 위해 여러 라이브러리들이 등장했고 많은 개발자들에게 선택받은 것이 바로 `Promise` 패턴을 사용한 라이브러리들입니다. 이 라이브리러들은 표준화되어서 결국 ES2015에 이르러  Javascript 언어 자체에 포함되었습니다.

`Promise` 는 '언젠간 끝나는 작업' 의 결과 값을 담는 통과 같은 객체입니다. `Promise` 객체가 만들어지는 시점에는 그 통 안에 무엇이 들어갈지 모를 수 있습니다. 대신 `then` 메서드를 통해 Callback을 등록해서 작업이 끝났을 떄 결과값을 가지고 추가 작업을 할 수 있습니다.

`Promise` 객체를 생성하는 가장 쉬운 방법은 `Promise.resolve` 정적 메소드를 사용하는 것입니다.

```jsx
const p = Promise.resolve(1);
```

위 코드에서 `1` 이라는 결과 값을 가지는 `Promise` 객체를 생성했습니다. 그러나 이 코드는 비동기 작업을 하고 있지 않습니다.

비동기 작업을 하는 `Promise` 객체는 `Promise` 생성자를 통해 만들 수 있습니다.

```jsx
const p = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('2초가 지났습니다.');
		resolve('hello');
	}, 2000);
});
```

`Promise` 생성자는 콜백을 인수로 받습니다. 이 콜백의 첫 번째 인수로 `resolve` 함수가 들어오는데 콜백 안에서 `resolve` 를 호출한 다는 것은 `resolve` 에 인수로 준 값이 곧 `Promise` 객체의 궁극적인 결과값이 됩니다.

두 번째 인수로 들어오는 `reject` 함수는 비동기 작업에서 에러가 발생했을 때 호출하는 함수입니다.

위 예제에서는 `setTimeout` 을 이용해 2초가 지난 뒤에 콜백이 실행 되도록 했습니다. 즉, `p` 변수에 저장된 `Promise` 객체는 2초동안 결과값이 없는 상태였다가, 2초 뒤에 `resolve` 함수가 호출되어 `p` 객체는 결과값을 갖는 객체가 됩니다.

`Promise` 객체의 결과값을 사용해 추가 작업을 하기 위해선, `then` 메서드를 호출해야 합니다. `then` 메서드에 콜백을 넘겨서, 첫 번째 인수로 들어온 결과값을 가지고 추가 작업을 할 수 있습니다.

```jsx
p.then(msg => {
	console.log(msg);  // Hello
});
```

`then` 메서드의 중요한 특징 중 하나는 바로 `then` 메서드 자체도 `Promise` 객체를 반환한다는 것입니다. 이 때 콜백에서 반환한 값이 곧 `Promise` 의 결과값이 됩니다.

```jsx
const p2 = p.then(msg => {
	return msg + ' world';
});

p2.then(msg => {
	console.log(msg); // Hello world
});
```

위 코드는 아래와 같이 줄여 쓸 수 있습니다.

```jsx
p.then(msg => {
	return msg + ' world';
}).then(msg => {
	console.log(msg);
});
```

또한 `then` 메서드에 넘겨준 콜백에서 `Promise` 객체를 반환하면, `then` 메서드가 반환한 `Promise` 객체는 앞의 `Promise` 객체의 결과를 따르게 됩니다.

아래 코드의 실행결과는 다음과 같습니다.

```jsx
// Promise 객체를 반환하는 함수
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${ms} 밀리초가 지났습니다.`);
      resolve();
    }, ms);
  });
}

delay(1000)
  .then(() => delay(2000))
  .then(() => Promise.resolve('끝'))
  .then(console.log);

console.log('시작');
```

```jsx
시작
1000 밀리초가 지났습니다.
2000 밀리초가 지났습니다.
끝
```

## HTTP 통신을 하기 위해서는?

HTTP 통신을 하기 위해 `Promise` 가 어떻게 사용되는지 살펴 보겠습니다. 아래 예제에 사용된 `axios` 는 Javascript를 통해 직접 요청을 보내기 위해 널리 사용되는 라이브러리 입니다. `GET` 메서드로 요청을 보내기 위해 `axios.get()` 함수를 사용할 수 있는데, 이 때 Promise 객체가 반환됩니다.

```jsx
const axios = require('axios');
const API_URL = 'https://api.github.com';

axios.get(`${API_URL}/repos/facebookincubator/create-react-app/issues?per_page=10`)
	.then(res => {
		console.log('최근 10개의 이슈');
		res.data
			.map(issue => issue.title)
			.forEach(title => console.log(title));
		console.log('출력이 끝났습니다.');
	});
```

`axios.get()` 을 호출해서 반환된 `Promise` 객체에 담긴 결과값은 `Response` 객체로, HTTP 응답에 대한 내용을 담고 있습니다.

`Promise` 의 진가는, 복잡한 비동기 데이터 흐름을 다룰 때 발휘됩니다.

아래의 두 특징을 활용하면, 콜백만 사용했을 때보다 코드를 훨씬 더 깔끔하게 작성할 수 있습니다.

- `then` 메서드는 `Promise` 객체를 반환하므로, 콜백을 중첩하지 않고도 비동기 작업을 연이어 할 수 있습니다.
- 비동기 작업이라는 동작 자체를 값으로 다룰 수 있게 됩니다. 즉, 이제까지 값을 다루면서 해왔던 모든 작업을 Promise 객체에 대해서도 할 수 있습니다.

## 비동기 함수 (Async Function)

`Promise` 를 사용하는 비동기 프로그래밍 방식은 여러가지 장점을 갖지만, 여전히 콜백은 사용한다는 점 때문에 '불편하다', '가독성이 좋지 않다' 는 비판을 받았습니다.

ES2017에서 도입된 비동기 함수(async Function)을 사용하면, 동기식 코드와 거의 같은 구조를 갖는 비동기식 코드를 짤 수 있습니다.

함수 앞에 `async` 키워드를 붙이면 그 함수는 비동기 함수가 됩니다.

```jsx
// 비동기 함수
async function func1() {
  // ...
}

// 비동기 화살표 함수
const func2 = async () => {
  // ...
}

// 비동기 메소드
class MyClass {
  async myMethod() {
    // ...
  }
}
```

비동기 함수는 항상 `Promise` 객체를 반환하는 특징을 가지고 있습니다. 이 `Promise` 의 결과 값은 비동기 함수 내에서 무엇을 반환하느냐에 따라서 결정되며, `then` 메서드와 똑같은 방식으로 동작합니다.

```jsx
async function func1() {
  return 1;
}

async function func2() {
  return Promise.resolve(2);
}

func1().then(console.log); // 1
func2().then(console.log); // 2
```

또 하나의 중요한 특징은 비동기 함수 내에서 `await` 키워드를 쓸 수 있습니다. `await` 는 `Promise` 의 `then` 메서드와 유사한 기능을 하는데, `await` 키워드 뒤에 오는 `Promise` 가 결과값을 가질 때 까지 비동기 함수의 실행을 중단 시킵니다.

'중단'에 의미는 비동기식이며, 브라우저는 `Promise` 가 완료될 때까지 다른 작업을 처리할 수 있습니다.

`await` 는 연산자이기도 하며, `await` 연산의 결과값은 뒤에 오는 `Promise` 객체의 결과값이 됩니다.

`then` 을 이용하여 작성하는것 보다 아래처럼 작성하는게 더 동기식 코드를 짜듯이 비동기식 코드를 짤 수 있습니다.

```jsx
// Promise 객체를 반환하는 함수.
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${ms} 밀리초가 지났습니다.`);
      resolve()
    }, ms);
  });
}

async function main() {
  await delay(1000);
  await delay(2000);
  const result = await Promise.resolve('끝');
  console.log(result);
}

main();
```

`await` 키워드는 `for`, `if`와 같은 제어 구문 안에서도 쓰일 수 있기 때문에, `then` 메소드를 사용할 때보다 **복잡한 비동기 데이터 흐름을 아주 쉽게 표현할 수 있다**는 장점이 있습니다. 다만, 비동기 함수 역시 Promise를 사용하기 때문에, 비동기 함수를 잘 쓰기 위해서는 여전히 Promise에 대해 잘 알고 있어야 합니다.