00752e8c-2cc7-4c96-958a-e9279e1c977f
# Intro|pilot
& backAirplaneExt
> Grab documents[inputPlayerInfo]
## pilot|1
* Hey!
* You're late!
* The leak has gone mainstream, you're not safe anymore
* And by being next to you, neither am I!
* Enter the plane and take the documents
## player|0
* Take it easy it's not like I want to stay here.
* Just had to finish erase some hard drives, 
* that pussy ass journalist ratted my address to the feds!

# inputPlayerInfo
& backAirplaneExt
$ showPlayerEditor[intro]
> View documents [inputPlayerInfo]
> I'm ready to leave[preTakeOff](#playerInfoCompleted())

# preTakeOff|pilot
& backAirplaneCabine
& soundAirplane[LOOP]
> AUTO[takeoff]
## pilot|1
* Great, it's all ready
* LISBON!
* We are coming!

## player|0
* Phrasing!
* ...
* .....

# takeOff|pilot
& `#backColor('#000000')`
& soundAirplane[LOOP]

## player|0
* I can't look
* This old pieace of shit is going to kill us!
& soundAirplaneTakeoff

## pilot|1
* Don't insult her!
* She could fly throught any storm
* Open your eyes, a little faith can go a long way

# onAir1|pilot
& backOnAirCabin
& soundAirplane[LOOP]

## player1|0
* I still don't like it...
* Let me ask you one thing.
* From all places...
* why Lisbon?

## pilot1|1
* Ahahahah
* Here's looking at you, KID!!!
* Ahahahah

## player2|0
* You\'re a bit manic, aren\'t you?
* ...
* "I guess it would take a manic to help an idealist like me."
* ...
* I\'m exhausted, gonna close my eyes for a bit
* wake me when we are close