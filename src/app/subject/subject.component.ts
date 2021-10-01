import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, from } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    console.log("Subject");//Subject never knows about it current state
    const subject = new Subject<number>();
    
    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`)
    });
    subject.next(1);
    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`)
    });
 
    /*const observable = from([1,2,3]);
    observable.subscribe(subject);*/
    subject.next(2);
    subject.next(3);

    console.log('\n');
    console.log('Behavior Subject');//Behaviour Subject knows about it current state

    const subject1 = new BehaviorSubject(0);

    subject1.subscribe({
      next: (v)=>console.log(`observer A: ${v}`)
    });

    subject1.next(1);
    subject1.next(2);

    subject1.subscribe({
      next: (v)=>console.log(`observer B: ${v}`)
    });

    subject1.next(3);
    
  }

}

