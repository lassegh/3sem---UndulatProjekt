import RPi.GPIO as GPIO
import sys
import os
import time
from subprocess import Popen

GPIO.setmode(GPIO.BCM)
GPIO_Trigger = 15
GPIO_Echo = 14

GPIO.setup(GPIO_Trigger, GPIO.OUT)
GPIO.setup(GPIO_Echo, GPIO.IN)

def distance():
    GPIO.output(GPIO_Trigger, True)

    time.sleep(0.00001)
    GPIO.output(GPIO_Trigger, False)

    StartTime = time.time()
    StopTime = time.time()

    #Save startTime
    while GPIO.input(GPIO_Echo) == 0:
        StartTime = time.time()
    
    #Save time of arrival
    while GPIO.input(GPIO_Echo) == 1:
        StopTime = time.time()

    # Time difference between start and arrival
    TimeElapsed = StopTime - StartTime

    # Multiply with the sonic speed 34300 cm / sec
    # and divide by two (frem og tilbage)
    distance = (TimeElapsed * 34300 ) / 2
    #print(distance)
    return distance


satDistance = 15 # Distancen skal muligvis ændres ift pindens

isPlaying = False

while True:
    time.sleep(1)
    if distance() < satDistance:
        while True:
            if not isPlaying:
                os.system('omxplayer -b --aspect-mode fill --loop /home/pi/UndulatProject/sample.mp4 --orientation 360 &')
                isPlaying = True
            time.sleep(120)
            if distance() > satDistance:
                isPlaying = False
                os.system('killall omxplayer.bin')
                break
    else:             
        os.system('killall omxplayer.bin')
        os.system('clear') 
        os.system('printf "\033c"')             
    
        
        
