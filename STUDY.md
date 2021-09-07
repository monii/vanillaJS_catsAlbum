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
```
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
※`babel/preset-env`는 ECMAScript2015+를 변환할 때 사용한다.  
**바벨 설정파일babel.config.js**
```
//babel.config.js
const presets = ["@babel/preset-env"];

module.exports = {presets};
```
## 1.2 웹팩(Webpack)
:bulb: **한줄 정리** :bulb: 프로젝트 전체의 파일들의 의존성을 파악 한후 로더를 이용해서 처리 한후 하나의 자바스크립트파일로 번들링 해주는 것





