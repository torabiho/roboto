import os
import time 

lat, lng = 43.657893 , -73.987236

while True:
    print(lat, lng)
    args = "curl http://localhost:8080/locations  -d '" + \
     '{"vehicle_id":"ABCD123", "locationAndStats":"' + str(lat) + " " + str(lng) + '"}\'' + \
     ' -H "Content-Type: application/json"'

    #print(args)
    os.system(args)
    time.sleep(1)
    lat += 0.00001
    lng += 0.00001

