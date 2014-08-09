var MAX_HONOR = 3;
var MIN_HONOR = -2;

function referee() {
   var training = {};
   function learn(winner, loser) {
      if (!training[winner])
         training[winner] = {};
      training[winner][loser] = 1;
   }
   function judge(play1, play2) {
      return ((training[play1][play2] === 1) ? play1 : play2);
   }
   function validate(choice) {
      return choice in training;
   }
   function choices() {
      return [ "r", "p", "s" ];
      // var keys = [];
      //      
      // for ( var i in training) {
      // if (training.hasOwnProperty(i)) {
      // keys.push(i);
      // }
      // }
      // ;
      // return keys;
   }
   return {
      'learn' : learn,
      'judge' : judge,
      'validAction' : validate,
      'getChoices' : choices
   };
}

var ref = referee();
ref.learn('r', 's');
ref.learn('p', 'r');
ref.learn('s', 'p');
// ref.learn('rock', 'scissors');
// ref.learn('paper', 'rock');
// ref.learn('scissors', 'paper');

var shortGame = Number.MAX_VALUE;
var longGame = 0;
var player = function() {
   return {
      name : "None",
      health : +20,
      honor : +0,
      hits : +0,
      avhts : +0,
      job : +0,
      attacking : +0,
      choice : +0,
      bdmg : +0,
      tbdmg : +0,
      tdmg : +0,
      avdmg : +0,
      thnr : 0,
      avghnr : 0,
      turns : 0,
      totturns : 0,
      wins : 0,
      ties : 0,
      honorRate : 0, // choose declared atk
      dishonorRate : 0,// not choosing declared atk
      trustRate : 0, // def expecting opponent to be honorable
      distrustRate : 0, // def expecting opponent to be dishonorable
      ethic : []
   // list of above four
   };
}
var p1 = player();
p1.name = "One";/*
p1.honorRate = .6;
p1.trustRate = .6;
p1.dishonorRate = .4;
p1.distrustRate = .4;*/
p1.job = "warrior";
p1.ethic = [ "honorRate", "dishonorRate", "trustRate", "distrustRate" ];
var p2 = player();
p2.name = "Two";/*
p2.honorRate = 1;
p2.trustRate = .6;
p2.distrustRate = 1;
p2.dishonorRate = .6;*/
p2.job = "assassin";
p2.ethic = [ "dishonorRate", "honorRate", "distrustRate", "trustRate" ];
var atkr = p1;
var defd = p2;
choices = [ "r", "p", "s" ];
// println(atkr.name + ", do you declare rock, paper, or scissors?");
declare = choices[Math.floor(Math.random() * 3)];
// = readln().toLowerCase();
var debug = false;
for ( var i = 0; i < 100000; i++) {
   do {
      // if (ref.validAction(declare)) {
      // do {
      // //println(atkr.name + ", do you use rock, paper, or scissors?");

      // Will atkr choose what they declare
      atkr.choice = null;
      if (atkr[atkr.ethic[0]] > Math.random()) {
         (atkr.ethic[0] == "honorRate") && (atkr.choice = declare);
         if (atkr.ethic[0] == "dishonorRate") {
            value = choices.splice(choices.indexOf[declare], 1)[0];
            atkr.choice = choices[Math.floor(Math.random() * 2)];
            choices.push(value[0]);
         }
      } else if (atkr[atkr.ethic[1]] > Math.random()) {
         (atkr.ethic[1] == "honorRate") && (atkr.choice = declare);
         if (atkr.ethic[1] == "dishonorRate") {
            value = choices.splice(choices.indexOf[declare], 1)[0];
            atkr.choice = choices[Math.floor(Math.random() * 2)];
            choices.push(value[0]);
         }
      }
      if (atkr.choice == null)
         atkr.choice = choices[Math.floor(Math.random() * 3)];
      // } while (!ref.validAction(atkr.choice));
      // var choices = ref.getChoices();
      defd.choice = null;
      choices.sort();
      if (defd[defd.ethic[2]] > Math.random()) {
         if (defd.ethic[2] == "trustRate") {
            pick = choices.indexOf(declare) + 1;
            defd.choice = choices[pick] || choices[0];
         }
         if (defd.ethic[2] == "distrustRate") {
            value = choices.splice(choices.indexOf[declare], 1)[0];
            defd.choice = choices[Math.floor(Math.random() * 2)];
            choices.push(value[0]);
         }
      } else if (defd[defd.ethic[3]] > Math.random()) {
         if (defd.ethic[3] == "trustRate") {
            pick = choices.indexOf(declare) + 1;
            defd.choice = choices[pick] || choices[0];
         }
         if (defd.ethic[3] == "distrustRate") {
            pick = choices.indexOf(declare) - 1;
            defd.choice = choices[pick] || choices[3];
         }
      }

      if (defd.choice == null) {
         defd.choice = choices[Math.floor(Math.random() * 3)];
      }
      debug && println(atkr.name + ", the attacker, declared: " + declare);
      // if (atkr === defd) {
      // //println("ERROR");
      // break;
      // }
      debug && println("p1 Chose: " + p1.choice);
      debug && println("p2 Chose: " + p2.choice);
      result = ref.judge(atkr.choice, defd.choice);
      debug && println("result: " + result);
      p1.bdmg = (result == p1.choice) ? Math.floor(Math.random() * 6 + 1) : 0;
      p2.bdmg = (result == p2.choice) ? Math.floor(Math.random() * 6 + 1) : 0;
      debug
            && println("Base damage dealt to p1 " + p2.bdmg
                  + " Base damage dealt to p2 " + p1.bdmg);
      p1.bdmg && p1.hits++;
      p2.bdmg && p2.hits++;
      // jobs go below
      if (atkr.bdmg > 0 && atkr.job == "warrior" && atkr.choice == "s"
            && declare == "s") {
         atkr.bdmg += 2;
      }
      if (atkr.bdmg > 0 && atkr.job == "assassin" && atkr.choice != declare
            && atkr.choice == "p") {
         atkr.bdmg += 2;
      }
      if (defd.job == "ranger") {
         (atkr.bdmg - 2 > 0) ? atkr.bdmg -= 2 : atkr.bdmg = 0;
         (defd.bdmg > 4) ? defd.bdmg = 4 : defd.bdmg;
      }

      p1punch = p1.bdmg + p1.honor;
      p2punch = p2.bdmg + p2.honor;
      debug && println("Before Honor " + p1.honor + " " + p2.honor);
      debug && println("Before Health " + p1.health + " " + p2.health);
      p1.health -= (p2punch > 0) ? p2punch : 0;
      p2.health -= (p1punch > 0) ? p1punch : 0;
      p1.tdmg += (p1punch > 0) ? p1punch : 0;
      p2.tdmg += (p2punch > 0) ? p2punch : 0;
      atkr.thnr += atkr.honor;
      if (declare == atkr.choice && atkr.honor < MAX_HONOR) {
         atkr.honor++;
      } else if (declare != atkr.choice && atkr.honor in [ +0, -1 ]) {
         atkr.honor--;
      } else if (declare != atkr.choice && atkr.honor in [ +1, +2, +3 ]) {
         (atkr.job == "king") ? atkr.honor-- : atkr.honor = +0;
      }
      p1.turns++;
      debug && println("After Health " + p1.health + " " + p2.health);
      debug && println("After Honor " + p1.honor + " " + p2.honor);
      if (p1.health < +1 || p2.health < +1) {
         // game is over
         (p1.turns < shortGame) && (shortGame = p1.turns);
         (p1.turns > longGame) && (longGame = p1.turns);
         (p1.health < 1) && p2.wins++;
         (p2.health < 1) && p1.wins++;
         (p1.health < 1 && p2.health < 1) && p1.ties++;
         break;
      }
      // }
      // swap positions
      (atkr == p1) ? atkr = p2 : atkr = p1;
      (defd == p1) ? defd = p2 : defd = p1;
      // println(atkr.name + ", do you declare rock, paper, or scissors?");
   } while (declare = choices[Math.floor(Math.random() * 3)]);
   // reset for new game
   p1.totturns += p1.turns;
   p1.turns = 0;
   p1.health = 20;
   p2.health = 20;
   p1.honor = 0;
   p2.honor = 0;
   atkr = p1;
   defd = p2;
   // println(atkr.name + ", do you declare rock, paper, or scissors?");
   declare = choices[Math.floor(Math.random() * 3)];
}
p1.avdmg = p1.tdmg / i;
p2.avdmg = p2.tdmg / i;
p1.avhts = p1.hits / i;
p2.avhts = p2.hits / i;
p1.avhnr = p1.thnr / i;
p2.avhnr = p2.thnr / i;
println("p1 job " + p1.job + " p2 job " + p2.job);
println("p1 wins " + (p1.wins - p1.ties) / i + " p2 wins "
      + (p2.wins - p1.ties) / i + " ties " + p1.ties / i);
println("p1 avg dmg per game " + p1.avdmg + " p2 avg dmg per game " + p2.avdmg);
println("p1 avg hts per game " + p1.avhts + " p2 avg hts per game " + p2.avhts);
println("p1 avgheft per game " + p1.avhnr + " p2 avgheft per game " + p2.avhnr);
println("p1 turns per game " + p1.totturns / i);
println("shortest game " + shortGame + " longest game " + longGame);

var adv = (p1.wins > p2.wins) ? p1 : p2;
var bad = (p1.wins < p2.wins) ? p1 : p2;
println("advantage " + adv.name + " by " + (adv.wins - bad.wins) / i);
exit();
