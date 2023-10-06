from flask import Flask, render_template, request, jsonify
import getAccountId
import getMatchHistory
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*", methods=["GET", "POST", "OPTIONS"])


@app.route('/')
def main_page():
    return render_template('index.html') 

@app.errorhandler(500)
def internal_error(error):
    app.logger.error('Server Error: %s', (error))
    return "500 error", 500

@app.route('/api/get-data', methods=['POST'])
def get_data():
    if request.method == 'POST':
        data = request.get_json()
        summoner_name = data['summonerName']
        
        # Fetch the account ID and data here using your functions
        account_id = getAccountId.get_account_id(summoner_name)
        if account_id:
            lost_against = getMatchHistory.get_lost_against_champions(account_id)
            sorted_champions = sorted(
                lost_against.items(), key=lambda x: x[1], reverse=True
            )

            total_games = sum(lost_against.values())
            result = []
            for index, (champion, count) in enumerate(sorted_champions, 1):
                loss_percentage = (count / total_games) * 100
                result.append({
                    "index": index,
                    "champion": champion,
                    "count": count,
                    "loss_percentage": round(loss_percentage, 2)
                })

            return jsonify({"data": result})
        else:
            return jsonify({"error": "Summoner not found."})

if __name__ == '__main__':
    app.run(debug=True)
