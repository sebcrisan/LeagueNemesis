"""Utility to fetch account ID for a given summoner name from the Riot API."""

import requests
from config import API_KEY


def get_account_id():
    """
    Fetch the account ID for a given summoner name.

    Returns:
        str: The account ID or None if not found.
    """
    api_uri = f"https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Gankerjack?api_key={API_KEY}"
    response = requests.get(api_uri)
    if response.ok:
        player_info = response.json()
        return player_info["puuid"]
    else:
        print(response)
        return None
