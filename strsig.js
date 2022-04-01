var Phonetics = {
	"A":"Alpha",
	"B":"Bravo",
	"C":"Charlie",
	"D":"Delta",
	"E":"Echo",
	"F":"Foxtrot",
	"G":"Golf",
	"H":"Hotel",
	"I":"India",
	"J":"Juliet",
	"K":"Kilo",
	"L":"Lima",
	"M":"Mike",
	"N":"November",
	"O":"Oscar",
	"P":"Papa",
	"Q":"Quebec",
	"R":"Romeo",
	"S":"Sierra",
	"T":"Tango",
	"U":"Uniform",
	"V":"Victor",
	"W":"Whiskey",
	"X":"X-ray",
	"Y":"Yankee",
	"Z":"Zulu",
	"0":"Zero",
	"1":"One",
	"2":"Two",
	"3":"Three",
	"4":"Four",
	"5":"Five",
	"6":"Six",
	"7":"Seven",
	"8":"Eight",
	"9":"Nine"
};
//
var StrSig = {
    maxcode: 128,
    boxHeight: 20,
    boxWidth: 200,
    Colors:{
        "Upper":"#CCFF00",
        "Lower":"#66CC00",
        "Number":"#9999FF",
        "Symbol":"#FF6666",
        "Other":"#999999"
    },

    check: function(str, number){
        var Arr = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\s\S]|^$/g).filter(Boolean);
        var len = Arr.length;

        var sigbox = document.querySelector("#sig"+number);
        // if exist, remove
        sigbox.innerHTML = '';

        // create div
        var div = document.createElement("div");
        div.setAttribute("style", "font-size:smaller; background:#EEE; border:solid 1px #CCC; position:relative; z-index:10000; padding:2px; width:"+this.boxWidth+"px");

        var separate = " | ";
        var color = "#000";
        var bgc;
        var Codes = [];
        //
        for(var i in Arr){
            var char = Arr[i];
            var code = char.codePointAt(0);
            Codes.push(code);
            var phonetic = "";
            var text = char + separate + code;
            // box color
            if(65 <= code && code <= 90){	// Upper
                bgc = this.Colors["Upper"];
                text += separate + "Upper";
                phonetic = Phonetics[char];
            }else if(97 <= code && code <= 122){	// lower
                bgc = this.Colors["Lower"];
                text += separate + "Lower";
                phonetic = Phonetics[char.toUpperCase()];
            }else if(48 <= code && code <= 57){	// number
                bgc = this.Colors["Number"];
                text += separate + "Number";
                phonetic = Phonetics[char];
            }else if(code > 127){	// other
                bgc = this.Colors["Other"];
                bgc = "#999999";
            }else{  // symbol
                bgc = this.Colors["Symbol"];
                text += separate + "Symbol";
            }

            // meter box
            var w = parseInt(code / this.maxcode * this.boxWidth);
            if(code > 127){
                w = this.boxWidth;
            }
            var h = this.boxHeight;
            var box = document.createElement("div");
            var style = "opacity:1.0; white-space:nowrap;"
                + " width:"+w+"px; height:"+h+"px; color: "+color+"; background:"+bgc
                ;
            box.setAttribute("style", style);
            box.innerText = text;
            //
            div.appendChild(box);
        }

        var codesign = Codes.join("_");

        // last line
        var line = document.createElement("div");
        line.id = "sign"+number;
        line.setAttribute("sign", codesign);
        line.setAttribute("style", "overflow-x:visible;");
        line.innerText = "CodeSign = " + codesign;
        div.appendChild(line);

        // display
        sigbox.insertBefore(div, null);

        // diff
        this.diff();
    },
    //
    diff: function(){
        var res = document.querySelector("#sigresult");
        res.innerText = "";
        //
        var sign1 = document.querySelector("#sign1");
        var sign2 = document.querySelector("#sign2");
        if(sign1 && sign2){
            var str1 = sign1.getAttribute("sign");
            var str2 = sign2.getAttribute("sign");
            if(str1 == str2){
                res.innerText = "Same";
            }else if(str1.length && str2.length){
                res.innerText = "Diff";
            }
            res.innerText += "\n" + str1;
            res.innerText += "\n" + str2;
        }
    }
}



document.addEventListener('DOMContentLoaded', function () {
    var btns = document.querySelectorAll(".BtnCheck");
    btns.forEach(function(btn){
        console.log(btn.getAttribute("number"));
        btn.addEventListener('click', event => {
            var number = btn.getAttribute("number");
            var input = document.querySelector("#str"+number);
            var str = input.value;
            StrSig.check(str, number);
        });
    });

    /*
    // Twitter表示中のユーザ
    var str = location.pathname.split("/")[1];
    // 選択中の文字列が有れば優先
    var selObj = window.getSelection();
    if(selObj.toString().length){str = selObj.toString();}
    */
}, false);
