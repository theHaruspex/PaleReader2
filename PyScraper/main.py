from bs4 import BeautifulSoup
import requests

first_chapter_url = "https://palewebserial.wordpress.com/2020/05/05/blood-run-cold-0-0/"

def get_page_soup(url):
    