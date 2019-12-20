#!/bin/env python

import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(4, GPIO.IN)
GPIO.setup(12, GPIO.OUT)

while not GPIO.input(4):
    GPIO.output(12, 1)
    time.sleep(2)
    GPIO.output(12, 0)
    time.sleep(1)

GPIO.cleanup()

