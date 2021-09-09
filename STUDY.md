# 1.환경설정
## 1.1 바벨
:bulb: **한줄 정리** :bulb: [참고링크](https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html)   
주로 ECMAScript 2015+이상으로 작성된 코드를 현재를 포함한 하위 버전 브라우져에서도 동작 할 수 있는 JavaScript버전으로 변환 해주는 도구  
### 배경
크로스 브라우징을 해결을 위해서 만들어진 도구라고 한다. 먼저 크로스 브라우징(Cross Browsing)이란 각각의 플렛폼 및 브라우저에따라 다르게 구현 되어야 하는 것을 최대한 
표준 웹기술 방식을 사용하므로써 어떤 웹 브라우저를 사용하든 동등하게 정보가 보여지게 만드는것이라고 정리 할 수 있다.
그래서 바벨은 다양한 플러그인을 통해서 ES6+ 버전의 자바스크립트나 타입스크립트, JSX 등 다른 언어로 분류되는 언어들에 대해서도 모든 브라우저에서 동작할 수 있도록 호환이 가능하다. 
예로 들어서  `Arrow function(화살표 함수)`은 일반함수선언으로, `Promise`같은 내장 메소드는 ES6 +에서만 사용할 수 있지만, Babel polyfill가 사용되는 경우 이전 환경에서 사용할 수 있다.

### 바벨설치
``` 
npm i -D @babel/cli @babel/core @babel/preset-env
```
설치하고 난 후 **package.json**
```js
//package.json
  "devDependencies": {
    "@babel/cli": "^7.15.4",  //바벨을 터미널에서 사용하기 위해 필요
    "@babel/core": "^7.15.5", //바벨 API을 사용하기 위해서 필요
    "@babel/preset-env": "^7.15.4", // 코드를 변환해주는 플러그인 번들
    "babel-loader": "^8.2.2", // webpack에서 바벨을 로드 할때 사용하기 위해서 필요
  }
```
### 프리셋
바벨에서 실질적으로 코드를 변환해주는 것은 `플러그인`이다. 예를 들어 ` @babel/plugin-transform-arrow-functions`은 화살표 함수 코드만을 변환해준다.
이렇게 목적에 맞게 플러그인들을 설치해주어야 하는데 이것을 `@babel/preset-env(공식 프리셋 중에 하나)`을 설치해주면 여러 플러그인을 설치하지 않아도 된다.  
✍`babel/preset-env`는 ECMAScript2015+를 변환할 때 사용한다.  
**바벨 설정파일babel.config.js**
```js
//babel.config.js
const presets = ["@babel/preset-env"];

module.exports = {presets};
```
## 1.2 웹팩(Webpack)
:bulb: **한줄 정리** :bulb: [참고링크](https://joshua1988.github.io/webpack-guide/webpack/what-is-webpack.html#%EC%9B%B9%ED%8C%A9%EC%9D%B4%EB%9E%80)  
프로젝트 전체의 파일들의(HTML,CSS,JavaScript,image..등) 의존성을 파악 한후 로더를 이용해서 처리 한후 하나의 자바스크립트파일로 번들링 해주는 것

### 배경
+ 파일 단위의 자바스크립트 모듈 관리 필요성
여러 js 파일이 하나로 합쳐질때 각각의 변수명이 모두 다르지 않은 이상 유효 범위에 대한 문제가 발생한다. 특히 var로 선언된 변수는 전역변수이므로 어디에서나 접근이 가능하다. 이런 이슈로 인해 js 파일을 모듈로써 관리해야할 필요성이 생겼다.  

✍var로 선언된 변수가 있을 경우
```js
// app.js
var num = 10;
function getNum() {
  console.log(num);
}
```
```js
// main.js
var num = 20;
function getNum() {
  console.log(num);
}
```
```html
<!-- index.html -->
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
    <script src="./app.js"></script>
    <script src="./main.js"></script>
    <script>
      getNum(); // 20
    </script>
  </body>
</html>
```
+ 웹 개발 작업 자동화 도구
HTML,CSS,이미지등 코드의 변경이 있을 때 변경사항을 확인하려면 각각의 파일들을 압축해서 서버에 배포하고 웹사이트의 새로고침을 통해서 확인이 가능했다.
이러한 자동화를 위한 도구가 필요해졌다.
+ 웹 어플리케이션의 빠른 로딩 속도와 높은 성능

### 웹팩설치 [참고링크1](https://velog.io/@eastshine94/webpack-webpack-%EC%84%A4%EC%B9%98%EB%B6%80%ED%84%B0-%EC%8B%A4%ED%96%89%EA%B9%8C%EC%A7%80) [참고링크2](https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html)
```
npm i -D webpack webpack-cli
```
설치가 완료되면 `package.json`파일이 생긴다.  
웹팩 설정 파일인 `webpack.config.js`을 생성한후 설정을 작성.
```js
module.exports = {
    entry: './index.js', 
    output: { 
        path: path.resolve(__dirname, 'dist'), 
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    mode: 'none', 
    module: { 
        rules: [
            {
                test: /\.js$/, 
                include: path.join(__dirname),
                exclude: /(node_modules)|(dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
};
```
+ entry : 웹 자원의 번들링을 시작한 시작점
+ output : 모든 파일을 하나의 번들로 완성 했을 때 결과물을 저장할 위치(dist폴더에 'bundle.js'로 생성한다고 지정)
+ mode : 팩에 내장된 최적화를 사용하도록 지시(none , development , production(기본값))
+ module : 바스크립트가 아닌 파일에 대해서 웹팩에서 인식할 수 있도록 변환시켜주는 속성(모든 로더들의 설정)
  + test : 로딩 할 파일
  + use : 적용할 로더(babel-loader)
----------
# 2.ES6 모듈 시스템
:bulb: **한줄 정리** :bulb:  
 JavaScript를 파일단위로 나누어 전역적으로 변수 및 객체를 공유하는 것이 아닌 독립적인 스코프를 갖게 하여 코드의 재사용과 충돌을 방지하는 기능.

### 배경 
 JavaScript는 웹페이지를 보조하기 위해서 만들어진 언어라 다른 언어들과 달리 모듈 기능이 없었다고한다. 특히 클라이언트 사이드에서의 JavaScript는 각각의 파일을 script태그로 참조하지만 결국에는 하나의 JavaScript파일처럼 되어 다른 파일에 같은 이름의 전역 변수가 있으면 공유하여 의도와 다른게 움직이는 문제가 있었다고 한다. 또한 JavaScript를 브라우저 외에 서버사이드까지 활용하기 위한 움직으로 모듈 기능 문제는 필수가 되었다. 그래서 만들어진 것으로 `CommonJS`와 `AMD`가 있다.  

### ✍ CommonJS [참고링크](https://d2.naver.com/helloworld/12864)
1. Node.js에서 채택한 방식으로 서버사이드에서 주로 사용된다. 
2. **module.exports**로 공유하고 싶은 객체를 내보내고 동기방식으로 **require()** 로 받는다.  

+ module.exports내보내기
```js
//file1.js
module.exports = {
  sum : (a,b) => a+b;
  minus : (a,b) => a-b;
}
//file2.js
const { sum, minus } = require('./file1.js'); //{}객체로 받아진다.
console.log(sum(1, 2)) //3
```
+ exports내보내기
```js
//file1.js
exports.sun = (a,b) => a+b;
exports.minus : (a,b) => a-b;

//file2.js
const func = require('./file1.js'); //{}객체로 받아진다.
console.log(func.sum(1, 2)) //3
```
### ✍ AMD [참고링크] (https://d2.naver.com/helloworld/591319)
1. synchronous Module Definition으로 비동기적 모듈 선언이란 뜻이고, 스크립트가 RequireJS가 제일 유명하다.  
:dizzy_face: requireJS는 define에 넘겨주는 파라미터들이 잘 이해가 되지 않는다... 다시 천천히 봐야겠다  

### :star2: ES6 [참고링크](https://ko.javascript.info/modules-intro)
1. ES6 에서 처음으로 모듈에 대한 표준이 도입
2. `export(모듈 내보내기)`,`import(모듈 가져오기)`가 가능하다.
3. 엄격 모드(use strict)로 실행된다.
4. 모듈 스코프를 갖기때문에 모듈 내부에서 정의한 변수나 함수는 다른 스크립트에서 접근할 수 없다.
5. 단 한번만 호출된다. 
 **모듈 내보기**
+ 이름 붙인 내보내기 (named export) - 함수, 변수, 클래스를 개별로 여러개 export 할 수 있다.
```js
//api.js
export const getDirectoryData = async (nodeId) => {
...
}
```
```js
//app.js
import { getDirectoryData } from "../Api/api.js";
const result = getDirectoryData();
```
+ 기본값 내보내기
```js
//Loading.js
function Loading ({$app, initialState}) {
...
}
export default Loading
```
```js
//App.js
import Loading from "./Loading.js";
...
```
**:exclamation: 브라우저에서 사용하기 :exclamation:**
```html
<html>
  <head>
    <title>고양이 사진첩!</title>
    <link rel="stylesheet" href="./src/styles/style.css">
  </head>
  <body>
    <h1>고양이 사진첩</h1>
    <main class="App">
    </main>
  </body>
  <script src="./index.js" type="module"></script> //👈
</html>
```
JavaScript모듈을 브라우저에서 사용하려면 script가 모듈이라는 것을 브라우저에 알려주기 위해서 `type="module"`을 지정해야한다.  
`type="module"`을 지정하면 로컬에서 **file://** 으로 실행하면 **import** 와 **export** 기능이 작동하지 않으므로 코드 에디터의 ‘라이브 서버’ 등을 사용해야 한다.  

---------
# 3.async/await
:bulb: **한줄 정리** :bulb:  
javaScript의 비동기 처리 패턴중 가장 최근에 나온 문법. 그전에는 콜밸과 Promise가 있다.

## 비동기 처리(callBack, Promise, async/await)
**`콜백 함수(callBack)`**[참고링크](https://www.daleseo.com/js-async-callback/)
```js
//findUser는 두번째 인자로 결과값을 사용 해 처리할 로직을 넘겼고, setTimeout은 0.1초 후에 로직을 실행했다. 
function findUser(id, cb) {
  setTimeout(function () {
    console.log("waited 0.1 sec.");
    const user = {
      id: id,
      name: "User" + id,
      email: id + "@test.com",
    };
    cb(user);
  }, 100);
}

findUser(1, function (user) {
  console.log("user:", user); 
});
```
콜백이란 함수의 인자로 다른 함수를 넘겨주어 특정한 시점에 함수를 호출 하는 것을 말한다. 콜백은 Ajax나 api 통신 같은 비동기 함수들을 이용 할 때 응답 값을 기다리지 않고 다음 코드를 실행 해 버리는 문제를 해결 해주었다. 하지만 자바스크립트가 복잡해지면서 콜백을 중첩으로 사용하게 되고 콜백지옥에 빠지면서 Promise가 생기게 되었다.  

**`Promise`**[참고링크](https://www.daleseo.com/js-async-promise/)  
Promise는 현재에는 당장 얻을 수는 없지만 비동기 연산이 종료된 이후의 결과값이나 실패 이유를 처리하기 위한 방법을 제공한다. 
```js
function findUser(id) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log("waited 0.1 sec.");
      const user = {
        id: id,
        name: "User" + id,
        email: id + "@test.com",
      };
      resolve(user);
    }, 100);
  });
}

findUser(1).then(function (user) {
  console.log("user:", user);
});
```
콜백 함수를 인자로 넘기는 대신에 Promise 객체를 생성하여 리턴하였고, 호출부에서는 리턴받은 Promise 객체에 then() 메서를 호출하여 결과값을 가지고 실행할 로직을 넘겨주고 있습니다. 콜백 함수와 가장 큰 차이점은 최종 결과를 반환하지는 않고, 대신 프로미스를 반환해서 미래의 어떤 시점에 다음에 수행할 작업을 진행한다.    
**Promise 사용법**  
실제 코딩을 할 때는 Promise를 직접 생성해서 리턴해주는 코드 보다는 어떤 라이브러리의 함수를 호출해서 리턴 받은 Promise 객체를 사용하는 경우가 더 많다고 한다.
대표적으로 fetch() 함수가 있다. fetch()는 API의 URL을 인자로 받고, 미래 시점에 얻게될 API 호출 결과를 Promise 객체로 리턴한다. 
Promise 객체의 then() 메소드는 결과값을 가지고 수행할 로직을 담은 콜백 함수를 인자 받고, catch() 메서드는 예외 처리 로직을 담은 콜백 함수를 인자로 받습니다.
```js
fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`)
  .then((response) => console.log("response:", response))
  .catch((error) => console.log("error:", error));
```
**async/await** [참고링크](https://www.daleseo.com/js-async-async-await/)
Promise의 아래와 같은 문제점을 해결하기 위해서 ES7(ES2017)에서 async/await가 추가 되었다. async/await를 사용하면 동기 함수처럼 코드를 작성 할 수 있고, 더욱 직관적으로 보이게 된다.
1.Promise는 디버깅
2.예외 처리 (try/catch 대신 catch메서드 사용) 들여쓰기로 인한 가독성 하락 등의 문제
```js
//259라인코드를  async/await로 변경
export const getDirectoryData = async (nodeId) => {
    try {
        const response =  await fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`);
        if(response.ok) {
            return response.json();
        }
    } catch (error) {
        console.warn(error);
    }
}
```
달라진 저은 async 키워드가 붙었다는 것을 알 수 있습니다. 그리고 Promise를 리턴하는 모든 비동기 함수 호출부 앞에는 await 키워드가 추가되었다.
await 키워드는 async 키워드가 붙어있는 함수 내부에서만 사용할 수 있으며 비동기 함수가 리턴하는 Promise로 부터 결과값을 추출해준다. 즉, await 키워드를 사용하면 일반 비동기 처리처럼 바로 실행이 다음 라인으로 넘어가는 것이 아니라 결과값을 얻을 수 있을 때까지 기다주어 일반적인 동기 코드 처리와 동일한 흐름으로 (함수 호출 후 결과값을 변수에 할당하는 식으로) 코드를 작성할 수 있으며, 따라서 코드를 읽기도 한결 수월해집니다.   

--------
# 4.이벤트 위임(Event Delegation)
:bulb: **한줄 정리** :bulb:  
이벤트 위임을 사용하면 요소마다 핸들러를 할당하지 않고, 요소의 공통 조상에 이벤트 핸들러를 단 하나만 할당 해서 하위 이벤트들을 제어하는 방식  

**이벤트 위임**[참고링크](https://ui.toast.com/weekly-pick/ko_20160826)  
캡처링과 버블링을 활용한 이벤트 패턴이라고한다. 상위엘리멘트에 이벤트를 걸어두고 하위에서 발생한 클릭 이벤트를 감지하도록 한다. 
```js
//이벤트 위임을 적용하지 않았을 때
//$nodesContainer.querySelectorAll('.Node').forEach($node =>  $node.addEventListener('click', (e) => {
//     const index = $node.dataset.index;
//     if (index) {
//       const findNode = this.state.nodes.find((node) => node.id === index);
//       this.onClick(findNode);
//     } else {
//       this.prevClick();
//     }
//   }));
  //이벤트 위임
   $nodesContainer.addEventListener('click', (e) => {
    const clicckedNode = e.target.closest('.Node');
    const index = clicckedNode.dataset.index;
    if(index) {
        const findNode = this.state.nodes.find(node => node.id === index);
        this.onClick(findNode);
    } else {
        this.prevClick();
    }
});
```
이벤트 위임을 사용하면 아래와 같은 장점이 있다.  
1.동적인 엘리먼트에 대한 이벤트 처리가 수월하다.  
2.상위 엘리먼트에서만 이벤트 리스너를 관리하기 때문에 하위 엘리먼트는 자유롭게 추가 삭제할 수 있다.  
3.이벤트 핸들러 관리가 쉽다.  






















 












