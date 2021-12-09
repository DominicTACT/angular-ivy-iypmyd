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
  result = ""
  
  
  Measurement() {
    this.showStart = false;
  }
  reports() {
    var val5 = {
      val2: 
      { 
        "Complete": "True",
        "Total wait time taken": 1,
        "Temperature": 110,
        "Result" : "No adjustment needed"
      },
      val3:
      { 
        "Complete": "True",
        "Total wait time taken": 10,
        "Temperature": 88,
        "Result" : "Adjustment needed"
      }
    };
    var mainContainer = document.getElementById("myReports");
    for (const k in val5)
    {
      var div = document.createElement("button");
      const v = val5[k];
      div.innerHTML = k;
      div.id = "reported" + k;
      div.onclick = function(event){
        var mainContainer = document.getElementById("reported" + k);
        //let j: keyof typeof val5[k]; 
        for (const j in val5[k])
        {
          var div = document.createElement("div");
          const v = [j];
          div.innerHTML = k +": " + v;
          mainContainer.appendChild(div);
        }
      }
      mainContainer.appendChild(div);
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
    var val = 
    { 
      "Complete": "True",
      "Total wait time taken": this.waittimes*30,
      "Temperature": this.temp,
      "Result" : this.result
    };
    var mainContainer = document.getElementById("myData");
    let k: keyof typeof val; 
    for (k in val)
    {
      var div = document.createElement("div");
      const v = val[k];
      div.innerHTML = k +": " + v;
      mainContainer.appendChild(div);
    }
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
    var data = document.getElementById("MyData");
    var reports = document.getElementById("reported val2");
    data.innerHTML = "";
    reports.parentNode.removeChild(reports);

  }
}
