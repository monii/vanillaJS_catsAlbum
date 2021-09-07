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
✍`babel/preset-env`는 ECMAScript2015+를 변환할 때 사용한다.  
**바벨 설정파일babel.config.js**
```
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
```
// app.js
var num = 10;
function getNum() {
  console.log(num);
}
```
```
// main.js
var num = 20;
function getNum() {
  console.log(num);
}
```
```
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
```
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











