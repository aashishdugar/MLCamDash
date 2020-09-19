from influxdb import InfluxDBClient
from datetime import datetime
from datetime import timedelta
import random

client = InfluxDBClient(host='127.0.0.1', port=8086, database='caml_events')

config = [
    ['2020-09-08 06:00:00', 10, 50],
    ['2020-09-09 06:00:00', 10, 50]
]
space_id = 216

for row in config:
    day = row[0]
    start_date = datetime.strptime(day, "%Y-%m-%d %H:%M:%S")

    date = start_date

    points = []

    while date < start_date + timedelta(hours=20):
        mins = random.randint(1, row[1])
        date = date + timedelta(minutes=mins)
        points.append({
            "measurement": "density_limit_violation",
            "tags": {
                "space_id": space_id
            },
            "time": date.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "fields":{
                "max_density_limit":10,
                "current_density": random.randint(11, 60)
            }
        })

    client.write_points(points, time_precision='ms')

for row in config:
    day = row[0]
    start_date = datetime.strptime(day, "%Y-%m-%d %H:%M:%S")

    date = start_date

    points = []

    while date < start_date + timedelta(hours=20):
        mins = random.randint(1, row[1])
        date = date + timedelta(minutes=mins)
        person1_id = random.randint(1, 10)
        person2_id = person1_id + random.randint(1, 10)

        points.append({
            "measurement": "social_distance_violation",
            "tags": {
                "space_id": space_id
            },
            "time": date.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "fields":{
                "violation_seconds":random.randint(10, 200),
                "person1_id": person1_id,
                "person2_id": person2_id
            }
        })

    client.write_points(points, time_precision='ms')


print("Done")