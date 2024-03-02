import json
import boto3

# DynamoDBリソースを初期化
dynamodb = boto3.resource('dynamodb')
# DynamoDBテーブル名を指定
table_name = 'ButtonPressEventTable'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    # DynamoDBテーブルから全項目を取得
    try:
        response = table.scan()
        items = response['Items']
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps('Error retrieving data from DynamoDB')
        }

    # 取得したデータをレスポンスとして返す
    return {
        'statusCode': 200,
        'body': json.dumps(items)
    }
