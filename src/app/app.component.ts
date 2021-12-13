import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showStart = true;
  showStep = true;
  measurementAvailable = true;
  temp = 0;
  temptaken = true;
  adjust = true;
  done = true;
  hold = false;
  waittimes = 0;
  result = "";
  Reports = false;
  Measurements = false;
  MeasurementsDone = false;
  
  
  Measurement() {
    this.showStart = false;
    this.Measurements = true;
  }
  reports() {
    this.Reports = true;
    var val5 = {
      "val2": [
      { 
        "Complete": "True",
        "Totalwaittimetaken": 1,
        "Temperature": 110,
        "Result" : "No adjustment needed"
      }
    ]
    };
    var mainContainer2 = document.getElementById("myReports");

    let k: keyof typeof val5; 
    for (k in val5)
    {
      var div = document.createElement("button");
      div.innerHTML = k;
      div.id = "reported";
      div.onclick = function(event){
        var mainContainer = document.getElementById("reported");
        mainContainer.innerHTML = "";
        var div2 = document.createElement("div");
        div2.id="tempreport";
        val5.val2;
        val5.val2.forEach(element => {
          let product = {
            comp : element.Complete, 
            waittime : element.Totalwaittimetaken, 
            temp : element.Temperature,
            result: element.Result
          }
          //console.log(product);
          div2.innerHTML = k + "<br />" + "Is complete: " + product.comp + "<br />" + "Seconds waited before measurement: " + product.waittime*30 + "<br />" + "Temperature: " + product.temp + "<br />" + "Action needed: " + product.result;
          mainContainer.appendChild(div2);     
      });
  
      }
      mainContainer2.appendChild(div);
    }

  }
  start() {
    this.showStep = false;
  }

  available() {
    this.measurementAvailable = false;
    this.hold = true;
  }
  notavailable() {
    var timeLeft = 30;
    var elem = document.getElementById('timer');
    this.waittimes++;
    document.getElementById('btn').style.display = 'none'; //first hide the button
    document.getElementById('btn2').style.display = 'none'; //first hide the button
    var timerId = setInterval(countdown, 1000);
    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
        elem.innerHTML = 'Is a measurement available now?';
        document.getElementById('btn').style.display = 'inline';
        document.getElementById('btn2').style.display = 'inline';
      } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
      }
    }
  }
  measurementsubmitted() {
    var holder = (<HTMLInputElement>document.getElementById('temp')).value;
    if (holder !== '') {
      this.temp = parseFloat(
        (<HTMLInputElement>document.getElementById('temp')).value
      );
      this.temptaken = false;
      if (this.temp >= 100) {
        this.done = false;
        this.result="No adjustment needed."
      } else {
        this.adjust = false;
        this.result="Adjustment was needed."
      }
    }
  }
  submit() {
    output: JSON;
    var val = {
     "Vals" :[
    { 
      "Complete": "True",
      "Totalwaittimetaken": this.waittimes*30,
      "Temperature": this.temp,
      "Result" : this.result
    }
  ]
};
    var mainContainer2 = document.getElementById("myDatas");
      this.MeasurementsDone = true;
      mainContainer2.innerHTML = "";
      var div2 = document.createElement("div");
      div2.id="data2";
      val.Vals.forEach(element => {
        let product = {
          comp : element.Complete, 
          waittime : element.Totalwaittimetaken, 
          temp : element.Temperature,
          result: element.Result
        }
        //console.log(product);
        div2.innerHTML = "Is complete: " + product.comp + "<br />" + "Seconds waited before measurement: " + product.waittime*30 + "<br />" + "Temperature: " + product.temp + "<br />" + "Action needed: " + product.result;
        mainContainer2.appendChild(div2);      
      });
    }
  
  reset() {
    this.showStart = true;
    this.showStep = true;
    this.measurementAvailable = true;
    this.temp = 0;
    this.temptaken = true;
    this.adjust = true;
    this.done = true;
    this.hold = false;
    this.result = "";
    this.waittimes = 0;
    if(this.MeasurementsDone == true)
    {
    var clear2 = document.getElementById("data2");
    clear2.parentNode.removeChild(clear2);
    }
    else if (this.Reports == true){
    var clear = document.getElementById("reported");
    clear.parentNode.removeChild(clear);
    }
    //window.location.reload();
    this.Reports = false;
    this.Measurements = false;
    this.MeasurementsDone = false;
  }
}
