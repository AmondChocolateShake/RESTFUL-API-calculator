import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Calculator from './calculators'

const app = express();
const port = 3000;
let calcs:Calculator[]=[];
let cnt=1;

/** -------------서버 설정 구간 ----------------------------*/

// body-parser 미들웨어 사용
app.use(bodyParser.json()); // JSON 데이터 파싱
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, made by Dongju');
});


/** ---------------------------------------------------- */


//계산 결과값 조회
app.get("/calculator/:id",(req,res)=>{

})


//계산기 생성
app.post("/calculator",(req,res)=>{
    const {name}=req.body;
    console.log(name);
    const newCalc=createCalculator(name);


    //응답 분기
    if(newCalc===null){
        //계산기 생성 실패
        res.json({
            status:"failed",
            id:0,
            name:"",
            message:"계산기 생성에 실패했습니다."
        })
    }else{
        //계산기 생성 성공
        res.json({
            status:"successed",
            id:newCalc.id,
            name:newCalc.name,
            message:"계산기 생성에 성공했습니다."
        })
    }


})


//계산기 삭제
app.delete("/calculator/:id",(req,res)=>{

})

//계산기 더하기 연산
app.post("/calculator/:id/add",(req,res)=>{

})


//계산기 빼기 연산
app.post("/calculator/:id/sum",(req,res)=>{

})


//계산기 곱하기 연산
app.post("/calculator/:id/multiple",(req,res)=>{

})


//계산기 생성 함수
function createCalculator(name:string):Calculator|null{
    try{
        const calc=new Calculator(cnt++,name);
        console.log(`${JSON.stringify(calc)} 생성됨`);

        //calc 관리 배열에 추가
        calcs.push(calc);
        
        return calc;

    }catch(err){

        return null;

    }
}


//id에 해당하는 계산기를 찾고 결과값을 반환하는 함수
function getValueFromCalculatorById(id:number){

}


//id에 해당하는 계산기 free
function deleteCalculator(id:number){

}

//계산 실행!
//계산하고자 하는 계산기의 id를 받음,
//연산 종류를 기재 ["add","sum","multiple"],
//연산하고자 하는 값 2개
function calculate(id:number,method:string,num1:number,num2:number){

}








