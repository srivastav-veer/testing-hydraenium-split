import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


session = requests.Session()
retry = Retry(connect=30, backoff_factor=0.5)
adapter = HTTPAdapter(max_retries=retry)
session.mount('http://', adapter)
session.mount('https://', adapter)

import multiprocessing as mpp

GET_URL = "http://13.233.151.221:8080/numbers/get"
SET_URL = "http://13.233.151.221:8080/numbers/set"


def get_target(number):
    """this will get a big number"""
    val = 1
    for i in range(number, number + 99):
        val *= i
    return val


def do_get_set(outqueue: mpp.Queue):
    """this will run until it gets a stop value from the get server"""
    while True:
        try:
            x = session.get(GET_URL)
            if x.status_code == 200:
                body = x.json()
                got_number = int(body["number"])
                set_number = str(get_target(got_number))
                target_set = SET_URL + "?number=" + set_number
                y = session.get(target_set)
                if y.status_code != 200:
                    raise Exception("Got a wrong status code from set route")
                body = y.json()
                val = str(body["number"]).lower()
                outqueue.put(val)
                if val == "false":
                    break
            else:
                #print(x.status_code)
                raise Exception("Got a wrong status code from get route")
        except Exception as exp:
            print(exp)
            break


def main():
    workers = mpp.cpu_count()
    manager = mpp.Manager()
    output_queue = manager.Queue()
    the_pool = mpp.Pool(processes=workers, initializer=do_get_set, initargs=(output_queue, ))
    the_pool.close()
    the_pool.join()
    print('Working')
    while not output_queue.empty():
        item = output_queue.get(block=True)
        #print(item)
    print('Done')

if __name__ == "__main__":
    main()
