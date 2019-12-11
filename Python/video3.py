import RPi.GPIO as GPIO
import sys
import os
import time
from subprocess import Popen
from socket import *
from datetime import datetime

BROADCAST_TO_PORT = 7008
GPIO.setmode(GPIO.BCM)
GPIO_Trigger = 15
GPIO_Echo = 14

GPIO.setup(GPIO_Trigger, GPIO.OUT)
GPIO.setup(GPIO_Echo, GPIO.IN)

s = socket(AF_INET, SOCK_DGRAM)
s.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)

def distance():
    GPIO.output(GPIO_Trigger, True)

    time.sleep(0.00001)
    GPIO.output(GPIO_Trigger, False)

    StartTime = time.time()
    StopTime = time.time()

    while GPIO.input(GPIO_Echo) == 0:
        StartTime = time.time()
    
    while GPIO.input(GPIO_Echo) == 1:
        StopTime = time.time()

    TimeElapsed = StopTime - StartTime

    distance = (TimeElapsed * 34300 ) / 2
    return distance


satDistance = 15 # Distancen skal muligvis ændres ift pindens

isPlaying = False

while True:
    time.sleep(1)
    if distance() < satDistance:
        data = str(datetime.now())
        data = data[:-10]
        s.sendto(bytes(data, "UTF-8"), ('192.168.24.255', BROADCAST_TO_PORT))
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
    
        
        
