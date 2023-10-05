"""Utilities to fetch match history and analyze data from the Riot API."""

import requests
import datetime
from config import API_KEY
from championData import get_champion_names


def get_match_history(puuid):
    """
    Fetch match history for a given account ID.

    Args:
        puuid (str): The account ID.

    Returns:
        list: A list of match data dictionaries.
    """
    api_uri = f"https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?count=100&api_key={API_KEY}"
    response = requests.get(api_uri)
    if not response.ok:
        print(f"Error fetching match IDs: {response}")
        return []

    match_ids = response.json()
    matches = []

    for match_id in match_ids:
        match_uri = f"https://europe.api.riotgames.com/lol/match/v5/matches/{match_id}?api_key={API_KEY}"
        match_response = requests.get(match_uri)
        if match_response.ok:
            matches.append(match_response.json())
        else:
            print(f"Error fetching match {match_id}: {match_response}")

    return matches


def get_lost_against_champions(puuid):
    """
    Fetch match history for a given account ID.

    Args:
        puuid (str): The account ID.

    Returns:
        list: A list of match data dictionaries.
    """
    matches = get_match_history(puuid)
    champion_names = get_champion_names()
    lost_against = {}

    for match in matches:
        participants = match["info"]["participants"]
        for participant in participants:
            if participant["puuid"] == puuid and not participant["win"]:
                for enemy in participants:
                    if enemy["teamId"] != participant["teamId"]:
                        champ_name = champion_names.get(
                            str(enemy["championId"]), "Unknown"
                        )
                        lost_against[champ_name] = lost_against.get(champ_name, 0) + 1

    return lost_against
