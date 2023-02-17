// переменные 
var FCalc = document.calc;
// var Fcalc = document; ===> fCalc.calc.ReadOut = NUM;
var FlagNewNum = false;
var FlagSecondNum = false;
var first = 0;
var pendingOper = '+';

// обработчик события с клавиатуры
document.onkeydown = calcKey;

// основные функции
function NumPressed(Num){
	if(FCalc.ReadOut.value == pendingOper){
		FlagNewNum = false;
		FlagSecondNum = true;			
	}

	if(!FlagNewNum){
		FCalc.ReadOut.value = Num;
		FlagNewNum = true;			
	}else{
		if((FCalc.ReadOut.value != 0 || FCalc.ReadOut.value == "0.") && FCalc.ReadOut.value.length <= 16){
			FCalc.ReadOut.value += Num;
		}
	}
}

function Clear(){
	FCalc.ReadOut.value = "";
	FlagNewNum = false;
	FlagSecondNum = false;
	first = 0;
	pendingOper = '+';
}

function Back(){
	// if(FCalc.ReadOut.value > 1){
	// 	FCalc.ReadOut.value = FCalc.ReadOut.value.substring(0, FCalc.ReadOut.value.length - 1)
	// }else{
	// 	FCalc.ReadOut.value = 0;
	// 	FlagNewNum = false;
	// }

	// another way

	if(FCalc.ReadOut.value.length >= 2){
		FCalc.ReadOut.value = FCalc.ReadOut.value.slice(0, -1); 
	}else{
		FCalc.ReadOut.value = "";
		FlagNewNum = false;
	}
} 

function Decimal(){
	if(FCalc.ReadOut.value !== pendingOper){
		if(!FlagNewNum){;
			FCalc.ReadOut.value = "0.";
			FlagNewNum = true;
		}else{
			if(FCalc.ReadOut.value.indexOf(".") == -1){
				FCalc.ReadOut.value += ".";
			}
		}		
	}else{
		FCalc.ReadOut.value = "0.";
		FlagSecondNum = true;	
	}
}

function Neg(){
	if(FCalc.ReadOut.value !== pendingOper){
		FCalc.ReadOut.value *= -1;
	}
}

function Perce(){
	if(FCalc.ReadOut.value !== pendingOper){
		FCalc.ReadOut.value = parseFloat(FCalc.ReadOut.value) / 100;
	}
}

function Operation(sign){
	switch(sign){
		case '-':
		case '+':
		case '*':
		case '/':
			first = parseFloat(FCalc.ReadOut.value);
			pendingOper = sign;
			document.getElementById("answerArea").value = pendingOper;
			break;
	}
}

function Equal(){
	var answer = 0;
	if(FlagSecondNum){
		switch(pendingOper){
			case '-':
				answer = first - parseFloat(FCalc.ReadOut.value);
				break;
			case '+':
				answer = first + parseFloat(FCalc.ReadOut.value);
				break;
			case '*':
				answer = first * parseFloat(FCalc.ReadOut.value);
				break;
			case '/':
				answer = first / parseFloat(FCalc.ReadOut.value);
				break;
		}
		Clear();
		document.getElementById("answerArea").value = answer;		
	}
}

function calcKey(event){
	if (!event) event = window.event;
	console.log(event, event.keyCode);

	switch(event.keyCode){
		case 48: 
		case 96:
			NumPressed(0); 
			break;
		case 49: 
		case 97:
			NumPressed(1); 
			break;
		case 50:
		case 98:
			NumPressed(2); 
			break;
		case 51:
		case 99:
			NumPressed(3); 
			break;
		case 52:
		case 100:
			NumPressed(4); 
			break;	
		case 53: 
		case 101:
			NumPressed(5); 
			break;
		case 54: 
		case 102:
			NumPressed(6); 
			break;
		case 55:
		case 103:
			NumPressed(7); 
			break;
		case 56:
		case 104:
			NumPressed(8); 
			break;
		case 57:
		case 105:
			NumPressed(9); 
			break;						
		case 27:
			Clear(); 
			break; 
		case 8:
		case 46:
			Back(); 
			break;
		case 106:
			Operation('*');
			break;
		case 107:
			Operation('+'); 
			break; 
		case 109:
			Operation('-'); 
			break;
		case 110:
			Decimal(); 
			break;
		case 111:
			Operation('/'); 
			break;
		case 13:
			Equal();
			break;
	}
}