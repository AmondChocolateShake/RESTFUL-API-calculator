import express, { Request, Response } from 'express';
import Calculator from './calculators'

const app = express();
const port = 3000;
let calcs:Calculator[]=[];
let cnt=1;

/** -------------서버 설정 구간 ----------------------------*/

// body-parser 미들웨어 사용
app.use(express.json()); // JSON 데이터 파싱
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello, Made by Dongju');
});


/** ---------------------------------------------------- */


//계산 결과값 조회
app.get("/calculator/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const value=getValueFromCalculatorById(id);


    if(value!==null){
        res.status(200).json({
            value:value,
            status:"successed"
        })
    }else{
        res.status(404).json({
            value:value,
            status:"failed"
        })
    }

})


//계산기 생성
app.post("/calculator",(req,res)=>{
    const {name}=req.body;
    console.log(name);
    const newCalc=createCalculator(name);


    //응답 분기
    if(newCalc===null){
        //계산기 생성 실패
        res.status(500).json({
            status:"failed",
            id:0,
            name:"",
            message:"계산기 생성에 실패했습니다."
        })
    }else{
        //계산기 생성 성공
        res.status(201).json({
            status:"successed",
            id:newCalc.id,
            name:newCalc.name,
            message:"계산기 생성에 성공했습니다."
        })
    }
})


//계산기 삭제
app.delete("/calculator/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    if(deleteCalculator(id)){
        res.status(200).json({
            status:"successed",
            message:"해당 계산기 삭제에 성공했습니다.",
            id:id,
        })
    }else{
        res.status(500).json({
            status:"failed",
            message:"해당 계산기 삭제에 실패했습니다.",
            id:id,
        })
    }
})

//계산기 더하기 연산
app.post("/calculator/:id/add",(req,res)=>{
    const id=parseInt(req.params.id);

    //파라미터 2개를 넘기지 않는 경우
    if(Object.keys(req.body).length!==2){
        res.status(400).json({
            status:"failed",
            message:"연산에 실패했습니다. 2개의 파라미터를 전송하세요.",
            value:0,
            id:id
        })
    }
    const {num1,num2}=req.body;
    const calc=calculate(id,"add",num1,num2);

    if(calc!==null){
        res.status(200).json({
            status:"successed",
            message:"연산에 성공하였습니다.",
            value:calc.value,
            id:calc.id
        })
    }else{
        res.status(500).json({
            status:"failed",
            message:"연산에 실패하였습니다.",
            value:0,
            id:id
        })
    }

})


//계산기 빼기 연산
app.post("/calculator/:id/sum",(req,res)=>{
    const id=parseInt(req.params.id)

    //파라미터가 2개가 아닌 경우
    if(Object.keys(req.body).length!==2){
        res.status(400).json({
            status:"failed",
            message:"연산에 실패했습니다. 2개의 파라미터를 전송하세요.",
            value:0,
            id:id
        })
    }else{

        const {num1,num2}=req.body;
        const calc=calculate(id,"sum",num1,num2);
    
        if(calc!==null){
            res.status(200).json({
                status:"successed",
                message:"연산에 성공하였습니다.",
                value:calc.value,
                id:calc.id
            })
        }else{
            res.status(500).json({
                status:"failed",
                message:"연산에 실패하였습니다.",
                value:0,
                id:id
            })
        }
    }

})


//계산기 곱하기 연산
app.post("/calculator/:id/multiple",(req,res)=>{
    const id=parseInt(req.params.id)

    //파라미터가 2개가 아닌 경우
    if(Object.keys(req.body).length!==2){
        res.status(400).json({
            status:"failed",
            message:"연산에 실패했습니다. 2개의 파라미터를 전송하세요.",
            value:0,
            id:id
        })
    }else{
        const {num1,num2}=req.body;
        const calc=calculate(id,"multiple",num1,num2);
    
        if(calc!==null){
            res.status(200).json({
                status:"successed",
                message:"연산에 성공하였습니다.",
                value:calc.value,
                id:calc.id
            })
        }else{
            res.status(500).json({
                status:"failed",
                message:"연산에 실패하였습니다.",
                value:0,
                id:id
            })
        }
    }


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
function getValueFromCalculatorById(id:number):number|null{
    const calc=findCalcById(id);
    if(calc!==null){
        return calc.value
    }else{
        return null;
    }
}


//id에 해당하는 계산기 free
function deleteCalculator(id:number){
    let calcIndex=findCalcIndexById(id);

    //해당 객체 인덱스를 찾은 경우
    if(calcIndex!==-1){
        calcs.splice(calcIndex,1);
        return true

    }else{
        return false
    }



}



//계산 실행!
//계산하고자 하는 계산기의 id를 받음,
//연산 종류를 기재 ["add","sum","multiple"],
//연산하고자 하는 값 2개
//계산기 검색 실패시 null 반환
function calculate(id:number,method:string,num1:number,num2:number):Calculator|null{
    const calc=findCalcById(id);

    if(calc!==null){
        switch(method){
            case "add": calc.add(num1,num2);
                break;
    
            case "sum": calc.sum(num1,num2);
                break;
    
            case "multiple": calc.multiple(num1,num2);
                break;
        }
    }

    return calc;

}

//id를 이용해 생성된 계산기 인덱스 조회
//검색에 실패한 경우 -1 리턴
function findCalcIndexById(id:number):number{
    //id에 해당하는 객체 찾기
    const obj=calcs.find(obj=>obj.id===id)
    let index=-1;

    // console.log(temp);
    if(obj!==undefined){
        //해당 객체 인덱스 번호
        index=calcs.indexOf(obj);
    }

    return index
}




//id를 이용해 생성된 계산기 조회
//검색에 실패한 경우 -1 리턴
function findCalcById(id:number):Calculator|null{
    //id에 해당하는 객체 찾기
    const obj=calcs.find(obj=>obj.id===id)

    // console.log(temp);
    if(obj!==undefined){
        return obj
    }else{
        return null;
    }

}


