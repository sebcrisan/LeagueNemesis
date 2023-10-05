"""Main execution script for the Riot API data fetcher."""

import getAccountId
import getMatchHistory


def main():
    """Main function to fetch and display data."""
    account_id = getAccountId.get_account_id()
    if account_id:
        lost_against = getMatchHistory.get_lost_against_champions(account_id)
        sorted_champions = sorted(
            lost_against.items(), key=lambda x: x[1], reverse=True
        )

        total_games = sum(lost_against.values())
        for index, (champion, count) in enumerate(sorted_champions, 1):
            loss_percentage = (count / total_games) * 100
            print(
                f"{index} - {champion} - {count} games played against - {loss_percentage:.2f}% loss percentage"
            )


if __name__ == "__main__":
    main()
