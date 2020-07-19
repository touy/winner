import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-ramdomgame',
  templateUrl: './ramdomgame.page.html',
  styleUrls: ['./ramdomgame.page.scss'],
})
export class RamdomgamePage implements OnInit {
  url = 'http://localhost:3434/';
  color = 'red';
  pointer = 1;
  speed = 1000;
  isStoped = false;
  gear: number[] = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130];
  selectedGear = 1;
  T: any = null;
  gearPointer = 0;
  result = 0;
  finalResult = 0;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  setGear(g: number = 0) {
    if (g < 0) {
      g = 0;
    } else if (g >= this.gear.length) {
      g = this.gear.length;
    }

    this.selectedGear = this.gear[g];

  }
  gameResult() {
    let path = 'game-result/1';
    this.http.get<any>(this.url + path).subscribe(r => {
      console.log('game result', r);
      if (r.status === 1) {
        this.result = this.finalResult = r.result;
        this.isStoped = true;
      } else {
        alert(r.e);
      }

    }, e => {
      console.log('http error', e);

    })
  }
  runGame() {

    setTimeout(r => {
      // ເຄື່ອນ
      if (this.pointer >= 12) {
        this.pointer = 1;
      } else {
        this.pointer++;
      }
      // ຫຼຸດເກຍ
      if (this.isStoped) {
        console.log('gear pointer', this.gearPointer);
        if (this.gearPointer >= 0) {
          if (this.gearPointer <= 1) {
            if (this.result < (this.pointer - 5)) {
              this.setGear(this.gearPointer--);
              this.runGame();
            } else {
              if (this.result != this.pointer) {
                this.runGame();
              } else {
                this.isStoped = false;
                console.log('result', this.result, 'pointer', this.pointer);
                this.result = 0;
                return;
              }

            }
          } else {
            this.setGear(this.gearPointer--);
            this.runGame();
          }
        } else {
          this.isStoped = false;
          console.log('result', this.result, 'pointer', this.pointer);
          this.result = 0;
          return;
        }
      } else {
        // ເພີ່ມເກຍ ເທື່ອລະຂັ້ນ
        console.log('gear pointer', this.gearPointer);
        if (this.gearPointer < this.gear.length) {
          this.setGear(this.gearPointer++);
        }
        this.runGame();
      }
    }, this.speed / this.selectedGear);
  }
  startGame() {
    // this.T = setInterval(this.runGame.bind(this), 1000);
    this.runGame();
  }
  changeColor(index: number) {
    if (this.pointer === index) {
      return this.color;
    } else {
      return '';
    }
  }

}
