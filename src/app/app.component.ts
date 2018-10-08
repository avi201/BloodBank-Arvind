import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  rangeVal: any;
  mainObj:any = {};
  showResult:boolean = false
  bloodCount:any
  countVal = 0
  countObj:any = {}
  bloodList =[{}]
  bloodVal:any
  bloodObj={}
  groupId: any;
  newArr = {}
  groupName: any;
  aVal: any;
  range: number;
  constructor() { }

  ngOnInit() {

    // ********************   Json for Blood group *******************************

    this.bloodList = [{"blood":"A+","id":"1"},{"blood":"B+","id":"2"},{"blood":"O+","id":"3"},{"blood":"AB+","id":"4"},{"blood":"A-","id":"5"},{"blood":"B-","id":"6"},{"blood":"O-","id":"7"},{"blood":"AB-","id":"8"}] ;
    for(var i =1;i<=8;i++){
      this.countObj[i] = 0
    }
  }

   // ********************   method for blood group drop down  *******************************
  getBloodGroup(val){
    console.log('val==>>', val);
    this.showResult = false
    var indx = this.bloodList.findIndex((x)=>x['blood'] == val)
    this.newArr = this.bloodList[indx]
    console.log('newArr==>>', this.newArr);
  }


   // ********************   method for blood group total bottle no *******************************
  changeVal(val, key){
    if(val){
      this.countObj[key] = val;
      this.mainObj[key] = {value:val};
    }else{
      this.countObj[key] = 0;
      this.mainObj[key] = {value:0};
    }    
    this.range = 0;
  }

  // ********************   method for enter reqiured bottles *******************************

  changeRange(){
    this.showResult = false
    if(this.range > 0){
     
    }else{
      for(let key in this.mainObj){
        this.countObj[key] = this.mainObj[key]['value']
      }
      this.range = 0;
    }
  }


    // ********************   method for submit button *******************************
  count(){
    console.log("validation-->",this.range)
    console.log("dropdown model-->",this.bloodObj['bloodGroup'])
    if(!this.bloodObj['bloodGroup']){
      alert("Please select blood group")  
   }else{
    var id = this.newArr['id']
    console.log("this.countObj[id]",this.countObj[id]) 
    if(!this.countObj[id] || (this.countObj[id] == 0)){
      alert("Sorry " + this.bloodObj['bloodGroup'] + " blood group is not available in store")
    } 
    else if(this.range > 0 && this.range <= this.countObj[id]){
      if(this.mainObj[id]['value'] >= this.range){
        this.countObj[id] = this.countObj[id] - this.range;
        this.showResult = true
        
       }else{
         alert("Sorry, We have Only "+this.mainObj[id]['value']+ " Bottoles")
       } 
   }else{
    for(let key in this.mainObj){
      this.countObj[key] = this.mainObj[key]['value']
    }
    this.range = 0;
    alert("Please enter required number of bottles ")
  }
 }
}

transferDataSuccess(val){
  this.getBloodGroup((val.dragData).toString());
  this.bloodObj['bloodGroup'] = (val.dragData).toString()
  setTimeout(()=>{this.count()}, 200);

}
}
