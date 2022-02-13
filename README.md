# Vanilla Redux

Learning **Vanilla X Redux** and **React X Redux**

## Vinilla JS - Redux

### 알게된 점

#### store

-   내 data(state) 를 넣는곳.
-   createStore 라는 함수를 이용해 내 데이터를 저장해둘 수 있는 스토어를 생성해 data(state)를 저장하면, 여러곳에서 사용할 수 있다.
-   store 는 **reducer** 라는 것이 필요하다.

#### reducer

-   리듀서가 반환하는 값은 애플리케이션의 상태가 된다. 초기 상태값도 지정할 수 있다.

```javascript
reducer = () => {
	return 'hello';
};
```

-   위와 같은 함수가 있다면, 내 애플리케이션 속 data 는 곧 "hello"가 된다.

-   이 "hello"라는 친구를 쓰기 위해선 store.getState(); 를 통해 불러올 수 있다.

-   reducer 에는 (state, action) 두가지 매개변수가 들어간다. 또 아래와 같이 이름은 자기 쪼대로 지어도 된다. 어차피 스토어에 붙여만 주면 된다. action은 리듀서와 소통할 수 있는 방법으로, action에 적절한 동작을 전달하면 리듀서는 이를 해석해 상태값을 능동적으로 변경시키고, 이를 반환해줄 수 있다. 아래를 보자.

```javascript
const countModifier = (count = 0, action) => {
	const { type } = action;
	switch (type) {
		case 'ADD':
			return count++;

		case 'MINUS':
			return count--;

		default:
			return count;
	}
};
```

-   이렇게 변경된 상태 값을 알기 위해서는 store.getState() 를 통해 읽어올 수 있고, 실시간으로 변경된 값을 감지하기 위해서는 store.subscribe() 를 통해 상태값이 변경되었을 때 이를 자동으로 감지할 수 있다. 흔히 onChange와 같은 역할로써 쓸 수 있다.

---

## React X Redux

### 알게된 점

#### Provider

-   리액트에서 store.subscribe()와 같이 상태변화를 감지해 컴포넌트를 재 렌더링하기 위해 index.js에서 아래와 같이 최상위 컴포넌트인 App.js 를 Provider 로 감싸고, store를 넣어준다.

```javascript
//index.js

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
```

---

위와 같은 눈물의 똥꼬쇼를 쉽게하기위해 redux-toolkit이라는 라이브러리를 사용하면 동일한 기능을 훨씬 편하게 사용할 수 있다.

#### 기존

```javascript
// 먼저 액션 명을 짓고, 그에 맞는 동작함수를 정의
const ADD = 'ADD';
const DELETE = 'DELETE';

const addToDo = (text) => {
	return {
		type: ADD,
		text,
	};
};

const deleteToDo = (id) => {
	return {
		type: DELETE,
		id: parseInt(id),
	};
};
// 리듀서에서 초기 상태값과 액션 타입별 세부 동작을 정의
const reducer = (state = [], action) => {
	switch (action.type) {
		case ADD:
			return [{ text: action.text, id: Date.now() }, ...state];
		case DELETE:
			return state.filter((toDo) => toDo.id !== action.id);
		default:
			return state;
	}
};

const store = createStore(reducer);

// 다른곳에서 액션을 쓰기위해 export
export const actionCreators = {
	addToDo,
	deleteToDo,
};

export default store;
```

#### 변경

```javascript
// 액션명을 정의
const addToDo = createAction('ADD');
const deleteToDo = createAction('DELETE');

/**
 * createReducer (초기상태값, 분기){
 *  [액션명] : (state, action) => {세부 동작}
 * }
 * = 새 state를 return 하거나, mutate할 수 있다.
 */
const reducer = createReducer([], {
	[addToDo]: (state, action) => {
		state.push({ text: action.payload, id: Date.now() });
	},
	[deleteToDo]: (state, action) => {
		return state.filter((toDo) => toDo.id !== action.payload);
	},
});

const store = createStore(reducer);

// 이전과 동일
export const actionCreators = {
	addToDo,
	deleteToDo,
};

export default store;
```
