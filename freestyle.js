class budgetApp{
    constructor(){
        this.BF = document.querySelector(".budgForm")
        this.EF =  document.querySelector(".expForm")
        this.BA =  document.querySelector(".budgAlert")
        this.EA =  document.querySelector(".expAlert")
        this.BI =  document.querySelector("#budgInp")
        this.EN =  document.querySelector("#expName")
        this.EC =  document.querySelector("#expCost")
        this.BV =  document.querySelector(".budVal")
        this.EV =  document.querySelector(".expVal")
        this.BaV =  document.querySelector(".balVal")
        this.expL = document.querySelector(".expList")
        this.IL = []
        this.ID = 0
    }
    budgetSub(){
        let a = this.BI.value;
        if(a ==""||a<0||isNaN(a)){
            this.BA.classList.add("show")
            this.BA.innerText = "this field cannot be empty or negative"
           let self = this
            setTimeout(function(){
                self.BA.classList.remove("show")
            },3000)
        }
        else{
           this.BV.innerText =a
           this.balance()
           this.BI.value=""
           
            
        }
    }

    balance(){
        let he = document.querySelector(".balVal")
        let a = this.totExpense()
        let q = this.BV.innerText
        let c =  q-a
        this.BaV.innerText = c;
        
    }
    totExpense(){
        
        return parseInt(this.EV.innerText)
    }
   
    expSub(){
        let totExp = parseInt(this.EV.innerText)
       let b = this.EN.value
       let c = parseInt(this.EC.value)
       let exp =this.expL
       if(b ==""||c==""||isNaN(c)||c<0){
        this.EA.classList.add("show")
        this.EA.innerText = "this field cannot be empty or negative"
       let self = this
        setTimeout(function(){
            self.EA.classList.remove("show")
        },3000)
       }
       else{
           let div = document.createElement("div")
           div.classList.add("single")
           div.id  = this.ID
           div.innerHTML=`
           <div class="expName">${b}</div>
           <div class="expAmt"><span>$</span> ${c}</div>
           <div class="edit">
             <button id="edit">edit</button>
             <button id="delete">delete</button>
           </div>
           `
           totExp+=c
           exp.append(div)
           this.ID++
           this.EV.innerText = totExp
           this.totExpense()
           this.balance();
           this.EN.value =""
         this.EC.value =""
           
        }
    }
    edit(event){
        let v = event.parentElement.parentElement;
        let a = parseInt(Array.from( v.children)[1].innerText.slice(1))
        let c =Array.from( v.children)[0].innerText
        let bud = parseInt(this.EV.innerText)
       let g =  bud - a
       this.EV.innerText = g
       this.EC.value = a
       this.EN.value = c
       this.totExpense()
       this.balance()

        v.remove()
    }

    delete(event){
        let v = event.parentElement.parentElement;
        let a = parseInt(Array.from( v.children)[1].innerText.slice(1))
        let c =Array.from( v.children)[0].innerText
        let bud = parseInt(this.EV.innerText)
       let g =  bud - a
       this.EV.innerText = g
    //    this.EC.value = a
    //    this.EN.value = c
       this.totExpense()
       this.balance()

        v.remove()
    }
}


function clickEvents(){
    const budg = new budgetApp()
   budg.BF.addEventListener("submit",function(event){
       event.preventDefault()
       budg.budgetSub()
   })
   budg.EF.addEventListener("submit",function(event){
       event.preventDefault()
       budg.expSub()
   })
   budg.expL.addEventListener("click",function(event){
       if (event.target.id == "edit"){
           budg.edit(event.target)
       }
       else if(event.target.id == "delete"){
           budg.delete(event.target)
       }
   })
}



document.addEventListener("DOMContentLoaded",clickEvents)