"""Utility to fetch champion names from the Riot API."""

import requests
from config import API_KEY


def get_champion_names():
    """
    Fetch champion names from the Riot API.

    Returns:
        dict: A dictionary mapping champion keys to their names.
    """
    api_uri = f"https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json"  # Adjust the version as needed
    response = requests.get(api_uri)
    if response.ok:
        data = response.json()
        return {champ["key"]: champ["name"] for champ in data["data"].values()}
    else:
        print(response)
        return {}
