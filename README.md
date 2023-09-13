# RESTFUL-API-calculator
기초 RESTFUL API를 적용한 계산기 기능 구현

가장 기본적인 메서드 처리와 계산기 클래스 및 기능 구현

쿠키 세션도 해보고싶다


# API

---

| HTTP | PATH | DESCRIPTION |
| --- | --- | --- |
| GET | /calculator/{id} | 계산 결과 확인 |
| POST | /calculator | 계산기 생성 |
| DELETE | /calculator/{id} | 계산기 삭제 |
| POST | /calculator/{id}/add | 덧셈 |
| POST | /calculator/{id}/sub | 뺄셈 |
| POST | /calculator/{id}/multiple | 곱셈 |

# Status Code

---

| Code | Description |
| --- | --- |
| 200 |  |
| 201 |  |
|  |  |

# 상세

---

## GET /calculator/{id}

---

### Description

---

⇒id에 해당하는 계산기의 결과(value)를 가져온다.

### Parameter - None

---

⇒ `**None**`

조회하고자 하는 계산기 id를 URI에 삽입

**Example)**

```jsx
localhost:3000/calculator/1
```

### Retrun - Object

---

⇒ 계산 결과값을 담은 value를 포함하는 객체 형태로 반환

| Name | Data Type | Description |
| --- | --- | --- |
| value | integer | null | 계산 결과값 |
| status | string | 계산 성공 유무 |

**Example) 값 가져오기 성공**

```jsx
{
	value:10,
	status:"succssed"
}
```

**Example) 값 가져오기 실패**

```jsx
{
	value:null,
	status:"failed"
}
```

## POST /calculator

---

### Description

---

⇒ 계산기 생성

### Parameter - {Name}

---

⇒ 계산기 이름을 담은 객체

| Name | Data Type | Description |
| --- | --- | --- |
| name | string | 생성하고자 하는 계산기의 이름 |

**Example)**

```jsx
{
	name:"나의 계산기"
}
```

### Retrun - Object

---

⇒ 생성된 계산기의 id와 이름을 담은 객체

| Name | Data Type | Description |
| --- | --- | --- |
| status | string | 성공 유무”successed”, “failed” 둘 중 하나 반환 |
| id | integer | 생성된 계산기의 id |
| name | string | 생성된 계산기의 이름 |
| message | string | 상세 메세지 |

**Example)**

```jsx
{
	status:"successed",
	id:5,
	name:"나의 계산기",
	message:"계산기 생성이 완료되었습니다."
}
```

**Example)**

```jsx
{
	status:"failed",
	id:0,
	name:"",
	message:"계산기 생성에 실패했습니다."
}
```

## DELETE /calculator/{id}

---

### Description

---

⇒ id에 해당하는 계산기 삭제

### Parameter - None

---

⇒ `**None**`

삭제하고자 하는 계산기의 id를 URI에 삽입

```jsx
localhost:3000/calculator/1
```

### Retrun - Object

---

⇒ 삭제 성공 유무와 메세지, 삭제된 계산기 id를 객체로 반환

| Name | Data Type | Description |
| --- | --- | --- |
| status | string | 성공 유무 |
| message | string | 상세 메세지 |
| id | integer | 삭제된 계산기 id, 삭제 실패 시 -1 반환 |

**Example) 삭제 성공**

```jsx
{
	status:"successed",
	message:"계산기 삭제가 완료되었습니다.",
	id:155

}
```

**Example) 삭제 실패**

```jsx
{
	status:"failed",
	message:"계산기 삭제에 실패하였습니다.",
	id:-1	
}
```

## POST /calculator/{id}/add

---

### Description

---

⇒ 계산기 더하기 연산 실행

### Parameter - num1 : integer, num2 : integer

---

⇒ 계산하고자 하는 2개의 값을 각 속성에 대입

| Name | Data Type | Description | Rule |
| --- | --- | --- | --- |
| num1 | integer | 계산하고자 하는 첫 번째 값 | 실수 데이터 사용 금지 |
| num2 | integer | 계산하고자 하는 두 번째 값 | 실수 데이터 사용 금지 |

**Example)**

```jsx
{
	num1:10,
	num2:20
}
```

### Retrun - Object

---

⇒ 계산 결과값과 성공 유무를 반환

| Name | Data Type | Description |
| --- | --- | --- |
| status | string | 성공 상태 |
| message | string | 상세 메세지 |
| value | integer | 계산 결과값 |
| id | integer | 연산 수행한 계산기 id |

**Example)**

```jsx
{
	status:"successed",
	message:"연산에 성공하였습니다.",
	value:30,
	id:153
}
```

**Example)**

```jsx
{
	status:"failed",
	message:"연산에 실패하였습니다. 실수는 사용할 수 없습니다.",
	value:0,
	id:153
}
```

## POST /calculator/{id}sub

---

### Description

---

⇒ 계산기 빼기 연산 실행

### Parameter - num1 : integer, num2 : integer

---

⇒ 계산하고자 하는 2개의 값을 각 속성에 대입

| Name | Data Type | Description | Rule |
| --- | --- | --- | --- |
| num1 | integer | 계산하고자 하는 첫 번째 값 | 실수 데이터 사용 금지 |
| num2 | integer | 계산하고자 하는 두 번째 값 | 실수 데이터 사용 금지 |

**Example)**

```jsx
{
	num1:10,
	num2:20
}
```

### Retrun - Object

---

⇒ 계산 결과값과 성공 유무를 반환

| Name | Data Type | Description |
| --- | --- | --- |
| status | string | 성공 상태 |
| message | string | 상세 메세지 |
| value | integer | 계산 결과값 |
| id | integer | 연산 수행한 계산기 id |

**Example)**

```jsx
{
	status:"successed",
	message:"연산에 성공하였습니다.",
	value:10,
	id:153
}
```

**Example)**

```jsx
{
	status:"failed",
	message:"연산에 실패하였습니다. 실수는 사용할 수 없습니다.",
	value:0,
	id:153
}
```

## POST /calculator/{id}/multiple

---

### Description

---

⇒ 계산기 곱하기 연산 실행

### Parameter - num1 : integer, num2 : integer

---

⇒ 계산하고자 하는 2개의 값을 각 속성에 대입

| Name | Data Type | Description | Rule |
| --- | --- | --- | --- |
| num1 | integer | 계산하고자 하는 첫 번째 값 | 실수 데이터 사용 금지 |
| num2 | integer | 계산하고자 하는 두 번째 값 | 실수 데이터 사용 금지 |

**Example)**

```jsx
{
	num1:10,
	num2:20
}
```

### Retrun - Object

---

⇒ 계산 결과값과 성공 유무를 반환

| Name | Data Type | Description |
| --- | --- | --- |
| status | string | 성공 상태 |
| message | string | 상세 메세지 |
| value | integer | 계산 결과값 |
| id | integer | 연산 수행한 계산기 id |

**Example)**

```jsx
{
	status:"successed",
	message:"연산에 성공하였습니다.",
	value:200,
	id:153
}
```

**Example)**

```jsx
{
	status:"failed",
	message:"연산에 실패하였습니다. 실수는 사용할 수 없습니다.",
	value:0,
	id:153
}
```
