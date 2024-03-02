import json
import boto3

# DynamoDBクライアントの初期化
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # DynamoDBテーブル名を指定
    table = dynamodb.Table('YourTableName')

    # テーブルから全ての項目をスキャン
    try:
        response = table.scan()
        items = response['Items']
        
        return {
            'statusCode': 200,
            'body': json.dumps(items),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal server error'}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
