# Vanilla Redux

Learning **Vanilla X Redux** and **React X Redux**

## 알게된 점

### store

-   내 data(state) 를 넣는곳.
-   createStore 라는 함수를 이용해 내 데이터를 저장해둘 수 있는 스토어를 생성해 data(state)를 저장하면, 여러곳에서 사용할 수 있다.
-   store 는 **reducer** 라는 것이 필요하다.

### reducer

-   data 를 수정하고 리턴하는것을 책임진다. 만약 아래와 같이

```javascript
reducer = () => {
	return 'hello';
};
```

라는 함수가 있다면, 내 애플리케이션 속 data 는 곧 "hello"가 된다.

-   이 "hello"라는 친구를 쓰기 위해선 store.getState(); 를 통해 불러올 수 있다.

-   reducer 에는 (state, action) 두가지 매개변수가 들어간다.

```javascript
const countModifier = (count = 0, action) => {
	const { type } = action;
	switch (type) {
		case 'ADD':
			count++;
			break;
		case 'MINUS':
			count--;
			break;
		default:
			break;
	}
	return count;
};
```

-   이렇게 리듀서에서 변경한 값을 알기 위해서는 store.getState() 를 통해 읽어올 수 있고, 변경된 값을 감지하기 위해서는 store.subscribe() 를 통해 상태값이 변경되었을 때 이를 자동으로 감지할 수 있다.
