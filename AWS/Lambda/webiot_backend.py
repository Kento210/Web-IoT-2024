import json
import boto3
from datetime import datetime

# DynamoDBリソースを初期化
dynamodb = boto3.resource('dynamodb')
# DynamoDBテーブル名を指定
table_name = 'ButtonPressEventTable'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    # リクエストボディを直接取得（API Gatewayを介さないため、eventは既に辞書形式）
    try:
        # event自体が直接辞書形式のJSONオブジェクト
        sequence_number = event['sequenceNumber']
        button_pressed = event['buttonPressed']
    except Exception as e:
        print(e)
        return {
            'statusCode': 400,
            'body': json.dumps('Invalid request body')
        }

    # 現在のタイムスタンプ
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # DynamoDBにデータを保存
    try:
        table.put_item(
            Item={
                'sequenceNumber': sequence_number,
                'buttonPressed': button_pressed,
                'timestamp': timestamp
            }
        )
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps('Error saving the data to DynamoDB')
        }

    # 成功した場合、200ステータスコードを返す
    return {
        'statusCode': 200,
        'body': json.dumps('Data saved successfully')
    }
