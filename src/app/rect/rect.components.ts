import { Component } from '@angular/core';

@Component({
  selector: 'app-rect',
  templateUrl: './rect.components.html',
  styleUrls: ['./rect.components.css'],
})
export class RectComponent {
  frames: any[] = [
    {
      object: 0,
      xcoord: 70,
      ycoord: 10,
      width: 40,
      height: 100,
      color: 'red',
      text: 'Start',
      input: '',
      default_resp: '',
    },
    {
      object: 1,
      xcoord: 70,
      ycoord: 140,
      width: 165,
      height: 100,
      color: 'lightblue',
      text: 'Measurement available?',
      input: 'Is a Measurement available?',
      default_resp: 'Yes',
    },
    {
      object: 2,
      xcoord: 20,
      ycoord: 340,
      width: 128,
      height: 100,
      color: 'lime',
      text: 'Take measurement',
      input: 'Input Temperature',
      default_resp: '',
    },
    {
      object: 3,
      xcoord: 180,
      ycoord: 340,
      width: 113,
      height: 100,
      color: 'yellow',
      text: 'Wait 5 seconds',
      input: 'WAIT',
      default_resp: '',
    },
    {
      object: 4,
      xcoord: 50,
      ycoord: 480,
      width: 55,
      height: 100,
      color: 'red',
      text: 'Report',
      input: '',
      default_resp: '',
    },
    {
      object: 5,
      xcoord: 320,
      ycoord: 210,
      width: 50,
      height: 100,
      color: 'yellow',
      text: 'Retry',
      input: '',
      default_resp: '',
    },
  ];
  connections: any[] = [
    {
      object1: 0,
      object2: 1,
      offsetx1: 20,
      offsety1: 100,
      offsetx2: 80,
      offsety2: -3,
      text: '',
      textx: 0,
      texty: 0,
    },
    {
      object1: 1,
      object2: 2,
      offsetx1: 75,
      offsety1: 100,
      offsetx2: 55,
      offsety2: -2,
      text: 'yes',
      textx: 75,
      texty: 300,
    },
    {
      object1: 1,
      object2: 3,
      offsetx1: 75,
      offsety1: 100,
      offsetx2: 60,
      offsety2: -2,
      text: 'no',
      textx: 210,
      texty: 300,
    },
    {
      object1: 2,
      object2: 4,
      offsetx1: 58,
      offsety1: 100,
      offsetx2: 28,
      offsety2: -2,
      text: '',
      textx: 0,
      texty: 0,
    },
    {
      object1: 3,
      object2: 5,
      offsetx1: 115,
      offsety1: 40,
      offsetx2: 28,
      offsety2: 100,
      text: '',
      textx: 0,
      texty: 0,
    },
    {
      object1: 5,
      object2: 1,
      offsetx1: 20,
      offsety1: 0,
      offsetx2: 165,
      offsety2: 50,
      text: '',
      textx: 0,
      texty: 0,
    },
  ];

  public getcoordsx(id) {
    const xcoord = this.frames.filter((step) => {
      return step.object === id;
    });
    return xcoord[0].xcoord;
  }
  public getcoordsy(id) {
    const ycoord = this.frames.filter((step) => {
      return step.object === id;
    });
    return ycoord[0].ycoord;
  }

  async prompter(input, default_response, block) {
    switch (block) {
      case 1: {
        var answer = prompt(input, default_response);
        this.frames[1].text = answer;
        break;
      }

      case 2: {
        var answer = prompt(input);

        this.frames[2].text = 'Reported: ' + answer;

        break;
      }
      case 3: {
        var thousandms = 5;
        while (thousandms !== 0) {
          await new Promise((f) => setTimeout(f, 1000));
          this.frames[3].text = 'Wait ' + thousandms + ' seconds.';
          thousandms = thousandms - 1;
        }
        await new Promise((f) => setTimeout(f, 1000));
        this.frames[3].text = 'Retry';
        break;
      }
      case 4: {
        break;
      }
    }
  }
}
