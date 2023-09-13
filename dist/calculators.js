"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//계산기 기능을 포함하는 클래스
//계산된 값은 value에 저장 -> 새로운 연산 실행시 기존 결과값은 사라짐
class Calculator {
    //계산기의 id와 이름을 받는다.
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.value = 0;
    }
    ;
    getValue() {
        return this.value;
    }
    //덧셈 연산 메소드
    add(num1, num2) {
        this.value = num1 + num2;
    }
    //뺄셈 연산 메소드
    sum(num1, num2) {
        this.value = num1 - num2;
    }
    //곱하기 연산 메소드
    multiple(num1, num2) {
        this.value = num1 * num2;
    }
}
exports.default = Calculator;
