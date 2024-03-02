import json
import boto3
from decimal import Decimal

# Decimal型をfloat型に変換するカスタムエンコーダ
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        # 他の型の場合は、スーパークラスのメソッドを呼び出す
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table_name = 'YourTableName'
    table = dynamodb.Table(table_name)
    
    try:
        response = table.scan()
        # Decimal型のデータを含むレスポンスをJSONに変換
        return {
            'statusCode': 200,
            'body': json.dumps(response['Items'], cls=DecimalEncoder),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps('Error fetching data from DynamoDB'),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
