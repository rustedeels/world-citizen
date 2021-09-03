8a3dfb1c-a9f9-4046-a37f-0a8af85097b9
# intro|pilot
& backChristLX
& soundAirplane[LOOP]
$ fadeFromBlack
> Do you want to help me scream?[masturbation1]
> Hey perv! Eyes on the road![accident1]

## p1|1
* Hey, Kid!
* Time to wake up
* We are almost there

## p2|0
* Fuck, I just had the strangest dream

## p3|1
* Don't know about strange
* But you moaned like your ass was meeting the Eiffel Tower
* ...
* Shame you couldn't finish
* I'd love to hear you scream...

## p4|0
* "Is he really hitting on me?"

# masturbation1|pilot
& backChristLX
> Unzip pants and drop boxers[masturbation2](#hasDick())
> Unzip pants and drop panties[masturbation2](#hasPussy())

## p1|1
* Just undress,
* I'll take it from here.

# masturbation2|pilot
& backChristLX
& videoMaleWankDick1[](#hasDick())
& videoMaleWankPussy1[](#hasPussy())
> I'm going to cum[masturbation3]

## p1|1
* That's it
* ...
* ....
* ......
* Scream for me

# masturbation3
& backChristLX
& videoMaleWankDick2[](#hasDick())
& videoMaleWankPussy2[](#hasPussy())
> Don't stop!![cum]

## p1|0
* Oh god!
* You really know what you are doing
* ...
* ....
* .....


# cum|pilot
& backChristLX
& videoCumWankDick[](#hasDick())
& videoCumWankPussy[](#hasPussy())
> #AUTO[accident1]

## p1|1
* I love to hear you scream

## p2|0
* You save my life
* And now this?
* You're definitely growing on me


# accident1|pilot
& backCristLxClose
& soundAirplane[LOOP]
> #AUTO[accident2]

## p1|0
* Lookout!
* You're going to crash!

## p2|1
* Fuck Fuck Fuck
* Hold on
* I can direct the plane to land on the river

## p3|0
* You're going to kill us
* Fuck this shit

## p4|1
* Trust me
* I can do this!

# accident2|pilot
& backCristLxClose
& soundPlaneCrash
$ lisbonCrashEffect[{ id: '8a3dfb1c-a9f9-4046-a37f-0a8af85097b9=>final' }]


# final|pilot
& backCaisSodreTejo
& soundPolice[LOOP]
$ fadeFromBlack
> Run[endIntro]

## p1|0
* Pilot?
* Are you alright?

## p2|1
* The police are coming
* You need to run
* They'll kill you!

## p3|0
* What about you?
* Can't leave you like this


## p4|1
* I've survived worst
* Just go!!

# endIntro
& backCaisSodreTejo
